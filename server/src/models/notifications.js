const db = require('../services/database');
const User = require('./user');
const Like = require('./like');
const Comment = require('./comment');
// Setup schema
const notificationSchema = db.sequelize.define('notification', {
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
        likeId: {
            type: db.Sequelize.INTEGER(11),
            allowNull: true,
            defaultValue: null,
            field: 'like_id',
        },
        commentId: {
            type: db.Sequelize.INTEGER(11),
            allowNull: true,
            defaultValue: null,
            field: 'comment_id',
        },
        url: {
            type: db.Sequelize.STRING(256),
            allowNull: false,
            defaultValue: null,
            field: 'url',
        },
        userPictureUrl: {
            type: db.Sequelize.STRING(256),
            allowNull: false,
            defaultValue: null,
            field: 'user_picture_url',
        },
        pictureUrl: {
            type: db.Sequelize.STRING(256),
            allowNull: false,
            defaultValue: null,
            field: 'picture_url',
        },
        message: {
            type: db.Sequelize.STRING(256),
            allowNull: false,
            defaultValue: null,
            field: 'message',
        },
        isRead: {
            type: db.Sequelize.INTEGER(1),
            allowNull: false,
            defaultValue: false,
            field: 'read',
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

// Export Users model
module.exports = notificationSchema;
