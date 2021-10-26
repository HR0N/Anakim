import './SiteDev.scss';
import {connect} from "react-redux";
import React, {Component} from "react";
import ProjectList from "./ProjectList/ProjectList";
import CurrentProject from "./CurrentProject/CurrentProject";
import AddSubItem from "./AddSubItem/AddSubItem";
import EditSubItem from "./EditSubItem/EditSubItem";

const titles = {
    show_project: '',
};

class SiteDev extends Component{
    state = {
        show_project: false,
        add_project: false,
        current_project: false,
        add_sub_item: false,
        edit_sub_item: false,
        cur_project_id: null,
        cur_item_id: null,
        title: 'Project List',
        project_name: '_example',
        projects: null,
    };

    componentDidMount() {
    }

    change_title(title){
        this.setState({title})
    }

    render() {
        return (
            <div className={'SiteDev'}>
                <div className="less300">
                    <p className={'title'}
                    >{this.state.title}</p>
                    {this.state.cur_project_id === null
                        ? <ProjectList
                            add_project={this.state.add_project}
                            toggleAddProject={() => {
                                this.setState({add_project: !this.state.add_project});
                            }}
                            toggleCurrentProject={() => {this.setState({current_project: true})}}
                            setCurProjId={(id) => {this.setState({cur_project_id: id});}}
                        /> : false}
                </div>
                <div className="more300">
                    {this.state.current_project && this.state.cur_project_id !== null
                        ? <CurrentProject
                            setTitle={(title) => {this.change_title(title)}}
                            cur_project_id={this.state.cur_project_id}
                            addSubItem={() => {
                                this.setState({add_sub_item: !this.state.add_sub_item});
                                this.setState({current_project: !this.state.current_project});
                            }}
                            toggleCurrentProject={() => {this.setState({current_project: !this.state.current_project})}}
                            toggleEditSubItem={() => {
                                this.setState({edit_sub_item: !this.state.edit_sub_item});
                                this.setState({current_project: !this.state.current_project});
                            }}
                            back={() => {
                                this.setState({cur_project_id: null});
                                this.change_title('Project List');
                            }}
                    /> : false}
                    {this.state.add_sub_item
                        ? <AddSubItem
                            cur_project={this.state.cur_project_id}
                            returnToCurrentProject={() => {
                                this.setState({add_sub_item: !this.state.add_sub_item});
                                this.setState({current_project: !this.state.current_project});
                            }}
                    /> : false}
                    {this.state.edit_sub_item
                    ? <EditSubItem
                        back={() => {this.setState({
                            edit_sub_item: false,
                            current_project: true,
                        })}}
                        /> : false}
                </div>
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SiteDev);
