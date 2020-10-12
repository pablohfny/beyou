const {hashSync} = require("bcrypt");
const {DataTypes, Model} = require('sequelize');

module.exports = function (sequelize) {
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
     *          isPartner:
     *            type: boolean  
     *        example:
     *           name: Igor
     *           email: fake@email.com
     *           password: fake_password
     */
    class User extends Model {
    }

    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            set(value) {
                this.setDataValue('password', hashSync(value, 10));
            }
        },
        isPartner: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        registrationHash:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
        },
        registrationConfirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        sequelize,
        modelName: 'User'
    });

    return User;
}

