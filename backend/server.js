const app = require('./app');
const { sequelize } = require('./models');

// Port du serveur
const PORT = process.env.PORT || 3000;

// Synchronisation avec la base de données et démarrage du serveur
const startServer = async () => {
  try {
    // Synchroniser les modèles avec la base de données
    // Utiliser force: false pour éviter de recréer les tables à chaque démarrage
    await sequelize.sync({ force: false });
    console.log('Base de données synchronisée');

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();
