import {connect} from "react-redux";
import {Component} from "react";
import './Item.scss'

class Item extends Component{
    state = {
        show: false,
    };

    render() {
        return (
            <li
                className={`Item ${this.state.show ? ' show_item ' : ''}`}
            ><span
                onClick={() => {this.setState({show: !this.state.show}); console.log(this.state.show);}}
            >{this.props.main_item}</span>
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
