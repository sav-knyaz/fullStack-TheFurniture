const sequelize = require('../db');
const{DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id:{type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    email:{type: DataTypes.STRING, unique: true, allowNull: false},
    name:{type:DataTypes.STRING, allowNull: false},
    password:{type: DataTypes.STRING, allowNull: false},
    role:{type: DataTypes.STRING, defaultValue:'USER'}
});
const Basket = sequelize.define('basket', {
    id:{type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true}
});
const BasketDevice = sequelize.define('basket_device', {
    id:{type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true}
});
const Device = sequelize.define('device', {
    id:{type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    typeId:{type: DataTypes.INTEGER, allowNull: false},
    name:{type: DataTypes.STRING, unique: true, allowNull: false},
    price:{type: DataTypes.STRING, allowNull: false},
    color:{type: DataTypes.STRING, allowNull: false},
    material:{type: DataTypes.STRING, allowNull: false},
    sale:{type: DataTypes.BOOLEAN, allowNull: false},
    percentSale:{type: DataTypes.STRING, allowNull: false},
    rate:{type: DataTypes.STRING},
    img:{type: DataTypes.STRING}
});
const Type = sequelize.define("type", {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type: DataTypes.STRING, unique: true, allowNull:false}
});
const TypeRoom = sequelize.define("type_room",{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type: DataTypes.STRING, allowNull:false, unique: true}
});
const Room = sequelize.define("room",{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type: DataTypes.STRING, allowNull:false, unique: true},
    details:{type:DataTypes.TEXT, allowNull:false},
    typeRoomId:{type:DataTypes.STRING, allowNull:false}
});
const Rate = sequelize.define('rate', {
    id:{type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    rate:{type: DataTypes.INTEGER}
});
const DeviceInfo = sequelize.define('info', {
    id:{type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    deviceId:{type: DataTypes.INTEGER, allowNull: false},
    title:{type: DataTypes.STRING, allowNull: false},
    description:{type: DataTypes.STRING, allowNull: false},
    specification:{type: DataTypes.STRING, allowNull: false},
    specDesc:{type: DataTypes.STRING, allowNull: false}
});
const Commit = sequelize.define('commit', {
    id:{type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    text:{type: DataTypes.STRING}
});

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasOne(DeviceInfo)
DeviceInfo.belongsTo(Device)

Device.hasMany(Rate)
Rate.belongsTo(Device)

Type.hasMany(Device)
Device.belongsTo(Type)

User.hasMany(Rate)
Rate.belongsTo(User)

Device.hasMany(Commit)
Commit.belongsTo(Device)

User.hasMany(Commit)
Commit.belongsTo(User)

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    DeviceInfo,
    Type,
    Rate,
    Commit,
    Room,
    TypeRoom
}


