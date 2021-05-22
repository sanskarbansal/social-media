import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import React, { Component } from "react";

class App extends Component {
    componentDidMount() {}

    render() {
        return (
            <Router>
                <Navbar />
                <Switch>
                    <></>
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
});

export default connect(mapStateToProps)(App);
