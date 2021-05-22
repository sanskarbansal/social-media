import React, { useState } from "react";
import Comment from "./Comment";
import { Collapse, Grid, IconButton, List } from "@material-ui/core";
import CreateComment from "./CreateComment";
import ExpandMore from "@material-ui/icons/ExpandMore";
export default function CommentsList(props) {
    const [isOpen, setOpen] = useState(false);

    if (props.comments.length === 0) return <CreateComment pId={props.pId} commentRef={props.commentRef} />;
    return (
        <>
            <List>
                {props.comments.length && <Comment dispatch={props.dispatch} comment={props.comments[0]} pId={props.pId} key={props.comments[0]._id} />}

                {props.comments.length > 1 && (
                    <>
                        <Collapse in={isOpen}>
                            {props.comments.map((comment, index) => {
                                if (index === 0) return <React.Fragment key="null"></React.Fragment>;
                                return <Comment dispatch={props.dispatch} key={comment._id} comment={comment} pId={props.pId} />;
                            })}
                        </Collapse>
                    </>
                )}
            </List>
            <CreateComment pId={props.pId} commentRef={props.commentRef} />
            {props.comments.length > 1 && !isOpen && (
                <Grid container justify="center">
                    <IconButton color="primary" onClick={() => setOpen(true)}>
                        <ExpandMore />
                    </IconButton>
                </Grid>
            )}
        </>
    );
}
