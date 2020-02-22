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
                    width: 300,
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
                        this.state.items.map(value => {
                            return (
                                    <Card className={this.state.card.root} style={{width:300}} key={value.id} variant="outlined">
                                        <CardActionArea className={this.state.card.root}>
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
                            )
                        })
        );
    }
}

export default NovelsGrid;
