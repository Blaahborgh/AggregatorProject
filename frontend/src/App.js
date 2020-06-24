import React from 'react';
import NovelsGrid from "./components/NovelsGrid";
import axios from "axios";
import Page404 from "./components/Page404";
import Grid from "@material-ui/core/Grid";
import SearchGrid from "./components/SearchGrid";

import Typography from '@material-ui/core/Typography';


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
            hasError: false,
            tags: [],
            expanded: false
        };
    }

    componentDidMount() {
        this.loadPage()
    }

    loadPage() {
        const params = new URLSearchParams(this.props.location.search);
        const page = parseInt(params.get('page'), 10) || 1;

        axios.get('http://127.0.0.1:8000/api/novels/' + this.props.location.search).then(response => {
            this.setState({
                count: response.data.count,
                novels: response.data.results,
                pages: response.data.pages,
                activePage: page
            })
        })
            .catch(error => {
                this.setState({hasError: true})
            });

        axios.get('http://127.0.0.1:8000/api/tags').then(response => {
            this.setState({
                tags: response.data
            })
        })
            .catch(error => {
                this.setState({hasError: true})
            });
    }

    render() {
        if (this.state.hasError) {
            return (
                <Page404/>
            )
        }

        return (
            <Grid container spacing={2}>
                <Grid container item xs={12} justify="center">
                    <SearchGrid tags={this.state.tags}/>
                </Grid>
                <Grid container item xs={12}>
                    <NovelsGrid novels={this.state.novels} page={this.state.activePage} pages={this.state.pages}
                                count={this.state.count}/>
                </Grid>
            </Grid>
        )
    }
}

export default App;
