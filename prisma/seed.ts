import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create default categories (slugs match Header.tsx navigation)
  const categories = [
    {
      name: 'Tentes & Abris',
      slug: 'tentes-abris',
      description: 'Équipement de camping et abris pour vos aventures en pleine nature',
    },
    {
      name: 'Sacs à Dos',
      slug: 'sacs-a-dos',
      description: 'Sacs pour toutes vos aventures, du trekking à la randonnée',
    },
    {
      name: 'Outils & Couteaux',
      slug: 'outils-couteaux',
      description: 'Outils de survie essentiels pour les situations extrêmes',
    },
    {
      name: 'Éclairage',
      slug: 'eclairage',
      description: 'Lampes et solutions d\'éclairage pour l\'outdoor',
    },
    {
      name: 'Cuisine & Eau',
      slug: 'cuisine-eau',
      description: 'Matériel de cuisine et purification d\'eau pour le camping',
    },
    {
      name: 'Survie & Navigation',
      slug: 'survie-navigation',
      description: 'Équipements de survie et navigation pour explorateurs',
    },
  ];

  for (const category of categories) {
    const existing = await prisma.category.findUnique({
      where: { slug: category.slug },
    });

    if (!existing) {
      await prisma.category.create({
        data: category,
      });
      console.log(`✓ Created category: ${category.name}`);
    } else {
      console.log(`- Category already exists: ${category.name}`);
    }
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
