# NGO Donation Platform

A modern, responsive web application for NGO donations built with Next.js. This platform allows users to browse campaigns, make donations, and supports multiple languages and theme preferences.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) that has been reorganized into a monorepo structure with separate frontend and backend directories.

### Video Demo
https://drive.google.com/file/d/1M-LuJyBJ6ICFehod5ssXNst3ypCtACvi/view?usp=sharing

## Features

- **Multi-language Support**: Switch between English, French, and Spanish
- **Dark/Light Mode**: Toggle between dark and light themes with system preference detection
- **Campaign Browsing**: View and search through various NGO campaigns
- **Donation System**: Make donations to campaigns with different funding plans
- **User Authentication**: Register and login to track your donations
- **Admin Dashboard**: Manage campaigns and funding plans (admin only)
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Project Structure

```
├── frontend/           # Next.js frontend application
│   ├── src/            # Source code
│   │   ├── app/        # Next.js app directory (pages)
│   │   ├── components/ # React components
│   │   ├── context/    # React context providers (ThemeContext, LanguageContext)
│   │   └── i18n/       # Internationalization files
│   ├── public/         # Static assets
│   └── package.json    # Frontend dependencies
│
├── backend/            # Backend API server
    ├── src/            # Source code
    │   ├── api/        # API routes
    │   ├── models/     # MongoDB models
    │   └── lib/        # Utility functions
    ├── server.js       # Express server entry point
    └── package.json    # Backend dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database

### Environment Variables

#### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

#### Backend (.env.local)

```
MONGODB_URI=mongodb+srv://your-mongodb-uri
JWT_SECRET=your-jwt-secret
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
PORT=3001
```

### Installation

1. Install frontend dependencies:

```bash
cd frontend
npm install
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

### Running the Application

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Key Technologies

- **Frontend**: Next.js, React, TailwindCSS
- **State Management**: React Context API
- **Styling**: TailwindCSS with dark mode support
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Internationalization**: Custom i18n implementation

## Theme Switching

The application supports dark and light modes:

- **Automatic Detection**: Automatically detects system preference on first load
- **Manual Toggle**: Users can toggle between dark and light modes via the navbar
- **Persistence**: Theme preference is saved in local storage
- **Consistent Styling**: All pages and components support both themes

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
