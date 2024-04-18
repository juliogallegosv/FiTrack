const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/conection")
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
            unique: true,
            validate: {
                len: {
                    args: [4, 12],
                    msg: "Please select a username between 4 and 12 characters long"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [4, 32],
                    msg: "Please select a password between 4 and 32 characters long"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                len: {
                    args: [4, 128],
                    msg: "Invalid email length (max 128 characters)"
                },
                isEmail: {
                    args: true,
                    msg: "Invalid email"
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [4, 32],
                    msg: "Please select a name length between 4 and 32 characters long"
                },
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [4, 128],
                    msg: "Please select a description length between 4 and 128 characters long"
                },
            }
        },
        gender: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [2, 10],
                    msg: "Please select a gender length between 2 and 10 characters long"
                },
            }
        },
        country: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [2, 3],
                    msg: "Please select a country length between 2 and 3 characters long"
                },
            }
        },
        units: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        private: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, 
    {
        hooks: {
            beforeCreate: async (data) => {
                data.password = await bcrypt.hash(data.password, 10);
                return data;
            }
        },
        sequelize,
   
    }

)

module.exports = User;