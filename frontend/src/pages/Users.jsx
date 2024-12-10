import React from 'react';
import useFetch from "../hooks/useFetch"
import Suggestions from '../ui/components/Suggestions';

const Users = () => {
    const {data} = useFetch({endpoint: "suggestion"})
    console.log(data)
  return (
    <div>
      <Suggestions users={data?.data} />
    </div>
  )
}

export default Users