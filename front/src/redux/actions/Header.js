import {HIDE_ALL_DROPDOWN, DROPDOWN_TOGGLE, ACCORDION_TOGGLE} from "./actionTypes";
import {store} from "../../index";

function Store() {return store.getState().header}

export function dropdown_toggle(e, iLabel){
    let links = Store() .links;
    links.map((el, idx) => {
        if(el.label === iLabel){return el.dropdown_show = !el.dropdown_show}
        else if(el.label !== iLabel){return el.dropdown_show = false}else{return null}
    });
    return {type: DROPDOWN_TOGGLE, links};
}

export function hide_all_dropdown(e) {
    let links = Store().links;
    if(!(e.target.hasAttribute('data-href'))){
        links.map((el, idx) => {
            return el.dropdown_show = false;
        });
    }
    return {type: HIDE_ALL_DROPDOWN, links};
}

export function accordion_toggle() {
    let accordion_mobile_show = !Store().accordion_mobile_show;
    return {type: ACCORDION_TOGGLE, accordion_mobile_show};
}