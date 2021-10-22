import {connect} from "react-redux";
import {Component} from "react";
import './Item.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {change_cur_item, change_cur_project, fetch_sub_items} from "../../../../redux/actions/SiteDev";
import {store} from "../../../../index";

class Item extends Component{
    state = {
        show: false,
    };

    componentDidMount() {
        this.props.fetchSubItems();
        console.log(this.props.sub_items);
        // this.unsubscribe = store.subscribe(() => {this.forceUpdate(); console.log(this.props.sub_items);});
    }
    componentWillUnmount() {
        // this.unsubscribe();
    }

    render_sub_items(){}

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
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                    <li>Four</li>
                    <li>Five</li>
                    <li>Six</li>
                    <li>Seven</li>
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
        fetchSubItems: () => {dispatch(fetch_sub_items())},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item);
