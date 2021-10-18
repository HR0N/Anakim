import './App.scss';
// import axios from "axios";
import {connect} from "react-redux";
import React, {Component} from "react";
import Header from "../Header/Header";
import Player from "../mPlayer/mPlayer";
import {Route, Switch} from "react-router-dom";
import {hide_all_dropdown} from '../../redux/actions/Header';
import apiClient from "../../services/api";
import AnimalIp from "../AnimalIp/AnimalIp";
import KeyCode from "../KeyCode/KeyCode";
import SiteDev from "../SIteDev/SiteDev";


class App extends Component{
    state = {
     ready_to_player_load: false,
    };
    // connectToDeviceAndSubscribeToUpdates = async () => {
    //     const device = await navigator.bluetooth
    //         .requestDevice({
    //             // filters: [{ services: ['heart_rate']}],
    //             acceptAllDevices: true,
    //         });
    //     let server = await device.gatt.connect();
    // };


  HrefHandler = (info) => {
      apiClient.get('sanctum/csrf-cookie').then(res => {
          apiClient.post('api/login', {email: 'Admin@gmail.com', password: '29L06A1990f911'})
              .then(res => {/*console.log(res);*/})
              .catch(err => console.log(err));
      });
      // setTimeout(() => {this.connectToDeviceAndSubscribeToUpdates()}, 2000);
  };


  componentDidMount() {
      this.HrefHandler();
      if(!this.state.ready_to_player_load){this.setState({ready_to_player_load: true})};
  }

    render() {
        return (
            <div className="App"
                 onClick={(e) => {
                     this.props.hide_all_dropdown(e);
                     this.forceUpdate();
                 }}
            >
                <Header/>
                <Switch>
                    <Route exact path={'/'}/>
                    <Route exact path={'/animal_ip'} component={AnimalIp}/>
                    <Route exact path={'/key_code'} component={KeyCode}/>
                    <Route exact path={'/site_dev'} component={SiteDev}/>
                    <Route exact path={'/Auth'} />
                </Switch>
                {/*{this.state.ready_to_player_load ? <Player/> : false}*/}

            </div>
        );
    }
}




function mapStateToProps(state) {
    return {
        links: state.header.links,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        hide_all_dropdown: (e) => {dispatch(hide_all_dropdown(e))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
