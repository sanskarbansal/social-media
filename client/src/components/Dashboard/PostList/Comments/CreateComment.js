import React, { useState } from "react";
import { connect } from "react-redux";

import { CardContent, TextField } from "@material-ui/core";
import { postComment } from "../../../../actions/posts";
function CreateComment(props) {
    const [comment, setComment] = useState("");
    const handleChange = (event) => {
        setComment(event.target.value);
    };
    const handleEnter = (event) => {
        if (event.code === "Enter") {
            console.log(props.pId);
            props.dispatch(postComment(props.pId, comment));
            setComment("");
        }
    };
    return (
        <CardContent>
            <TextField
                onKeyDown={handleEnter}
                value={comment}
                onChange={handleChange}
                label="Comment"
                inputRef={props.commentRef}
                fullWidth
                variant="outlined"
                size="small"
            />
        </CardContent>
    );
}
export default connect(null, null)(CreateComment);
