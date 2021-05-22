import React, { Component } from "react";
import { Button, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import Post from "./Post";
import { fetchPosts } from "../../../actions/posts";
// import {fret }
class PostList extends Component {
    state = {
        currentPage: 1,
    };
    handleShowMore = () => {
        this.props.dispatch(fetchPosts(this.state.currentPage + 1));
        this.setState((prevState) => ({
            ...this.state,
            currentPage: prevState.currentPage + 1,
        }));
    };
    render() {
        const { posts } = this.props.posts;

        return (
            <Grid container direction="column" alignItems="center" spacing={2}>
                {posts.map((post) => (
                    <Grid item md={9} xs={12} style={{ width: "100%" }} key={post._id}>
                        <Post post={post} dispatch={this.props.dispatch} userId={this.props.user._id} />
                    </Grid>
                ))}
                <Button variant="outlined" onClick={this.handleShowMore}>
                    Show More
                </Button>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    user: state.auth.user,
});
export default connect(mapStateToProps)(PostList);
