import {default as sequelize} from '../db.js'
import {DataTypes} from "sequelize";

export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, require: true},
    surname: {type: DataTypes.STRING, require: true},
    phone: {type: DataTypes.STRING, require: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, require: true},
})

export const Reservation = sequelize.define('reservation', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    action: {type: DataTypes.STRING, require: true},
    client: {type: DataTypes.ARRAY(DataTypes.STRING), require: true},
    date: {type: DataTypes.DATEONLY, require: true},
    time: {type: DataTypes.STRING, require: true},
})

export const Time = sequelize.define('time', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    startOfDay: {type: DataTypes.STRING, require: true},
    endOfDay: {type: DataTypes.STRING, require: true}
})
export const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameOfRole: {type: DataTypes.BOOLEAN, require: true}
})

export const Gender = sequelize.define('gender', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameOfGender: {type: DataTypes.STRING, require: true}
})

export const Status = sequelize.define('status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    isValidStatus: {type: DataTypes.BOOLEAN, require: true}
})


User.hasMany(Reservation, {foreignKey: "userId"})
Reservation.belongsTo(User)

Role.hasMany(User, {foreignKey: "roleId"})
User.belongsTo(Role)

Gender.hasMany(User, {foreignKey: "genderId"})
User.belongsTo(Gender)

Status.hasMany(Reservation, {foreignKey: "statusId"})
Reservation.belongsTo(Status)
