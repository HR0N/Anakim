import './SiteDev.scss';
import {connect} from "react-redux";
import React, {Component} from "react";
import ProjectList from "./ProjectList/ProjectList";
import CurrentProject from "./CurrentProject/CurrentProject";
import AddSubItem from "./AddSubItem/AddSubItem";

class SiteDev extends Component{
    state = {
        show_project: false,
        add_project: false,
        current_project: false,
        add_sub_item: false,
        cur_project_id: null,
        title: 'Project List',
        project_name: '_example',
        projects: null,
    };

    componentDidMount() {
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
                    {this.state.current_project && this.state.cur_project_id != null ? <CurrentProject
                        addSubItem={() => {
                            this.setState({add_sub_item: !this.state.add_sub_item});
                            this.setState({current_project: !this.state.current_project});

                        }}
                        toggleCurrentProject={() => {this.setState({current_project: !this.state.current_project})}}
                    /> : false}
                    {this.state.add_sub_item ? <AddSubItem
                        returnToCurrentProject={() => {
                            this.setState({add_sub_item: !this.state.add_sub_item});
                            this.setState({current_project: !this.state.current_project});
                        }}
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
