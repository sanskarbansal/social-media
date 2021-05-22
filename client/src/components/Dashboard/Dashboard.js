import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";

import PostList from "./PostList/PostList";
import CreatePost from "./CreatePost";
import SearchList from "../Search/SearchList";
class Dashboard extends Component {
    render() {
        const { results } = this.props.search;
        return (
            <>
                {results.length ? (
                    <SearchList results={results} />
                ) : (
                    <Grid container alignItems="center" direction="column" spacing={5}>
                        <Grid item xs={10} style={{ width: "100%" }}>
                            <CreatePost />
                        </Grid>
                        <Grid item xs={10} style={{ width: "100%" }}>
                            <PostList />
                        </Grid>
                    </Grid>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    search: state.search,
});

export default connect(mapStateToProps, null)(Dashboard);
