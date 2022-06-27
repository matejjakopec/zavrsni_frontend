import React from "react";
import axios from "axios";
import RemovalPost from "./RemovalPost";
import classes from "./Removals.module.css"
import {Link} from "react-router-dom";


class Removals extends React.Component{

    state={
        posts: []
    };

    componentDidMount() {
        axios("http://localhost:8080/api/post_removals", {
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
                                <Link to={{pathname: '/odvoz/' + post.id}}
                                className={classes.link}>
                                <RemovalPost
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

export default Removals;