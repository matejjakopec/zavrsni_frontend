import React from "react";
import axios from "axios";
import RemovalPost from "./RemovalPost";
import classes from "./Removals.module.css"
import {Link} from "react-router-dom";
import backendUrl from "../backendUrl";
import Query from "../query/Query";
import PageSelector from "../page-selector/PageSelector";


class Removals extends React.Component{

    state={
        posts: [],
        isAuthor: false,
        backendUrl: "api/removal/list"
    };

    fetchData(query){
        axios(backendUrl + this.state.backendUrl + query, {
            method: 'GET'
        })
            .then(res => {
                const posts = res.data;
                this.setState({ posts });
            })
    }

    componentDidMount() {
        // eslint-disable-next-line no-restricted-globals
        let query = location.search;
        console.log(this.props.isAuthor)
        if(typeof this.props.query !== 'undefined'){
            query = this.props.query
        }
        if(typeof this.props.isAuthor !== 'undefined'){
            this.setState({isAuthor: this.props.isAuthor})
        }

        if(typeof this.props.backendUrl !== 'undefined'){
            this.setState({backendUrl: this.props.backendUrl}, () => this.fetchData(query))
        }else{
            this.fetchData(query)
        }
    }

    handleCallback = (childData) =>{
        this.fetchData(childData)
    }

    getQuery(){
        if(typeof this.props.query === 'undefined'){
            return(
                <Query
                    parentCallback={this.handleCallback}
                    currUrl="/odvoz"
                    // eslint-disable-next-line no-restricted-globals
                    query ={location.search}
                />
            )
        }
    }

    getPageSelector(){
        if(typeof this.props.query === 'undefined'){
            return(
                <PageSelector
                    // eslint-disable-next-line no-restricted-globals
                    query ={location.search}
                    postsNumber = {this.state.posts.length}
                    parentCallback={this.handleCallback}
                    currUrl= {"/odvoz"}>
                </PageSelector>
            )
        }
    }


    render() {
        return(
            <div>
                {this.getQuery()}
                <ul className={classes.container}>
                    {
                        this.state.posts
                            .map(post =>
                                <li key={post.id} className={classes.item}>
                                    <Link to={{pathname: '/odvoz/' + post.id}}
                                          className={classes.link}>
                                        <RemovalPost
                                            image={post.image.url}
                                            title={post.title}
                                            location={post.location}
                                            published={post.published.date}
                                            author={post.author.username}
                                            isAuthor={this.state.isAuthor}
                                            id={post.id}
                                        />
                                    </Link>
                                </li>
                            )
                    }
                </ul>
                {this.getPageSelector()}
            </div>
        )
    }

}

export default Removals;