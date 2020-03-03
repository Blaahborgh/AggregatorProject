import React from "react";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from "@material-ui/core/Link";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    image: {
        width: "200px",
        height: "300px",
        float: "left",
        padding: 10,
        display: "block",
    },
    tags: {
        display: "inline",
        border: "1px solid #000",
        padding: "3px",
        marginRight: "5px",
        lineHeight: "250%",
        whiteSpace: "normal"
    },
}))

export default function Novel(props) {
    const classes = useStyles();
    return (
        <Grid container className={classes.root} justify="center">
            <Grid item xs={6}>
                <img className={classes.image} src={props.novel.image} alt=""/>
                <Typography gutterBottom variant="h5" display="inline">
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
                        <Typography key={tag} className={classes.tags}
                                    variant="body2" color="textSecondary" component="p">
                            {tag}
                        </Typography>
                    )
                })}
                <Typography variant="body1" color="textSecondary" component="p" style={{whiteSpace: "pre-line"}}>
                    {props.novel.desc}
                </Typography>
            </Grid>
        </Grid>
    )
}