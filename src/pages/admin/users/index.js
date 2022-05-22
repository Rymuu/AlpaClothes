import List from "../../../components/List";
import { useEffect, useState } from "react";
import userService from "../../../services/user.service";
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const [users, setUsers] = useState();
  
  useEffect(() => {
    let jwt = localStorage.getItem('jwt');
    userService.getUsers(jwt)
      .then((data) => {
        setUsers(data.data[0]);
        console.log(data.data);
      })
      .catch(err => console.log(err))


  }, []);
  return (
    <div>
      <br />
      {users &&
        users.map((user) => (
          <List user={user} key={user.id} />
        ))}
    </div>
  );
}

export default Index;