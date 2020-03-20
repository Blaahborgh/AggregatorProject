import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TopBar from "./components/TopBar";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Novel from "./components/Novel";
import Page404 from "./components/Page404";

ReactDOM.render(<TopBar />, document.getElementById('bar'));
ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/novel/:id" component={Novel}/>
            <Route exact path="/" component={App}/>
            <Route component={Page404} status={404}/>
        </Switch>
    </Router>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
