const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection")
const bcrypt = require("bcrypt");

class User extends Model {
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        gender: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        private: {
            type: DataTypes.BOOLEAN,
        },
        followers: {
            type: DataTypes.INT,
            references: {
                model: "User"
            }
        },
        following: {
            type: DataTypes.INT,
            references: {
                model: "User"
            }
        }
    }, 
    {
        hooks: {
            beforeCreate: async (data) => {
                data.password = await bcrypt.hash(data.password, 10);
                return data;
            }
        }    
    }
)