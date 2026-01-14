const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  
  // Create demo tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'demo-tenant' },
    update: {},
    create: {
      name: 'Demo Tenant',
      slug: 'demo-tenant',
    },
  });
  
  console.log('✅ Created demo tenant:', tenant.name);
  
  // Hash password
  const hashedPassword = await bcrypt.hash('Admin123!@#', 10);
  
  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: 'admin@adgen.local' },
    update: {},
    create: {
      email: 'admin@adgen.local',
      password: hashedPassword,
      name: 'System Admin',
      role: 'SystemAdmin',
      tenantId: tenant.id,
    },
  });
  
  console.log('✅ Created admin user:', user.email);
  console.log('   Password: Admin123!@#');
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
