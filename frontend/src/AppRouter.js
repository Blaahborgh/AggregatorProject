import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Novel from "./components/Novel";
import Page404 from "./components/Page404";
import App from "./App";

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path="/novel/:id" component={Novel}/>
                <Route exact path="/" component={App}/>
                <Route component={Page404} status={404}/>
            </Switch>
        </Router>
    )
}