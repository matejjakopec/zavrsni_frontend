import React from "react";
import axios from "axios";
import GarbagePost from "./GarbagePost";
import classes from "./garbages.module.css"
import {Link} from "react-router-dom";


class Garbages extends React.Component{

    state={
        posts: []
    };

    componentDidMount() {
        axios("http://localhost:8080/api/post_garbages", {
            method: 'GET',
            mode: 'cors',
            headers: {

                'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        })
            .then(res => {
                const posts = res.data['hydra:member'];
                this.setState({ posts });
            })
    }
    render() {
        return(
            <ul className={classes.container}>
                {
                    this.state.posts
                        .map(post =>
                            <li key={post.id} className={classes.item}>
                                <Link to={{pathname: '/otpad/' + post.id}}
                                className={classes.link}>
                                <GarbagePost
                                    images={JSON.stringify(post.images)}
                                    title={post.title}
                                    location={post.location}
                                    published={post.published}
                                    author={post.author.username}
                                />
                                </Link>
                            </li>
                        )
                }
            </ul>
        )
    }

}

export default Garbages;