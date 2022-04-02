import './App.css';
import UsersForm from './componets/UsersForm';
import UsersList from './componets/UsersList';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {


//ESTADOS PRINCIPALES  
  const [users , setUsers] = useState([]);
  const [userEdit, setUserEdit] = useState(null);


   useEffect(() => {
    getUser();
  }, [])

  const getUser = () => {
    axios.get('https://users-crud1.herokuapp.com/users/') 
    .then(res => setUsers(res.data))
  }

  const addUser = user => {
    axios.post('https://users-crud1.herokuapp.com/users/', user)
    .then(() => getUser());
  }

  const removeUser = id => {
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}`) 
    setUsers(users.filter(user => user.id !== id))
  }

  const selectUpdateUser = user => setUserEdit(user);

  const updateUser = userInfo => {
    axios.put(`https://users-crud1.herokuapp.com/users/${userInfo.id}/`, userInfo)
      .then(() => getUser());

    /*   const index = users.findIndex(user => 
      user.id === userInfo.id
      );
    users[index] = userInfo;
    setUsers([...users]) */
  }

  return (
    <div className="App">
      <UsersForm 
        addUser={addUser}
        userEdit={userEdit}
        selectUpdateUser={selectUpdateUser}
        updateUser={updateUser}
        />
      <UsersList 
        users={users} 
        removeUser={removeUser}
        selectUpdateUser={selectUpdateUser}
      />
    </div>
  );
}

export default App;
