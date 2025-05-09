const { Review, Product, User } = require('../models');
const { asyncHandler } = require('../middlewares/validator.middleware');

/**
 * Ajouter un avis sur un produit
 * @route POST /api/reviews
 */
exports.createReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment } = req.body;

  // Vérifier si le produit existe
  const product = await Product.findByPk(productId);
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Produit non trouvé.'
    });
  }

  // Vérifier si l'utilisateur a déjà laissé un avis sur ce produit
  const existingReview = await Review.findOne({
    where: {
      userId: req.user.id,
      productId
    }
  });

  if (existingReview) {
    return res.status(400).json({
      status: 'error',
      message: 'Vous avez déjà laissé un avis sur ce produit.'
    });
  }

  // Créer un nouvel avis
  const review = await Review.create({
    userId: req.user.id,
    productId,
    rating,
    comment
  });

  res.status(201).json({
    status: 'success',
    data: {
      review
    }
  });
});

/**
 * Récupérer tous les avis d'un produit
 * @route GET /api/reviews/product/:productId
 */
exports.getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  // Vérifier si le produit existe
  const product = await Product.findByPk(productId);
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Produit non trouvé.'
    });
  }

  // Récupérer les avis
  const reviews = await Review.findAll({
    where: { productId },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName']
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});

/**
 * Récupérer un avis par son ID
 * @route GET /api/reviews/:id
 */
exports.getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'imageUrl']
      }
    ]
  });

  if (!review) {
    return res.status(404).json({
      status: 'error',
      message: 'Avis non trouvé.'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

/**
 * Mettre à jour un avis
 * @route PUT /api/reviews/:id
 */
exports.updateReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const review = await Review.findByPk(req.params.id);
  if (!review) {
    return res.status(404).json({
      status: 'error',
      message: 'Avis non trouvé.'
    });
  }

  // Vérifier si l'utilisateur est le propriétaire de l'avis
  if (review.userId !== req.user.id) {
    return res.status(403).json({
      status: 'error',
      message: 'Vous n\'êtes pas autorisé à modifier cet avis.'
    });
  }

  // Mettre à jour l'avis
  review.rating = rating || review.rating;
  review.comment = comment || review.comment;
  await review.save();

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

/**
 * Supprimer un avis
 * @route DELETE /api/reviews/:id
 */
exports.deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  if (!review) {
    return res.status(404).json({
      status: 'error',
      message: 'Avis non trouvé.'
    });
  }

  // Vérifier si l'utilisateur est le propriétaire de l'avis ou un admin
  if (review.userId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Vous n\'êtes pas autorisé à supprimer cet avis.'
    });
  }

  await review.destroy();

  res.status(204).json({
    status: 'success',
    data: null
  });
});

/**
 * Récupérer tous les avis d'un utilisateur
 * @route GET /api/reviews/user
 */
exports.getUserReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'imageUrl']
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});
