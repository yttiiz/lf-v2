# ![favicon](./public/favicon.png) Les flamboyants

[![Netlify Status](https://api.netlify.com/api/v1/badges/bb716c19-6c83-49a4-8f9e-df4032f420e8/deploy-status)](https://app.netlify.com/projects/lf-v2/deploys)

A modern web application for booking services built with Astro, React, and MongoDB.

## 🚀 Tech Stack

- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Framework**: [Astro](https://astro.build/) with [React](https://react.dev/) integration
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: [Better Auth](https://www.better-auth.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [HeroUI](https://heroui.com/)
- **Code Quality**: [Biome](https://biomejs.dev/)
- **State Management**: [Nanostores](https://github.com/nanostores/nanostores)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Deployment**: [Netlify](https://www.netlify.com/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 18 or higher)
- **pnpm** (latest version)
- **MongoDB** database access (local or cloud)

### MongoDB Setup

You have several options for MongoDB:

1. **MongoDB Compass** (Recommended for beginners): Download [MongoDB Compass](https://www.mongodb.com/try/download/compass) for a user-friendly GUI
2. **MongoDB Shell**: Download [MongoDB Shell](https://www.mongodb.com/try/download/shell) for command-line interaction
3. **Atlas CLI**: Download [Atlas CLI](https://www.mongodb.com/try/download/atlascli) for cloud database management

## 🛠️ Getting Started

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd lf-v2
pnpm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory. Use the following template based on the sample file:

```env
# Application Configuration
APP_ENV="local"
PUBLIC_APP_URL="http://127.0.0.1:4321"

# Database Configuration
DATABASE_NAME="flamboyants"
DATABASE_HOST="your/database/url"
DATABASE_USERNAME="your_database_username"
DATABASE_PASSWORD="your_database_password"

# Authentication
BETTER_AUTH_SECRET="your_auth_secret"
BETTER_AUTH_URL="http://127.0.0.1:4321"

# Email Configuration (for password reset)
MAILER_API_KEY="your_mailer_api_key"
MAILER_FORGOT_PASSWORD_URL="your_mailer_service_url"
```

**Important Environment Variables:**
- `DATABASE_NAME`: Name of your MongoDB database
- `BETTER_AUTH_SECRET`: A secure random string for authentication
- `BETTER_AUTH_URL`: Base URL for auth callbacks (should match your app URL)

### 3. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:4321`

## 📁 Project Structure

```
lf-v2/
├── src/
│   ├── actions/          # Server actions
│   ├── assets/           # Static assets (images, icons)
│   ├── components/       # React components
│   │   ├── auth/         # Authentication components
│   │   ├── booking/      # Booking-related components
│   │   ├── contact/      # Contact form components
│   │   ├── index/        # Homepage components
│   │   ├── product/      # Product components
│   │   ├── shared/       # Reusable components
│   │   └── user-profil/  # User profile components
│   ├── data/             # Static data and constants
│   ├── db/               # Database utilities and repository
│   ├── layouts/          # Astro layout components
│   ├── lib/              # Authentication configuration
│   ├── pages/            # Astro pages (routes)
│   │   └── api/          # API endpoints
│   ├── sdk/              # SDK utilities
│   ├── services/         # Business logic services
│   ├── store/            # State management
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── content.config.ts # Content collections configuration
│   ├── env.d.ts          # Environment type definitions
│   └── middleware.ts     # Astro middleware
├── public/               # Public static files
├── astro.config.mjs      # Astro configuration
├── biome.jsonc           # Biome configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

## 🔧 Available Scripts

```bash
# Development
pnpm dev              # Start development server

# Building
pnpm build            # Build for production
pnpm preview          # Preview production build locally

# Code Quality
pnpm check            # Check code with Biome (lint + format)
pnpm format           # Format code with Biome

# Utility
pnpm astro            # Run Astro CLI commands
```

## 🎯 Key Features

### Authentication System
- User registration and login
- Password reset functionality
- Session management with Better Auth
- Protected routes middleware

### Database Integration
- MongoDB with custom repository pattern
- Type-safe database operations
- Connection handling for development and production

### API Routes
- RESTful API endpoints under `/api/`
- Authentication endpoints
- Product and booking management
- Contact form handling

### Component Architecture
- Modular React components
- Shared components for reusability
- Feature-specific component organization

## 🔗 Path Aliases

The project uses TypeScript path mapping for cleaner imports:

```typescript
@components/*  → src/components/*
@assets/*      → src/assets/*
@layouts/*     → src/layouts/*
@data/*        → src/data/*
@utils         → src/utils/mod.ts
@sdk           → src/sdk/fetcher.ts
@db            → src/db/mod.ts
@better-auth   → src/lib/mod.ts
@store         → src/store/mod.ts
@services      → src/services/mod.ts
@types         → src/types/mod.ts
```

## 🏗️ Development Workflow

### 1. Code Style and Linting
The project uses Biome for code formatting and linting. Run checks before committing:

```bash
pnpm check    # Check for issues
pnpm format   # Auto-fix formatting issues
```

### 2. Git Hooks
Husky is configured to run code quality checks before commits.

### 3. Database Operations
Use the `Mongo` class from `@db` for all database operations:

```typescript
import { Mongo } from "@db";

// Get documents
const users = await Mongo.getDocumentsFrom({
  db: "flamboyants",
  collection: "users"
});

// Insert document
await Mongo.postDocumentTo({
  db: "flamboyants",
  collection: "users",
  data: userData
});
```

### 4. Authentication
Authentication is handled through Better Auth:

```typescript
import { auth } from "@better-auth-server";

// In API routes
const session = await auth.api.getSession({
  headers: request.headers
});
```

## 🚀 Deployment

The application is configured for deployment on Netlify:

1. Build the project: `pnpm build`
2. The build output will be in the `dist/` directory
3. Netlify configuration is in `netlify.toml`

### Environment Variables for Production
Ensure all environment variables are properly set in your deployment environment, particularly:
- Database credentials
- Authentication secrets
- Email service configuration

## 🤝 Contributing

1. Follow the established code style (enforced by Biome)
2. Use conventional commit messages
3. Test your changes thoroughly
4. Update documentation when adding new features

## 📚 Additional Resources

- [Astro Documentation](https://docs.astro.build/)
- [Better Auth Documentation](https://www.better-auth.js.org/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)
- [HeroUI Components](https://heroui.com/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check your MongoDB connection string
   - Ensure MongoDB service is running
   - Verify network access for cloud databases

2. **Authentication Not Working**
   - Verify `BETTER_AUTH_SECRET` is set
   - Check `BETTER_AUTH_URL` matches your app URL
   - Ensure session cookies are properly configured

3. **Build Errors**
   - Run `pnpm check` to identify code issues
   - Ensure all environment variables are set
   - Clear node_modules and reinstall if necessary

For additional help, check the error logs and ensure all dependencies are properly installed.
