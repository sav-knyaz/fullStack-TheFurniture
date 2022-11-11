const ApiError = require("../error/ApiError");
const { Basket, BasketDevice } = require("../models/models");


class BasketController{

    async getAll(req, res){
        try {
            const {basketId} = req.params;
            const devices = await BasketDevice.findAll();
            const basket = devices.filter(item => item.basketId == basketId);

           return res.json(basket)
        } catch (error) {
            return res.json(error)
        }
        

    }


    async removeFromCart(req, res){
            try {
                const {basketId, deviceId} = req.body;
                const devices = await BasketDevice.findAll({where:{basketId, deviceId}},);
                  console.log(devices)
                await BasketDevice.destroy({where: {id: devices[0].id}},).catch(er => console.log(er))
        
               return res.json('delete')

            } catch (error) {

                 console.log(error)

             return res.json(ApiError.badRequest(error.messeg));

            }
    }

    async removeFromCartDevice(req, res){
        try {
            const {basketId, deviceId} = req.body;
            
            await BasketDevice.destroy({where:{basketId, deviceId}},)
    
           return res.json('delete')

        } catch (error) {

             console.log(error)

         return res.json(ApiError.badRequest(error.messeg));

        }
}
}

module.exports = new BasketController();
