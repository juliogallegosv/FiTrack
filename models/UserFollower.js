const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/conection")

class UserFollower extends Model {}

UserFollower.init(
    {
        follower_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User"
            }
        },
        following_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User"
            }
        }
    },
    {
        sequelize,
    }
);

module.exports = UserFollower;