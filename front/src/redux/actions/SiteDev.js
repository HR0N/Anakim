import {GET_PROJECTS} from "./actionTypes";
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