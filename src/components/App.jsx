import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./homepage/HomePage";
import NavBar from "./navbar/NavBar";
import Removals from "./removals/Removals";
import Garbages from "./garbage/Garbages";
import RemovalPage from "./removals/RemovalPage";
import GarbagePage from "./garbage/GarbagePage";
import UserPage from "./userpage/UserPage"
import UserContext from "../context/UserContext";
import axios from "axios";
import NewPost from "./new-post/NewPost";
import Footer from "./footer/Footer";
import history from "./history";

class App extends React.Component{

    constructor(props) {
        super(props);
        this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad);
    }

    getUser(token){
        axios("http://localhost:8080/api/users", {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        })
            .then(res => {
                this.context.setUser(res.data.id, res.data.username);
            })
    }

    handleLoad() {
        const expirationTime = parseInt(localStorage.getItem('expiration'));
        const currentTime = parseInt(new Date().getTime()/1000);
        if(expirationTime - currentTime > 0){
            this.context.setToken(localStorage.getItem('token'));
            this.getUser(localStorage.getItem('token'));
        }else{
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
        }
    }

    newGarbagePostTitle = "Kreiraj oglas gdje treba odvesti otpad"
    newRemovalPostTitle = "Kreiraj oglas gdje nudite uslugu odvoza otpada"

    render(){
        return(
            <BrowserRouter history={history}>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/otpad" element={<Garbages/>}/>
                    <Route path="/otpad/:id" element={<GarbagePage/>}/>
                    <Route path="/odvoz" element={<Removals/>}/>
                    <Route path="/odvoz/:id" element={<RemovalPage/>}/>
                    <Route path="/korisnik" element={<UserPage/>}/>
                    <Route path="/novi-otpad" element={<NewPost
                        title={this.newGarbagePostTitle}
                        url="post_garbages"
                        redirect="/otpad/"/>}/>
                    <Route path="/novi-odvoz" element={<NewPost
                        title={this.newRemovalPostTitle}
                        url="post_removals"
                        redirect="/odvoz/"/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        );
    }


}

App.contextType = UserContext;

export default App;
