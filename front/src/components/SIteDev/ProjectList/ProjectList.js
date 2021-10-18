import './ProjectList.scss';
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from "react";
import apiClient from "../../../services/api";
import AddProject from "../AddProject/AddProject";
import {add_project, fetch_projects} from "../../../redux/actions/SiteDev";
import {store} from "../../../index";



class ProjectList extends Component{
    state = {
        project_list: null,
        update: false,
    };

    /*get_project_list(){
        apiClient.get('api/show_all_projects')
            .then((res) => {this.setState({project_list: res.data});})
            .catch(err => console.error(err.response.data));
    }*/
    render_project_list(){
        // let array = this.state.project_list;
        return Object.keys(this.props.projects).map((key) => {
            return (<li key={key} data-id={this.props.projects[key].id}>{this.props.projects[key].title}</li>);
        });
    }

    componentDidMount() {
        // this.get_project_list();
        this.unsubscribe = store.subscribe(() => {this.forceUpdate()});
        this.props.fetch_projects();
        setTimeout(() => {console.log('pr', this.props.projects);}, 2000);
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div className={'ProjectList'}>
                <ul>
                    {this.props.add_project
                        ? <AddProject
                            click2={(data) => {
                                // this.get_project_list();
                                this.props.click2();
                                this.props.addProject(data);
                            }}
                        />
                        : ''}
                    {this.props.add_project ? '' : <li
                        onClick={this.props.click}
                    ><FontAwesomeIcon icon={faPlus}/> Add</li>}
                    {/*{this.state.project_list != null && !this.props.add_project ? this.render_project_list() : ''}*/}
                    {this.props.projects != null && !this.props.add_project ? this.render_project_list() : ''}
                </ul>
            </div>
        );
    }
}




function mapStateToProps(state) {
    return {
        projects: state.SiteDevReducer.projects,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        fetch_projects: () => {dispatch(fetch_projects())},
        addProject: (data) => {dispatch(add_project(data))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
