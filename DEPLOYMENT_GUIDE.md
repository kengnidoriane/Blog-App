# 🚀 Guide de Déploiement - Blog App

## Pré-requis

### Comptes nécessaires
- [ ] Compte MongoDB Atlas
- [ ] Compte Vercel/Netlify (Frontend)
- [ ] Compte Railway/Render/Heroku (Backend)
- [ ] Compte Redis Cloud (optionnel)
- [ ] Domaine personnalisé (optionnel)

## 📋 Checklist Pré-déploiement

### Backend
- [ ] Variables d'environnement configurées
- [ ] Base de données MongoDB Atlas créée
- [ ] JWT_SECRET sécurisé généré
- [ ] CORS configuré pour le domaine de production
- [ ] Logs configurés
- [ ] Health checks testés

### Frontend
- [ ] Variables d'environnement production
- [ ] Build optimisé testé
- [ ] Routes configurées
- [ ] Assets optimisés

## 🔧 Étape 1: Configuration MongoDB Atlas

1. **Créer un cluster**
   ```bash
   # Aller sur https://cloud.mongodb.com
   # Créer un nouveau cluster (gratuit M0)
   # Configurer l'accès réseau (0.0.0.0/0 pour commencer)
   ```

2. **Créer un utilisateur**
   ```bash
   # Database Access > Add New Database User
   # Créer utilisateur avec rôle readWrite
   ```

3. **Obtenir l'URL de connexion**
   ```bash
   # Connect > Connect your application
   # Copier l'URL de connexion
   ```

## 🚀 Étape 2: Déploiement Backend (Railway)

1. **Préparer le projet**
   ```bash
   cd server
   npm install
   
   # Créer .env.production
   NODE_ENV=production
   JWT_SECRET=your-super-secure-production-jwt-secret-256-bits
   MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/blogapp-prod
   CLIENT_URL=https://your-frontend-domain.vercel.app
   PORT=5000
   ```

2. **Déployer sur Railway**
   ```bash
   # Installer Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Initialiser projet
   railway init
   
   # Déployer
   railway up
   
   # Configurer variables d'environnement
   railway variables set NODE_ENV=production
   railway variables set JWT_SECRET=your-secret
   railway variables set MONGODB_URL=your-mongodb-url
   ```

3. **Vérifier le déploiement**
   ```bash
   # Tester health check
   curl https://your-app.railway.app/api/health
   ```

## 🌐 Étape 3: Déploiement Frontend (Vercel)

1. **Préparer le build**
   ```bash
   cd client
   npm install
   
   # Créer .env.production
   VITE_API_URL=https://your-backend.railway.app/api
   VITE_SOCKET_URL=https://your-backend.railway.app
   ```

2. **Déployer sur Vercel**
   ```bash
   # Installer Vercel CLI
   npm install -g vercel
   
   # Login
   vercel login
   
   # Déployer
   vercel --prod
   
   # Ou via GitHub (recommandé)
   # 1. Push sur GitHub
   # 2. Connecter repo sur vercel.com
   # 3. Configurer variables d'environnement
   ```

## 📊 Étape 4: Monitoring et Performance

### 1. Monitoring Backend
```bash
# Endpoints à surveiller
GET /api/health        # Status: 200
GET /api/metrics       # Métriques système
```

### 2. Tests de Performance
```bash
# Installer outils de test
npm install -g lighthouse artillery

# Test Lighthouse (SEO, Performance)
lighthouse https://your-app.vercel.app --output html

# Test de charge
artillery quick --count 10 --num 5 https://your-backend.railway.app/api/articles
```

### 3. Monitoring en Production
```bash
# Logs Railway
railway logs

# Métriques Vercel
# Dashboard Vercel > Analytics
```

## 🔒 Étape 5: Sécurité Post-déploiement

1. **Vérifier HTTPS**
   ```bash
   # Tester SSL
   curl -I https://your-app.vercel.app
   ```

2. **Tester sécurité**
   ```bash
   # Headers de sécurité
   curl -I https://your-backend.railway.app/api/health
   
   # Vérifier:
   # - X-Content-Type-Options: nosniff
   # - X-Frame-Options: DENY
   # - X-XSS-Protection: 1; mode=block
   ```

3. **Rate Limiting**
   ```bash
   # Tester rate limiting
   for i in {1..110}; do curl https://your-backend.railway.app/api/articles; done
   ```

## 📈 Étape 6: Optimisation Continue

### Performance Monitoring
```bash
# Métriques à surveiller:
# - Temps de réponse API < 200ms
# - Uptime > 99.9%
# - Erreurs < 1%
# - Utilisation mémoire < 80%
```

### SEO Monitoring
```bash
# Vérifier régulièrement:
# - Lighthouse Score > 90
# - Core Web Vitals
# - Meta tags dynamiques
# - Sitemap.xml
```

## 🚨 Dépannage

### Problèmes courants
1. **CORS Error**
   ```bash
   # Vérifier CLIENT_URL dans .env
   # Redéployer backend
   ```

2. **Database Connection**
   ```bash
   # Vérifier IP whitelist MongoDB
   # Tester connexion: /api/health
   ```

3. **Build Errors**
   ```bash
   # Vérifier variables d'environnement
   # Tester build local: npm run build
   ```

## 📞 Support

- **Logs Backend**: `railway logs`
- **Logs Frontend**: Vercel Dashboard
- **Health Check**: `/api/health`
- **Metrics**: `/api/metrics`

---

## ✅ Checklist Final

- [ ] Backend déployé et accessible
- [ ] Frontend déployé et accessible
- [ ] Base de données connectée
- [ ] WebSocket fonctionnel
- [ ] Notifications temps réel
- [ ] HTTPS activé
- [ ] Monitoring configuré
- [ ] Performance testée
- [ ] SEO optimisé
- [ ] Sécurité vérifiée

**🎉 Votre application est prête pour la production !**