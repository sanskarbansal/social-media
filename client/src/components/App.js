import "./App.css";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import React, { Component } from "react";
import { withStyles, ThemeProvider, createMuiTheme } from "@material-ui/core";
import jwtdecode from "jwt-decode";
import Dashboard from "./Dashboard/Dashboard";
import { setUser } from "../actions/auth";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import Logout from "./Logout";
import UserProfile from "./UserProfile";
import Settings from "./Dashboard/Setting";

const style = withStyles((theme) => {
    return {
        center: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
    };
});

const theme = createMuiTheme({
    palette: {
        // primary: {
        //     main: "#000001",
        // },
        // secondary: {
        //     main: "#000000",
        // },
        // text: {
        //     primary: "#ffffff",
        // },

        // background: {
        //     paper: "#000000",
        //     // default: "#000000",
        // },
        type: "dark",
        primary: {
            main: "#000000",
            light: "#000000",
            dark: "#000000",
        },
        background: {
            paper: "#163344",
        },
        text: {
            primary: "#ffffff",
            secondary: "#ffffff",
        },
    },
});

class App extends Component {
    componentDidMount() {
        const token = window.localStorage.getItem("token");
        if (token) {
            const user = jwtdecode(token);
            this.props.dispatch(setUser(user));
        }
    }

    render() {
        return (
            // <ThemeProvider theme={theme}>
            <Router>
                <Navbar />
                <Switch>
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    <ProtectedRoute path="/setting" component={Settings} />
                    <ProtectedRoute path="/logout" render={() => <Logout dispatch={this.props.dispatch} />} />
                    <ProtectedRoute path="/user/:userId" component={UserProfile} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
            // </ThemeProvider>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
});

export default connect(mapStateToProps)(style(App));
