# Boxful Technical Frontend

A modern, responsive web application built with Next.js for managing shipping orders and customer information. This project provides a comprehensive order management system with authentication, order creation, and order history tracking.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Order Management**: Create and manage shipping orders
- **Customer Information**: Comprehensive customer data collection
- **Order History**: View and track past orders
- **Responsive Design**: Modern UI built with Ant Design and Tailwind CSS
- **Form Validation**: Robust form validation using Zod schemas
- **State Management**: Efficient state management with React Query

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **UI Library**: Ant Design (antd) 5.27.1
- **Styling**: Tailwind CSS 4
- **Form Management**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **State Management**: TanStack React Query
- **Date Handling**: Day.js and date-fns
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── create-order/  # Order creation page
│   │   └── history/       # Order history page
│   └── api/               # API routes
├── components/            # Reusable React components
│   ├── auth/             # Authentication components
│   ├── orders/           # Order-related components
│   └── providers/        # Context providers
├── lib/                  # Utility libraries
│   ├── api/              # API configuration
│   ├── dtos/             # Data transfer objects
│   ├── schemas/          # Zod validation schemas
│   └── utils/            # Utility functions
├── services/             # API service functions
└── types/                # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Backend API server running

### Installation

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
   
   Edit `.env.local` and add your backend API URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   JWT_COOKIE_NAME=access_token
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production with Turbopack
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🔐 Authentication

The application includes a complete authentication system:

- **Login**: User authentication with email/password
- **Registration**: New user account creation
- **Protected Routes**: Dashboard routes require authentication
- **JWT Tokens**: Secure token-based authentication

## 📦 Order Management

### Creating Orders
The order creation process includes:
- Customer information collection
- Collection and destination addresses
- Scheduled pickup dates
- Product information
- Additional notes and references

### Order History
- View all past orders
- Search and filter functionality
- Detailed order information

## 🎨 UI Components

The application uses a combination of:
- **Ant Design**: For form components, tables, and UI elements
- **Tailwind CSS**: For custom styling and responsive design
- **Custom Components**: Reusable components for specific functionality

## 🔧 API Integration

The frontend communicates with a backend API through:
- **Axios**: HTTP client for API requests
- **React Query**: For efficient data fetching and caching
- **Service Layer**: Organized API service functions

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🧪 Development

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting

### Best Practices
- Component-based architecture
- Form validation with Zod
- Error handling and user feedback
- Accessibility considerations

## 🚀 Deployment

### Build for Production
```bash
pnpm build
pnpm start
```

### Environment Variables for Production
Make sure to set the correct `NEXT_PUBLIC_API_URL` for your production backend.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions, please contact the development team.

---

**Built with ❤️ using Next.js, TypeScript, and Ant Design**
