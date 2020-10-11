import React from 'react'
import { Redirect } from "react-router-dom";
import UserContext from "./UserContext"

function Auth(WrappedComponent) {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				username: '',
				groups: [],
				loaded: false,
				error: false
			}
		}
		componentDidMount() {
	        fetch('http://127.0.0.1:8000/auth/profile/', {
	            method: 'GET',
	            credentials: 'include'
	        })
	            .then(response => {
	                if (!response.ok) {
	                    this.setState({
	                        error: true
	                    })
	                }
	                return response.json();
	            })
	            .then(data => {
	                this.setState({
	                    username: data.username,
	                    groups: data.groups,
	                    loaded: true
	                })
	            })
	            .catch(error => {
	            });
	    }
	    render() {
	    	const user = {
	    		username: this.state.username,
	    		groups: this.state.groups
	    	}

        	if (this.state.loaded && !this.state.error){
        		return (
        			<WrappedComponent user={user} {...this.props} />
        		)
        	}
        	else if (this.state.loaded && this.state.error){
        		return (
		            <Redirect to="/login" />
		        )
        	}
        	else{
        		return (
        			<div>Loading</div>
        		)
        	}
	    }
	};
}

Auth.contextType = UserContext;

export default Auth;