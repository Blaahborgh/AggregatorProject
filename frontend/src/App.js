import React from 'react';
import './App.css';
import NovelsGrid from "./components/NovelsGrid";
import axios from "axios";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

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
    }

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
                renderItem={item => (
                    <PaginationItem
                        component={Link}
                        to={`/${item.page === 1 ? '' : `?page=${item.page}`}`}
                        {...item}
                    />
                )}
            />
        ]
    }
}

export default App;
