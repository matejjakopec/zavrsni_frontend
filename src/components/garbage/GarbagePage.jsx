import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router";
import {Swiper, SwiperSlide} from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import classes from './garbagePage.module.css'
import MakeOffer from "./MakeOffer";
import SeeOffers from "./SeeOffers";
import backendUrl from "../backendUrl";
import {Link} from "react-router-dom";

function GarbagePage(){
    const [post, setPost] = useState([]);
    const [author, setAuthor] = useState([]);
    const [images, setImages] = useState([]);



    const {id} = useParams();

    useEffect(()=>{
        axios(backendUrl + "api/garbage/" + id, {
        })
            .then((res) => {
                setPost(res.data);
                setAuthor(res.data.author);
                setImages(res.data.images);
            })
    }, []);

    function getImageGallery(){
        if(images.length == 0){
            return (
                <SwiperSlide>
                    <img
                        className={classes.image}
                        src="../images/defaultImage.png"
                        alt=""/>
                </SwiperSlide>
            )
        }else{
            return(
                images.map((image, index)=>
                    <SwiperSlide key={index}>
                        <img
                            className={classes.image}
                            src={backendUrl + "images/" + image.url}
                            alt=""/>
                    </SwiperSlide>
                )
            )
        }
    }


    function getDate(){
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        if(post.length === 0){
            return "";
        }else{
            const miliseconds = Date.parse(post.published.date);
            const date = new Date(miliseconds);
            const str = date.toLocaleDateString('hr-HR', options);
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }

    return (
            <div className={classes.container}>
                <div>
                    <>
                        <Swiper
                            pagination={{
                                type: "fraction",
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className={classes['image-gallery']}
                        >
                            {getImageGallery()}
                        </Swiper>
                    </>
                </div>
                <div className={classes['content-container']}>
                    <h2 className={classes.title}>{post.title}</h2>
                    <p className={classes.text}>
                        <span className={classes.explanation}>
                            Datum objave:
                        </span>
                        {getDate()}
                    </p>
                    <p className={classes.text}>
                        <span className={classes.explanation}>
                            Mjesto:
                        </span>
                        {post.location}
                    </p>
                    <p className={classes.text}>
                        <span className={classes.explanation}>
                            Autor:
                        </span>
                        <Link to={{pathname: '/korisnik/' + author.id}}
                              className={classes.link}>
                            {author.username}
                        </Link>
                    </p>
                    <p className={classes.explanation}>Opis:</p>
                    <p className={classes.description}>{post.content}</p>
                    <div>
                        <SeeOffers  id={author.id} postId={id}/>
                        <MakeOffer id={post.id} userId={author.id}/>
                    </div>
                </div>

            </div>

        )
}

export default GarbagePage;