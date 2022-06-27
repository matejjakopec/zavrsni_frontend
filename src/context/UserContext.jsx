import React from 'react';


const UserContext = React.createContext();

export class UserProvider extends React.Component{
    state = {
        token: "",
        userId: "",
        isAuthenticated: false,
        username: ""
    }

    setToken = (token)=>{
        this.setState({
            token: token,
            isAuthenticated: true})
    }

    setUser = (userId, username)=>{
        this.setState({
            username: username,
            userId: userId})
    }

    logOut = ()=>{
        this.setState({
            token: "",
            isAuthenticated: false,
            username: "",
            userId: ""})
    }

    render(){
        const {token, isAuthenticated, userId, username} = this.state;
        const {setToken, logOut, setUser} = this;
        return(
            <UserContext.Provider value={{
                token,
                username,
                userId,
                isAuthenticated,
                setToken,
                setUser,
                logOut
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }

}

export default UserContext;