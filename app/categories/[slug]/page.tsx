import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // force la récupération runtime

type Props = {
  params: { slug: string };
};

async function getCategoryAndProducts(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    select: { id: true, name: true, slug: true, description: true },
  });

  if (!category) return { category: null, products: [] };

  const products = await prisma.product.findMany({
    where: {
      categoryId: category.id,
      active: true,
      stock: { gt: 0 },
    },
    orderBy: { id: "desc" },
    include: { images: { orderBy: { order: "asc" } } },
    take: 200,
  });

  return { category, products };
}

export default async function CategoryPage({ params }: Props) {
  const slug = params.slug;
  const { category, products } = await getCategoryAndProducts(slug);

  if (!category) {
    // Retourne 404 si la catégorie n'existe vraiment pas
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

      {/* DEBUG : donne un aperçu rapide (supprime après debug) */}
      <details style={{ marginTop: 24 }}>
        <summary>Debug data (products JSON)</summary>
        <pre style={{ whiteSpace: "pre-wrap", maxHeight: 400, overflow: "auto" }}>{JSON.stringify(products, null, 2)}</pre>
      </details>
    </main>
  );
}
