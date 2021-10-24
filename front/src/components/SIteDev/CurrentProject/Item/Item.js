import {connect} from "react-redux";
import {Component} from "react";
import './Item.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {change_cur_item, change_cur_project, destroy_sub_item} from "../../../../redux/actions/SiteDev";
import {store} from "../../../../index";

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
                            <div className="btn btn-outline-dark"

                            >Edit</div>
                            <div className="btn btn-outline-dark"
                                onClick={() => {this.delete_sub_item(val.id)}}
                            >Delete</div>
                        </div>
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
                <div className="buttons">
                    <div className="btn btn-outline-dark"
                         onClick={() => {
                             this.props.addSubItem();
                             this.props.change_cur_item(this.props.index);
                             this.props.change_cur_project(this.props.cur_project_id);
                         }}
                    ><FontAwesomeIcon icon={faPlus}/></div>
                </div>
            </span>
                <ol className={'Item_sub'}>
                    {this.props.sub_items
                    ? this.render_sub_items() : false}
                    {/*<li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                    <li>Four</li>
                    <li>Five</li>
                    <li>Six</li>
                    <li>Seven</li>*/}
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
        change_cur_project: (id) => {dispatch(change_cur_project(id))},
        rDestroySubItem: (id, project) => {dispatch(destroy_sub_item(id, project))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item);
