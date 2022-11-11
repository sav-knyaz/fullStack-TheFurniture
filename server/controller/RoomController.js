const ApiError = require("../error/ApiError");
const { Room, TypeRoom } = require("../models/models");
const uuid = require('uuid');
const path = require('path');

class RoomController{
    async createRoom(req, res){
        try {
          let {name, typeRoomId,  background, devices, blockPlus} = req.body;
          const images = req.files.img;
              devices = JSON.parse(devices)
              let sum = [];
          for(let item of images){
            
                let imgName = uuid.v4() + '.jpg';

                sum = [...sum, imgName];
            
                item.mv(path.resolve(__dirname, '..', 'static', imgName))
                
          }
          for(let i = 0; i < sum.length; i++){
            devices[i].img = sum[i];
          }
        //  devices = devices.map(item => item = {
        //                               name: item.name,
        //                               type: item.type,
        //                               id: item.id,
        //                               deviceId: item.deviceId,
        //                               sizeH: item.sizeH,
        //                               sizeW: item.sizeW,
        //                               left: item.left,
        //                               top: item.top,
        //                               img: sum
        //                              })
          devices = JSON.stringify(devices)
          
          let details = JSON.stringify([background, devices, blockPlus]);

          const room = await Room.create({name, details, typeRoomId});

          return res.json('Комната создалась')
        } catch (error) {
            console.log(error)

          return res.json(ApiError.internal(error))
        }
    }
    async deleteRoom(req, res){
        try {
         const {name} = req.body;

        await Room.destroy({where:{name: name},})

        return res.json('Комната удалена')
        } catch (error) {
            console.log(error)
            return res.json(ApiError.internal(error))
        }
    }

     async changesRoom(req, res){
        try {
            const {detailsRoom, name} = req.body;
            const changeRoom = await Room.update({details: detailsRoom}, {where: {name}})

            return res.json('Комната обнавлена')
        } catch (error) {
            console.log(error)
            return res.json(ApiError.internal(error))
        }
     }
     async getOneRoom(req, res){
        try {
            const id = req.path.split('api/room/').join('').split('/').join('');
            const room = await Room.findOne({
                                    where: {id: Number(id)}
                                        });
            console.log(room)
            return res.json(room)
        } catch (error) {
            console.log(error)
            return res.json(ApiError.internal(error))
        }
     }
     async getAllRoom(req, res){
        try {
            
            const rooms = await Room.findAll()

            return res.json(rooms)
        } catch (error) {
            console.log(error)
            return res.json(ApiError.internal(error))
        }
     }
     async createTypeRoom(req, res){
        try {
          const {name} = req.body;
          const room = await TypeRoom.create({name});

          return res.json('Тип комнаты создан')
        } catch (error) {
            console.log(error)

          return res.json(ApiError.internal(error))
        }
    }
    async deleteTypeRoom(req, res){
        try {
         const {name} = req.body;

        await TypeRoom.destroy({where: {name: name},})

        return res.json('Комната удалена')
        } catch (error) {
            console.log(error)
            return res.json(ApiError.internal(error))
        }
    }

     async changesTypeRoom(req, res){
        try {
            const {name, id} = req.body;
            const changeRoom = await TypeRoom.update({name}, {where: {id: id}})

            return res.json('Комната обнавлена')
        } catch (error) {
            console.log(error)
            return res.json(ApiError.internal(error))
        }
     }
     async getAllTypeRoom(req, res){
        try {
            
            const types = await TypeRoom.findAll()
            console.log(types)
            return res.json(types)
        } catch (error) {
            console.log(error)
            return res.json(ApiError.internal(error))
        }
     }
}

module.exports = new RoomController();