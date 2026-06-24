import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import Category from '../app/models/Category.js';
import Product from '../app/models/Product.js';
import User from '../app/models/User.js';

import config from '../config/database.cjs';

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    // Se estiver no Render, usa 'production'. Se estiver local, usa 'development'
    const currentEnv = process.env.NODE_ENV || 'development';

    // Passa o objeto correto dinamicamente
    this.connection = new Sequelize(config[currentEnv]);

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:vAtWvbyWAsYwOOfwPAnofGqKbeftmIsM@MONSTERS-STAGING:27017',
    );
  }
}

export default new Database();