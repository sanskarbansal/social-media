import React, { Component, createRef } from "react";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import Post from "./Post";
import { clearPost, fetchPosts } from "../../../actions/posts";
// import {fret }
class PostList extends Component {
    constructor(props) {
        super(props);
        this.triggerFetch = createRef();
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.handleShowMore();
            }
        });
        this.state = {
            currentPage: 1,
        };
    }
    componentDidMount() {
        if (this.triggerFetch.current) this.observer.observe(this.triggerFetch.current);
        this.handleShowMore();
    }
    componentWillUnmount() {
        this.observer.disconnect();
        this.props.dispatch(clearPost());
    }

    handleShowMore = () => {
        this.props.dispatch(fetchPosts(this.state.currentPage + 1));
        this.setState((prevState) => ({
            ...this.state,
            currentPage: prevState.currentPage + 1,
        }));
    };

    render() {
        const { posts, loading, morePosts } = this.props.posts;
        if (!morePosts) this.observer.disconnect();
        return (
            <Grid container direction="column" alignItems="center" spacing={2}>
                {posts.map((post) => (
                    <Grid item md={9} xs={12} style={{ width: "100%" }} key={post._id}>
                        <Post post={post} dispatch={this.props.dispatch} userId={this.props.user._id} />
                    </Grid>
                ))}
                {morePosts ? (
                    <div ref={this.triggerFetch} id="trigger_fetch">
                        {loading && <CircularProgress />}
                    </div>
                ) : (
                    "Damn! You scroll a lot, you read all the posts 😕"
                )}
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    user: state.auth.user,
});
export default connect(mapStateToProps)(PostList);
