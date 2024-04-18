const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/conection")

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [4, 128],
                    msg: "Please write a comment between 4 and 128 characters long"
                }
            }
        },
        private: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users"
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Posts"
            }
        }
    },
    {
        sequelize,
    }
);

module.exports = Comment;