
const defaulteState = {
    rooms: [],
    typeRoom: [],
    showTheRoom: 1
};

export const RoomReducer = (state = defaulteState, action) =>{
     switch (action.type) {
        case 'ADD__ROOMS':
            return {...state, rooms: action.payloade}
           
        case 'ADD__TYPE__ROOMS':
           return {...state, typeRoom: action.payloade}
            
        case 'SHOW__ROOM':
           return {...state, showTheRoom: action.payloade}
       
     
        default:
           return state
            
     }
}
