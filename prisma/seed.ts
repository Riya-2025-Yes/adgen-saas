import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  
  // Create demo user
  const user = await prisma.user.create({
    data: {
      email: 'admin@adgen.local',
      password: '$2a$10$rQHZk5vZ8yqH8vG9qH8vG9qH8vG9qH8vG9qH8vG9qH8vG9', // hashed "Admin123"
      name: 'Admin User',
      role: 'SystemAdmin',
    },
  });
  
  console.log('✅ Created admin user:', user.email);
  
  // Create demo tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Demo Tenant',
      slug: 'demo',
    },
  });
  
  console.log('✅ Created demo tenant:', tenant.name);
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
