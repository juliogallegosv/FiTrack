const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/conection")

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [4, 32],
                    msg: "Title length must be between 4 - 32"
                }
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [4, 256]
            }
        },
        sport: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [["Running", "Swimming", "Cycling"]]
            }
        },
        distance: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
                max: 50000
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                max: 50000000
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: true
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [4, 32]
            }
        },
        private: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                privateHasSportAndDistance(value){
                    if (value) {
                        if (!this.sport && !this.distance) {
                            throw new Error("Private posts require a sport and distance");
                        }
                    }
                },
                publicHasTitle(value){
                    if (!value && !this.title){
                        throw new Error("Public posts require a title");
                    }
                },
                publicHasContents(value){
                    if (!value) {
                        if (!this.content){
                            if (!this.sport || !this.distance) {
                                throw new Error("Public posts require a either content or a sport and distance");
                            }
                        }
                    }
                    
                }
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users"
            }
        }
    },
    {
        sequelize,
    }
);

module.exports = Post;