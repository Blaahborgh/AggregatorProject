import React from "react";
import Grid from "@material-ui/core/Grid";
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import axios from "axios";

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
            desc: ""
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/novels/' + this.props.match.params.id).then(response => {
            this.setState({
                image: response.data.image,
                name: response.data.name,
                author: response.data.author,
                tags: response.data.tags,
                desc: response.data.desc
            });
        })
    }

    render() {
        const {classes} = this.props
        return (
            <Grid container className={classes.root} justify="center" spacing={2}>
                <Grid container item xs={8}>
                    <Grid item xs={2} style={{minWidth: "200px"}}>
                        <img className={classes.image} src={this.state.image} alt=""/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="h5">
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

/*export default function Novel() {
    const classes = useStyles();
    const novelId = useParams()
    console.log(novelId)
    const [novel, setNovel] = useState('')
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/novels/1').then(response => console.log(response.data))
    }, [])
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
}*/

