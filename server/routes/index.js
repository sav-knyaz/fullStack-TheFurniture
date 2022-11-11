const Router = require('express').Router();
const router = Router;

const routes = [ {rout: './DeviceRoute', path: '/device'},
                 {rout: './TypeRoute', path: '/type'},
                 {rout: './UserRoute', path: '/user'},
                 {rout: './BasketRoute', path: '/basket'},
                 {rout: './RoomRoutes', path: '/room'} ];


routes.forEach(({rout, path}) => {
   
    router.use(path, require(rout))    
    
})

module.exports = router