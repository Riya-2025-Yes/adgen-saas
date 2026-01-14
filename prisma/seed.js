const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  
  // Hash password for admin
  const hashedPassword = await bcrypt.hash('Admin123!@#', 10);
  
  // Create demo user
  const user = await prisma.user.create({
    data: {
      email: 'admin@adgen.local',
      password: hashedPassword,
      name: 'System Admin',
      role: 'SystemAdmin',
    },
  });
  
  console.log('✅ Created admin user:', user.email);
  console.log('   Password: Admin123!@#');
  
  // Create demo tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Demo Tenant',
      slug: 'demo-tenant',
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
