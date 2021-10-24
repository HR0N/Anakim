import {CHANGE_CUR_ITEM, CHANGE_CUR_PROJECT, GET_PROJECTS, GET_SUB_ITEMS} from "./actionTypes";
import apiClient from "../../services/api";



export function fetch_projects(){
    return async dispatch => {
        try{
            const response = await apiClient
                .get("api/show_all_projects");
            dispatch(get_projects(response.data));
        }
        catch(e){console.log(e)}
    }
}
function get_projects(payload){
    return {type: GET_PROJECTS, payload}
}
export function add_project(data){
    return async dispatch => {
        try{
            await apiClient
                .post('api/site_dev_create_project', data)
                .then(/*res => console.log(res)*/)
                .catch(err => console.error(err.response.data));
            dispatch(fetch_projects());
        }
        catch(e){console.log(e)}
    };
}
export function change_cur_project(payload) {
    return {type: CHANGE_CUR_PROJECT, payload};
}
export function change_cur_item(payload) {
    return {type: CHANGE_CUR_ITEM, payload};
}
export function add_sub_item(data) {
    return async dispatch => {
        try{
            await apiClient
                .post('api/site_dev_create_sub_item', data)
                .then(/*res => console.log(res)*/)
                .catch(err => console.error(err.response.data));
            dispatch(fetch_sub_items(data.project));
        }
        catch(e){console.log(e)}
    };
}
export function fetch_sub_items(id){
    return async dispatch => {
        try{
            const response = await apiClient
                .get("api/show_all_sub_items/"+id);
            dispatch(get_sub_items(response.data));
        }
        catch(e){console.log(e)}
    }
}
export function get_sub_items(payload) {
    return {type: GET_SUB_ITEMS, payload}
}
export function destroy_project(id) {
    return async dispatch => {
        try{
            await apiClient
                .post('api/site_dev_destroy/'+id)
                .then(/*res => console.log(res)*/)
                .catch(err => console.error(err.response.data));
            dispatch(fetch_projects());
        }
        catch(e){console.log(e)}
    };
}
export function destroy_sub_item(id, project) {
    return async dispatch => {
        try{
            await apiClient
                .post('api/site_dev_destroy_sub_item/'+id)
                .then(/*res => console.log(res)*/)
                .catch(err => console.error(err.response.data));
            dispatch(fetch_sub_items(project));
        }
        catch(e){console.log(e)}
    };
}