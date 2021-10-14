import React from 'react';
import './dropdown_menu.scss';
import {NavLink} from "react-router-dom";

const DropdownMenu = props => {
/* todo: ............................:::::::::::::::::: FUNCTIONS ::::::::::::::::::::::::::::....................*/
    function render_links (){
        return props.props.map((li, idx) => {
            return (
                <li key={idx}
                    className={'dropdown_link'}
                ><NavLink to={li.to} exact={li.exact}>{li.label}</NavLink>
                </li>
            );
        });
    };
/* todo: ............................:::::::::::::::::::: RENDER :::::::::::::::::::::::::::::....................*/
    return(
    <ul className='dropdown_menu'
    >{render_links()}
    </ul>
    );
};

export default DropdownMenu;