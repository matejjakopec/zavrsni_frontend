import React from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import classes from "./imageUpload.module.css";
import Spinner from "../spinner/Spinner";



class ImageUpload extends React.Component{

    state={
        files: [],
        images: [],
        spinner: []
    }

    fileSelectedHandler = event => {
        this.setState({files: event.target.files});
    }

    imagesUploaded = 0;

    checkForEnd(){
        if(this.imagesUploaded == this.state.files.length){
            this.setState({spinner: "Zavrseno"})
        }
    }

    
    fileUploadHandler = () => {
        const img = [];
        this.setState({spinner: <Spinner/>})
        Array.from(this.state.files).forEach((image, index) => {
            const fd = new FormData();
            fd.append('file', image, image.name)
            axios("http://localhost:8080/api/images", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Authorization": 'Bearer ' + this.context.token,
                    'Content-Type': 'application/json',
                },
                data: fd,
                withCredentials: true,
                credentials: 'same-origin',
            })
                .then(res => {
                    img.push(res.data['@id'].toString());
                    this.setState({images: img})
                    this.props.parentCallback(img.toString());
                    this.imagesUploaded += 1;
                    this.checkForEnd();
                })
        })
    }


    render(){
        return(
            <div>
                <input
                    type="file"
                    multiple
                    onChange={this.fileSelectedHandler}
                    accept="image/png, image/jpeg"
                    className={classes['action-button']}
                />
                <button
                    type="button"
                    onClick={this.fileUploadHandler}
                    className={classes['action-button']}
                >
                    Pošalji slike
                </button>
                {this.state.spinner}
            </div>
        )
    }

}

ImageUpload.contextType = UserContext;

export default ImageUpload;