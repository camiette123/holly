const { Order, OrderItem, Product, User } = require('../models');
const { asyncHandler } = require('../middlewares/validator.middleware');
const { sequelize } = require('../models');

/**
 * Créer une nouvelle commande
 * @route POST /api/orders
 */
exports.createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({
      status: 'error',
      message: 'Veuillez fournir au moins un produit pour la commande.'
    });
  }

  // Démarrer une transaction
  const transaction = await sequelize.transaction();

  try {
    // Calculer le montant total et vérifier le stock
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      
      if (!product) {
        await transaction.rollback();
        return res.status(404).json({
          status: 'error',
          message: `Produit avec l'ID ${item.productId} non trouvé.`
        });
      }

      if (!product.isAvailable) {
        await transaction.rollback();
        return res.status(400).json({
          status: 'error',
          message: `Le produit ${product.name} n'est pas disponible.`
        });
      }

      if (product.stock < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({
          status: 'error',
          message: `Stock insuffisant pour le produit ${product.name}. Stock disponible: ${product.stock}.`
        });
      }

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
        subtotal
      });

      // Mettre à jour le stock
      product.stock -= item.quantity;
      await product.save({ transaction });
    }

    // Créer la commande
    const order = await Order.create({
      userId: req.user.id,
      totalAmount,
      status: 'pending',
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending'
    }, { transaction });

    // Créer les éléments de la commande
    for (const item of orderItems) {
      await OrderItem.create({
        orderId: order.id,
        ...item
      }, { transaction });
    }

    // Valider la transaction
    await transaction.commit();

    res.status(201).json({
      status: 'success',
      data: {
        order: {
          id: order.id,
          totalAmount: order.totalAmount,
          status: order.status,
          paymentStatus: order.paymentStatus,
          createdAt: order.createdAt
        }
      }
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
});

/**
 * Récupérer toutes les commandes de l'utilisateur connecté
 * @route GET /api/orders
 */
exports.getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: Product,
        as: 'products',
        through: {
          attributes: ['quantity', 'price', 'subtotal']
        }
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders
    }
  });
});

/**
 * Récupérer une commande par son ID
 * @route GET /api/orders/:id
 */
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    where: { 
      id: req.params.id,
      userId: req.user.id
    },
    include: [
      {
        model: Product,
        as: 'products',
        through: {
          attributes: ['quantity', 'price', 'subtotal']
        }
      }
    ]
  });

  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: 'Commande non trouvée.'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      order
    }
  });
});

/**
 * Annuler une commande
 * @route PUT /api/orders/:id/cancel
 */
exports.cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    where: { 
      id: req.params.id,
      userId: req.user.id
    }
  });

  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: 'Commande non trouvée.'
    });
  }

  if (order.status !== 'pending' && order.status !== 'processing') {
    return res.status(400).json({
      status: 'error',
      message: 'Impossible d\'annuler cette commande car elle a déjà été expédiée ou livrée.'
    });
  }

  // Démarrer une transaction
  const transaction = await sequelize.transaction();

  try {
    // Récupérer les éléments de la commande
    const orderItems = await OrderItem.findAll({
      where: { orderId: order.id }
    });

    // Restaurer le stock des produits
    for (const item of orderItems) {
      const product = await Product.findByPk(item.productId);
      product.stock += item.quantity;
      await product.save({ transaction });
    }

    // Mettre à jour le statut de la commande
    order.status = 'cancelled';
    await order.save({ transaction });

    // Valider la transaction
    await transaction.commit();

    res.status(200).json({
      status: 'success',
      data: {
        order
      }
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
});

/**
 * Récupérer toutes les commandes (admin seulement)
 * @route GET /api/orders/admin
 */
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'email']
      },
      {
        model: Product,
        as: 'products',
        through: {
          attributes: ['quantity', 'price', 'subtotal']
        }
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders
    }
  });
});

/**
 * Mettre à jour le statut d'une commande (admin seulement)
 * @route PUT /api/orders/:id/status
 */
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, trackingNumber } = req.body;

  const order = await Order.findByPk(req.params.id);
  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: 'Commande non trouvée.'
    });
  }

  // Mettre à jour le statut de la commande
  order.status = status || order.status;
  if (trackingNumber) {
    order.trackingNumber = trackingNumber;
  }
  await order.save();

  res.status(200).json({
    status: 'success',
    data: {
      order
    }
  });
});

/**
 * Mettre à jour le statut de paiement d'une commande (admin seulement)
 * @route PUT /api/orders/:id/payment
 */
exports.updatePaymentStatus = asyncHandler(async (req, res) => {
  const { paymentStatus } = req.body;

  const order = await Order.findByPk(req.params.id);
  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: 'Commande non trouvée.'
    });
  }

  // Mettre à jour le statut de paiement
  order.paymentStatus = paymentStatus;
  await order.save();

  res.status(200).json({
    status: 'success',
    data: {
      order
    }
  });
});
