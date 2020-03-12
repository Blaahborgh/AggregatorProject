import React from "react";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import axios from "axios";
import {useParams} from 'react-router-dom'

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

/*const getNovel = (callback) => {
    axios.get('http://127.0.0.1:8000/api/novels/1').then(response => {
        callback(null, response)
    })
        .catch(error => {
            callback(error, null)
        })
}*/

async function getNovel() {
    const response = await axios.get('http://127.0.0.1:8000/api/novels/1');
    return response.data
}

export default function Novel() {
    const classes = useStyles();
    const novelId = useParams()
    console.log(novelId)
    /*    const novel = getNovel((err, response) => {
            if (err) {
                throw err;
            }
            console.log(response.data);
            return response.data
        })*/
    const novel = getNovel()
    console.log(novel)
    return (
        <Grid container className={classes.root} justify="center" spacing={2}>
            <Grid container item xs={8}>
                <Grid item xs={2} style={{minWidth: "200px"}}>
                    <img className={classes.image} src={novel.image} alt=""/>
                </Grid>
                <Grid item xs={6} style={{flexShrink: 1}}>
                    <Typography gutterBottom variant="h5">
                        {novel.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p"
                                display="inline">
                        {" by "}
                    </Typography>
                    <Typography variant="h6" display="inline">
                        {novel.author}
                    </Typography>
                    <Typography></Typography>
                    {novel.tags.map(tag => {
                        return (
                            <Button key={tag} className={classes.tags} variant="contained">
                                {tag}
                            </Button>
                        )
                    })}
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" color="textSecondary" component="p" style={{whiteSpace: "pre-line"}}>
                        {novel.desc}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                </Grid>
            </Grid>
        </Grid>
    )
}
