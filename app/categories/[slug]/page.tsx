import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import RetryButton from "./retry-button";

export const dynamic = "force-dynamic";

type Props = {
  params: { slug: string };
};

async function getCategoryAndProducts(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      select: { id: true, name: true, slug: true, description: true },
    });

    if (!category) return { category: null, products: [], error: null };

    // Fetch products with images - sort images in JavaScript after fetching
    const products = await prisma.product.findMany({
      where: {
        categoryId: category.id,
        active: true,
        stock: { gt: 0 },
      },
      orderBy: { id: "desc" },
      include: { images: true },
      take: 200,
    });

    // Sort images by order field in JavaScript (non-mutating)
    const productsWithSortedImages = products.map((product) => ({
      ...product,
      images: [...product.images].sort((a, b) => a.order - b.order),
    }));

    return { category, products: productsWithSortedImages, error: null };
  } catch (error) {
    console.error("Error fetching category and products:", error);
    return {
      category: null,
      products: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export default async function CategoryPage({ params }: Props) {
  const slug = params.slug;
  const { category, products, error } = await getCategoryAndProducts(slug);

  // Handle database errors gracefully
  if (error) {
    return (
      <main style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
        <h1>Erreur</h1>
        <p style={{ color: "#d32f2f", marginBottom: 16 }}>
          Impossible de charger les produits pour le moment. Veuillez réessayer plus tard.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <a
            href="/"
            style={{
              padding: "8px 16px",
              background: "#1976d2",
              color: "white",
              textDecoration: "none",
              borderRadius: 4,
            }}
          >
            Retour à l'accueil
          </a>
          <RetryButton />
        </div>
        {process.env.DEBUG_PAGES === "true" && (
          <details style={{ marginTop: 24, padding: 12, background: "#f5f5f5", borderRadius: 4 }}>
            <summary>Détails de l'erreur (debug)</summary>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 12 }}>{error}</pre>
          </details>
        )}
      </main>
    );
  }

  if (!category) {
    return notFound();
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>{category.name}</h1>
      <p>{category.description}</p>

      <h2>Produits ({products.length})</h2>

      {products.length === 0 ? (
        <p>Aucun produit pour cette catégorie.</p>
      ) : (
        <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 240px)", gap: 16, listStyle: "none", padding: 0 }}>
          {products.map((p) => (
            <li key={p.id} style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
              <a href={`/products/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                {p.images?.[0] ? (
                  <img src={p.images[0].url} alt={p.name} width={220} height={220} style={{ objectFit: "cover", display: "block", marginBottom: 8 }} />
                ) : (
                  <div style={{ width: 220, height: 220, background: "#f0f0f0", marginBottom: 8 }} />
                )}
                <div style={{ fontWeight: 700 }}>{p.name}</div>
                <div style={{ color: "#666" }}>{p.price} €</div>
              </a>
            </li>
          ))}
        </ul>
      )}

      {process.env.DEBUG_PAGES === "true" && (
        <details style={{ marginTop: 24 }}>
          <summary>Debug data (products JSON)</summary>
          <pre style={{ whiteSpace: "pre-wrap", maxHeight: 400, overflow: "auto" }}>{JSON.stringify(products, null, 2)}</pre>
        </details>
      )}
    </main>
  );
}
