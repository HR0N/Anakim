import './AddSubItem.scss';
import {connect} from "react-redux";
import {Component} from "react";

class AddSubItem extends Component{

    render() {
        return (
            <div className={'AddSubItem'}>
                <input className={'form-control'} type="text" placeholder={'Новый пункт'}/>
                <div className="buttons">
                    <div className="btn btn-outline-dark" onClick={() => {this.props.returnToCurrentProject()}}>Назад</div>
                    <div className="btn btn-outline-success">Добавить</div>
                </div>
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
