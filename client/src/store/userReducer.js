const defaultState = {
    isAuth: false,
    user: {
        email: null,
        role: null, 
        userId: null,
        name: null
    }
};

export const userReducer = (state = defaultState, action) =>{
    switch (action.type) {
        case "LOGGED_IN":
          return  {...state, isAuth: action.payload.isAuth, user: action.payload.user}
        case "NOT_LOGGED_IN":
          return {...state, isAuth: false, user:{ email: null, role: null}}
        
        default:
            return state
    }
};

