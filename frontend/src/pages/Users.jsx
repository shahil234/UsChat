import React from 'react';
import useFetch from "../hooks/useFetch"

const Users = () => {
    const {data} = useFetch({endpoint: "suggestion"})
  return (
    <div>Users</div>
  )
}

export default Users