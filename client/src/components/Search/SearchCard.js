import { Avatar, Card, CardHeader } from "@material-ui/core";
import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";

export default function SearchCard(props) {
    const { _id, firstName, lastName, username, avatar } = props.result;
    return (
        // <Link to={{ pathname: `/user/${_id}`, state: { user: props.result } }} style={{ textDecoration: "none" }}>
        <Link to={`/user/${_id}`} style={{ textDecoration: "none" }}>
            <Card>
                {/* <CardHeader avatar={<PersonIcon />} subheader={username} title={firstName + " " + lastName} /> */}
                <CardHeader avatar={<Avatar src={`http://localhost:1337${avatar}`} />} subheader={username} title={firstName + " " + lastName} />
            </Card>
        </Link>
    );
}
