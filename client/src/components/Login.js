import React, { Component } from "react";
import { TextField, Button, Grid, Typography, withStyles, Paper, CircularProgress } from "@material-ui/core";
import { login, loginFailed } from "../actions/auth";
import { connect } from "react-redux";

const styleMe = withStyles({
    field: {
        margin: "10px 0",
    },
    fullWidth: {
        width: "100%",
    },
});

class Login extends Component {
    state = {
        username: "",
        password: "",
    };
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.state;
        if (username && password) {
            this.props.dispatch(login(username, password));
        } else {
            this.props.dispatch(loginFailed("PLEASE ENTER USERNAME AND PASSWORD"));
        }
    };
    render() {
        const { classes } = this.props;
        const { inProgress } = this.props.auth;
        return (
            <Grid container alignItems="center" wrap="nowrap" direction="column" justify="space-evenly" spacing={1}>
                <Grid item md={8} xs={11} className={classes.fullWidth}>
                    <Paper variant="elevation" elevation={2} style={{ padding: 20 }} square>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="primary">
                                    LOGIN
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                    <TextField
                                        id="username"
                                        onChange={this.handleChange}
                                        className={classes.field}
                                        label="username"
                                        variant="outlined"
                                        fullWidth
                                        autoComplete="off"
                                    />
                                    <TextField
                                        id="password"
                                        onChange={this.handleChange}
                                        className={classes.field}
                                        label="password"
                                        variant="outlined"
                                        fullWidth
                                        autoComplete="off"
                                    />

                                    <Button variant="contained" color="primary" type="submit" disabled={inProgress} fullWidth>
                                        {inProgress ? <CircularProgress color="primary" /> : "Login"}
                                    </Button>
                                </form>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(styleMe(Login));
