import { Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Divider, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { APIurls } from "../helpers/urls";

export default function UserProfile(props) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [friendship, setFriendship] = useState(false);

    const handleClick = (event) => {
        fetch(APIurls.sendRequest, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                friendId: user._id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(props.location.pathname);
                setLoading(true);
            });
    };
    const userId = props.match.params.userId;
    console.log(props);
    useEffect(() => {
        console.log(APIurls.getUser, userId);
        fetch(`${APIurls.getUser}${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUser(data.user);
                setFriendship(data.FriendShip[0]);
                setLoading(false);
            });
    }, [userId, loading]);
    const { firstName, lastName, email, friends, username } = user;
    console.log(friendship, userId);
    let btnMessage;
    let isDisabled = true;
    if (!friendship) {
        btnMessage = "Send Request";
        isDisabled = false;
    } else {
        if (friendship.status === 0) {
            if (friendship.sender === userId) {
                btnMessage = "Accept Request";
                isDisabled = false;
            } else {
                btnMessage = "You have already sent the request ";
            }
        } else if (friendship.status === 1) {
            btnMessage = "You are already friends.";
        } else {
            btnMessage = "You can't send friend request to this user.";
        }
    }

    return (
        <Grid container alignItems="center" justify="center">
            <Grid item md={6}>
                <Card style={{ width: "100%" }} elevation={2}>
                    <CardHeader subheader={email} title={firstName + " " + lastName} />
                    <Divider />
                    <CardContent>
                        {loading ? (
                            <Grid container alignItems="center" justify="center" xs={12}>
                                <CircularProgress />
                            </Grid>
                        ) : (
                            <>
                                <Typography>Username: {username}</Typography>
                                <Typography>Total Friends: {friends.length}</Typography>
                                <Typography>First Name: {firstName}</Typography>
                                <Typography>Last Name: {lastName}</Typography>
                            </>
                        )}
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Button fullWidth variant="contained" color="primary" onClick={handleClick} disabled={isDisabled}>
                            {btnMessage}
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}
