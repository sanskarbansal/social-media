import React, { Component } from "react";
import { TextField, Button, Grid, Typography, withStyles, Paper, CircularProgress } from "@material-ui/core";
import { signup, resetSignup } from "../actions/auth";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const styleMe = withStyles({
    field: {
        margin: "5px 0",
    },
    fullWidth: {
        width: "100%",
    },
});

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirm_password: "",
            firstName: "",
            lastName: "",
            email: "",
            number: null,
            usernameerror: false,
            passworderror: false,
            confirm_passworderror: false,
            firstNameerror: false,
            lastNameerror: false,
            emailerror: false,
            numbererror: false,
            error: true,
        };
        this._validate = {
            username: (inp) => {
                return inp.length < 6;
            },
            password: (inp) => {
                var passw = /^[A-Za-z]\w{7,14}$/;
                if (inp.match(passw)) return false;
                return true;
            },
            confirm_password: (cpas) => {
                return this.state.password !== cpas;
            },
            firstName: (inp) => {
                return inp.length < 4;
            },
            lastName: (inp) => {
                return inp.length < 4;
            },
            email: (mail) => {
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
                    return false;
                }
                return true;
            },
            number: (n) => {
                var phoneno = /^\d{10}$/;
                if (n.match(phoneno)) return false;
                return true;
            },
        };
    }

    handleChange = (field) => (event) => {
        this.setState(
            {
                [field]: event.target.value,
                [field + "error"]: this._validate[field](event.target.value),
            },
            () => {
                this.setState({ ...this.state, confirm_passworderror: this.state.password !== this.state.confirm_password }, () => {
                    const {
                        usernameerror,
                        lastNameerror,
                        emailerror,
                        numbererror,
                        passworderror,
                        confirm_passworderror,
                        username,
                        lastName,
                        email,
                        number,
                        password,
                        confirm_password,
                    } = this.state;
                    this.setState({
                        ...this.state,
                        error:
                            usernameerror ||
                            lastNameerror ||
                            emailerror ||
                            numbererror ||
                            passworderror ||
                            confirm_passworderror ||
                            !username ||
                            !lastName ||
                            !email ||
                            !number ||
                            !password ||
                            !confirm_password,
                        confirm_passworderror: this.state.password !== this.state.confirm_password,
                    });
                });
            }
        );
    };
    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.error) this.props.dispatch(signup(this.state));
    };

    render() {
        const { classes } = this.props;
        const { inProgress, signUpSuccess } = this.props.auth;

        const hts = { style: { fontSize: 9, marginLeft: 4, marginBottom: 5 } };
        if (signUpSuccess) {
            this.props.setLoginForm(true);
            this.props.dispatch(resetSignup());
        }
        return (
            <Grid container alignItems="center" wrap="nowrap" direction="column" justify="space-evenly" spacing={1}>
                <Grid item md={8} xs={11} className={classes.fullWidth}>
                    <Paper variant="elevation" elevation={2} style={{ padding: 20 }} square>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="primary">
                                    Sign Up
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                    <Grid container justify="space-between">
                                        <Grid item xs={6}>
                                            <TextField
                                                helperText="Field should have more than 3 characters."
                                                FormHelperTextProps={hts}
                                                error={this.state.firstNameerror}
                                                autoComplete="off"
                                                id="firstName"
                                                onChange={this.handleChange("firstName")}
                                                className={classes.field}
                                                label="First Name"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                helperText="Field should have more than 3 characters."
                                                FormHelperTextProps={hts}
                                                error={this.state.lastNameerror}
                                                autoComplete="off"
                                                onChange={this.handleChange("lastName")}
                                                className={classes.field}
                                                label="Last Name"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <TextField
                                        autoComplete="off"
                                        helperText="Don't worry we'll keep it secrete."
                                        FormHelperTextProps={hts}
                                        onChange={this.handleChange("email")}
                                        className={classes.field}
                                        label="Email"
                                        type="email"
                                        error={this.state.emailerror}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <TextField
                                        autoComplete="off"
                                        onChange={this.handleChange("number")}
                                        helperText="Don't worry we'll keep it secrete."
                                        FormHelperTextProps={hts}
                                        className={classes.field}
                                        label="Mobile Number"
                                        error={this.state.numbererror}
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                    />
                                    <TextField
                                        error={this.state.usernameerror}
                                        helperText="Field should have more than 6 characters."
                                        FormHelperTextProps={hts}
                                        autoComplete="off"
                                        onChange={this.handleChange("username")}
                                        className={classes.field}
                                        label="Username"
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <TextField
                                        autoComplete="off"
                                        onChange={this.handleChange("password")}
                                        className={classes.field}
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        error={this.state.passworderror}
                                        helperText="Check a password between 7 to 16 characters which contain only characters, numeric digits and underscore and first character must be a letter"
                                        FormHelperTextProps={hts}
                                        fullWidth
                                    />
                                    <TextField
                                        autoComplete="off"
                                        onChange={this.handleChange("confirm_password")}
                                        helperText="Password should match"
                                        FormHelperTextProps={hts}
                                        className={classes.field}
                                        label="Confirm Password"
                                        variant="outlined"
                                        error={this.state.confirm_passworderror}
                                        type="password"
                                        fullWidth
                                    />

                                    <Button variant="contained" color="primary" type="submit" disabled={inProgress || this.state.error} fullWidth>
                                        {inProgress ? <CircularProgress color="primary" /> : "Sign Up"}
                                    </Button>
                                </form>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(styleMe(withRouter(Signup)));
