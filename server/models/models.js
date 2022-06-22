import {default as sequelize} from '../db.js'
import {DataTypes} from "sequelize";

export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, require: true},
    surname: {type: DataTypes.STRING, require: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    roles: {type: DataTypes.ARRAY(DataTypes.STRING)}
})

export const Reservation = sequelize.define('reservation', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    action: {type: DataTypes.STRING, require: true},
    client: {type: DataTypes.ARRAY(DataTypes.STRING), require: true},
    date: {type: DataTypes.DATEONLY, require: true},
    time: {type: DataTypes.STRING, require: true}
})

User.hasMany(Reservation)
Reservation.belongsTo(User)


