import React from "react";
import classes from "./query.module.css";
import history from "../history";

class Query extends React.Component{

    state={
        dateSelected: true,
        titleSelected: false,
        locationSelected: false,
        ascSelected: true,
        descSelected: false,
        n12selected: true,
        n24selected: false,
        n36selected: false,
        page: 1
    }

    constructor(props) {
        super(props);

        this.handleTitleClick = this.handleTitleClick.bind(this);
        this.handleDateClick = this.handleDateClick.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
        this.handleAscClick = this.handleAscClick.bind(this);
        this.handleDescClick = this.handleDescClick.bind(this);
        this.handle12Click = this.handle12Click.bind(this);
        this.handle24Click = this.handle24Click.bind(this);
        this.handle36Click = this.handle36Click.bind(this);
    }

    handleTitleClick(){
        this.setState({dateSelected: false, titleSelected: true, locationSelected: false}, this.buildQueryString)
    }

    handleDateClick(){
        this.setState({dateSelected: true, titleSelected: false, locationSelected: false}, this.buildQueryString)
    }

    handleLocationClick(){
        this.setState({dateSelected: false, titleSelected: false, locationSelected: true}, this.buildQueryString)
    }

    handleAscClick(){
        this.setState({ascSelected: true, descSelected: false}, this.buildQueryString)
    }

    handleDescClick(){
        this.setState({ascSelected: false, descSelected: true}, this.buildQueryString)
    }

    handle12Click(){
        this.setState({n12selected: true, n24selected: false, n36selected: false}, this.buildQueryString)
    }

    handle24Click(){
        this.setState({n12selected: false, n24selected: true, n36selected: false}, this.buildQueryString)
    }

    handle36Click(){
        this.setState({n12selected: false, n24selected: false, n36selected: true}, this.buildQueryString)
    }

    componentDidMount() {
        // eslint-disable-next-line no-restricted-globals
        let query = new URLSearchParams(this.props.query);
        let orderBy = query.get("orderBy")
        if(orderBy === 'published') this.handleDateClick()
        if(orderBy === 'title') this.handleTitleClick()
        if(orderBy === 'location') this.handleLocationClick()
        let sortOrder = query.get('sortOrder')
        if(sortOrder === 'ASC') this.handleAscClick()
        if(sortOrder === 'DESC') this.handleDescClick()
        let perPage = query.get('perPage')
        if(perPage === '12') this.handle12Click()
        if(perPage === '24') this.handle24Click()
        if(perPage === '36') this.handle36Click()
    }


    buildQueryString(){
        let query = [];
        let perPage;
        if(this.state.n12selected) perPage = "12";
        if(this.state.n24selected) perPage = "24";
        if(this.state.n36selected) perPage = "36";
        query.push("?perPage=" + perPage);
        let orderBy;
        if(this.state.dateSelected) orderBy = "published";
        if(this.state.titleSelected) orderBy = "title";
        if(this.state.locationSelected) orderBy = "location";
        query.push("&orderBy=" + orderBy)
        let sortOrder;
        if(this.state.ascSelected) sortOrder = "ASC";
        if(this.state.descSelected) sortOrder = "DESC";
        query.push("&sortOrder=" + sortOrder);
        // eslint-disable-next-line no-restricted-globals
        let currUrl = location.pathname
        history.replace(currUrl + query.join(""))
        this.props.parentCallback(query.join(""));
    }


    render(){
        return(
            <div className={classes.container}>
                <div className={classes['sortby-container']}>
                    <span>Sortiraj po:</span>
                    <div className={classes['sort-by']}>
                        <span
                            onClick={this.handleDateClick}
                            className={classes['sort-selection'] + " " + classes['selection-left']
                            + " " + (this.state.dateSelected ? classes.selected : "")}>
                            Datumu
                        </span>
                        <span
                            onClick={this.handleTitleClick}
                            className={classes['sort-selection'] + " " + (this.state.titleSelected ? classes.selected : "")}>
                            Naslovu
                        </span>
                        <span
                            onClick={this.handleLocationClick}
                            className={classes['sort-selection'] + " " + classes['selection-right']
                                + " " + (this.state.locationSelected ? classes.selected : "")}>
                            Lokaciji
                        </span>
                    </div>
                    <div className={classes['sort-by']}>
                        <span
                            onClick={this.handleAscClick}
                            className={classes['sort-selection'] + " " + classes['selection-left']
                                + " " + (this.state.ascSelected ? classes.selected : "")}>
                            <i className="fas fa-arrow-up"/>
                        </span>
                        <span
                            onClick={this.handleDescClick}
                            className={classes['sort-selection'] + " " + classes['selection-right']
                                + " " + (this.state.descSelected ? classes.selected : "")}>
                            <i className="fas fa-arrow-down"/><
                            /span>
                    </div>
                </div>
                <div className={classes['sortby-container']}>
                    <span>Rezultata po stranici:</span>
                    <div className={classes['sort-by']}>
                        <span
                            onClick={this.handle12Click}
                            className={classes['sort-selection'] + " " + classes['selection-left']
                                + " " + (this.state.n12selected ? classes.selected : "")}>
                            12
                        </span>
                        <span
                            onClick={this.handle24Click}
                            className={classes['sort-selection'] + " " + (this.state.n24selected ? classes.selected : "")}>
                            24
                        </span>
                        <span
                            onClick={this.handle36Click}
                            className={classes['sort-selection'] + " " + classes['selection-right']
                                + " " + (this.state.n36selected ? classes.selected : "")}>
                            36
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Query;