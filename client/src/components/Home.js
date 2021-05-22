import { Button, ButtonGroup, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import Login from "./Login";
import Signup from "./Signup";
import React, { useState } from "react";
import "./Home.css";
import { connect } from "react-redux";
import { Redirect } from "react-router";

const useStyle = makeStyles({
    fullWidth: {
        width: "100%",
    },
});

function Home(props) {
    const classes = useStyle();
    const [isLoginForm, setLoginForm] = useState(true);
    const { from } = props.location;
    if (props.auth.isLoggedIn) return <Redirect to={`${(from && from.pathname) || "/dashboard"}`} />;
    return (
        <Grid container direction="column" alignItems="center" spacing={1}>
            <Grid item className={classes.fullWidth} xs={11} md={8}>
                <Paper elevation={1}>
                    <CSSTransition in={!isLoginForm} timeout={700} classNames="jiggle">
                        <ButtonGroup fullWidth color="primary">
                            <Button onClick={() => setLoginForm(true)} variant={`${isLoginForm ? "contained" : "text"}`}>
                                Login
                            </Button>
                            <Button onClick={() => setLoginForm(false)} variant={`${!isLoginForm ? "contained" : "text"}`}>
                                Sign Up
                            </Button>
                        </ButtonGroup>
                    </CSSTransition>
                </Paper>
            </Grid>
            {props.auth.message && (
                <Grid item className={classes.fullWidth} xs={11} md={8}>
                    <Paper elevation={1} square style={{ background: "#3674e9", color: "white" }}>
                        <Typography ariant="h6" align="center" style={{ padding: 5 }}>
                            {props.auth.message}
                        </Typography>
                    </Paper>
                </Grid>
            )}
            {props.auth.error && (
                <Grid item xs={8} md={5} className={classes.fullWidth} style={{ marginTop: 10 }}>
                    {props.auth.error && (
                        <Paper variant="elevation" elevation={2} style={{ background: "#f2225a", color: "white" }}>
                            <Typography variant="h6" align="center" style={{ padding: 5 }}>
                                {props.auth.error}
                            </Typography>
                        </Paper>
                    )}
                </Grid>
            )}
            <Grid item className={classes.fullWidth} xs={12}>
                <CSSTransition in={isLoginForm} timeout={700} classNames="slideMe">
                    {isLoginForm ? <Login /> : <Signup setLoginForm={setLoginForm} />}
                </CSSTransition>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Home);
