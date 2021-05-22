import React from "react";
import { Grid } from "@material-ui/core";
import SearchCard from "./SearchCard";
export default function SearchList(props) {
    return (
        <Grid container alignItems="center" direction="column" spacing={5}>
            {props.results.map((result) => (
                <Grid md={6} key={result._id} item style={{ width: "100%" }}>
                    <SearchCard result={result} />
                </Grid>
            ))}
        </Grid>
    );
}
