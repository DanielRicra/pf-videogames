require('dotenv').config();
const { Sequelize } = require('sequelize');

// lectura automatica de modelos
const fs = require('fs');
const path = require('path');

// se traen las credenciales
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

// sequelize + SQL
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre, User, Review, Tag, Cart, Transaction  } = sequelize.models;


// Aca vendrian las relaciones
// Product.hasMany(Reviews);

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Genre.belongsToMany(Videogame, { through: 'Videogame_Genre'});
Videogame.belongsToMany(Genre, { through: 'Videogame_Genre'});

Videogame.hasMany(Review, { foreignKey: 'videogameId' });
Review.belongsTo(Videogame, { foreignKey: 'videogameId' });

Videogame.belongsToMany(Tag, { through: 'Videogame_Tag' });
Tag.belongsToMany(Videogame, { through: 'Videogame_Tag' });

Cart.belongsToMany(Videogame, { through: 'VideogamesInCart' })
Videogame.belongsToMany(Cart, { through: 'VideogamesInCart' })

Cart.belongsTo(User, { foreignKey : 'userId' })
User.hasMany(Cart, { foreignKey: 'userId' })

User.belongsToMany(Videogame, { through: 'VideogamesOwn' })
Videogame.belongsToMany(User, { through: 'VideogamesOwn' })

Transaction.belongsTo(Cart, { foreignKey: 'cartId' })
Cart.hasOne(Transaction, { foreignKey: 'cartId' })

Transaction.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Transaction, { foreignKey: 'userId' })

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};

