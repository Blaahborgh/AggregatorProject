import React from "react";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

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
}))

export default function Novel(props) {
    const classes = useStyles();
    return (
        <Grid container className={classes.root} justify="center" spacing={2}>
            <Grid container item xs={10} justify="center">
                <Grid item xs={4}>
                    <img className={classes.image} src={props.novel.image} alt=""/>
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom variant="h5">
                        {props.novel.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p"
                                display="inline">
                        {" by "}
                    </Typography>
                    <Typography variant="h6" display="inline">
                        {props.novel.author}
                    </Typography>
                    <Typography></Typography>
                    {props.novel.tags.map(tag => {
                        return (
                            <Button key={tag} className={classes.tags} variant="contained">
                                {tag}
                            </Button>
                        )
                    })}
                </Grid>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="body1" color="textSecondary" component="p" style={{whiteSpace: "pre-line"}}>
                    {props.novel.desc}
                </Typography>
            </Grid>
        </Grid>
    )
}