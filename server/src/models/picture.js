const db = require('../services/database');
const User = require('./user');

// Setup schema
const pictureSchema = db.sequelize.define('picture', {
        id: {
            type: db.Sequelize.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            defaultValue: null,
            autoIncrement: true,
            field: 'id'
        },
        description: {
            type: db.Sequelize.STRING(256),
            unique: false,
            allowNull: false,
            defaultValue: null,
            field: 'description'
        },
        extension: {
            type: db.Sequelize.STRING(40),
            unique: false,
            allowNull: false,
            field: 'extension'
        },
        createdDate: {
            type: db.Sequelize.DATE,
            defaultValue: db.Sequelize.NOW,
            unique: false,
            allowNull: true,
            field: 'created'
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
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

pictureSchema.formatToClient = (picture, mentions, tags) => {
    picture.dataValues.url  = "http://" + db.bucketEndpoint + "." + db.bucketDomain + "/" +
        db.bucketRootUpload + "/" + picture.dataValues.userId + "/" + picture.dataValues.id + picture.dataValues.extension;
    picture.dataValues.url = encodeURI(picture.dataValues.url);
    picture.dataValues.tags = [];
    picture.dataValues.mentions = [];
    picture.dataValues.createdDate = new Date(picture.dataValues.createdDate).getTime();
    Object.keys(tags).forEach(function(key) {
        picture.dataValues.tags.push(tags[key].dataValues.value);
    });
    Object.keys(mentions).forEach(function(key) {
        picture.dataValues.mentions.push(mentions[key].dataValues.userId);
    });
    delete picture.dataValues.extension;
};

// Export Users model
module.exports = pictureSchema;
