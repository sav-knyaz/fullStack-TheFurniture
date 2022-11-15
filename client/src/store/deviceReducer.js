let defaultState = {

    types: [],

    devices: [],
    filterDevice: [],
    selectedTypes: null,
    title: "",
    description: "",
    amountPages: null,
    page: 1,
    totalCount: 0,
    limit: 9,
    popUpType: false,
    popUpDevice: false

};

export const DeviceReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_TYPES":
          return { ...state, types: action.payload.map(item => item)}

        case "ADD_SELECTED_TYPES":
           return {...state, selectedTypes: action.payload}

        case "REMOVE_SELECT_TYPES":
           return {...state, selectedTypes: action.payload}

        case "ADD_DEVICES":
          return {...state, devices: action.payload.map(item => item)}
        case "ADD_PAGE":
          return {...state, page: action.payload}
        case "ADD_FILTER__DEVICES":
          return {...state, filterDevice: action.payload.map(item => item)}

        case "POP_UP_TYPE":
            return {...state, popUpType: action.payload}

        case "POP_UP_DEVICE":
            return {...state, popUpDevice: action.payload}

        default:
            return state
            
    }
};