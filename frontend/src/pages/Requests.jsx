import React, { useState } from 'react'
import useFetch from '../hooks/useFetch';
import FriendRequests from '../ui/components/FriendRequests';
import Wrapper from '../ui/common/Wrapper';

const Requests = () => {
  const [refetchRequests, setReFetchRequests] = useState(false);
  const {data: friendRequests} = useFetch({endpoint: "requests", dep: [refetchRequests]});
  return (
    <Wrapper>
      <FriendRequests friendRequests={friendRequests?.data} />
    </Wrapper>
  )
}

export default Requests