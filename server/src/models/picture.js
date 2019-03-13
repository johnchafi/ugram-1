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

pictureSchema.formatToClient = (picture) => {
    picture.dataValues.url  = "http://" + db.bucketEndpoint + "." + db.bucketDomain + "/" + 
        db.bucketRootUpload + "/" + picture.dataValues.userId + "/" + picture.dataValues.id + picture.dataValues.extension;

    delete picture.dataValues.extension;
};

// Export Users model
module.exports = pictureSchema;