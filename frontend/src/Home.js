import React from 'react';
import NovelsGrid from "./components/NovelsGrid";
import Grid from "@material-ui/core/Grid";
import SearchGrid from "./components/SearchGrid";
import api from "./api";


export default function Home(props) {
    const params = new URLSearchParams(props.location.search);
    const activePage = parseInt(params.get('page'), 10) || 1;
    const requestNovels = api.useGetRequest('novels/' + props.location.search);
    const requestTags = api.useGetRequest('tags/');
    const loaded = requestNovels.loaded && requestTags.loaded;

    if (loaded) {
        return (
            <Grid container spacing={2}>
                <Grid container item xs={12} justify="center">
                    <SearchGrid tags={requestTags.data} {...props}/>
                </Grid>
                <Grid container item xs={12}>
                    <NovelsGrid novels={requestNovels.data.results} page={activePage} pages={requestNovels.data.pages}
                                count={requestNovels.data.count} {...props}/>
                </Grid>
            </Grid>
        )
    } else {
        return (<div>Loading</div>)
    }
}