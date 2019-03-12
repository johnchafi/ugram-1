const db = require('./database');
const User = require('./user');

// Setup schema
let tokenSchema = db.sequelize.define('Token', {
        id: {
            type: db.Sequelize.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            defaultValue: null,
            autoIncrement: true
        },
        userId: {
            type: db.Sequelize.STRING,
            allowNull: false,
            defaultValue: null,
            references: {
                model: User,
                key: 'id'
            }
        },
        token: {
            type: db.Sequelize.STRING(4096),
            allowNull: false,
            defaultValue: null,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

// Export Tokens model
module.exports = tokenSchema;