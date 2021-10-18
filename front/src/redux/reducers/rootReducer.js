import {combineReducers} from "redux";
import appReducer from "./App";
import Header from "./Header";
import mPlayer from "./mPlayer"
import SiteDevReducer from "./SiteDev";

export default combineReducers({
    app: appReducer,
    header: Header,
    mPlayer,
    SiteDevReducer,

});
