import React from "react";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Page404 from "./Page404";
import api from "../api";
import {Link} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    image: {
        width: "200px",
        height: "300px",
        display: "block",
    },
    tags: {
        display: "inline",
        marginRight: "5px",
        marginTop: "5px",
    }
}));

export default function Novel(props) {
    const classes = useStyles();
    const requestNovel = api.useGetRequest('novels/' + props.match.params.id);

    if (requestNovel.loaded && requestNovel.error) {
        return (
            <Page404/>
        )
    }

    if (requestNovel.loaded) {
        return (
            <Grid container className={classes.root} justify="center">
                <Grid container item xs={8}>
                    <Grid item xs={2} style={{minWidth: "200px"}}>
                        <img className={classes.image} src={requestNovel.data.image} alt=""/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="h4">
                            {requestNovel.data.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p"
                                    display="inline">
                            {" by "}
                        </Typography>
                        <Typography variant="h6" display="inline">
                            {requestNovel.data.author}
                        </Typography>
                        <Typography></Typography>
                        {requestNovel.data.tags.map(tag => {
                            return (
                                <Button key={tag} className={classes.tags} variant="contained">
                                    {tag}
                                </Button>
                            )
                        })}
                        <Typography style={{marginTop: "10px"}}>Links: </Typography>
                        <Typography>
                            <Link href={requestNovel.data.url}>
                                Royalroad
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="textSecondary" component="p"
                                    style={{whiteSpace: "pre-line"}}>
                            {requestNovel.data.desc}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </Grid>
        )
    } else {
        return (<div>Loading</div>)
    }
}

