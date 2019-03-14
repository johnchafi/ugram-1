const db = require('./database');
const Picture = require('./picture');

// Setup schema
const tagSchema = db.sequelize.define('Tags', {
        id: {
            type: db.Sequelize.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            defaultValue: null,
            autoIncrement: true
        },
        value: {
            type: db.Sequelize.STRING(256),
            unique: false,
            allowNull: false,
            defaultValue: null
        },
        pictureId: {
            type: db.Sequelize.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            references: {
                model: Picture,
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
module.exports = tagSchema;