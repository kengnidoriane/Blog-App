require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// Middleware de validation pour l'inscription
const validateUserRegistration = [
  check('name').notEmpty().withMessage('Name is required'),
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Please enter a valid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
];

// Middleware pour la validation des erreurs
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Fonction pour générer un token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Inscription d'un utilisateur
exports.register = [
  validateUserRegistration,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, username, email, password, image } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 12);

      // Créer un nouvel utilisateur
      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
        image,
      });

      // Sauvegarder l'utilisateur dans la base de données
      const savedUser = await newUser.save();

      // Générer un token JWT
      const token = generateToken(savedUser._id);

      res.status(201).json({
        success: true,
        user: {
          userId: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          name: savedUser.name
        },
        token,
      });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  },
];

// Connexion d'un utilisateur
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Vérifier le mot de passe
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Générer un token JWT
    const token = generateToken(existingUser._id);

    res.status(200).json({
      success: true,
      user: {
        userId: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        name: existingUser.name
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Déconnexion d'un utilisateur
exports.logout = (req, res) => {
  res.status(200).json({ 
    success: true,
    message: 'Déconnexion réussie' 
  });
};