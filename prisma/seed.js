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
      displayName: 'Demo Organization',
      status: 'active',
    },
  });

  console.log('✅ Created tenant:', tenant.name);

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin123!@#', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@adgen.local' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'admin@adgen.local',
      password: hashedPassword,
      name: 'System Admin',
      role: 'SystemAdmin',
      tenantId: tenant.id,
      status: 'active',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create additional demo users
  const users = [
    {
      email: 'tenant@demo.local',
      name: 'Tenant Admin',
      role: 'TenantAdmin',
      password: 'Tenant123!@#',
    },
    {
      email: 'marketer@demo.local',
      name: 'John Marketer',
      role: 'Marketer',
      password: 'Marketer123!@#',
    },
    {
      email: 'viewer@demo.local',
      name: 'Jane Viewer',
      role: 'Viewer',
      password: 'Viewer123!@#',
    },
  ];

  for (const userData of users) {
    const hashedPwd = await bcrypt.hash(userData.password, 10);
    await prisma.user.upsert({
      where: { email: userData.email },
      update: { password: hashedPwd },
      create: {
        email: userData.email,
        password: hashedPwd,
        name: userData.name,
        role: userData.role,
        tenantId: tenant.id,
        status: 'active',
      },
    });
    console.log('✅ Created user:', userData.email);
  }

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
