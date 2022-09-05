import React from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import classes from "./imageUpload.module.css";
import Spinner from "../spinner/Spinner";
import backendUrl from "../backendUrl";



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
            axios(backendUrl + "api/images", {
                method: 'POST',
                headers: {
                    "Authorization": 'Bearer ' + this.context.token,
                    'Content-Type': 'application/json',
                },
                data: fd,
            })
                .then(res => {
                    img.push(res.data['id'].toString());
                    this.setState({images: img})
                    this.props.parentCallback(img.toString());
                    this.imagesUploaded += 1;
                    this.checkForEnd();
                    console.log(this.state.images);
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