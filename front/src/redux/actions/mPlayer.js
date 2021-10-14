import {GET_MUSIC_PLAYLIST, PLAY_FROM_PLAYLIST} from "./actionTypes";
// import {store as Store} from "../../index";
// function store() {return Store.getState().mPlayer}
import apiClient from "../../services/api";
import axios from "axios";

export function toggle_play(play) {
    let payload = !play;
    return {type: PLAY_FROM_PLAYLIST, payload};
}


export function fetch_music(){
    return async dispatch => {
        try{
            const response = await apiClient
                .get("api/get_music");
            dispatch(get_music(response.data))
        }
        catch(e){console.log(e)}
    }
}
function get_music(payload){
    return {type: GET_MUSIC_PLAYLIST, payload}
}