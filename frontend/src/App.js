import React from 'react';
import './App.css';
import NovelsGrid from "./components/NovelsGrid";
import Novel from "./components/Novel";
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            novels: [],
            next: "",
            previous: "",
            pages: 0,
            activePage: 1,
        };
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/novels/?page=' + this.state.activePage).then(response => {
            this.setState({
                count: response.data.count,
                novels: response.data.results,
                next: response.data.next,
                previous: response.data.previous,
                pages: response.data.pages
            });
        })
    }

    handleChange = (event, value) => {
        this.setState({activePage: value})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.activePage !== this.state.activePage) {
            axios.get('http://127.0.0.1:8000/api/novels/?page=' + this.state.activePage).then(response => {
                this.setState({
                    count: response.data.count,
                    novels: response.data.results,
                    next: response.data.next,
                    previous: response.data.previous,
                    pages: response.data.pages
                });
            })
        }
    }

    render() {
        return [
            <Router>
                <Switch>
                    <Route exact path="/">
                        <NovelsGrid novels={this.state.novels}/>
                    </Route>
                    <Route exact path="/novel/:id" component={Novel}/>
                </Switch>
            </Router>,
            <Pagination
                count={this.state.pages}
                page={this.state.activePage}
                onChange={this.handleChange}
            />
        ]
    }
}

export default App;
