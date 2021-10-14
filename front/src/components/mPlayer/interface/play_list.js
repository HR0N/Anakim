import React, {useState} from 'react';
import '../interface/interface.scss';
import {faCaretSquareRight, faMusic, faWrench} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import apiClient from "../../../services/api";

const PlayList = props => {
    const [album_icon, set_icon] = useState(true);
    const [show_tracks, set_track] = useState(true);
    const [lises] = useState(document.getElementsByClassName('sound'));
    const [music_list, set_music_list] = useState(props.playlist);
    let [render, set_render] = useState(false);
    let [first_el, set_el] = useState(null);

    const toggle_cursor = () => {
        Object.keys(lises).map((key) => {
            props.settings ? lises[key].style.cursor = 'move' : lises[key].style.cursor = 'pointer';
            props.settings ? lises[key].draggable = true : lises[key].draggable = false;
            return key;
        });
    };
    toggle_cursor();
    function compare(array) {
        Object.keys(array).map((key) => {
            return array[key].playlist.sort((a, b) => {
                return parseInt(a.order) - parseInt(b.order);
            });
        });
    }

    function drag_start(e, val){
        if(props.settings){set_el(val);}
    }
    function drag_over(e) {
        if(props.settings){
            e.preventDefault();
            if(!(e.target.className.indexOf('drag_over') !== -1)){
                e.target.className = e.target.className + 'drag_over';
            }
        }
    }
    function drag_end(e) {
        if(props.settings){
            if((e.target.className.indexOf('drag_over') !== -1)){
                e.target.className = e.target.className.replace('drag_over', '');
            }
        }
    }
    function drop(e, val){
        if(props.settings){
            e.preventDefault();
            if((e.target.className.indexOf('drag_over') !== -1)){
                e.target.className = e.target.className.replace('drag_over', '');
            }
            recalculate_orders(val);
            set_render(!render);
        }
    }
    function recalculate_orders(drop_val) {
        let cur_playlist = props.playlist[props.cur_album].playlist;
        let remember2 = drop_val.order;
        if(first_el.order < drop_val.order){
            cur_playlist.map(val => {
                if(val.id === first_el.id){val.order = drop_val.order}
                if(val.order <= drop_val.order && val.order !== 0 && val.id !== first_el.id){val.order = val.order - 1}
                return val;
            });
        }
        else if(first_el.order > drop_val.order){
            cur_playlist.map(val => {
                // if(val.id === first_el.id){val.order = remember2}
                if(val.order >= remember2 && val.order !== cur_playlist.length - 1
                    && val.id !== first_el.id && val.order < first_el.order){val.order = val.order + 1}
                if(val.id === first_el.id){val.order = remember2}
                return val;
            });
        }
        if(first_el.order < drop_val.order){}
        cur_playlist.map((val) => {

            return val;
        });
        // console.log(music_list[props.cur_album].playlist.map((val) => {return val.order}));
        compare(props.playlist);
        set_music_list(props.playlist);
        compare_playlist();
    }
    function compare_playlist(){
        // console.log('start request');
        let data = music_list[props.cur_album].playlist;
        apiClient.put(`api/update_music_list_array`, data)
            .then((response) => {
                // console.log('res:', response);
            });
    }
    const get_album_list = () => {
        return Object.keys(props.playlist).map((key, index) => {
            return (
                <li
                    onClick={() => {props.Change_Album(key); set_track(!show_tracks); set_icon(!album_icon)}}
                    key={index}>{props.playlist[key].description}</li>
            );
        });
    };
    const get_play_list = () => {
        return music_list[props.cur_album].playlist.map((val, idx) => {
            return (
                <li
                    onClick={(e) => {props.Play_clicked_Sound(val.order); props.enable_play_music();
                        drag_start(e, val); drop(e, val);
                    }}
                    // className={`sound ${props.cur_count === idx ? 'active_track' : ''}`}
                    className={`sound ${props.curSound_order === val.order ? 'active_track' : ''}`}
                    key={idx}
                    onDragOver={(e) => {drag_over(e)}}
                    onDragEnd={(e) => {drag_end(e)}}
                    onDragLeave={(e) => {drag_end(e)}}
                    onDragStart={(e) => {drag_start(e, val)}}
                    onDrop={(e) => {drop(e, val)}}
                >{val.title}</li>
            );
        });
    };
    return(
    <div className='PlayList'>
        <div className="title"
             onClick={() => {set_track(!show_tracks); set_icon(!album_icon)}}
        >
            <FontAwesomeIcon icon={!album_icon ? faCaretSquareRight : faMusic}/> {
            !album_icon
            ? 'Albums'
            : ` ${props.playlist[props.cur_album].description}`
        }
        </div>
        {album_icon ?
            <div className={`playlist_settings ${props.settings ? 'settings_active' : ''}`}>
                <FontAwesomeIcon onClick={() => {props.Toggle_settings()}} icon={faWrench}/>
            </div>
            : false}
            <ul className={'playlist__ul'}>
                {show_tracks
                    ? get_play_list()
                : get_album_list()}
            </ul>
    </div>
    );
};

export default PlayList;