import { Grid, Card, CardContent, CardHeader, Typography, CardActions, Button, makeStyles, Divider, IconButton, ButtonGroup } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useRef } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { deletePost, toggleLike } from "../../../actions/posts";
import Makrdown from "../../Makrdown";
import CommentsList from "./Comments/CommentsList";

const useStyles = makeStyles({
    pointer: {
        cursor: "pointer",
    },
});

export default function Post(props) {
    const commentRef = useRef(null);
    const {
        body,
        createdAt,
        user: { firstName, lastName },
        likes,
    } = props.post;
    const classes = useStyles();
    const handleLike = () => {
        props.dispatch(toggleLike(props.post._id));
    };
    let _isLiked = false;
    props.post["likes"].forEach((like) => {
        if (like.user._id === props.userId) {
            _isLiked = true;
        }
    });
    const ourPost = props.post.user._id === props.userId;
    return (
        <Card variant="elevation">
            <CardHeader
                action={
                    ourPost && (
                        <IconButton aria-label="settings" color="primary" onClick={() => props.dispatch(deletePost(props.post._id))}>
                            <DeleteIcon />
                        </IconButton>
                    )
                }
                title={`${firstName} ${lastName}`}
                subheader={createdAt}
            />

            <Divider />
            <CardContent>
                <Makrdown content={body} />
            </CardContent>
            <Divider />
            <CardActions disableSpacing>
                <Grid container justify="center">
                    <ButtonGroup>
                        <Button variant={`${_isLiked ? "contained" : "outlined"}`} aria-label="add to favorites" onClick={handleLike}>
                            <FavoriteIcon className={classes.pointer} color={`${_isLiked ? "secondary" : "primary"}`} />
                            <Typography>Like {likes.length}</Typography>
                        </Button>
                        <Button aria-label="share" variant="outlined" onClick={() => commentRef.current.focus()}>
                            Comment
                        </Button>
                    </ButtonGroup>
                </Grid>
            </CardActions>
            <Divider />
            <CommentsList comments={props.post.comments} pId={props.post._id} commentRef={commentRef} dispatch={props.dispatch} />
        </Card>
    );
}
