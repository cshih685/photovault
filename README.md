# PhotoVault

A professional platform for photographers to store, manage, and sell their work.

## Features

- 📸 Photo Management
  - Upload and organize photos
  - Add metadata, categories, and tags
  - Set pricing and licensing options
  - Track views, downloads, and sales

- 🛍️ Marketplace
  - Browse and purchase photos
  - Multiple license types
  - Secure payment processing
  - Download management

- 👤 User Profiles
  - Customizable photographer profiles
  - Portfolio showcase
  - Analytics dashboard
  - Sales tracking

- 🔒 Security
  - Secure authentication
  - Image protection
  - License verification
  - Payment security

## Tech Stack

- **Frontend**: Next.js 13+ with App Router, React 18
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: React Hooks
- **API**: GraphQL with Apollo Server
- **Database**: PostgreSQL with Supabase
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Deployment**: Docker, Kubernetes (future)

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- PostgreSQL 15+
- Supabase Account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/photovault.git
   cd photovault
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Run with Docker:
   ```bash
   docker-compose up
   ```

## Development

### Database Migrations

```bash
# Apply migrations
npm run migration:up

# Create a new migration
npm run migration:create
```

### Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

## Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.