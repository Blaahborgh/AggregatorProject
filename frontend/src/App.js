import React from 'react';
import Page404 from "./components/Page404";
import Novel from "./components/Novel";
import Home from "./Home"
import Login from "./Login";
import {Switch, Route} from "react-router-dom";
import TopBar from "./components/TopBar";


function App(props) {
    return (
        <React.Fragment>
            <TopBar/>
            <Switch>
                <Route exact path="/" render={(props) => <Home {...props}/>}/>
                <Route exact path="/novels/:id" render={(props) => <Novel {...props}/>}/>
                <Route exact path="/login" render={(props) => <Login {...props}/>}/>
                <Route status={404} render={(props) => <Page404 {...props}/>}/>
            </Switch>
        </React.Fragment>
    )
}

export default App;
