const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Middleware pour vérifier si l'utilisateur est authentifié
 */
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Vérifier si le token est présent dans les headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Vérifier si le token existe
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Vous n\'êtes pas connecté. Veuillez vous connecter pour accéder à cette ressource.'
      });
    }

    // Vérifier si le token est valide
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérifier si l'utilisateur existe toujours
    const currentUser = await User.findByPk(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'error',
        message: 'L\'utilisateur associé à ce token n\'existe plus.'
      });
    }

    // Vérifier si l'utilisateur est actif
    if (!currentUser.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Ce compte a été désactivé. Veuillez contacter l\'administrateur.'
      });
    }

    // Ajouter l'utilisateur à la requête
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Token invalide ou expiré.'
    });
  }
};

/**
 * Middleware pour restreindre l'accès aux rôles spécifiques
 * @param  {...String} roles - Les rôles autorisés
 */
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Vous n\'avez pas la permission d\'effectuer cette action.'
      });
    }
    next();
  };
};
