import React from 'react';
import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {useLocation} from "react-router-dom";
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
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const [name, setName] = React.useState(query.get("search"));
    let tagnames = [];
    props.tags.forEach(function (item, i, arr) {
        tagnames.push(item.name)
    })
    const [tags, setTags] = React.useState(query.getAll("tags"))
    const [author, setAuthor] = React.useState(query.get("author"))
    const [ordering, setOrdering] = React.useState(query.get("ordering"))
    const [chcount_min, setChmin] = React.useState(query.get("chcount_min"))
    const [chcount_max, setChmax] = React.useState(query.get("chcount_max"))

    const handleSearchClick = (e) => {
        query.delete("page")
        query.delete("search")
        if (name) {
            query.set("search", name);
        }
        query.delete("author")
        if (author) {
            query.set("author", author)
        }
        query.delete("tags")
        tags.forEach(function (item, i, arr) {
            query.append("tags", item)
        })
        query.delete("ordering")
        if (ordering) {
            query.set("ordering", ordering)
        }
        query.delete("chcount_min")
        if (chcount_min) {
            query.set("chcount_min", chcount_min)
        }
        query.delete("chcount_max")
        if (chcount_max) {
            query.set("chcount_max", chcount_max)
        }
        window.location.href = "?" + query
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleTagsChange = (event, value) => {
        setTags(value)
    }

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value)
    }

    const handleOrderingChange = (e) => {
        setOrdering(e.target.value)
    }

    const handleChminChange = (e) => {
        setChmin(e.target.value)
    }

    const handleChmaxChange = (e) => {
        setChmax(e.target.value)
    }

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
                            <TextField id="name-box" label="Search by name" value={name || ""} type="search"
                                       onChange={handleNameChange}/>
                        </Grid>
                        <Grid item>
                            <TextField id="author-box" label="Search by author" value={author || ""} type="search"
                                       onChange={handleAuthorChange}/>
                        </Grid>
                    </Grid>
                    <Grid container item justify="center" spacing={4}>
                        <Grid item>
                            <TextField label="Minimum chapters" type="number" value={chcount_min || ""}
                                       onChange={handleChminChange}/>
                        </Grid>
                        <Grid item>
                            <TextField label="Maximum chapters" type="number" value={chcount_max || ""}
                                       onChange={handleChmaxChange}/>
                        </Grid>
                    </Grid>
                    <Grid container item justify="center">
                        <Autocomplete
                            className={classes.tagbox}
                            multiple
                            id="tags-outlined"
                            options={tagnames}
                            getOptionLabel={(option) => option}
                            value={tags || ""}
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
                                value={ordering || ""}
                                onChange={handleOrderingChange}
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
                        <IconButton aria-label="search-button" onClick={handleSearchClick} style={{height: "50px"}}>
                            <SearchIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>

    )
}