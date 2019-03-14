const db = require('./database');
const User = require('./user');

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
        extension: {
            type: db.Sequelize.STRING(40),
            unique: false,
            allowNull: false
        },
        createdDate: {
            type: 'TIMESTAMP',
            defaultValue: db.Sequelize.literal('CURRENT_TIMESTAMP'),
            unique: false,
            allowNull: true
        },
        userId: {
            type: db.Sequelize.STRING(256),
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

pictureSchema.formatToClient = (picture, mentions, tags) => {
    picture.dataValues.url  = "http://" + db.bucketEndpoint + "." + db.bucketDomain + "/" +
        db.bucketRootUpload + "/" + picture.dataValues.userId + "/" + picture.dataValues.id + picture.dataValues.extension;
    picture.dataValues.tags = [];
    picture.dataValues.mentions = [];
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
