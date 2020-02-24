import React from 'react';
import './App.css';
import NovelsGrid from "./components/NovelsGrid";
import Novel from "./components/Novel";
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            novels: []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/novels').then(response => {
            this.setState({novels: response.data});
        });
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <NovelsGrid novels={this.state.novels}/>
                    </Route>
                    {this.state.novels.map(value => {
                        return (
                            <Route key={value.id} exact path={"/novel/" + value.id + "/" + value.name.replace(/ /gi, "_")}>
                                <Novel novel={value}/>
                            </Route>
                        )
                    })}
                </Switch>
            </Router>
        )
    }
}

export default App;
