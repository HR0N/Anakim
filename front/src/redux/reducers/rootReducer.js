import {combineReducers} from "redux";
import appReducer from "./App";
import Header from "./Header";
import mPlayer from "./mPlayer"

export default combineReducers({
    app: appReducer,
    header: Header,
    mPlayer,
});
