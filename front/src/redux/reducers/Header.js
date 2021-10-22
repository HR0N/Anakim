import {ACCORDION_TOGGLE, DROPDOWN_TOGGLE, HIDE_ALL_DROPDOWN} from "../actions/actionTypes";


const initialState = {
    accordion_mobile_show: false,
    links: [
        {to: '/', label: 'Home', exact: true, dropdown_show: false},
        {to: 'false', label: 'Tricks', exact: true, dropdown_show: false, props: [
                {to: '/key_code', label: 'Key code', exact: true,},
                {to: '/site_dev', label: 'Site dev', exact: true,},
            ]},
        {to: '/animal_ip', label: 'IP', exact: true, dropdown_show: false},
    ],
};

export default function headerReducer(state = initialState, action) {
    switch (action.type) {
        case DROPDOWN_TOGGLE: return {...state, links: action.links};
        case HIDE_ALL_DROPDOWN: return {...state, links: action.links};
        case ACCORDION_TOGGLE: return {...state, accordion_mobile_show: action.accordion_mobile_show};
        default: return state;
    }
}