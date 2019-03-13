const db = require('./database');

// Setup schema
const pictureSchema = db.sequelize.define('Pictures', {
        id: {
            type: db.Sequelize.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            defaultValue: null,
            autoIncrement: true
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
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

// Export Users model
module.exports = pictureSchema;
