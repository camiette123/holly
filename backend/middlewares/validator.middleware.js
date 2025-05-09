/**
 * Middleware pour valider les données de requête
 * @param {Function} validator - Fonction de validation
 */
exports.validate = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({
        status: 'error',
        message: errorMessage
      });
    }
    next();
  };
};

/**
 * Middleware pour gérer les erreurs asynchrones
 * @param {Function} fn - Fonction asynchrone à exécuter
 */
exports.asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
