const {hashSync} = require("bcrypt");
const {DataTypes, Model} = require('sequelize');

module.exports = function(sequelize){
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
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate:{
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            },
            set(value){
                if (value.length < 8)
                    throw new Error('Password must be longer or equal to 8 characters')
                this.setDataValue('password', hashSync(value, 10));
            }
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
    return User;
}

