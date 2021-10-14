import {} from "../actions/actionTypes";
import {GET_MUSIC_PLAYLIST, PLAY_FROM_PLAYLIST} from "../actions/actionTypes";

function compare(array) {
    Object.keys(array).map((key) => {
        return array[key].playlist.sort((a, b) => {
            return parseInt(a.order) - parseInt(b.order);
        });
    });
}
function deploy(payload) {
    payload.map((val, idx) => {
        delete val['created_at'];
        delete val['updated_at'];
        switch (val['album']) {
            case 'EasyMusic': return  initialState.playlist[val.album].playlist.push(val);
            case 'Background': return  initialState.playlist[val.album].playlist.push(val);
            case 'Eminem': return  initialState.playlist[val.album].playlist.push(val);
            case 'Lineage': return  initialState.playlist[val.album].playlist.push(val);
            case 'Fast': return  initialState.playlist[val.album].playlist.push(val);
            case 'KillingFloor': return  initialState.playlist[val.album].playlist.push(val);
            default: return true;
        }
    });
    compare(initialState.playlist);
}

const initialState = {
    play_music: false,
    playlist: {
        EasyMusic: {description: 'Спокойная', playlist: []},
        Lineage: {description: 'Lineage', playlist: []},
        Eminem: {description: 'Eminem', playlist: []},
        Background: {description: 'Фоновая', playlist: []},
        Fast: {description: 'Быстрая', playlist: []},
        KillingFloor: {description: 'Музыка для Killing Floor', playlist: []},
    },
    music_loaded: null,
};
export default function headerReducer(state = initialState, action) {
    switch (action.type) {
        case PLAY_FROM_PLAYLIST: return {...state, play_music: action.payload};
        case GET_MUSIC_PLAYLIST: deploy(action.payload); return {...state, music_loaded: true};
        default: return state;
    }
}