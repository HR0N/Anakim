import './CurrentProject.scss';
import {connect} from "react-redux";
import {Component} from "react";

class CurrentProject extends Component{

    render() {
        return (
            <div className={'CurrentProject'}>
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
export default connect(mapStateToProps, mapDispatchToProps)(CurrentProject);
