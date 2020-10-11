import React from 'react';
import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {makeStyles} from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useHistory} from "react-router-dom"


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    panel: {
        width: 450
    },
    tagbox: {
        minWidth: 398,
        maxWidth: 398
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
}));

export default function SearchGrid(props) {
    const classes = useStyles();
    const history = useHistory();
    const query = new URLSearchParams(props.location.search);
    const [state, setState] = React.useState({
        search: query.get("search"),
        tags: query.getAll("tags"),
        author: query.get("author"),
        ordering: query.get("ordering"),
        chcount_min: query.get("chcount_min"),
        chcount_max: query.get("chcount_max")
    });

    const handleFieldChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            prevState[name] = value;
            return ({
                ...prevState
            })
        })
    };

    const handleTagsChange = (e, value) => {
        const val = value;
        setState(prevState => {
            prevState.tags = val;
            return ({
                ...prevState
            })
        })
    };

    const handleSearchClick = (e) => {
        const newQuery = new URLSearchParams();
        Object.entries(state).map(([field, value]) => (
            value && value.map(val => (newQuery.append(field, val)))
        ));
        history.push("?" + newQuery)
    };

    return (
        <ExpansionPanel className={classes.panel}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Filter options</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container className={classes.root} justify="center" spacing={2}>
                    <Grid container item justify="center" spacing={4}>
                        <Grid item>
                            <TextField name="search" label="Search by name" value={state.search || ""} type="search"
                                       onChange={handleFieldChange}/>
                        </Grid>
                        <Grid item>
                            <TextField name="author" label="Search by author" value={state.author || ""} type="search"
                                       onChange={handleFieldChange}/>
                        </Grid>
                    </Grid>
                    <Grid container item justify="center" spacing={4}>
                        <Grid item>
                            <TextField name="chcount_min" label="Minimum chapters" type="number"
                                       value={state.chcount_min || ""}
                                       onChange={handleFieldChange}/>
                        </Grid>
                        <Grid item>
                            <TextField name="chcount_max" label="Maximum chapters" type="number"
                                       value={state.chcount_max || ""}
                                       onChange={handleFieldChange}/>
                        </Grid>
                    </Grid>
                    <Grid container item justify="center">
                        <Autocomplete
                            className={classes.tagbox}
                            multiple
                            options={props.tags.map(tag => (tag.name))}
                            value={state.tags || ""}
                            disableCloseOnSelect={true}
                            filterSelectedOptions
                            onChange={(event, value) => handleTagsChange(event, value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tags"
                                />
                            )}
                        />
                    </Grid>
                    <Grid container item justify="center">
                        <FormControl className={classes.formControl}>
                            <InputLabel>Ordering</InputLabel>
                            <Select
                                name="ordering"
                                value={state.ordering || ""}
                                onChange={handleFieldChange}
                            >
                                <MenuItem value="">
                                    <em>By name</em>
                                </MenuItem>
                                <MenuItem value="author">Author (ascending)</MenuItem>
                                <MenuItem value="-author">Author (descending)</MenuItem>
                                <MenuItem value="chcount">Chapter count (ascending)</MenuItem>
                                <MenuItem value="-chcount">Chapter count (descending)</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container item justify="center">
                        <IconButton onClick={handleSearchClick} style={{height: "50px"}}>
                            <SearchIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>

    )
}