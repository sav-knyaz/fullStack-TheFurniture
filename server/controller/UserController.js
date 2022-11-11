
const {User, Basket} = require('../models/models');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
  return jwt.sign(
      {id, email, role},
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
  )
}

class UserController {
  
  async registration(req, res, next) {
    try {
        const {email, password, role, name} = req.body
        if (!email || !password) {
            return next(res.json(ApiError.badRequest('Некорректный email или password')))
        }
        const candidate = await User.findOne({where: {email}});
      
       
        if (candidate) {
            return next(res.json(ApiError.badRequest('Пользователь с таким email уже существует')))
        }
  
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, role, name, password: hashPassword});
        const basket = await Basket.create({userId: user.id});
        const token = generateJwt(user.id, user.email, user.role, user.name);
  
        return res.json(token)
     } catch (error) {
        return console.log(error)
     }
     
  }
    async login(req, res, next){
        const {password, email} = req.body;
        const user = await User.findOne({where: {email: email}});
        if(!user){
           res.json(ApiError.internal('Пользователь с таким именем не найден'))
           
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword){
           res.json(ApiError.internal('Неверный пароль.'))
           
        }
        const token = generateJwt( user.id, user.email, user.role);

        return res.json(token)
    }
    async check(req, res){
   return res.json('ALL WAORKING!!!')
    }
    async getOneUser(req, res) {
      try{
        const {id} = req.body
        const user = await User.findOne({where: {id: id}})
     
        return res.json(user.name)
      }catch(error) {
        console.log(error)
      }
    }
}

module.exports = new UserController()