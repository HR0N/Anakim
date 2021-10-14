import {connect} from "react-redux";
import {Component} from "react";

class CurrentTime extends Component{

    get_human_time(income){
        let seconds = Math.floor(income % 60),
            minutes = Math.floor(income / 60);
        if(seconds.toString().length === 1){seconds = `0${seconds}`}
        return `${minutes}:${seconds}`;
    }
    get_click_offset(e){
        if(this.props.PlayMusic){
            let container_width = 300;
            let container_left = Math.floor(e.target.getBoundingClientRect().left);
            let mouse_pos_x = e.clientX;
            let container_offset_pos = mouse_pos_x - container_left;
            if(container_offset_pos < 0){container_offset_pos = 0}
            else if(container_offset_pos > 300){container_offset_pos = 300}
            container_offset_pos = (container_offset_pos / container_width) * 100;
            this.props.Set_cur_time();
            let seconds = this.props.track_duration / 100 * container_offset_pos;
            this.props.Set_cur_time(seconds);
            return container_offset_pos;
        }
    }


    render() {
        this.get_human_time(this.props.current_time);
        return (
            <div className={'CurrentTime'}>
                <div className="time_line"
                     onClick={this.get_click_offset.bind(this)}
                >
                    <div className="current_point"
                         style={{width: `${this.props.current_value}%`}}
                    >
                    </div>
                    <div className="time_stamps">
                        <div className="cur_time">{this.get_human_time(this.props.current_time)}</div>
                        <div className="time_left">{this.get_human_time(this.props.current_time_left)}</div>
                    </div>
                    <div className="track_title">{this.props.track_title}</div>
                </div>
            </div>
        );
    }
}




function mapStateToProps(state) {
    return {
        currentTime: state.mPlayer.currentTime,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        testFunc: () => {dispatch({type: 'TEMPLATE_01'})},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrentTime);
