import './App.css';
import UsersForm from './componets/UsersForm';
import UsersList from './componets/UsersList';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const usersDefault = [  
  ]

//ESTADOS PRINCIPALES  
  const [users , setUsers] = useState(usersDefault);
  const [userEdit, setUserEdit] = useState(null);


   useEffect(() => {
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsers(res.data))
  }, [])

  const addUser = user => {
    setUsers([...users,user]); 
  }

  const removeUser = id => {
    setUsers(users.filter(user => user.id !== id))
  }

  const selectUpdateUser = user => setUserEdit(user);

  const updateUser = userInfo => {
    const index = users.findIndex(user => 
      user.id === userInfo.id
      );
    users[index] = userInfo;
    setUsers([...users])
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
