import React from 'react';
import './App.css';
import NovelsGrid from "./components/NovelsGrid";
import axios from "axios";
import {withRouter} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            novels: [],
            next: "",
            previous: "",
            pages: 0,
            activePage: 0,
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (event, value) => {
        const {history} = this.props;
        history.push("/?page=" + value)
    };

    componentDidMount() {
        this.loadPage()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadPage()
    }

    loadPage() {
        const params = new URLSearchParams(this.props.location.search);
        const page = parseInt(params.get('page'), 10) || 1;
        if (page !== this.state.activePage) {
            axios.get('http://127.0.0.1:8000/api/novels/?page=' + page).then(response => {
                this.setState({
                    count: response.data.count,
                    novels: response.data.results,
                    pages: response.data.pages,
                    activePage: page
                });
            })
        }
    }

    render() {
        return [
            <NovelsGrid novels={this.state.novels}/>,
            <Pagination
                page={this.state.activePage}
                count={this.state.pages}
                onChange={this.handleChange}
            />
        ]
    }
}

export default withRouter(App);
