import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Créer les 6 catégories
    const categories = [
      { slug: 'tentes-abris', name: 'Tentes & Abris', description: 'Équipement de camping et abris pour vos aventures' },
      { slug: 'sacs-a-dos', name: 'Sacs à Dos', description: 'Sacs pour toutes vos aventures' },
      { slug: 'outils-couteaux', name: 'Outils & Couteaux', description: 'Outils de survie essentiels' },
      { slug: 'eclairage', name: 'Éclairage', description: 'Lampes et solutions d\'éclairage outdoor' },
      { slug: 'cuisine-eau', name: 'Cuisine & Eau', description: 'Matériel de cuisine et purification d\'eau' },
      { slug: 'survie-navigation', name: 'Survie & Navigation', description: 'Équipements de survie et navigation' },
    ];

    for (const cat of categories) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat,
      });
    }

    // Créer les 6 produits
    const products = [
      {
        name: "Réchaud Portable Acier Inoxydable",
        slug: "rechaud-portable-acier-inoxydable",
        description: "Réchaud portable en acier inoxydable pour usage extérieur. Parfait pour le camping et la survie.",
        price: 15.99,
        basePrice: 5.73,
        category: "cuisine-eau",
        images: [
          "https://oss.teemdrop.com/goods-admin/2025/11/26/32844020-4e19-458e-8d88-bc0f4d03419a.jpg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/11/26/62bcbbe6-8454-4889-aa2e-8773bc67456e.jpg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/11/26/5b44b779-14ce-4ee7-8294-408364b3103f.jpg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/11/26/762e11c9-656a-4165-9d7a-0ad164e87e86.jpg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp"
        ],
        variants: []
      },
      {
        name: "Bouilloire Camping Portable",
        slug: "bouilloire-camping-portable",
        description: "Bouilloire de camping portable et légère. Idéale pour préparer boissons chaudes en extérieur.",
        price: 19.99,
        basePrice: 7.05,
        category: "cuisine-eau",
        images: [
          "https://oss.teemdrop.com/goods-admin/2025/12/02/8ecc6c01-9f67-4b92-a674-9980b8ee13c6.jpg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/12/02/caf8e466-4164-4f13-aa74-509a097a3498.jpeg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/12/02/ba4d4915-6283-404e-945b-7498b564d9be.jpeg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/12/02/3b7ed2ca-b29d-4cbf-9696-e0ede04af958.jpg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/12/02/a765f217-9c48-406a-9021-3ca5e367219e.jpeg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp"
        ],
        variants: [{ name: "Color", value: "cw-307 outdoor kettle" }]
      },
      {
        name: "Poncho Imperméable Adulte",
        slug: "poncho-impermeable-adulte",
        description: "Poncho imperméable pour adulte. Protection contre la pluie pour randonnée et camping.",
        price: 13.99,
        basePrice: 4.50,
        category: "survie-navigation",
        images: [
          "https://oss.teemdrop.com/goods-admin/2025/08/28/7a632ccf-322b-4c85-8ee0-030953a83c2e.jpg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/08/28/6b4f9ca6-291d-4689-81c0-c6689f239e76.jpeg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/08/28/a68539fd-0c83-45d0-8e5f-a8b349384002.jpg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/08/28/703e8852-d38c-4aa8-bdd7-518ef3b6b600.jpeg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp"
        ],
        variants: [
          { name: "Color", value: "Military Green" },
          { name: "Color", value: "Black" },
          { name: "Color", value: "Grey" },
          { name: "Color", value: "Dark Blue" },
          { name: "Color", value: "Brown" },
          { name: "Color", value: "Orange" },
          { name: "Color", value: "Yellow" }
        ]
      },
      {
        name: "Matelas Gonflable Camping",
        slug: "matelas-gonflable-camping",
        description: "Matelas gonflable pour camping et randonnée. Confortable et compact.",
        price: 24.99,
        basePrice: 10.00,
        category: "tentes-abris",
        images: [
          "https://oss.teemdrop.com/goods-admin/2025/08/21/989ffc37-3c26-42c4-9d19-eb7c7600f743.jpg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/08/21/1fe99aa5-c3c8-44f1-806d-528234447b12.jpeg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/08/21/97c136de-5db0-4fc9-a43f-7c4268abfa45.jpeg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/08/21/0d391965-7d35-46a9-8491-94c983128251.jpeg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/08/21/79db191e-2b9b-487d-a800-08c2b97889e2.jpg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp"
        ],
        variants: [
          { name: "Color", value: "Navy Blue" },
          { name: "Color", value: "Car Green" },
          { name: "Color", value: "Orange" },
          { name: "Color", value: "Gray" }
        ]
      },
      {
        name: "Kit Survie Multifonction Waterproof",
        slug: "kit-survie-multifonction-waterproof",
        description: "Kit de survie multifonction waterproof. Équipement d'urgence complet pour l'outdoor.",
        price: 21.99,
        basePrice: 7.80,
        category: "survie-navigation",
        images: [
          "https://oss.teemdrop.com/goods-admin/2025/09/23/e55727ce-000d-4301-ac06-1d7825b5ca01.png?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp"
        ],
        variants: [{ name: "Color", value: "Black" }]
      },
      {
        name: "Hache Camping Multifonction",
        slug: "hache-camping-multifonction",
        description: "Hache de camping multifonction. Outil robuste pour le bushcraft et la survie.",
        price: 16.99,
        basePrice: 5.50,
        category: "outils-couteaux",
        images: [
          "https://oss.teemdrop.com/goods-admin/2025/08/08/bc76c5d6-3f6b-44e7-b316-635a30fbdcec.jpg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/08/08/a71a2e15-9c81-4b91-a88d-89b17b52f5f3.jpeg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/08/08/348fe0ed-345b-4acb-b45d-ac2c4e5dfb64.jpeg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/08/08/79fb4e1d-926f-49f7-b417-00f2b9aedf24.jpeg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp",
          "https://oss.teemdrop.com/goods-admin/2025/08/08/2873bae0-15f5-4787-aa2d-c4343c42abb8.jpeg?x-oss-process=image/resize,m_fill,w_1200,h_1200/format,webp"
        ],
        variants: [
          { name: "Model", value: "Black warrior serrated knife" },
          { name: "Model", value: "Black warrior straight knife" },
          { name: "Model", value: "Pointed ax" },
          { name: "Model", value: "Hammer ax" },
          { name: "Model", value: "Chili ax" }
        ]
      }
    ];

    const createdProducts = [];

    for (const product of products) {
      // Check if product already exists
      const existing = await prisma.product.findUnique({
        where: { slug: product.slug }
      });

      if (existing) {
        createdProducts.push({ name: product.name, status: "already exists" });
        continue;
      }

      // Get category
      const category = await prisma.category.findUnique({
        where: { slug: product.category }
      });

      if (!category) {
        createdProducts.push({ name: product.name, status: "category not found" });
        continue;
      }

      // Create product
      const created = await prisma.product.create({
        data: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          basePrice: product.basePrice,
          comparePrice: Math.round(product.price * 1.3 * 100) / 100,
          brand: "SurvivalGear",
          categoryId: category.id,
          active: true,
          stock: 100,
          images: {
            create: product.images.map((url, i) => ({
              url,
              alt: product.name,
              order: i,
            })),
          },
          variants: {
            create: product.variants.map((v) => ({
              name: v.name,
              value: v.value,
              price: 0,
              stock: 100,
            })),
          },
        },
      });

      createdProducts.push({ name: created.name, price: created.price, status: "created" });
    }

    return NextResponse.json({
      success: true,
      message: "Base de données initialisée avec succès!",
      categories: categories.length,
      products: createdProducts,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
