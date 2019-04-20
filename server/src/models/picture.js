const db = require('../services/database');
const User = require('./user');
const MentionModel = require('./mention');
const TagModel = require('./tag');

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

pictureSchema.getAvailableSizes = () => {
    return [40, 50, 150, 300, "original"];
};

pictureSchema.formatUrlBySizes = (picture) => {
    let url = {};
    pictureSchema.getAvailableSizes().forEach(size => {
        url[size] = "https://" + db.bucketEndpoint + "." + db.bucketDomain + "/" + db.bucketRootUpload +
            "/" + picture.dataValues.userId + "/" + picture.dataValues.id + "_" + size + picture.dataValues.extension;
        url[size] = encodeURI(url[size]);
    });
    return url;
};

pictureSchema.formatToClient = (picture, mentions, tags) => {
    picture.dataValues.url = pictureSchema.formatUrlBySizes(picture);
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

pictureSchema.assignPicturesDetails = (pictures) => {
    let ids = [];
    pictures.forEach(picture => {
        ids.push(picture.id);
    });
    return TagModel.findAll({
        where: {
            pictureId: ids
        },
        order: [
            ['id', 'ASC']
        ]
    }).then(tags => {
        return MentionModel.findAll({
            where: {
                pictureId: ids
            },
            order: [
                ['id', 'ASC']
            ]
        }).then(mentions => {
            pictures.forEach(picture => {
                let finalTags = [];
                tags.forEach(tag => {
                    if (tag.pictureId == picture.id) {
                        finalTags.push(tag);
                    }
                });
                let finalMentions = [];
                mentions.forEach(mention => {
                    if (mention.pictureId == picture.id) {
                        finalMentions.push(mention);
                    }
                });
                pictureSchema.formatToClient(picture, finalMentions, finalTags);
            });
            return pictures;
        }).catch(err => {
            throw err;
        });
    }).catch(err => {
        throw err;
    });
};

pictureSchema.assignPictureDetails = (picture) => {
    return MentionModel.findAll({
        where: {
            pictureId: picture.id
        }
    }).then(mentions => {
        return TagModel.findAll({
            where: {
                pictureId: picture.id
            }
        }).then(tags => {
            pictureSchema.formatToClient(picture, mentions, tags);
            return picture;
        }).catch(err => {
            throw err;
        });
    }).catch(err => {
        throw err;
    });
}

// Export Users model
module.exports = pictureSchema;
