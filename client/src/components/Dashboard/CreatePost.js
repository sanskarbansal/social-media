import { useState, useEffect, useRef } from "react";
import { TextField, Grid, Button, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Typography } from "@material-ui/core";
import React from "react";
import { createPost } from "../../actions/posts";
import { connect } from "react-redux";
import Markdown from "../Makrdown";

function CreatePost(props) {
    const [isOpen, setisOpen] = useState(false);
    const toggleClose = (val) => () => setisOpen(val);
    const [content, setContent] = useState("");
    const inputRef = useRef(null);
    const [pos, setPos] = useState(null);

    const handleOnChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = () => {
        props.dispatch(createPost({ body: content }));
        setisOpen(false);
        setContent("");
    };
    useEffect(() => {
        if (pos !== null) {
            inputRef.current.selectionStart = pos + 1;
            inputRef.current.selectionEnd = pos + 1;
        }
        setPos(null);
    }, [pos]);

    const handleTab = (event) => {
        if (event.keyCode === 9) {
            event.preventDefault();
            let p = inputRef.current.selectionStart;
            setContent(content.substr(0, p) + "\t" + content.substr(p));
            setPos(p);
        }
    };
    return (
        <>
            <Grid container alignItems="stretch" justify="center" spacing={2}>
                {/* <Grid item md={6} style={{ width: "100%" }}> */}
                {/* <TextField color="primary" label="Create Post" size="small" variant="outlined" fullWidth onClick={toggleClose(true)} /> */}
                <Button variant="outlined" onClick={toggleClose(true)} color="primary">
                    CREATE NEW POST
                </Button>
                {/* </Grid> */}
            </Grid>

            <Dialog open={isOpen} fullScreen onClose={() => setisOpen(false)}>
                <DialogTitle color="black">Create Post</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText color="textPrimary" variant="h6">
                        Enter content of the post.
                    </DialogContentText>
                    <TextField
                        value={content}
                        onKeyDown={handleTab}
                        // InputProps={{ ref: inputRef }}
                        inputRef={inputRef}
                        id="post"
                        onChange={handleOnChange}
                        label="Post Content"
                        variant="outlined"
                        fullWidth
                        rows="10"
                        multiline
                    />
                    {content && (
                        <Typography variant="h5" color="textPrimary" align="center" style={{ textDecoration: "underline" }}>
                            OUTPUT
                        </Typography>
                    )}
                    <Markdown content={content} />
                </DialogContent>
                <DialogActions>
                    <Grid container justify="center">
                        <>
                            <Button onClick={toggleClose(false)} color="secondary" variant="contained" style={{ width: "40%", marginRight: 5 }}>
                                Discard
                            </Button>
                            <Button onClick={handleSubmit} color="primary" variant="contained" style={{ width: "40%", marginLeft: 5 }}>
                                Post
                            </Button>
                        </>
                    </Grid>
                </DialogActions>
            </Dialog>

            {/* <Grid item md={4}>
                <Button variant="contained" color="secondary" style={{ height: "100%" }}>
                Create Post
                </Button>
            </Grid> */}
        </>
    );
}

export default connect(null, null)(CreatePost);
