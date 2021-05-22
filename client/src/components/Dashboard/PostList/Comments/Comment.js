import React from "react";
import { ListItem, ListItemText, ListItemAvatar, Avatar, Paper, Divider, Button, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { toggleLike } from "../../../../actions/posts";

function Comment(props) {
    const { comment } = props;
    const toggleLikeHandler = () => {
        props.dispatch(toggleLike(props.comment._id, props.pId));
    };
    return (
        <React.Fragment key={comment._id}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <AccountCircleIcon />
                    </Avatar>
                </ListItemAvatar>
                <Paper style={{ width: "100%", padding: "3px 15px" }} elevation={1}>
                    <ListItemText
                        primaryTypographyProps={{ style: { fontSize: 13 } }}
                        primary={comment.user.firstName + " " + comment.user.lastName}
                        secondary={comment.body}
                    />
                </Paper>
                <br />
                <Button style={{ alignSelf: "flex-start" }} onClick={toggleLikeHandler}>
                    <ThumbUpIcon color="action" variant="outline" fontSize="small" /> <pre> </pre> <Typography>{comment.likes.length}</Typography>
                </Button>
                <Divider />
            </ListItem>
        </React.Fragment>
    );
}

export default Comment;
