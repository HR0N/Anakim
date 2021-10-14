import {connect} from "react-redux";
import {Component} from "react";
import './mPlayer.scss'
import './interface/interface.scss';
import {} from "../../redux/actions/mPlayer";
import PlayPause from "./interface/play_pause";
import CurrentTime from "./interface/current_time";
import PlayList from "./interface/play_list";
import {faPlay, faWindowClose, faTasks} from "@fortawesome/free-solid-svg-icons";
import {FaBluetoothB} from "react-icons/all";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {fetch_music} from "../../redux/actions/mPlayer";
import Preloader from "../../containers/UI/preloader/preloader";


let cur_sound_order = 0;
class mPlayer extends Component{
    state = {
        player: new Audio(),
        interface: document.getElementsByClassName('mPlayer'),
        play_music: false,
        sound_counter: 0,
        auto_play_next: true,
        interval: null,
        progress_point: document.getElementsByClassName('current_point'),
        progress_point_value: null,
        sound_duration: null,
        play_delay: 2000,
        cur_track_title: null,
        cur_album: 'EasyMusic',
        show_playlist: false,
        player_visibility: false,

        music_loaded: false,
        first_sound_set: false,

        settings: false,
    };

    play(){
        if(!this.state.settings){
            this.state.player.play();
            this.set_interval();
            this.setState({auto_play_next: true});
        }
    }
    pause(){this.state.player.pause(); this.clear_interval(); this.setState({auto_play_next: false}); }
    toggle_play_pause(){
        let play_music = !this.state.play_music;
        play_music ? this.play() : this.pause();
        this.setState({play_music});
    }
    setSound(new_sound, callback = () => {}){
        this.set_cur_sound_order((this.state.sound_counter));
        let player = this.state.player;
        import(`../../music/${this.state.cur_album}/${new_sound}`).then((sound) => {
            player.src = sound.default;
            player.load();
            this.setState({player});
            callback();
        }).catch((error) => {console.log('import ERROR: ', error)});
    }
    get_cur_track_title(album, track_count){
        this.set_cur_sound_order(track_count);
        this.setState({cur_track_title: this.props.playlist[album].playlist[track_count].title});
    }
    get_sound(album= this.state.cur_album, track_count = this.state.sound_counter){
        this.get_cur_track_title(album, track_count);
        return  this.props.playlist[album].playlist[track_count].src;
    }
    set_cur_sound_order(count){
        // cur_sound_order = this.props.playlist[this.state.cur_album].playlist[count].order;
        cur_sound_order = count;
    }
    set_sound_counter(){
        let album = this.state.cur_album;
        if((this.props.playlist[album].playlist.length - 1) > this.state.sound_counter){
            this.setState({sound_counter: (this.state.sound_counter + 1)});
        }else if((this.props.playlist[album].playlist.length - 1) === this.state.sound_counter)
        {this.setState({auto_play_next: false}); this.setState({play_music: false});}
    }
    wish_play_next(delay = this.state.play_delay){
        this.state.auto_play_next ? setTimeout(() => {this.play()}, delay) : this.pause();
    }
    set_snd_duration(){
        let sound_duration = Math.floor(this.state.player.duration);
        this.setState({sound_duration});
    }
    set_progress_point(){
        let sound_progress = this.state.player.currentTime;
        let sound_duration = Math.floor(this.state.player.duration);
        let percent_progress = (sound_progress / sound_duration) * 100;
        if(percent_progress > 100){percent_progress = 100;}
        this.setState({progress_point_value: percent_progress});
    }
    switch_sound(num){
        let sound_counter = this.state.sound_counter + num;
        if(!(num < 0 && this.state.sound_counter === 0)
            && !(num > 0 && this.state.sound_counter === this.props.playlist[this.state.cur_album].playlist.length - 1)){
            this.pause();
            new Promise((resolve) => {
                this.setState({sound_counter});
                this.setState({play_music: true});
                this.setSound(this.get_sound(this.state.cur_album, sound_counter), resolve);
            }).then(() => {this.play()});
        }else{this.pause(); this.setState({play_music: false});}
    }
    set_current_time(value = 0){
        let player = this.state.player;
        player.currentTime = value;
        this.setState({player});
    }
    change_album(cur_album){
        this.setState({cur_album});
    }
    set_interval(){this.setState({interval: setInterval(() => {this.set_progress_point();}, 500)})}
    clear_interval(){this.setState({interval: clearInterval(this.state.interval)})}
    /*todo: ......................................................... ......:::::: ON SOUND ENDED ::::::......     */
    on_sound_end(){
        this.set_sound_counter();
        this.setSound(this.get_sound());/* need data to fast switch */
        this.wish_play_next();
        this.set_snd_duration();
        this.clear_interval();
    }
    play_clicked_sound(idx){
        this.clear_interval();
        this.set_cur_sound_order(idx);
        this.setState({sound_counter: idx});
        new Promise((resolve) => {
            this.setSound(this.get_sound(this.state.cur_album, idx), resolve);
        }).then(() => {
            this.wish_play_next(0);
            this.set_snd_duration();
            this.clear_interval();
        });
    }
    /*todo: ....................................................... ......:::::: ORDER SETTINGS ::::::......     */

    componentDidMount() {
        // this.state.player.addEventListener('play', () => {console.log('test');});
        this.props.fetch_music();
        this.state.player.addEventListener('ended', () => {this.on_sound_end()});
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.state.music_loaded){
            this.setState({music_loaded: this.props.music_loaded});
            // this.setSound(this.get_sound(this.state.cur_album, this.state.sound_counter));
        }
        // console.clear();
    }

    render() {
        return (
            <div className={'mPlayer_wrapper'}>
                <div className="toggle_visibility">
                    {this.state.music_loaded

                        ?
                        <div className={`player_console ${this.state.player_visibility ? ' hidden' : ''}`}
                             onClick={() => {
                                 this.setState({player_visibility: !this.state.player_visibility});
                                 if(!this.state.first_sound_set){
                                     this.setState({first_sound_set: true});
                                     this.setSound(this.get_sound(this.state.cur_album, this.state.sound_counter));
                                 }

                             }}
                        >
                            <FontAwesomeIcon icon={faPlay}/>
                        </div>
                        : <Preloader/>
                    }
                </div>
                <div className={`mPlayer ${this.state.player_visibility ? '' : ' hidden'}`}
                >
                    <PlayPause
                        settings={this.state.settings}
                        OnClick={this.toggle_play_pause.bind(this)}
                        SwitchSound={this.switch_sound.bind(this)}
                        PlayMusic={this.state.play_music}
                    />
                    <CurrentTime
                        PlayMusic={this.state.play_music}
                        current_value={this.state.progress_point_value}
                        current_time={this.state.player.currentTime}
                        current_time_left={((this.state.player.duration || 0) - this.state.player.currentTime)}
                        track_title={this.state.cur_track_title}
                        Set_cur_time={this.set_current_time.bind(this)}
                        track_duration={this.state.player.duration}
                    />
                    <div className="toggle_playlist" onClick={() => {
                        this.setState({show_playlist: !this.state.show_playlist})
                    }}>
                        <FontAwesomeIcon className={`${this.state.show_playlist ? 'settings_active' : ''}`} icon={faTasks}/>
                    </div>
                    {this.state.show_playlist
                        ? <PlayList
                            cur_count={this.state.sound_counter}
                            enable_play_music={() => {this.setState({play_music: true}); this.play()}}
                            play_music={this.state.play_music}
                            playlist={this.props.playlist}
                            cur_album={this.state.cur_album}
                            Change_Album={this.change_album.bind(this)}
                            Play_clicked_Sound={this.play_clicked_sound.bind(this)}
                            settings={this.state.settings}
                            Toggle_settings={() => {this.setState({settings: !this.state.settings});}}
                            curSound_order={this.state.sound_counter}
                        />
                        : false}
                    <FontAwesomeIcon className={"close_mPlayer"} icon={faWindowClose}
                                     onClick={() => {
                                         this.setState({player_visibility: !this.state.player_visibility})
                                     }}
                    />
                </div>
            </div>
        );
    }
}




function mapStateToProps(state) {
    return {
        playlist: state.mPlayer.playlist,
        music_loaded: state.mPlayer.music_loaded,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        fetch_music: () => {dispatch(fetch_music())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(mPlayer);
