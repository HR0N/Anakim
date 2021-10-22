import {CHANGE_CUR_ITEM, CHANGE_CUR_PROJECT, GET_PROJECTS, GET_SUB_ITEMS} from "../actions/actionTypes";


const initialState = {
    projects: null,
    cur_project_id: null,
    cur_item: null,
    sub_items: null,
};

export default function SiteDevReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS: return {...state, projects: action.payload};
        case GET_SUB_ITEMS: return {...state, sub_items: action.payload};
        case CHANGE_CUR_PROJECT: return {...state, cur_project_id: action.payload};
        case CHANGE_CUR_ITEM: return {...state, cur_item: action.payload};
        default: return state;
    }
}