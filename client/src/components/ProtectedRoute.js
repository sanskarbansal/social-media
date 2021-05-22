import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

function ProtectedRoute(props) {
    const Component = props.component || props.render;
    const to = {
        pathname: "/",
        from: {
            pathname: props.location.pathname,
        },
    };

    if (props.auth.isLoggedIn && props.auth.user) return <Route path={props.path} render={(renderProps) => <Component {...renderProps} {...props} />} />;
    return <Route path={props.path} render={() => <Redirect to={to} />} />;
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(ProtectedRoute);
