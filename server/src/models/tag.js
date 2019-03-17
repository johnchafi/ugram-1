const db = require('../services/database');
const Picture = require('./picture');

// Setup schema
const tagSchema = db.sequelize.define('tag', {
        id: {
            type: db.Sequelize.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            defaultValue: null,
            autoIncrement: true,
            field: 'id'
        },
        value: {
            type: db.Sequelize.STRING(256),
            unique: false,
            allowNull: false,
            defaultValue: null,
            field: 'tag'
        },
        pictureId: {
            type: db.Sequelize.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            field: 'picture_id',
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