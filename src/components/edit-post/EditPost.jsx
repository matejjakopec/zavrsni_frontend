import React from "react";
import classes from "../new-post/NewPost.module.css";
import ReactSelect, {createFilter} from "react-select";
import locations from "../../data/locations.json";
import Spinner from "../spinner/Spinner";
import axios from "axios";
import backendUrl from "../backendUrl";
import history from "../history";
import UserContext from "../../context/UserContext";


class EditPost extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            location: '',
            locationId: '1',
            locationObj: [],
            spinner: []
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios(backendUrl + "api/" + this.props.post + this.props.id, {
        })
            .then((res) => {
                this.setState({title: res.data.title,content: res.data.content, location: res.data.location})
            })
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


    getLocationToSend(){
        return JSON.parse(JSON.stringify(this.getFullLocation(this.state.locationId)[0])).label + ", " +
            JSON.parse(JSON.stringify(this.getFullLocation(this.state.locationId)[0])).zupanija.toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')
    }


    getData(){
        const token = this.context.token;
        return {
                method: 'PUT',
                headers: {
                    "Authorization": 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                data: {
                    title: this.state.title,
                    content: this.state.content,
                    location: this.getLocationToSend(),
                },
            };
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({spinner: <Spinner/>})
        axios(backendUrl + "api/" + this.props.post + this.props.id, this.getData())
            .then(res => {
                this.setState({spinner: "Uspjesno uredjivanje oglasa"})
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
                    <input
                        type="submit"
                        value="Izmijeni oglas"
                        className={classes['action-button']}
                    />
                </form>
                {this.state.spinner}
            </div>
        )
    }
}

EditPost.contextType = UserContext

export default EditPost