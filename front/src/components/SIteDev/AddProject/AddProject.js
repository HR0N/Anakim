import React, {useState} from 'react';
import './AddProject.scss';
import apiClient from "../../../services/api";

const AddProject = props => {

    const [project_name, set_project_name] = useState(null);
    function changeHandler(e){
        set_project_name(e.target.value);
    }
    function submitHandler(e){
        props.click2();
        let data = {
            title: project_name,
            user: 'Hron.',
        };
        apiClient.post('api/site_dev_create_project', data)
            .then(/*res => console.log(res)*/)
            .catch(err => console.error(err.response.data));
    }
    return(
    <div className='AddProject'>
        <input className={'form-control'} type="text" placeholder={'project name'}
        onChange={changeHandler.bind(this)}
        />
        <div className="btn btn-outline-success"
        onClick={submitHandler.bind(this)}
        >Add</div>
    </div>
    );
};

export default AddProject;