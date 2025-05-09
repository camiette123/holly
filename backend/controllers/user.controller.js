const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { asyncHandler } = require('../middlewares/validator.middleware');

/**
 * Génère un token JWT pour un utilisateur
 * @param {Object} user - L'utilisateur pour lequel générer le token
 * @returns {String} - Le token JWT
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

/**
 * Inscription d'un nouvel utilisateur
 * @route POST /api/users/register
 */
exports.register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, address } = req.body;

  // Vérifier si l'email existe déjà
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({
      status: 'error',
      message: 'Cet email est déjà utilisé.'
    });
  }

  // Créer un nouvel utilisateur
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    address
  });

  // Générer un token
  const token = generateToken(user);

  // Envoyer la réponse
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    }
  });
});

/**
 * Connexion d'un utilisateur
 * @route POST /api/users/login
 */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'email et le mot de passe sont fournis
  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Veuillez fournir un email et un mot de passe.'
    });
  }

  // Trouver l'utilisateur par email
  const user = await User.findOne({ where: { email } });
  if (!user || !(await user.isValidPassword(password))) {
    return res.status(401).json({
      status: 'error',
      message: 'Email ou mot de passe incorrect.'
    });
  }

  // Vérifier si l'utilisateur est actif
  if (!user.isActive) {
    return res.status(401).json({
      status: 'error',
      message: 'Votre compte a été désactivé. Veuillez contacter l\'administrateur.'
    });
  }

  // Générer un token
  const token = generateToken(user);

  // Envoyer la réponse
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    }
  });
});

/**
 * Récupérer le profil de l'utilisateur connecté
 * @route GET /api/users/profile
 */
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password', 'resetPasswordToken', 'resetPasswordExpires'] }
  });

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

/**
 * Mettre à jour le profil de l'utilisateur connecté
 * @route PUT /api/users/profile
 */
exports.updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, address } = req.body;

  // Mettre à jour l'utilisateur
  const user = await User.findByPk(req.user.id);
  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.phone = phone || user.phone;
  user.address = address || user.address;
  await user.save();

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    }
  });
});

/**
 * Changer le mot de passe de l'utilisateur connecté
 * @route PUT /api/users/password
 */
exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Vérifier si les mots de passe sont fournis
  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      status: 'error',
      message: 'Veuillez fournir le mot de passe actuel et le nouveau mot de passe.'
    });
  }

  // Trouver l'utilisateur
  const user = await User.findByPk(req.user.id);

  // Vérifier si le mot de passe actuel est correct
  if (!(await user.isValidPassword(currentPassword))) {
    return res.status(401).json({
      status: 'error',
      message: 'Le mot de passe actuel est incorrect.'
    });
  }

  // Mettre à jour le mot de passe
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Mot de passe mis à jour avec succès.'
  });
});

/**
 * Récupérer tous les utilisateurs (admin seulement)
 * @route GET /api/users
 */
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password', 'resetPasswordToken', 'resetPasswordExpires'] }
  });

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

/**
 * Récupérer un utilisateur par son ID (admin seulement)
 * @route GET /api/users/:id
 */
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password', 'resetPasswordToken', 'resetPasswordExpires'] }
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'Utilisateur non trouvé.'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

/**
 * Mettre à jour un utilisateur (admin seulement)
 * @route PUT /api/users/:id
 */
exports.updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, address, role, isActive } = req.body;

  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'Utilisateur non trouvé.'
    });
  }

  // Mettre à jour l'utilisateur
  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;
  user.phone = phone || user.phone;
  user.address = address || user.address;
  user.role = role || user.role;
  user.isActive = isActive !== undefined ? isActive : user.isActive;
  await user.save();

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        isActive: user.isActive
      }
    }
  });
});

/**
 * Supprimer un utilisateur (admin seulement)
 * @route DELETE /api/users/:id
 */
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'Utilisateur non trouvé.'
    });
  }

  await user.destroy();

  res.status(204).json({
    status: 'success',
    data: null
  });
});
