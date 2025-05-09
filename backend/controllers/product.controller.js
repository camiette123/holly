const { Product, Category, User, Review } = require('../models');
const { asyncHandler } = require('../middlewares/validator.middleware');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Fonction pour générer un slug à partir d'une chaîne
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')        // Remplacer les espaces par des tirets
    .replace(/[àáâãäå]/g, 'a')   // Remplacer les accents
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9-]/g, '')  // Supprimer les caractères non alphanumériques
    .replace(/-+/g, '-')         // Remplacer plusieurs tirets par un seul
    .replace(/^-+/, '')          // Supprimer les tirets au début
    .replace(/-+$/, '');         // Supprimer les tirets à la fin
};

/**
 * Créer un nouveau produit
 * @route POST /api/products
 */
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, categoryId } = req.body;
  
  // Vérifier si la catégorie existe
  const category = await Category.findByPk(categoryId);
  if (!category) {
    return res.status(404).json({
      status: 'error',
      message: 'Catégorie non trouvée.'
    });
  }

  // Générer un slug à partir du nom du produit
  let slug = generateSlug(name);
  
  // Vérifier si le slug existe déjà et ajouter un suffixe si nécessaire
  const existingProduct = await Product.findOne({ where: { slug } });
  if (existingProduct) {
    slug = `${slug}-${Date.now()}`;
  }

  // Gérer l'upload d'image si présent
  let imageUrl = null;
  if (req.file) {
    imageUrl = `/uploads/products/${req.file.filename}`;
  }

  // Créer un nouveau produit
  const product = await Product.create({
    name,
    description,
    price,
    stock,
    imageUrl,
    slug,
    userId: req.user.id,
    categoryId
  });

  res.status(201).json({
    status: 'success',
    data: {
      product
    }
  });
});

/**
 * Récupérer tous les produits
 * @route GET /api/products
 */
exports.getAllProducts = asyncHandler(async (req, res) => {
  // Options de pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  // Options de filtrage
  const where = {};
  if (req.query.category) {
    where.categoryId = req.query.category;
  }
  if (req.query.minPrice) {
    where.price = { ...where.price, $gte: req.query.minPrice };
  }
  if (req.query.maxPrice) {
    where.price = { ...where.price, $lte: req.query.maxPrice };
  }
  if (req.query.available) {
    where.isAvailable = req.query.available === 'true';
  }

  // Récupérer les produits
  const { count, rows: products } = await Product.findAndCountAll({
    where,
    limit,
    offset,
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'slug']
      },
      {
        model: User,
        as: 'seller',
        attributes: ['id', 'firstName', 'lastName']
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  res.status(200).json({
    status: 'success',
    results: products.length,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    data: {
      products
    }
  });
});

/**
 * Récupérer un produit par son ID
 * @route GET /api/products/:id
 */
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'slug']
      },
      {
        model: User,
        as: 'seller',
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Review,
        as: 'reviews',
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName']
          }
        ]
      }
    ]
  });

  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Produit non trouvé.'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  });
});

/**
 * Mettre à jour un produit
 * @route PUT /api/products/:id
 */
exports.updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, categoryId, slug, isAvailable } = req.body;

  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Produit non trouvé.'
    });
  }

  // Vérifier si l'utilisateur est le propriétaire du produit ou un admin
  if (product.userId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Vous n\'êtes pas autorisé à modifier ce produit.'
    });
  }

  // Vérifier si la catégorie existe si elle est fournie
  if (categoryId) {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Catégorie non trouvée.'
      });
    }
  }

  // Gérer l'upload d'image si présent
  if (req.file) {
    // Supprimer l'ancienne image si elle existe
    if (product.imageUrl) {
      const oldImagePath = path.join(__dirname, '..', product.imageUrl);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    product.imageUrl = `/uploads/products/${req.file.filename}`;
  }

  // Mettre à jour le produit
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.stock = stock !== undefined ? stock : product.stock;
  product.categoryId = categoryId || product.categoryId;
  product.slug = slug || product.slug;
  product.isAvailable = isAvailable !== undefined ? isAvailable : product.isAvailable;
  await product.save();

  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  });
});

/**
 * Supprimer un produit
 * @route DELETE /api/products/:id
 */
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Produit non trouvé.'
    });
  }

  // Vérifier si l'utilisateur est le propriétaire du produit ou un admin
  if (product.userId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Vous n\'êtes pas autorisé à supprimer ce produit.'
    });
  }

  // Supprimer l'image du produit si elle existe
  if (product.imageUrl) {
    const imagePath = path.join(__dirname, '..', product.imageUrl);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await product.destroy();

  res.status(204).json({
    status: 'success',
    data: null
  });
});

/**
 * Rechercher des produits
 * @route GET /api/products/search
 */
exports.searchProducts = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({
      status: 'error',
      message: 'Veuillez fournir un terme de recherche.'
    });
  }

  const products = await Product.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${query}%` } },
        { description: { [Op.like]: `%${query}%` } }
      ]
    },
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'slug']
      },
      {
        model: User,
        as: 'seller',
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  });

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products
    }
  });
});
