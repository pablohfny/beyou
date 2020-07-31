const {hash} = require("bcrypt");
const {DataTypes, Model} = require('sequelize');
const {sequelize} = await require('./Connection');

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          password:
 *            type: string
 *        example:
 *           name: Higor
 *           email: fake@email.com
 *           password: fake_password
 */
class User extends Model {
}

User.init({
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value){this.setDataValue('password', hash(value, 10));}
    },
    isInstructor: {
        type: DataTypes.BOOLEAN
    }
}, {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    sequelize,
    modelName: 'User'
});


module.exports = {User}