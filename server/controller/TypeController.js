const ApiError = require('../error/ApiError');
const {Type, Basket} = require('../models/models');


class TypeController{
    async create(req, res){
     try {

        const {name} = req.body;
        const type = await Type.create({name});
        
       return res.json(type)

     } catch (error) {
           console.log(error)
        return res.json(ApiError.internal('Такой тип уже существует'))
         
     }
    }

    async getAll(req, res){
        const types = await Type.findAll().catch(rej=> console.log(rej));
        
        return res.json(types)
    }

    async deleteType(req, res){
      try {
        const {name} = req.body;
        
        await Type.destroy({ where: {name: name}});
  
          return res.json('Тип товара успешно удален')

      } catch (error) {
        return res.json(error)
      }
      
    }
    async changesType(req, res){
        try {
          const {name} = req.body;
           await Type.update({name}, {where: {name}});
    
          return res.json('тип измененн')
        } catch (error) {
          console.log(error)
          return res.json(error)
        }
  
}
}

module.exports = new TypeController()