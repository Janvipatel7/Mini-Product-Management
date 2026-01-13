    import Login from "../pages/Login"

const PrivateRoute = ({ Component, isLoggedIn }) => {
    if (!isLoggedIn) {
        return <Login />
    } else {
        return <Component />
    }
}

export default PrivateRoute;