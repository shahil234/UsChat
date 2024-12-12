import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import Suggestions from "../ui/components/Suggestions";

const Users = () => {
  const [refetchUsers, setReFetchUsers] = useState(false);

  const { data: users } = useFetch({
    endpoint: "suggestion",
    dep: [refetchUsers],
  });

  return (
    <div>
      <Suggestions setReFetchUsers={setReFetchUsers} users={users?.data} />
    </div>
  );
};

export default Users;
