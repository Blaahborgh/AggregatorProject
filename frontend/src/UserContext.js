import React from 'react'

const UserContext = React.createContext({
	username: "",
	groups: []
})

export default UserContext