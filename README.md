# Boxful Technical Frontend

A modern Next.js frontend application for managing shipping orders and user authentication, built with TypeScript, Ant Design, and React Hook Form.

## 🚀 Features

- **User Authentication**: Login and registration with JWT tokens
- **Order Management**: Create and view shipping orders
- **Responsive Design**: Modern UI with Ant Design components
- **Form Validation**: Zod schema validation with React Hook Form
- **Type Safety**: Full TypeScript implementation
- **API Integration**: RESTful API communication with backend services

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Ant Design
- **Form Management**: React Hook Form + Zod
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Docker & Docker Compose (for containerized setup)

## 🚀 Quick Start

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd boxful-technical-frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp example.env .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   JWT_COOKIE_NAME=access_token
   FRONTEND_PORT=3000
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Option 2: Docker Setup

1. **Create a Docker network** (if not exists)
   ```bash
   docker network create boxful-network
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Or run individual containers**
   ```bash
   # Build the image
   docker build -t boxful-frontend .
   
   # Run the container
   docker run -d \
     --name boxful-frontend \
     --network boxful-network \
     -p 3000:3000 \
     -e NEXT_PUBLIC_API_URL=http://backend:3001 \
     boxful-frontend
   ```

## 🔧 Docker Configuration

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
```

### Docker Compose
```yaml
version: '3.8'

networks:
  boxful-network:
    driver: bridge

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:3001
      - JWT_COOKIE_NAME=access_token
    networks:
      - boxful-network
    depends_on:
      - backend

  backend:
    image: your-backend-image
    ports:
      - "3001:3001"
    networks:
      - boxful-network
```

## 🌐 Network Configuration

The frontend and backend communicate through a shared Docker network (`boxful-network`):

- **Frontend**: Runs on port 3000
- **Backend**: Runs on port 3001
- **Network**: `boxful-network` (bridge network)
- **Internal Communication**: Services can reach each other using service names

### Environment Variables for Docker

```env
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://backend:3001  # Use service name in Docker
JWT_COOKIE_NAME=access_token
FRONTEND_PORT=3000

# Backend (if needed)
FRONTEND_URL=http://frontend:3000
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   └── api/               # API routes
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── orders/           # Order management components
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and configurations
│   ├── api/              # API client setup
│   ├── dtos/             # Data Transfer Objects
│   ├── schemas/          # Zod validation schemas
│   └── utils/            # Utility functions
├── services/             # API service functions
└── types/                # TypeScript type definitions
```

## 🔐 Authentication Flow

1. **Login**: User submits credentials → JWT token stored in cookies
2. **Protected Routes**: Layout checks for JWT token → redirects to login if missing
3. **API Calls**: JWT token automatically included in Authorization header
4. **Token Refresh**: Handled by backend (if implemented)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Orders
- `GET /api/orders` - Fetch user orders
- `POST /api/orders` - Create new order

## 🧪 Development

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
```

### Code Quality

- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **Prettier**: Code formatting (if configured)

## 🚀 Deployment

### Production Build

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Docker Production

```bash
# Build production image
docker build -t boxful-frontend:prod .

# Run production container
docker run -d \
  --name boxful-frontend-prod \
  --network boxful-network \
  -p 3000:3000 \
  -e NODE_ENV=production \
  boxful-frontend:prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Updates

Keep your dependencies updated:

```bash
# Update all dependencies
pnpm update

# Update specific package
pnpm update package-name
```
