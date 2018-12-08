
import _ from 'lodash';
import './style.sass';
import Icon from './icon.png';

import React, {Component} from "react";
import ReactDOM from "react-dom";
import AwesomeComponent from "components/awesome-component/";
import Game from "components/game/";

class App extends Component{
    render(){
        return (
            <div>
                <Game/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));

// document.body.appendChild(component());

// ReactDOM.render(<div>test</div>, document.getElementById("app"));
