import './AddSubItem.scss';
import {connect} from "react-redux";
import {Component} from "react";

class AddSubItem extends Component{

    render() {
        return (
            <div className={'AddSubItem'}>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddSubItem);
