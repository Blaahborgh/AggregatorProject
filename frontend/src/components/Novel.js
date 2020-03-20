import React from "react";
import Grid from "@material-ui/core/Grid";
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import axios from "axios";
import Page404 from "./Page404";

const useStyles = theme => ({
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
})

class Novel extends React.Component {
    constructor() {
        super()
        this.state = {
            image: "",
            name: "",
            author: "",
            tags: [],
            desc: "",
            urls: "",
            hasError: false
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/novels/' + this.props.match.params.id).then(response => {
            this.setState({
                image: response.data.image,
                name: response.data.name,
                author: response.data.author,
                tags: response.data.tags,
                desc: response.data.desc,
                urls: response.data.url
            });
        })
            .catch(error=> {
                this.setState({hasError: true})
            })
    }

    render() {
        const {classes} = this.props
        let site = ""
        if (this.state.urls.includes("royalroad")){
            site = "Royalroad"
        }

        if (this.state.hasError){
            return(
                <Page404/>
            )
        }

        return (
            <Grid container className={classes.root} justify="center">
                <Grid container item xs={8}>
                    <Grid item xs={2} style={{minWidth: "200px"}}>
                        <img className={classes.image} src={this.state.image} alt=""/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="h4">
                            {this.state.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p"
                                    display="inline">
                            {" by "}
                        </Typography>
                        <Typography variant="h6" display="inline">
                            {this.state.author}
                        </Typography>
                        <Typography></Typography>
                        {this.state.tags.map(tag => {
                            return (
                                <Button key={tag} className={classes.tags} variant="contained">
                                    {tag}
                                </Button>
                            )
                        })}
                        <Typography style={{marginTop: "10px"}}>Links: </Typography>
                        <Typography>
                            <a href={this.state.urls} target="_blank" rel="noopener noreferrer">{site}</a>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="textSecondary" component="p"
                                    style={{whiteSpace: "pre-line"}}>
                            {this.state.desc}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(useStyles)(Novel);

