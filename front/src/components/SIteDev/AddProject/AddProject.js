import React, {useState} from 'react';
import './AddProject.scss';

const AddProject = props => {

    const [project_name, set_project_name] = useState(null);
    function changeHandler(e){
        set_project_name(e.target.value);
    }
    function submitHandler(){
        let data = {
            title: project_name,
            user: 'Hron.',
        };
        props.toggleAddProject(data);
    }
    return(
    <div className='AddProject'>
        <input className={'form-control'} type="text" placeholder={'project name'}
        onChange={changeHandler.bind(this)}
        />
        <div className="btn btn-outline-warning"
             onClick={() => {props.back()}}
        >Back</div>
        <div className="btn btn-outline-success"
        onClick={submitHandler.bind(this)}
        >Add</div>
    </div>
    );
};

export default AddProject;