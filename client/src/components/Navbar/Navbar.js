import React, { useState } from "react";
import { AppBar, Toolbar, List, ListItem, ListItemText, makeStyles, Container, Hidden, Button, InputBase, fade } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import Home from "@material-ui/icons/Home";
import { SideDrawer } from "./SideDrawer";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { searchUsers } from "../../actions/search";

const useStyles = makeStyles((theme) => ({
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
        width: "100%",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
    },
    list: {
        width: 250,
    },
    navDisplayFlex: {
        display: "flex",
        justifyContent: "flex-end",
        flexGrow: 1,
    },
    linkText: {
        textDecoration: "none",
        textTransform: "uppercase",
        color: "white",
    },
}));

function Navbar(props) {
    const [search, setSearch] = useState("");
    const classes = useStyles();
    const navLinks = [];
    if (props.auth.isLoggedIn) {
        const { firstName } = props.auth.user;
        navLinks.push({ title: firstName, path: "/setting" });
        navLinks.push({ title: "Logout", path: "/logout" });
    }
    const handleSearch = (event) => {
        setSearch(event.target.value);
        props.dispatch(searchUsers(event.target.value, 1, 5));
        if (props.location.pathname !== "/dashboard") {
            props.history.push("/dashboard");
        }
    };
    return (
        <div style={{ marginBottom: 80 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Link to="/dashboard" style={{ textDecoration: "none", width: "450px" }}>
                        <Button>
                            <p>Social Media</p>
                            <Home />
                        </Button>
                    </Link>
                    <Hidden smDown>
                        {/* {style={{ height: "60px" }} */}
                        <Container maxWidth="xs">
                            {/* <List style={{ height: "100%", padding: 0, background: `${results.length > 0 ? "black" : ""}` }}>
                                <ListItem> */}
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>

                                <InputBase
                                    onChange={handleSearch}
                                    value={search}
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </div>
                            {/* </ListItem> */}
                            {/* <Collapse in={results.length > 0} style={{ background: "black" }}>
                                    {results.map((user) => (
                                        <Link>
                                            <ListItem key={user._id}>
                                                <ListItemText>
                                                    {user.firstName} {user.lastName}
                                                </ListItemText>
                                            </ListItem>
                                        </Link>
                                    ))}
                                </Collapse>
                            </List> */}
                        </Container>
                    </Hidden>
                    <Container className={classes.navDisplayFlex} maxWidth="xl">
                        <Hidden smDown>
                            <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
                                {navLinks.map(({ title, path }) => {
                                    return (
                                        <Link key={title} to={path} className={classes.linkText}>
                                            <ListItem button>
                                                <ListItemText primary={title} />
                                            </ListItem>
                                        </Link>
                                    );
                                })}
                            </List>
                        </Hidden>
                        <Hidden mdUp>
                            <SideDrawer navLinks={navLinks} />
                        </Hidden>
                    </Container>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    search: state.search,
});

export default connect(mapStateToProps)(withRouter(Navbar));
