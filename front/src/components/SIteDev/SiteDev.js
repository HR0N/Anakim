import './SiteDev.scss';
import {connect} from "react-redux";
import React, {Component} from "react";
import ProjectList from "./ProjectList/ProjectList";

class SiteDev extends Component{
    state = {
        show_project: false,
        add_project: false,
        title: 'Project List',
        project_name: '_example',
        projects: null,
    };
    componentDidMount() {
    }

    set_title(title) {
        this.setState({title})
    }

    render() {
        return (
            <div className={'SiteDev'}>
                <p className={'title'}
                >{this.state.title}</p>
                <ProjectList
                    add_project={this.state.add_project}
                    click={() => {
                        this.setState({add_project: !this.state.add_project});
                        this.set_title('Add Project');
                    }}
                    click2={() => {
                        this.setState({add_project: !this.state.add_project});
                        this.set_title('Project List');
                    }}
                />
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
