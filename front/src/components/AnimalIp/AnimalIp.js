import './AnimalIp.scss';
import {connect} from "react-redux";
import React, {Component} from "react";
import apiClient from "../../services/api";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class AnimalIp extends Component{
    state = {
        player: new Audio(),
        user_data: null,
        animal_img_src: null,
        play: false,
    };
    load_img(){
            import(`../../../src/images/animals/${this.state.user_data.animal}.png`)
            .then((res) => {
                this.setState({animal_img_src: res.default});
            });
    }
    pause(){
        this.setState({play: false});
        this.state.player.pause();
    }
    play_animal_sound(){
        import(`../../../src/audio/animals/${this.state.user_data.animal}.mp3`)
            .then((res) => {
                this.setState({play: true});
                let audio = this.state.player;
                audio.src = res.default;
                audio.load();
                audio.play();
            });
    }

    render() {
        let user = this.state.user_data;
        return (
            <div className={'AnimalIp'}>
                {this.state.user_data ?
                    <div className="show_ip_wrapper">
                        <div className="show_ip">
                            <p className="ip">{user.ip}</p>
                            <p className="label">your Ip</p>
                            <hr/>
                            <div className="from">{`${user.city}, ${user.country}`}</div>
                        </div>
                        <div className="show_animal">
                            <div className="animal">
                                <div className="play_animal_sound">
                                    {!this.state.play
                                    ? <FontAwesomeIcon
                                            onClick={this.play_animal_sound.bind(this)}
                                            icon={faPlay}/>
                                    : <FontAwesomeIcon
                                            onClick={() => {this.pause()}}
                                            icon={faPause}/>
                                    }

                                </div>
                                {this.state.animal_img_src ?
                                    <img src={this.state.animal_img_src} alt="img"/>
                                    : null
                            }
                            </div>
                            <p className="label">your animal Ip🤪</p>
                        </div>
                    </div>
                    : null
                }

            </div>
        );
    }
    componentDidMount() {
        /*window.sessionStorage.setItem('ip', '0000.000.00.0');
        window.sessionStorage.setItem('animal', 'human');
        console.log(window.sessionStorage);*/
        this.state.player.addEventListener('ended', () => {this.pause()});
        apiClient('api/get_my_animal_back_peach').then(
            (res) => {this.setState({user_data: res.data})}
            ).then(() => {this.load_img();/* console.log(this.state.user_data);*/});
    }
}




function mapStateToProps(state) {
    return {
    };
}
function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AnimalIp);
