import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

class NovelsGrid extends React.Component {
    constructor() {
        super();
        this.state = {
            classes: makeStyles({
                root: {
                    flexGrow: 1,
                },
            }),
            spacing: 10,
            items: [],
            card: makeStyles({
                root: {
                    maxWidth: 340
                }
            })
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/novels').then(response => {
            this.setState({ items: response.data });
        });
    }

    render() {
        return (
            <Grid container className={this.state.classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={this.state.spacing}>
                        {this.state.items.map(value => {
                            return (
                                <Grid className={this.state.classes.root} key={value.id}>
                                    <Card className={this.state.card.root} variant="outlined">
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="300"
                                                image={value.image}
                                                title={value.name}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6">
                                                    {value.name}
                                                </Typography>
                                                <Typography variant="body1" color="textSecondary" component="p">
                                                    ads
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default NovelsGrid;
