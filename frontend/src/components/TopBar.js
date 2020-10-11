import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: "30px"
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
}));

export default function SearchAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link href="/" color="inherit">
                                                    Web Novel Hub
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
