import React from 'react';

const UsersList = ({users, removeUser, selectUpdateUser}) => {
    return (
            <ul className='users-list'>
            {
            users.map(user =>(
                <li key={user.id}> 
                    <ul className='Tarjet-list'>
                        <li><b className='title2'>First Name: </b>{user.first_name}</li>
                        <li><b className='title2'>Last name: </b>{user.last_name}</li>
                        <li><b className='title2'>Email: </b>{user.email}</li>
                        <li><b className='title2'>Birthday: </b>{user.birthday}</li>
                    </ul>
                        <button className='boton2' onClick={()=> removeUser(user.id)}>
                            Eliminar
                         </button>
                        <button className='boton2' onClick={()=> selectUpdateUser(user)}>
                             Editar
                             
                         </button>

                </li>
                
            ))
        }
            </ul>
    );
};

export default UsersList;