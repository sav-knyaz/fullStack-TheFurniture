const path = require('path');
const fs = require('fs');
const pth = require('path');
const { title } = require('process');
const ApiError = require('../error/ApiError');
const {Device, Basket, DeviceInfo, BasketDevice, Rate, Commit, User} = require('../models/models');
const uuid = require('uuid');


class DeviceController{
    async creat(req, res){
       try {
            const {name, price, rate, color, material,
                   sale, percentSale, typeId, title,
                    description, specification, specDesc} = req.body;
            
            const image = req.files;
  
            let fileName = [];
            
            for (const key in image) {
                if (Object.hasOwnProperty.call(image, key)) {
                    let imgName = uuid.v4() + '.jpg';

                    image[key].mv(path.resolve(__dirname, '..', 'static', imgName))
                    fileName.push(imgName)
                }
            }
            

            const device = await Device.create({name, price, rate, color,
                                             material, sale, percentSale,
                                              img: JSON.stringify(fileName), typeId});


                
                const devInfo = await DeviceInfo.create({
                        title: title,
                        description: description,
                        deviceId: device.id,
                        specification: specification,
                        specDesc: specDesc
                    }).catch(rej => console.log(rej));
            

            return res.json('Товар создан')

        } catch (e) {
            console.log(e)
        }   
    
    }

    async delete(req, res){
        try {
            const {id, img} = req.body;

             for (const item of img) {
             fs.unlink(pth.resolve('static', item), (er)=>{ console.log(er)})
             }

             await Device.destroy({ where: {id: id}},);
            
             return res.json('Товар успешно удален')
        } catch (error) {
            console.log(error)
            return res.json(error)
        }
         
    }

    async getOne(req, res){
        try {
            const id = req.params.id    //.path.split('api/device/').join('').split('/').join('');
            const device = await Device.findOne({
                                    where: {id: Number(id)}
                                        });
            const info = await DeviceInfo.findOne({
                where: {deviceId: Number(id)}
            });
            const commits = await Commit.findAll({
                where: { deviceId: Number(id)}
            })
            let commitsWithUsername = []
            for(let item of commits){
                let commit = JSON.parse(JSON.stringify(item))
                let name = await User.findOne({where: {id: item.userId}})
                commit.userName = name.name
                commitsWithUsername = [...commitsWithUsername, commit]
            }
         
         return res.json({device, info, commit: commitsWithUsername});    
         } catch (error) {
             return console.log(error)
         }    
    }
    async getAll(req, res){
    try {
        const devices = await Device.findAll();
        // const amountPages = Math.ceil(devices.length / 8)

        // let devicesOnPage = devices.filter(item => item.id > (numberPage - 1) * 8 && item.id <= numberPage * 8);


      return res.json(devices)
    } catch (error) {
        console.log(error)
        return res.json(ApiError.badRequest(error))
    }

    }
    async searchDevice(req, res){
        try{
            const deviceName = req.params.dev
            const resultSearch = await Device.findAll({where: {name: deviceName}})

            return res.json(resultSearch)
        }catch (error){
            console.log(error)
        return res.json(ApiError.badRequest(error))
        }
    }

    async addToCart(req, res){
        try {
            const {basketId, deviceId} = req.body;

            const basket = await BasketDevice.create({deviceId, basketId});

            return res.json(basket)
        } catch (error) {
            return res.json('error')
        }
    }

    async rate(req, res){
        try {
            const {rate, deviceId, userId} = req.body;

            const userFeedback = await Rate.findOne({ where:{ userId, deviceId}},).then(res => {return res}).catch(rej => console.log(rej))
            if(userFeedback !== null){return res.json('Вы уже оценили этот товар')}

            await Rate.create({rate, deviceId, userId}).then(res => res).catch(rej => console.log(rej))

            const deviceRate = await Rate.findAll({ where:{ deviceId}},).then(res => {return res}).catch(rej => console.log(rej));
            
            let average = 0;
            
            for(let item of deviceRate){
                average += item.rate
            }

            average = Math.round(average / deviceRate.length, -1)

            const respons = await Device.update(
                {
                    rate: average
                },
                {
                    where:{
                        id: deviceId
                    }
                }
            );

            return res.json('Вы оценили товар')

        } catch (error) {
            return res.json(ApiError.badRequest('отправлены не корректные данные'))
        }
    }

    async newCommit(req, res){
        
            const {text, deviceId, userId} = req.body;
            await Commit.create({text, deviceId, userId}).catch(rej=> console.log(rej))

            return res.json('отправлен комментарий')
        
    }
    async changesDevice(req, res){
        try {const {name, price, rate, color, material,
            sale, percentSale, typeId, title,
             description, specification, specDesc} = req.body;
     

     const device = await Device.update({name, price, rate, color,
                                      material, sale, percentSale, typeId});


         
         const devInfo = await DeviceInfo.update({
                 title: title,
                 description: description,
                 deviceId: device.id,
                 specification: specification,
                 specDesc: specDesc
             }).catch(rej => console.log(rej));

            return res.json('девайс измененн')
          } catch (error) {
            console.log(error)
            return res.json(error)
          }
    
}
async changesImageDevice(req, res){
    try {
        const {name, deviceId} = req.body;
        const image = req.files;
        let device = await Device.findOne({where:{ id: deviceId}}).catch(rej=> console.log(rej));

//дописать удаление изображений с папки

        let fileName = [];

           
           for (const key in image) {
               if (Object.hasOwnProperty.call(image, key)) {
                   let imgName = uuid.v4() + '.jpg';

                   image[key].mv(path.resolve(__dirname, '..', 'static', imgName))
                   fileName.push(imgName)
               }
           }

        console.log(device)

    } catch (error) {
        console.log(error)
        return res.json(error)
    }
}

    
}

module.exports = new DeviceController();