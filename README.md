# QuickBlog

A modern, full-stack blogging platform built with MERN stack that allows users to create, manage, and share blog posts with advanced features like comments, admin panel, and rich text editing.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)

---

## ✨ Features

### User Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Blog Management**: Create, read, update, and delete blog posts
- **Rich Text Editor**: Write blogs with Quill rich text editor
- **Comments System**: Comment on blogs and manage your comments
- **User Dashboard**: View and manage your published blogs and comments
- **User Profile**: View and manage user profile information
- **Blog Discovery**: Browse all published blogs with pagination

### Admin Features

- **Admin Dashboard**: Overview of platform statistics and activity
- **Blog Management**: Manage all blogs (create, edit, delete, publish)
- **User Management**: View and manage all users on the platform
- **Comment Moderation**: View and manage all comments
- **Admin Authentication**: Secure admin login with admin credentials

### General Features

- **Image Upload**: Upload and manage images using ImageKit
- **AI-Powered**: Integration with Gemini API for enhanced features
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS
- **Toast Notifications**: Real-time user feedback with react-hot-toast
- **Newsletter Signup**: Subscribe to platform updates

---

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Frontend build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Quill** - Rich text editor
- **React Hot Toast** - Toast notifications
- **ESLint** - Code quality tool

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication
- **Multer** - File upload middleware
- **ImageKit** - Image hosting and optimization
- **Google Generative AI (Gemini)** - AI features

### Database

- **MongoDB Atlas** - Cloud MongoDB service

---

## 📁 Project Structure

```
QuickBlog/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── admin/              # Admin components (Login, Sidebar)
│   │   │   ├── BlogCard.jsx        # Blog card component
│   │   │   ├── BlogList.jsx        # Blog list component
│   │   │   ├── Header.jsx          # Header component
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── Newsletter.jsx      # Newsletter signup
│   │   │   ├── Profile.jsx         # User profile
│   │   │   ├── Register.jsx        # Registration form
│   │   │   └── UserLogin.jsx       # User login form
│   │   ├── context/                # React Context
│   │   │   └── AppContext.jsx      # Global app state
│   │   ├── pages/                  # Page components
│   │   │   ├── Home.jsx            # Home page
│   │   │   ├── Blog.jsx            # Single blog page
│   │   │   ├── admin/              # Admin pages
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Layout.jsx
│   │   │   │   ├── AddBlog.jsx
│   │   │   │   ├── ListBlog.jsx
│   │   │   │   ├── Comments.jsx
│   │   │   │   └── AdminUsers.jsx
│   │   │   └── dashboard/          # User dashboard pages
│   │   │       ├── UserLayout.jsx
│   │   │       ├── UserDashboard.jsx
│   │   │       ├── UserMyBlogs.jsx
│   │   │       └── UserMyComments.jsx
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── public/                     # Static assets
│   ├── package.json
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js          # Tailwind configuration
│   └── eslint.config.js            # ESLint configuration
│
├── server/                          # Express backend
│   ├── configs/                    # Configuration files
│   │   ├── db.js                  # MongoDB connection
│   │   ├── gemini.js              # Gemini API setup
│   │   └── imageKit.js            # ImageKit setup
│   ├── controllers/               # Route controllers
│   │   ├── adminController.js     # Admin logic
│   │   ├── blogController.js      # Blog logic
│   │   └── userController.js      # User logic
│   ├── middleware/                # Custom middleware
│   │   ├── auth.js                # User authentication
│   │   ├── adminAuth.js           # Admin authentication
│   │   └── multer.js              # File upload handling
│   ├── models/                    # Database schemas
│   │   ├── Blog.js
│   │   ├── Comment.js
│   │   └── User.js
│   ├── routes/                    # API routes
│   │   ├── adminRoutes.js
│   │   ├── blogRoutes.js
│   │   └── userRoutes.js
│   ├── server.js                  # Express app entry point
│   ├── package.json
│   └── .env                       # Environment variables (gitignored)
│
├── package.json                    # Root package.json
└── .gitignore                      # Git ignore rules
```

---

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v8 or higher) - Comes with Node.js
- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas)
- **ImageKit Account** - [Sign up](https://imagekit.io/)
- **Google Generative AI API Key** - [Get key](https://makersuite.google.com/)

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/QuickBlog.git
cd QuickBlog
```

### Step 2: Install Dependencies

#### Install Server Dependencies

```bash
cd server
npm install
```

#### Install Client Dependencies

```bash
cd ../client
npm install
```

#### Install Root Dependencies (if needed)

```bash
cd ..
npm install
```

---

## 🔐 Environment Setup

### Server Environment Variables

Create a `.env` file in the `server/` directory and add the following:

```env
# JWT Secret
JWT_SECRET = 'your-secret-key-here'

# Admin Credentials
ADMIN_EMAIL = "admin@example.com"
ADMIN_PASSWORD = "your-secure-password"

# MongoDB
MONGODB_URI = "mongodb+srv://username:password@cluster.mongodb.net/quickblog"

# ImageKit
IMAGEKIT_PUBLIC_KEY = 'your-public-key'
IMAGEKIT_PRIVATE_KEY = 'your-private-key'
IMAGEKIT_URL_ENDPOINT = 'https://ik.imagekit.io/your-endpoint'

# Gemini API Key
GEMINI_API_KEY = "your-gemini-api-key"
```

### Client Environment Variables

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL = "http://localhost:5000"
```

---

## ▶️ Running the Project

### Start the Backend Server

```bash
cd server
npm start
```

The server will run on `http://localhost:5000`

### Start the Frontend Development Server

In a new terminal window:

```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173` (or the port shown in terminal)

### Development Mode with Hot Reload

Both frontend and backend support hot reload during development. Any changes you make will automatically refresh the application.

---

## 📡 API Endpoints

### User Routes (`/api/users`)

- `POST /register` - Register a new user
- `POST /login` - User login
- `GET /profile` - Get user profile (protected)
- `PUT /profile` - Update user profile (protected)

### Blog Routes (`/api/blogs`)

- `GET /` - Get all published blogs
- `GET /:id` - Get single blog by ID
- `POST /create` - Create new blog (protected)
- `PUT /:id` - Update blog (protected)
- `DELETE /:id` - Delete blog (protected)

### Comment Routes (`/api/comments`)

- `GET /blog/:blogId` - Get comments for a blog
- `POST /` - Add comment to blog (protected)
- `DELETE /:id` - Delete comment (protected)

### Admin Routes (`/api/admin`)

- `POST /login` - Admin login
- `GET /dashboard` - Admin dashboard data (protected)
- `GET /users` - Get all users (protected)
- `GET /blogs` - Get all blogs (protected)
- `GET /comments` - Get all comments (protected)

---

## 📖 Usage

### For Users

1. **Create Account**: Click "Register" and fill in the form
2. **Login**: Use your credentials to login
3. **View Blogs**: Browse all published blogs on the home page
4. **Create Blog**: Go to dashboard → "Add Blog" and write your content
5. **Manage Blogs**: View your published blogs in "My Blogs"
6. **Comment**: Comment on any blog post
7. **View Profile**: Update your profile information

### For Admins

1. **Admin Login**: Navigate to `/admin` and login with admin credentials
2. **Dashboard**: View platform statistics and analytics
3. **Manage Blogs**: View, edit, or delete all blog posts
4. **Manage Users**: View all registered users
5. **Moderate Comments**: Review and manage all comments

---

## 🔄 Workflow

### User Workflow

```
Register → Login → Dashboard → Create Blog → Publish → Share → Comment
```

### Admin Workflow

```
Admin Login → Dashboard → Manage Blogs/Users/Comments
```

---

## 📝 Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  profileImage: String,
  createdAt: Date
}
```

### Blog Model

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  content: String (rich text),
  image: String,
  author: ObjectId (User),
  category: String,
  views: Number,
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Model

```javascript
{
  _id: ObjectId,
  content: String,
  author: ObjectId (User),
  blog: ObjectId (Blog),
  createdAt: Date
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🐛 Troubleshooting

### MongoDB Connection Error

- Verify MongoDB URI in `.env`
- Check if MongoDB Atlas IP whitelist includes your IP
- Ensure database user credentials are correct

### Image Upload Issues

- Verify ImageKit credentials in `.env`
- Check ImageKit account settings and API limits

### Admin Login Not Working

- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`
- Ensure admin credentials are correctly set

### Port Already in Use

- Backend: Change port in `server.js` or kill process using port 5000
- Frontend: Vite will use next available port automatically

---

## 📧 Support

For questions or support, please open an issue on GitHub or contact the project maintainer.

---

**Happy Blogging! 🚀**
