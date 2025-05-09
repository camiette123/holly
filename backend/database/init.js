const { sequelize, User, Category, Product } = require('../models');
const bcrypt = require('bcrypt');

// Fonction pour initialiser la base de données
const initDatabase = async () => {
  try {
    // Synchroniser les modèles avec la base de données
    await sequelize.sync({ force: true });
    console.log('Base de données synchronisée');

    // Créer un utilisateur admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@afrigro.com',
      password: adminPassword,
      role: 'admin'
    });
    console.log('Utilisateur admin créé');

    // Créer un utilisateur normal
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'user@afrigro.com',
      password: userPassword,
      phone: '123456789',
      address: '123 Main Street'
    });
    console.log('Utilisateur normal créé');

    // Créer des catégories
    const categories = await Category.bulkCreate([
      {
        name: 'Électronique',
        description: 'Produits électroniques et gadgets',
        slug: 'electronique',
        imageUrl: '/uploads/categories/electronics.jpg'
      },
      {
        name: 'Vêtements',
        description: 'Vêtements et accessoires de mode',
        slug: 'vetements',
        imageUrl: '/uploads/categories/clothing.jpg'
      },
      {
        name: 'Maison',
        description: 'Articles pour la maison et le jardin',
        slug: 'maison',
        imageUrl: '/uploads/categories/home.jpg'
      },
      {
        name: 'Alimentation',
        description: 'Produits alimentaires et boissons',
        slug: 'alimentation',
        imageUrl: '/uploads/categories/food.jpg'
      }
    ]);
    console.log('Catégories créées');

    // Créer des produits
    const products = await Product.bulkCreate([
      {
        name: 'Smartphone XYZ',
        description: 'Un smartphone de dernière génération avec des fonctionnalités avancées.',
        price: 599.99,
        stock: 50,
        slug: 'smartphone-xyz',
        userId: admin.id,
        categoryId: categories[0].id
      },
      {
        name: 'T-shirt Premium',
        description: 'T-shirt en coton de haute qualité, confortable et durable.',
        price: 29.99,
        stock: 100,
        slug: 't-shirt-premium',
        userId: admin.id,
        categoryId: categories[1].id
      },
      {
        name: 'Cafetière Automatique',
        description: 'Cafetière programmable avec plusieurs options de brassage.',
        price: 89.99,
        stock: 30,
        slug: 'cafetiere-automatique',
        userId: user.id,
        categoryId: categories[2].id
      },
      {
        name: 'Chocolat Artisanal',
        description: 'Chocolat artisanal fabriqué avec des ingrédients biologiques.',
        price: 12.99,
        stock: 200,
        slug: 'chocolat-artisanal',
        userId: user.id,
        categoryId: categories[3].id
      }
    ]);
    console.log('Produits créés');

    console.log('Base de données initialisée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
  } finally {
    // Fermer la connexion à la base de données
    await sequelize.close();
  }
};

// Exécuter la fonction d'initialisation
initDatabase();
