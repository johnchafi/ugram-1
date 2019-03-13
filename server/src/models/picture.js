const db = require('./database');

// Setup schema
const pictureSchema = db.sequelize.define('Pictures', {
        id: {
            type: db.Sequelize.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            defaultValue: null
        },
        description: {
            type: db.Sequelize.STRING(256),
            unique: false,
            allowNull: false,
            defaultValue: null
        },
        url: {
            type: db.Sequelize.STRING(256),
            unique: false,
            allowNull: false,
            defaultValue: null
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

// Export Users model
module.exports = pictureSchema;
