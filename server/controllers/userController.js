require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
// const { uploadFile } = require('../config/uploadS3'); 
// const upload = require('../middlewares/upload')


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
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Inscription d'un utilisateur
exports.registerUser = [

  validateUserRegistration, // Validation des champs
  handleValidationErrors, // Gestion des erreurs de validation

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
        return res.status(400).json({message: 'username already exist'})
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
      const savedUser =  await newUser.save();

      // Générer un token JWT
      const token = generateToken(savedUser._id);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000
      })

      res.status(201).json({
        userId: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        token,
      });
    } catch (error) {
      console.error('server error', error);
      
      res.status(500).json({ message: 'Something went wrong', error });
    }
  },
];

// Connexion d'un utilisateur
exports.loginUser = async (req, res) => {

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

     // Définir le cookie
     res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000 // 1 heure
    });

    res.status(200).json({
      userId: existingUser._id,
      email: existingUser.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Ajoutez une route de déconnexion
exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Déconnexion réussie' });
};

// recuperer tous les users

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({message: 'erreur lors de la recuperations des users'})
  }
}

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({message: 'Utilisateur non trouve'})
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({message: error})
  }
}

// Fonction utilitaire pour vérifier si un utilisateur existe
const findUserById = async (id) => {
  return await User.findById(id);
};

// Suivre un utilisateur
exports.followUser = async (req, res) => {
  try {
    const { userId } = req.params; // ID de l'utilisateur à suivre
    const { currentUserId } = req.body;

    const userToFollow = await findUserById(userId);
    const currentUser = await findUserById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Vérifier si l'utilisateur est déjà suivi
    if (currentUser.following.includes(userId)) {
      return res.status(400).json({ message: 'You already follow this user' });
    }

    // Ajouter à la liste des followers et following
    currentUser.following.push(userId);
    userToFollow.followers.push(currentUser._id);

    // Sauvegarder les deux utilisateurs simultanément
    await Promise.all([currentUser.save(), userToFollow.save()]);

    res.status(200).json({ message: `You are now following ${userToFollow.name}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Arrêter de suivre un utilisateur
exports.unFollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentUserId } = req.body;

    const userToUnfollow = await findUserById(userId);
    const currentUser = await findUserById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Vérifier si l'utilisateur est déjà suivi
    if (!currentUser.following.includes(userId)) {
      return res.status(400).json({ message: 'You don\'t follow this user' });
    }

    // Retirer des listes 'following' et 'followers'
    currentUser.following = currentUser.following.filter(id => id.toString() !== userId);
    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUserId);

    // Sauvegarder les deux utilisateurs simultanément
    await Promise.all([currentUser.save(), userToUnfollow.save()]);

    res.status(200).json({ message: `You no longer follow ${userToUnfollow.name}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer les followers d'un utilisateur
exports.getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('followers', 'name username email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer les utilisateurs suivis (following)
exports.getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('following', 'name username email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.following);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
