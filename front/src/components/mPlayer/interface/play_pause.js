import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-svg-core';
import {faPlayCircle, faPauseCircle, faBackward, faForward} from "@fortawesome/free-solid-svg-icons";
import {} from "../../../redux/actions/mPlayer";

const PlayPause = props => {
    return(
        <div className={'player_interface'}>
            <button
                className={'play_btn play_prev'}
                onClick={() => {props.SwitchSound(-1)}}
                >
                <FontAwesomeIcon
                    icon={faBackward} />
            </button>
            <button
                className={'play_btn play_pause'}
                onClick={() => {if(!props.settings || props.PlayMusic){props.OnClick()}}}>
                <FontAwesomeIcon
                    icon={(props.PlayMusic ?  faPauseCircle : faPlayCircle)} />
            </button>
            <button
                className={'play_btn play_next'}
                onClick={() => {props.SwitchSound(1)}}
            >
                <FontAwesomeIcon
                    icon={faForward} />
            </button>
        </div>
    );
};

export default PlayPause;