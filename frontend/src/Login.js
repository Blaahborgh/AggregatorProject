import React, {useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import {Redirect} from "react-router-dom";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    grid: {},
    button: {
        width: 150,
        marginBottom: 20
    },
    card: {
        minHeight: 250,
        width: 250,
    },
    cardheader: {
        textAlign: "center"
    }
}));

function Login(props) {
    const baseAPIurl = 'http://127.0.0.1:8000/auth/'
    const classes = useStyles();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    function validateInput() {
        return username.length > 0 && password.length > 0;
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };

    const handleSubmit = (e) => {
        setLoaded(false)
        fetch(baseAPIurl + 'login/', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(response => {
                setError(false)
                if (!response.ok) {
                    setError(true)
                }
                setLoaded(true)
            })
    }

    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                handleSubmit(event)
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [handleSubmit]);

    if (loaded && !error) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <Grid container className={classes.grid} justify="center" alignItems="center">
            <Card className={classes.card} variant="outlined">
                <CardHeader
                    className={classes.cardheader}
                    title="Войти в систему"
                />
                <Grid container className={classes.grid} justify="center" alignItems="center" direction="column"
                      spacing={2}>
                    {error &&
                        <Alert severity="error">Неправильный логин или пароль</Alert>
                    }
                    <Grid item>
                        <TextField id="username" onChange={handleUsernameChange} label="Логин" variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <TextField id="password" onChange={handlePasswordChange} label="Пароль" variant="outlined"
                                   type="password"/>
                    </Grid>
                    <Grid item>
                        <Button className={classes.button} variant="contained"
                                onClick={handleSubmit} onKeyDown={handleSubmit} disabled={!validateInput()}>Вход</Button>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default Login