import React from 'react'
import {Redirect} from "react-router-dom";

function withAuth(WrappedComponent, APIurl = 'http://127.0.0.1:8000/auth/profile/') {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: {},
                loaded: false,
                error: 0
            };
            if (typeof this.props.match.params.id !== 'undefined') {
                this.match = this.props.match.params.id
            } else {
                this.match = ''
            }
        }

        componentDidMount() {
            fetch(APIurl + this.match, {
                method: 'GET',
                credentials: 'include'
            })
                .then(response => {
                    if (!response.ok) {
                        this.setState({
                            error: response.status
                        })
                    }
                    return response.json();
                })
                .then(data => {
                    this.setState({
                        data: data,
                        loaded: true
                    })
                })
                .catch(error => {
                });
        }

        render() {

            if (this.state.loaded && this.state.error === 0) {
                return (
                    <WrappedComponent data={this.state.data} {...this.props} />
                )
            } else if (this.state.loaded && this.state.error === 401) {
                return (
                    <Redirect to={{
                        pathname: "/login",
                        state: {unAuthenticated: true}
                    }}/>
                )
            } else if (this.state.loaded && this.state.error === 403) {
                return (
                    <Redirect to={{
                        pathname: "/",
                        state: {unAuthorized: true}
                    }}/>
                )
            } else {
                return (
                    <div>Loading</div>
                )
            }

        }
    };
}

export default withAuth;