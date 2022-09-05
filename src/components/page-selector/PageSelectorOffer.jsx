import React from "react";
import classes from "./pageSelector.module.css";

class PageSelectorOffer extends React.Component{

    state={
        page: 1
    }

    constructor(props) {
        super(props);

        this.handleLeftClick = this.handleLeftClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);

    }

    handleLeftClick(){
        let newPage = parseInt(this.state.page)
        if(newPage === 1){
            return;
        }
        newPage--
        this.setState({page: newPage}, this.buildQueryString)
    }

    handleRightClick(){
        console.log("posts: " + this.props.postsNumber)
        let newPage = parseInt(this.state.page)
        let query = new URLSearchParams(this.props.query);
        let perPage = query.get('perPage')
        if(perPage > this.props.postsNumber){
            return;
        }
        if(!perPage && this.props.postsNumber < 5){
            return;
        }
        newPage++
        this.setState({page: newPage}, this.buildQueryString)
    }

    componentDidMount() {
        let query = new URLSearchParams(this.props.query);
        let newPage = query.get("page")
        if(newPage){
            this.setState({page: newPage})
        }
        this.setState({page: 1})
    }


    buildQueryString(){
        let query = new URLSearchParams(this.props.query);
        query.set('page', this.state.page.toString())
        this.props.parentCallback("?" + query.toString());
    }


    render(){
        return(
            <div className={classes.container}>
                <span
                    onClick={this.handleLeftClick}
                    className={classes['sort-selection'] + " " + classes['selection-left']}>
                    <i className="fas fa-chevron-left"/>
                </span>
                <span
                    className={classes['page-number']}>
                    {this.state.page}
                </span>
                <span
                    onClick={this.handleRightClick}
                    className={classes['sort-selection'] + " " + classes['selection-right']}>
                    <i className="fas fa-chevron-right"/>
                </span>
            </div>
        )
    }
}

export default PageSelectorOffer;