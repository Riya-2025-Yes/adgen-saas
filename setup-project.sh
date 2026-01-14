#!/bin/bash

echo "🚀 Creating AdGen SaaS Project Structure..."

# Create all directories
mkdir -p prisma scripts public src/app/api/auth/\[...nextauth\] src/app/api/tenants/\[id\] src/app/api/users src/app/api/roles src/app/api/permissions src/app/api/brand-kits src/app/api/templates/\[id\] src/app/api/providers/\[id\] src/app/api/campaigns/\[id\]/export src/app/api/assets src/app/api/upload src/app/api/audit-logs src/app/\(auth\)/login src/app/\(dashboard\)/dashboard src/app/\(dashboard\)/system/tenants src/app/\(dashboard\)/system/audit-logs src/app/\(dashboard\)/system/settings src/app/\(dashboard\)/admin/users src/app/\(dashboard\)/admin/roles src/app/\(dashboard\)/admin/brand-kit src/app/\(dashboard\)/admin/templates src/app/\(dashboard\)/admin/providers src/app/\(dashboard\)/admin/settings src/app/\(dashboard\)/campaigns/new src/app/\(dashboard\)/campaigns/\[id\] src/app/\(dashboard\)/assets src/components/ui src/components/auth src/components/layout src/components/providers src/components/system src/components/admin src/components/campaigns src/components/common src/lib src/services/providers/llm src/services/providers/image src/services/providers/video src/types src/validators src/workers

echo "📝 Creating configuration files..."

# package.json
cat > package.json << 'EOF'
{
  "name": "adgen-saas",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "postinstall": "prisma generate"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.4",
    "@prisma/client": "^5.9.1",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "bcryptjs": "^2.4.3",
    "bullmq": "^5.1.9",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "ioredis": "^5.3.2",
    "lucide-react": "^0.316.0",
    "next": "14.1.0",
    "next-auth": "^4.24.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.50.0",
    "tailwind-merge": "^2.2.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/node": "^20.11.16",
    "@types/react": "^18.2.52",
    "@types/react-dom": "^18.2.18",
    "autoprefixer": "^10.4.17",
    "eslint": "^8.56.0",
    "eslint-config-next": "14.1.0",
    "postcss": "^8.4.33",
    "prisma": "^5.9.1",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3"
  }
}
EOF

# .gitignore
cat > .gitignore << 'EOF'
node_modules
.next
out
.env
.env*.local
*.log
.DS_Store
.vercel
build
dist
EOF

# tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# next.config.js
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = nextConfig;
EOF

# tailwind.config.ts
cat > tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
EOF

# postcss.config.js
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOF

# .env.example
cat > .env.example << 'EOF'
DATABASE_URL=postgresql://postgres:password@localhost:5432/adgen
REDIS_URL=redis://localhost:6379
NEXTAUTH_SECRET=your-super-secret-key-change-in-production-min-32-chars
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
ENCRYPTION_KEY=your-encryption-key-min-32-chars-change-in-production
SINGLE_TENANT=false
ENABLE_CUSTOM_DOMAINS=false
EOF

echo "📦 Creating Prisma schema..."

# prisma/schema.prisma
cat > prisma/schema.prisma << 'EOF'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Tenant {
  id              String    @id @default(cuid())
  name            String
  slug            String    @unique
  status          String    @default("active")
  appShellLogo    String?
  loginLogo       String?
  favicon         String?
  primaryColor    String?   @default("#3b82f6")
  displayName     String?
  customDomain    String?   @unique
  domainStatus    String?   @default("pending")
  verificationToken String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  users           User[]
  roles           Role[]
  brandKits       BrandKit[]
  templates       Template[]
  providers       Provider[]
  campaigns       Campaign[]
  assets          Asset[]
  auditLogs       AuditLog[]
  settings        TenantSetting[]
  
  @@index([slug])
  @@index([customDomain])
}

model User {
  id              String    @id @default(cuid())
  email           String    @unique
  password        String
  name            String
  role            String
  tenantId        String?
  status          String    @default("active")
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  lastLoginAt     DateTime?
  
  tenant          Tenant?   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  roleAssignments RoleAssignment[]
  campaigns       Campaign[]
  auditLogs       AuditLog[]
  
  @@index([email])
  @@index([tenantId])
}

model Role {
  id          String   @id @default(cuid())
  name        String
  description String?
  tenantId    String?
  isSystem    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  tenant      Tenant?  @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  permissions RolePermission[]
  assignments RoleAssignment[]
  
  @@unique([tenantId, name])
  @@index([tenantId])
}

model Permission {
  id          String   @id @default(cuid())
  resource    String
  action      String
  description String?
  createdAt   DateTime @default(now())
  
  roles       RolePermission[]
  
  @@unique([resource, action])
}

model RolePermission {
  id           String     @id @default(cuid())
  roleId       String
  permissionId String
  
  role         Role       @relation(fields: [roleId], references: [id], onDelete: Cascade)
  permission   Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)
  
  @@unique([roleId, permissionId])
}

model RoleAssignment {
  id        String   @id @default(cuid())
  userId    String
  roleId    String
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  role      Role     @relation(fields: [roleId], references: [id], onDelete: Cascade)
  
  @@unique([userId, roleId])
}

model BrandKit {
  id              String   @id @default(cuid())
  tenantId        String
  name            String
  isDefault       Boolean  @default(false)
  colors          Json
  fonts           Json
  tone            String?
  voiceGuidelines String?  @db.Text
  forbiddenWords  Json?
  disclaimers     String?  @db.Text
  hashtags        Json?
  logos           Json?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  tenant          Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  campaigns       Campaign[]
  
  @@index([tenantId])
}

model Template {
  id          String   @id @default(cuid())
  tenantId    String
  name        String
  description String?
  type        String
  version     Int      @default(1)
  isActive    Boolean  @default(true)
  schema      Json
  content     Json
  previewData Json?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  tenant      Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  campaigns   Campaign[]
  
  @@index([tenantId])
  @@index([type])
}

model Provider {
  id        String   @id @default(cuid())
  tenantId  String
  name      String
  type      String
  provider  String
  config    String   @db.Text
  isActive  Boolean  @default(true)
  isDefault Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  tenant    Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  
  @@index([tenantId])
  @@index([type])
}

model Campaign {
  id            String    @id @default(cuid())
  tenantId      String
  userId        String
  name          String
  description   String?
  status        String    @default("draft")
  templateId    String?
  brandKitId    String?
  inputs        Json
  llmProvider   String?
  imageProvider String?
  videoProvider String?
  assetIds      String[]
  exportPath    String?
  exportedAt    DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  completedAt   DateTime?
  
  tenant        Tenant    @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  user          User      @relation(fields: [userId], references: [id])
  template      Template? @relation(fields: [templateId], references: [id])
  brandKit      BrandKit? @relation(fields: [brandKitId], references: [id])
  assets        Asset[]
  
  @@index([tenantId])
  @@index([userId])
  @@index([status])
}

model Asset {
  id         String   @id @default(cuid())
  tenantId   String
  campaignId String?
  name       String
  type       String
  mimeType   String?
  s3Path     String
  s3Bucket   String   @default("adgen-assets")
  fileSize   Int?
  metadata   Json?
  createdAt  DateTime @default(now())
  
  tenant     Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  campaign   Campaign? @relation(fields: [campaignId], references: [id], onDelete: Cascade)
  
  @@index([tenantId])
  @@index([campaignId])
  @@index([type])
}

model TenantSetting {
  id        String   @id @default(cuid())
  tenantId  String
  key       String
  value     String   @db.Text
  updatedAt DateTime @updatedAt
  
  tenant    Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  
  @@unique([tenantId, key])
}

model AuditLog {
  id         String   @id @default(cuid())
  tenantId   String?
  userId     String?
  action     String
  resource   String
  resourceId String?
  details    Json?
  ipAddress  String?
  userAgent  String?
  createdAt  DateTime @default(now())
  
  tenant     Tenant?  @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  user       User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  
  @@index([tenantId])
  @@index([userId])
  @@index([createdAt])
  @@index([action])
}
EOF

echo "🎨 Creating app files..."

# src/app/layout.tsx
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AdGen SaaS',
  description: 'Multi-tenant Advertisement Generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
EOF

# src/app/page.tsx
cat > src/app/page.tsx << 'EOF'
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          AdGen SaaS
        </h1>
        <p className="text-xl text-gray-600 mb-8">Multi-tenant Advertisement Generator</p>
        <div className="space-x-4">
          <a href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
EOF

# src/app/globals.css
cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
EOF

# src/lib/db.ts
cat > src/lib/db.ts << 'EOF'
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
EOF

# src/lib/utils.ts
cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF

echo "✅ Project structure created successfully!"
echo ""
echo "Next steps:"
echo "1. Run: npm install"
echo "2. Setup your database connection in .env"
echo "3. Run: npx prisma generate"
echo "4. Run: npx prisma db push"
echo "5. Run: npm run dev"

