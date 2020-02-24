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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    media: {
        width: "200px",
        height: "300px",
        float: "left",
        padding: 10,
        display: "block",
    },
    card: {
        width: 1000,
        backgroundColor: "#CBCACA"
    },
    expand: {
        transform: 'rotate(0deg)',
        marginRight: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export default function SpacingGrid(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = (id) => {
        setExpanded(expanded === id ? false : id);
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={4}>
                    {props.novels.map(value => {
                        return (
                            <Grid key={value.id} item>
                                <Card className={classes.card} variant="outlined">
                                    <CardMedia
                                        className={classes.media}
                                        component="img"
                                        image={value.image}
                                        title={value.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6">
                                            <Link href={"/novel/" + value.id + "/" + value.name.replace(/ /gi, "_")}
                                                  color="inherit">
                                                {value.name}
                                            </Link>
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary" component="p">
                                            {value.author}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary" component="p">
                                            {value.chcount}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
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
            </Grid>
        </Grid>
    );
}
