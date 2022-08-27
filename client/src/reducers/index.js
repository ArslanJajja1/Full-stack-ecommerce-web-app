import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";

const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
});

export default rootReducer;
