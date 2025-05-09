const { Category, Product } = require('../models');
const { asyncHandler } = require('../middlewares/validator.middleware');

/**
 * Créer une nouvelle catégorie
 * @route POST /api/categories
 */
exports.createCategory = asyncHandler(async (req, res) => {
  const { name, description, slug, imageUrl } = req.body;

  // Vérifier si la catégorie existe déjà
  const existingCategory = await Category.findOne({ where: { name } });
  if (existingCategory) {
    return res.status(400).json({
      status: 'error',
      message: 'Une catégorie avec ce nom existe déjà.'
    });
  }

  // Créer une nouvelle catégorie
  const category = await Category.create({
    name,
    description,
    slug,
    imageUrl
  });

  res.status(201).json({
    status: 'success',
    data: {
      category
    }
  });
});

/**
 * Récupérer toutes les catégories
 * @route GET /api/categories
 */
exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.findAll();

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories
    }
  });
});

/**
 * Récupérer une catégorie par son ID
 * @route GET /api/categories/:id
 */
exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);

  if (!category) {
    return res.status(404).json({
      status: 'error',
      message: 'Catégorie non trouvée.'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      category
    }
  });
});

/**
 * Récupérer tous les produits d'une catégorie
 * @route GET /api/categories/:id/products
 */
exports.getCategoryProducts = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);

  if (!category) {
    return res.status(404).json({
      status: 'error',
      message: 'Catégorie non trouvée.'
    });
  }

  const products = await Product.findAll({
    where: { categoryId: req.params.id }
  });

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products
    }
  });
});

/**
 * Mettre à jour une catégorie
 * @route PUT /api/categories/:id
 */
exports.updateCategory = asyncHandler(async (req, res) => {
  const { name, description, slug, imageUrl } = req.body;

  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).json({
      status: 'error',
      message: 'Catégorie non trouvée.'
    });
  }

  // Mettre à jour la catégorie
  category.name = name || category.name;
  category.description = description || category.description;
  category.slug = slug || category.slug;
  category.imageUrl = imageUrl || category.imageUrl;
  await category.save();

  res.status(200).json({
    status: 'success',
    data: {
      category
    }
  });
});

/**
 * Supprimer une catégorie
 * @route DELETE /api/categories/:id
 */
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).json({
      status: 'error',
      message: 'Catégorie non trouvée.'
    });
  }

  // Vérifier si des produits sont associés à cette catégorie
  const products = await Product.findAll({
    where: { categoryId: req.params.id }
  });

  if (products.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Impossible de supprimer cette catégorie car elle contient des produits.'
    });
  }

  await category.destroy();

  res.status(204).json({
    status: 'success',
    data: null
  });
});
