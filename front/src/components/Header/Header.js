import React from "react";
import './Header.scss';
import {connect} from "react-redux";
import {Component} from "react";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "./dropdown_menu/Dropdown_menu";
import {accordion_toggle, dropdown_toggle} from '../../redux/actions/Header';
import {store} from "../../index";


class Header extends Component{

    render_links = () => {
        return this.props.links.map((li, idx) => {
            if(li.props){
                return (
                    <li key={idx}
                        className={'link_under_line_decoration'}
                        onClick={e => {this.props.dropdown_toggle(e, li.label);this.forceUpdate();}}
                    ><a data-href={'yes'}>{li.label}</a>
                        {(li.dropdown_show && li.props)?
                            <DropdownMenu
                                props={li.props}
                            /> : null}
                    </li>
                );
            }else{
                return (
                    <li key={idx}
                        className={'link_under_line_decoration'}
                        onClick={e => {this.props.dropdown_toggle(e, li.label);this.forceUpdate();}}
                    ><NavLink
                        to={li.to}
                        data-href={'yes'}
                        exact={li.exact}>{li.label}</NavLink>
                        {(li.dropdown_show && li.props)?
                            <DropdownMenu
                                props={li.props}
                            /> : null}
                    </li>
                );
            }
        });
    };

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {this.forceUpdate()})
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <header>
                <div className="toggle"><FontAwesomeIcon
                    onClick={() => {this.props.accordion(); this.forceUpdate()}}
                    icon={(this.props.accordion_mobile_show ? faTimes : faBars)} /></div>
               <div className={"navigation" +
               (this.props.accordion_mobile_show ? ' show_nav' : ' null')}>
                   <div className={"component brand"}><ul><li><a href="/">Brand</a></li></ul></div>
                   <div className={"component links"}>
                       <ul>
                           {this.render_links()}
                       </ul>
                   </div>
                   <div className={"component auth"}><ul><li><NavLink to={'/auth'}>Auth</NavLink></li></ul></div>
               </div>
            </header>
        );
    }
}




function mapStateToProps(state) {
    return {
        accordion_mobile_show: state.header.accordion_mobile_show,
        links: state.header.links,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dropdown_toggle: (e, iLabel) => {dispatch(dropdown_toggle(e, iLabel))},
        accordion: () => {dispatch(accordion_toggle())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
