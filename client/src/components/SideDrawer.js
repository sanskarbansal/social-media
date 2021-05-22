import { makeStyles, List, ListItem, ListItemText, IconButton, Drawer } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/icons/Menu";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    linkText: {
        textDecoration: "none",
        textTransform: "uppercase",
        color: "black",
    },
});
const SideDrawerList = ({ toggleDrawer, navLinks }) => {
    const classes = useStyles();
    return (
        <div className={classes.list} role="presentation" onClick={toggleDrawer(false)}>
            <List component="nav">
                {navLinks.map(({ title, path }) => (
                    <Link to={path} key={title} className={`${classes.linkText}`}>
                        <ListItem button>
                            <ListItemText primary={title} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );
};
export const SideDrawer = ({ navLinks }) => {
    const [isOpen, setOpen] = useState(false);
    const toggleDrawer = (flag) => (event) => {
        setOpen(flag);
    };
    return (
        <>
            <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
                <Menu fontSize="large" style={{ color: "white" }} />
            </IconButton>
            <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
                <SideDrawerList navLinks={navLinks} toggleDrawer={toggleDrawer} />
            </Drawer>
        </>
    );
};
