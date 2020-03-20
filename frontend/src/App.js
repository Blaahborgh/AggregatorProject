import React from 'react';
import './App.css';
import NovelsGrid from "./components/NovelsGrid";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import Page404 from "./components/Page404";

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
            hasError: false
        };
    }

    componentDidMount() {
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
                .catch(error => {
                    this.setState({hasError: true})
                })
        }
    }

    handleChange(event, value){
        window.location.href = "?page=" + value
    }

    render() {
        if (this.state.hasError) {
            return (
                <Page404/>
            )
        }

        return [
            <NovelsGrid novels={this.state.novels}/>,
            <Pagination
                page={this.state.activePage}
                count={this.state.pages}
                onChange={this.handleChange}
                showFirstButton
                showLastButton
                boundaryCount={1}
                siblingCount={4}
            />
        ]
    }
}

export default App;
