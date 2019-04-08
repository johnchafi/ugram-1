const db = require('../services/database');
const User = require('./user');
const Picture = require('./picture');
// Setup schema
const commentSchema = db.sequelize.define('comment', {
        id: {
            type: db.Sequelize.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            defaultValue: null,
            autoIncrement: true,
            field: 'id'
        },
        userId: {
            type: db.Sequelize.STRING(256),
            allowNull: false,
            defaultValue: null,
            field: 'user_id',
            references: {
                model: User,
                key: 'id'
            }
        },
        ownerId: {
            type: db.Sequelize.STRING(256),
            allowNull: false,
            defaultValue: null,
            field: 'owner_id',
            references: {
                model: User,
                key: 'id'
            }
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
        message: {
            type: db.Sequelize.STRING(3000),
            unique: false,
            allowNull: false,
            defaultValue: null,
            field: 'message'
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

// Export Users model
module.exports = commentSchema;
