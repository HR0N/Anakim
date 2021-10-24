import './AddSubItem.scss';
import {connect} from "react-redux";
import {Component} from "react";
import {add_sub_item} from "../../../redux/actions/SiteDev";

class AddSubItem extends Component{
    state = {
        input: null,
    };
    inputHandler(e){
        this.setState({input: e.target.value})
    }
    sendRequest(){
        let data = {
            project: this.props.cur_project,
            item: this.props.cur_item,
            text: this.state.input,
            finished: false,
        };
        this.props.rAddSubItem(data);
    }

    render() {
        return (
            <div className={'AddSubItem'}>
                <input
                    className={'form-control'}
                    type="text"
                    placeholder={'Новый пункт'}
                    autoFocus={true}
                    onChange={this.inputHandler.bind(this)}
                />
                <div className="buttons">
                    <div className="btn btn-outline-dark"
                         onClick={() => {this.props.returnToCurrentProject()}}
                    >Назад</div>
                    <div className="btn btn-outline-success"
                         onClick={() => {
                             this.sendRequest();
                             this.props.returnToCurrentProject();
                         }}
                    >Добавить</div>
                </div>
            </div>
        );
    }
}




function mapStateToProps(state) {
    return {
        cur_item: state.SiteDevReducer.cur_item,
        // cur_project: state.SiteDevReducer.cur_project_id,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        rAddSubItem: (data) => {dispatch(add_sub_item(data))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddSubItem);
