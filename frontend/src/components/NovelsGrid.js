import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Link from "@material-ui/core/Link";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import {useLocation} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    media: {
        width: "100px",
        height: "150px",
        float: "left",
        padding: 10,
        marginTop: "13px",
        display: "block",
    },
    card: {
        width: "800px",
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    tags: {
        display: "inline",
        marginRight: "5px",
        marginTop: "5px",
    }
}));

export default function NovelsGrid(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const location = useLocation();
    const page = new URLSearchParams(location.search);

    const handleExpandClick = (id) => {
        setExpanded(expanded === id ? false : id);
    }

    const handlePageChange = (event, value) => {
        page.set("page", value);
        window.location.href = "?" + page
    }

    return (
        <Grid container className={classes.root} justify="center">
            <Grid container item xs={12} justify="center">
                <Typography variant="subtitle2" gutterBottom>
                    {"Novels found: " + props.count}
                </Typography>
            </Grid>
            <Grid container item xs={12} justify="center">
                <Pagination
                    page={props.page}
                    count={props.pages}
                    onChange={handlePageChange}
                    showFirstButton
                    showLastButton
                    style={{marginTop: "30px", marginBottom: "30px"}}
                />
            </Grid>
            <Grid container item xs={10} justify="center" spacing={2}>
                {props.novels.map(value => {
                    return (
                        <Grid key={value.id} item>
                            <Card className={classes.card} variant="outlined">
                                <Link href={"/novel/" + value.id} color="inherit">
                                    <CardMedia
                                        className={classes.media}
                                        component="img"
                                        image={value.image}
                                        title={value.name}
                                    />
                                </Link>
                                <CardContent>
                                    <Typography gutterBottom variant="h6" display="inline">
                                        <Link href={"/novel/" + value.id}
                                              color="inherit">
                                            {value.name}
                                        </Link>
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" component="p"
                                                display="inline">
                                        {" by "}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" component="p"
                                                display="inline">
                                        {value.author}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {value.chcount + " Chapters"}
                                    </Typography>
                                    {value.tags.map(tag => {
                                        return (
                                            <Button key={tag} className={classes.tags} variant="contained">
                                                {tag}
                                            </Button>
                                        )
                                    })}
                                </CardContent>
                                <CardActions style={{justifyContent: "flex-end"}}>
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={() => handleExpandClick(value.id)}
                                        aria-expanded={expanded === value.id}
                                        aria-label="show description"
                                    >
                                        <ExpandMoreIcon/>
                                    </IconButton>
                                </CardActions>
                                <Collapse in={expanded === value.id} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography variant="body1" color="textSecondary" component="p"
                                                    style={{whiteSpace: "pre-line"}}>
                                            {value.desc}
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <Grid container item xs={12} justify="center">
                <Pagination
                    page={props.page}
                    count={props.pages}
                    onChange={handlePageChange}
                    showFirstButton
                    showLastButton
                    style={{marginTop: "30px", marginBottom: "30px"}}
                />
            </Grid>
        </Grid>
    );
}
