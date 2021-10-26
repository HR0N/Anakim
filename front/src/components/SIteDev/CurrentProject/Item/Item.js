import {connect} from "react-redux";
import {Component} from "react";
import './Item.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faLevelDownAlt, faPlus} from "@fortawesome/free-solid-svg-icons";
import {
    change_cur_item,
    change_cur_project,
    destroy_sub_item,
    set_sub_item_edit_value, set_sub_item_finished
} from "../../../../redux/actions/SiteDev";
import {store} from "../../../../index";
import {faCircle} from "@fortawesome/fontawesome-free-regular";

class Item extends Component{
    state = {
        show: false,
    };

    delete_sub_item(id){
        let result = window.confirm('Удалить задачу?');
        if(result){
            this.props.rDestroySubItem(id, this.props.cur_project_id);
        }
    }
    how_many_sub_items_there(){
        if(this.props.sub_items){
            return this.props.sub_items.filter((value) => {
                if(value.item === this.props.index){return value}
            });
        }else{return false}
    }
    render_finish_indicator(){
        let finished_sub_items_count = 0;
        if(this.props.sub_items){
            let cur_sub_items = this.how_many_sub_items_there();
            cur_sub_items.map((val) => {
                if(val.finished === 1){return finished_sub_items_count = finished_sub_items_count + 1;}
            });
            if(finished_sub_items_count === cur_sub_items.length && cur_sub_items.length > 0){return 'finished_true'}
            else{return 'finished_false'}
        }
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {this.forceUpdate()});

    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render_sub_items(){
        return this.props.sub_items.map((val, index) => {
            if(this.props.index === val.item){
                return (
                    <li
                        key={index}
                        data-id={val.id}
                    >{val.text}
                    <div className="buttons">
                        <div className="buttons__toggle">
                            <FontAwesomeIcon
                                onClick={() => {
                                    let data = {finished: !val.finished};
                                    this.props.rSetSubItemFinished(val.id, this.props.cur_project_id, data);
                                }}
                                icon={val.finished ? faCheckCircle : faCircle} />
                            <div className="btn btn-outline-dark"
                                onClick={() => {
                                    this.props.toggleEditSubItem();
                                    let data = {id: val.id, text: val.text};
                                    this.props.rChangeCurProject(this.props.cur_project_id);
                                    this.props.rSetSubItemEditValue(data);
                                }}
                            >Edit</div>
                            <div className="btn btn-outline-dark"
                                onClick={() => {this.delete_sub_item(val.id)}}
                            >Delete</div>
                        </div>
                        <div className={`finished ${val.finished ? 'finished_true' : 'finished_false'}`}> </div>
                    </div>
                    </li>
                );
            }
        });
    }


    render() {
        return (
            <li
                className={`Item ${this.state.show ? ' show_item ' : ''}`}
            ><span
                className={'container'}
                onClick={() => {
                    this.setState({show: !this.state.show});
                }}
            >{this.props.main_item}
                {this.how_many_sub_items_there().length > 0
                    ? <FontAwesomeIcon className={'list_indicator'} icon={faLevelDownAlt} />
                    : false}

                <div className="buttons">
                    <div className="btn btn-outline-dark"
                         onClick={() => {
                             this.props.addSubItem();
                             this.props.change_cur_item(this.props.index);
                             this.props.rChangeCurProject(this.props.cur_project_id);
                         }}
                    ><FontAwesomeIcon icon={faPlus}/></div>
                </div>
                    <div className={`finished ${this.render_finish_indicator()}`}> </div>
            </span>
                <ol className={'Item_sub'}>
                    {this.props.sub_items
                    ? this.render_sub_items() : false}
                </ol>

            </li>
        );
    }
}




function mapStateToProps(state) {
    return {
        sub_items: state.SiteDevReducer.sub_items,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        change_cur_item: (id) => {dispatch(change_cur_item(id))},
        rChangeCurProject: (id) => {dispatch(change_cur_project(id))},
        rDestroySubItem: (id, project) => {dispatch(destroy_sub_item(id, project))},
        rSetSubItemEditValue: (value) => {dispatch(set_sub_item_edit_value(value))},
        rSetSubItemFinished: (id, project, data) => {dispatch(set_sub_item_finished(id, project, data))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item);
