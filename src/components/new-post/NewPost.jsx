import React from 'react';
import UserContext from "../../context/UserContext";
import ReactSelect, { createFilter } from "react-select";
import locations from '../../data/locations.json'
import ImageUpload from "../ImageUpload/ImageUpload";
import {TailSpin} from "react-loader-spinner";
import axios from "axios";
import classes from "./NewPost.module.css";
import Spinner from "../spinner/Spinner";
import history from "../history";


class NewPost extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            location: '',
            locationId: '1',
            locationObj: [],
            images: [],
            spinner: []
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleContentChange(event) {
        this.setState({content: event.target.value});
    }


    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    data = locations;


    getFullLocation(id){
        return this.data.filter(
            function(data) {
                return data.value == id
            }
        );
    }

    handleCallback = (childData) =>{
        this.setState({images: childData})
        console.log(this.state.images)
    }

    getLocationToSend(){
        return JSON.parse(JSON.stringify(this.getFullLocation(this.state.locationId)[0])).label + ", " +
        JSON.parse(JSON.stringify(this.getFullLocation(this.state.locationId)[0])).zupanija.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
    }

    getImages(){
        if(this.state.images.length === 4)
            return "";
        let list = "[\"" + this.state.images.toString().split(',').join("\",\"") + "\"]".toString();
        return JSON.parse(list);
    }

    getData(){
        const token = this.context.token;
        console.log(this.getImages()[0].length);
        if(this.getImages()[0].length === 0){
            return {
                method: 'POST',
                    mode: 'cors',
                headers: {
                "Authorization": 'Bearer ' + token,
                    'Content-Type': 'application/json',
            },
                data: {
                    title: this.state.title,
                        content: this.state.content,
                        location: this.getLocationToSend(),
                },
                withCredentials: true,
                    credentials: 'same-origin',
            };
        }else{
            return{
                method: 'POST',
                    mode: 'cors',
                headers: {
                "Authorization": 'Bearer ' + token,
                    'Content-Type': 'application/json',
            },
                data: {
                    title: this.state.title,
                        content: this.state.content,
                        location: this.getLocationToSend(),
                        images: this.getImages()
                },
                withCredentials: true,
                credentials: 'same-origin',
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({spinner: <Spinner/>})
        const token = this.context.token
            axios("http://localhost:8080/api/" + this.props.url, this.getData())
                .then(res => {
                    this.setState({spinner: "Uspjesna objava oglasa"})
                    history.push(this.props.redirect + res.data.id)
                    window.location.reload()
                })
    }

    render(){

        return(
            <div className={classes.container}>
                <div className={classes.title}>{this.props.title}</div>
                <div className={classes.description}>Popunite sva polja kako biste uspješno objavili oglas</div>
                <form
                    onSubmit={this.handleSubmit}
                    className={classes['form-container']}
                >
                    <p className={classes.explanation}>Naslov oglasa:</p>
                        <input
                            className={classes['form-item']}
                            type="text"
                            placeholder="Naslov"
                            onChange={this.handleTitleChange }
                            value={this.state.title}
                        />
                    <p className={classes.explanation}>Opis oglasa:</p>
                        <textarea
                            className={classes['form-item']}
                            cols="4"
                            placeholder="Opis"
                            onChange={this.handleContentChange }
                            value={this.state.content}
                        />
                    <p className={classes.explanation}>Odaberi lokaciju:</p>
                    <ReactSelect
                        filterOption={createFilter({ ignoreAccents: false })}
                        options={this.data}
                        defaultValue="Odaberi"
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: "0.5rem",
                            "border-width": "3px",
                            colors: {
                                ...theme.colors,
                                primary25: '#00A86B',
                                primary: 'black',
                            },
                        })}
                        onChange={e=>{
                            this.setState({
                                location: e.label,
                                locationId: e.value,
                            })
                        }}
                        value={this.state.location}
                    />
                    <div className={classes.location}>Odabrana lokacija:
                        <span className={classes.highlight}>
                            {this.getLocationToSend()}
                        </span>
                    </div>
                <br/>
                    <p className={classes.explanation}>Odaberi slike:</p>
                    <ImageUpload parentCallback={this.handleCallback} /><br/>
                    <p>
                        Nakon odabira slika, a prije objave oglasa kliknuti na
                        <span className={classes.highlight}>Pošalji slike</span>
                    </p>
                    <input
                        type="submit"
                        value="Objavi oglas"
                        className={classes['action-button']}
                    />
                </form>
                {this.state.spinner}
            </div>
        )
    }
}

NewPost.contextType = UserContext;

export default NewPost;