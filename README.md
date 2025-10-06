# 📝 DevBlog - Modern Blog Platform

A complete blog platform with real-time notifications, likes/comments system, and modern interface inspired by dev.to.

## 🚀 Features

### ✨ **Core Features**
- 📝 **Article creation** with Markdown editor
- 👤 **Secure JWT authentication**
- 💬 **Real-time comment system**
- ❤️ **Likes and bookmarks** 
- 👥 **User follow system**
- 🔔 **Real-time notifications** with WebSocket
- 🏷️ **Tags and categories**
- 📱 **Mobile-first responsive design**

### 🛡️ **Security & Performance**
- 🔒 **XSS protection** and MongoDB injection prevention
- ⚡ **Redis caching** for performance
- 📊 **Rate limiting** anti-spam
- 🔐 **Secure headers** with Helmet
- 📈 **Monitoring** with health checks
- 📝 **Structured logging** with Winston

### 🎨 **Modern UX/UI**
- 🎯 **dev.to-style cards**
- 🔔 **Toast notifications** (no alerts)
- ⚡ **Lazy loading** pages
- 🎨 **Consistent design system**
- 📱 **PWA ready**

## 🏗️ Architecture

```
Blog-App/
├── client/          # Frontend React + Vite
├── server/          # Backend Node.js + Express
├── docs/            # Documentation
└── README.md        # This file
```

### **Tech Stack**

#### Frontend
- ⚛️ **React 18** + **Vite**
- 🎨 **Tailwind CSS** + **Typography**
- 🔄 **Zustand** (state management)
- 🚦 **React Router** (navigation)
- 🔌 **Socket.IO Client** (temps réel)
- 📝 **React Hook Form** (formulaires)
- 🏷️ **Marked** (Markdown)

#### Backend
- 🟢 **Node.js** + **Express**
- 🍃 **MongoDB** + **Mongoose**
- 🔐 **JWT** (authentification)
- 🔌 **Socket.IO** (WebSocket)
- ⚡ **Redis** (cache)
- 📝 **Winston** (logging)
- 🛡️ **Helmet** (sécurité)

## 🚀 Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Redis (optional)

### 1. Clone the project
```bash
git clone https://github.com/username/blog-app.git
cd blog-app
```

### 2. Backend Setup
```bash
cd server
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your actual values

# Start the server
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your API URL

# Start the client
npm run dev
```

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
```bash
# Base
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# Database
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/blogapp

# Security
JWT_SECRET=your-super-secure-secret-256-bits
RATE_LIMIT_MAX_REQUESTS=100

# Cache (optionnel)
REDIS_URL=redis://localhost:6379
```

#### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 📚 API Documentation

### Authentication
```bash
POST /api/user/auth/register    # Register
POST /api/user/auth/login       # Login
GET  /api/user/profile          # User profile
```

### Articles
```bash
GET    /api/articles            # List articles
POST   /api/articles            # Create article
GET    /api/articles/:id        # Get article details
PUT    /api/articles/:id        # Update article
DELETE /api/articles/:id        # Delete article
POST   /api/articles/:id/like   # Like article
```

### Comments
```bash
GET  /api/articles/:id/comments     # Get article comments
POST /api/articles/:id/comments     # Add comment
```

### Follow System
```bash
POST /api/user/:userId/follow       # Follow user
POST /api/user/:userId/unfollow     # Unfollow user
GET  /api/user/:userId/followers    # Get followers list
GET  /api/user/:userId/following    # Get following list
```

### Monitoring
```bash
GET /api/health                     # Health check
GET /api/metrics                    # System metrics
```

## 🚀 Deployment

### Production Ready
- ✅ Secure environment variables
- ✅ CORS configured
- ✅ Rate limiting enabled
- ✅ Structured logging
- ✅ Health checks
- ✅ Redis caching
- ✅ Gzip compression

### Recommended Platforms
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, Heroku
- **Database**: MongoDB Atlas
- **Cache**: Redis Cloud

### Deployment Guide
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🧪 Tests

```bash
# Backend
cd server
npm test

# Frontend  
cd client
npm test
```

## 📊 Performance

### Target Metrics
- ⚡ **API Response**: < 200ms
- 🎯 **Lighthouse Score**: > 90
- 📱 **Mobile Performance**: > 85
- 🔄 **Cache Hit Rate**: > 80%

### Implemented Optimizations
- 🚀 **Lazy loading** components
- ⚡ **Redis caching** for frequent queries
- 📦 **Automatic bundle splitting**
- 🗜️ **Gzip compression**
- 🔍 **Optimized MongoDB queries**

## 🛡️ Security

### Implemented Measures
- 🔐 **JWT** with expiration
- 🛡️ **XSS Protection** with sanitization
- 🚫 **Rate Limiting** anti-spam
- 🔒 **Restrictive CORS**
- 📝 **Input validation**
- 🔍 **Secure logging** (no sensitive data)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'feat: add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

### Conventions de Commit
```bash
feat: nouvelle fonctionnalité
fix: correction de bug
docs: documentation
style: formatage
refactor: refactoring
test: ajout de tests
chore: maintenance
```

## 📄 Licence

MIT License - voir [LICENSE](LICENSE) pour plus de détails.

## 👥 Team

- **Lead Developer**: [Your Name]
- **Design**: Inspired by dev.to
- **Architecture**: Modern MERN Stack

## 🔗 Useful Links

- [API Documentation](./docs/API.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Non-Functional Requirements](./NON_FUNCTIONAL_REQUIREMENTS.md)
- [Implementation Details](./IMPLEMENTATION_DETAILS.md)

---

**⭐ If you like this project, don't hesitate to give it a star!**