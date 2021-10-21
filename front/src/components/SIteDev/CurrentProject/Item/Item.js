import {connect} from "react-redux";
import {Component} from "react";
import './Item.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

class Item extends Component{
    state = {
        show: false,
    };
    render_sub_items(){}

    render() {
        return (
            <li
                className={`Item ${this.state.show ? ' show_item ' : ''}`}
            ><span
                onClick={() => {
                    this.setState({show: !this.state.show});
                    this.props.addSubItem();
                }}
            >{this.props.main_item}
                <div className="buttons">
                    <div className="btn btn-outline-dark"><FontAwesomeIcon icon={faPlus} /></div>
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
    };
}
function mapDispatchToProps(dispatch) {
    return {
        EXAMPLE: () => {dispatch({type: 'EXAMPLE'})},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item);
