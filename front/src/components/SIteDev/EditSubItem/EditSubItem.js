import './EditSubItem.scss';
import {connect} from "react-redux";
import {Component} from "react";

class EditSubItem extends Component{

    render() {
        return (
            <div className={'EditSubItem'}>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditSubItem);
