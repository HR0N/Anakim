import {GET_PROJECTS} from "../actions/actionTypes";


const initialState = {
    projects: null,
};

export default function SiteDevReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS: return {...state, projects: action.payload};
        default: return state;
    }
}