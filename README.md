# Inventory Management System

A full-stack inventory management system built with Angular and NestJS.

## Features

- User authentication and authorization
- Inventory management
- Asset management
- User management
- Dashboard with reports
- Password reset functionality

## Tech Stack

### Frontend
- Angular
- Angular Material
- TypeScript
- HTML/SCSS

### Backend
- NestJS
- TypeORM
- PostgreSQL
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL

## Setup Instructions

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd stock_frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup
   ### Backend for User
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your database connection in `.env`
4. Start the development server:
   ```bash
   npm run start:dev
   ```
   ### Backend for others
1. Navigate to the backend directory:
   ```bash
   cd stock_backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your database connection in `.env`
4. Start the development server:
   ```bash
   npm run start:dev
   ```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
