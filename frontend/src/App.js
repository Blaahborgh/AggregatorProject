import React from 'react';
import './App.css';
import NovelsGrid from "./components/NovelsGrid";
import Novel from "./components/Novel";
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            novels: [],
            next: "",
            previous: "",
            activePage: 1,
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/novels').then(response => {
            this.setState({count: response.data.count, novels: response.data.results, next: response.data.next, previous: response.data.previous});
        })
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <NovelsGrid novels={this.state.novels}/>
                    </Route>
                    <Route exact path="/novel/:novelId">
                        <Novel novel={this.state.novels[1]}/>
                    </Route>
{/*                    {this.state.novels.map(value => {
                        return [
                            <Route exact path={"/novel/" + value.id + "/" + value.name.replace(/ /gi, "_")}>
                                <Novel novel={value}/>
                            </Route>,
                            <Route exact path={"/novel/" + value.id}>
                                <Redirect to={"/novel/" + value.id + "/" + value.name.replace(/ /gi, "_")}/>
                            </Route>
                        ]
                    })}*/}
                </Switch>
            </Router>
        )
    }
}

export default App;
