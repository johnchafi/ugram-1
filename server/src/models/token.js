const db = require('./database');
const User = require('./user');

// Setup schema
let tokenSchema = db.sequelize.define('token', {
        id: {
            type: db.Sequelize.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            defaultValue: null,
            autoIncrement: true,
            field: 'id'
        },
        userId: {
            type: db.Sequelize.STRING,
            allowNull: false,
            defaultValue: null,
            field: 'user_id',
            references: {
                model: User,
                key: 'id'
            }
        },
        token: {
            type: db.Sequelize.STRING(4096),
            allowNull: false,
            defaultValue: null,
            field: 'token'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

// Export Tokens model
module.exports = tokenSchema;