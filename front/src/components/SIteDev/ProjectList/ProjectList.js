import './ProjectList.scss';
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from "react";
import apiClient from "../../../services/api";
import AddProject from "../AddProject/AddProject";

class ProjectList extends Component{
    state = {
        project_list: null,
        update: false,
    };

    get_project_list(){
        apiClient.get('api/show_all_projects')
            .then((res) => {this.setState({project_list: res.data});})
            .catch(err => console.error(err.response.data));
    }
    render_project_list(){
        let array = this.state.project_list;
        return Object.keys(array).map((key) => {
            return (<li key={key} data-id={array[key].id}>{array[key].title}</li>);
        });
    }

    componentDidMount() {
        this.get_project_list();
        // setTimeout(() => {this.render_project_list()}, 1000);
    }

    render() {
        return (
            <div className={'ProjectList'}>
                <ul>
                    {this.props.add_project
                        ? <AddProject
                            click2={() => {
                                this.get_project_list();
                                this.props.click2();
                            }}
                        />
                        : ''}
                    {this.props.add_project ? '' : <li
                        onClick={this.props.click}
                    ><FontAwesomeIcon icon={faPlus}/> Add</li>}
                    {this.state.project_list != null && !this.props.add_project ? this.render_project_list() : ''}
                </ul>
            </div>
        );
    }
}




function mapStateToProps(state) {
    return {
    };
}
function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
