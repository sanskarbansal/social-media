import { Card, CardHeader } from "@material-ui/core";
import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";

export default function SearchCard(props) {
    const { _id, firstName, lastName, username } = props.result;
    return (
        // <Link to={{ pathname: `/user/${_id}`, state: { user: props.result } }} style={{ textDecoration: "none" }}>
        <Link to={`/user/${_id}`} style={{ textDecoration: "none" }}>
            <Card>
                <CardHeader avatar={<PersonIcon />} subheader={username} title={firstName + " " + lastName} />
            </Card>
        </Link>
    );
}
