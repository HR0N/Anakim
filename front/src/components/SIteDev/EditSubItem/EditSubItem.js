import './EditSubItem.scss';
import {connect} from "react-redux";
import {Component} from "react";
import {edit_sub_item} from "../../../redux/actions/SiteDev";

class EditSubItem extends Component{

    state = {
        input: '',
    };
    changeInputHandler(e){
        this.setState({input: e.target.value});
    }
    load_sub_item_edit_value(){
        if(this.props.sub_item_edit_value.text.length > 1){
            this.setState({input: this.props.sub_item_edit_value.text});
        }
    }
    componentDidMount() {
        this.load_sub_item_edit_value();
    }
    edit_sub_item(){
        let result = window.confirm('Изменить задачу?');
        let data = {text: this.state.input};
        if(result){
            this.props.rEditSubItem(this.props.sub_item_edit_value.id, this.props.current_project_id, data);
        }
    }

    render() {
        return (
            <div className={'EditSubItem'}>
                <input type="text"
                       className={'form-control'}
                       autoFocus={true}
                       value={this.state.input}
                onChange={(e) => {this.changeInputHandler(e)}}
                />
                <div className="buttons">
                    <div className="btn btn-outline-dark"
                    onClick={() => {this.props.back();}}
                    >Back</div>
                    <div className="btn btn-outline-dark"
                        onClick={() => {
                            this.edit_sub_item();
                            this.props.back();
                        }}
                    >Edit</div>
                </div>
            </div>
        );
    }
}




function mapStateToProps(state) {
    return {
        sub_item_edit_value: state.SiteDevReducer.sub_item_edit_value,
        current_project_id: state.SiteDevReducer.cur_project_id,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        rEditSubItem: (id, project, data) => {dispatch(edit_sub_item(id, project, data))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditSubItem);
