import { DataTypes } from 'sequelize';

import sequelize from '../db'
// const sequelize = new Sequelize('sqlite::memory:');

const Todo = sequelize.define('todo', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING(14),
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file: {
    type: DataTypes.STRING
  },
  comment: {
    type: DataTypes.STRING
  },
  datelineAt: {
    type: DataTypes.DATE
  }
}, {
  // Other model options go here
  timestamps: true,
  tableName: 'todo'
});

export default Todo;
