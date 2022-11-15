import { combineReducers, createStore } from "redux";
import { DeviceReducer } from "./deviceReducer";
import { RoomReducer } from "./roomReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    device: DeviceReducer,
    room: RoomReducer
});

export const store = createStore(rootReducer)