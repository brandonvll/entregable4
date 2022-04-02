import React, { useEffect } from 'react';
import { useState } from 'react';

const UsersForm = ({addUser, userEdit, selectUpdateUser, updateUser}) => {

    const [first_name, setFirst_name] = useState(undefined);
    const [last_name, setLast_name] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [password, setPassword ] = useState(undefined);
    const [birthday, setBirthday] = useState(undefined);
    const [errorValidation, setErrorValidation] = useState([]);

    //variables de validacion
    const [validationFirst_name, setValidationFirst_name] = useState(null);
    const [validationLast_name, setValidationLast_name] = useState(null);
    const [validationEmail, setValidationEmail] = useState(null);
    const [validationPassword, setValidationPassword ] = useState(null);
    const [validationBirthday, setValidationBirthday] = useState(null);

    useEffect(() => {
        if(userEdit){
        setFirst_name(userEdit.first_name)
        setLast_name(userEdit.last_name)
        setEmail(userEdit.email)
        setPassword(userEdit.password)
        setBirthday(userEdit.birthday)
    } else {
        setFirst_name(undefined)
        setLast_name(undefined)
        setEmail(undefined)
        setPassword(undefined)
        setBirthday(undefined)
    }
    },[userEdit])

    const submit = e => {
        e.preventDefault();
            const user = {
                first_name,
                last_name,
                email,
                password,   
                birthday
            }
            setErrorValidation([]);
            setValidationFirst_name(null);
            setValidationLast_name(null);
            setValidationEmail(null);
            setValidationPassword(null);
            setValidationBirthday(null);
        if(userEdit){
            user.id = userEdit.id;
            updateUser(user);
            selectUpdateUser(null);
            console.log(userEdit);
        }else{
            console.log(user);
            console.log(userEdit);
            if (user["first_name"] === undefined) {
                errorValidation.push("Por favor ingresa el nombre");
                setValidationFirst_name("Por favor ingresa el nombre");
            }

            if (user["last_name"] === undefined) {
                errorValidation.push("Por favor ingresa el apellido");
                setValidationLast_name("Por favor ingresa el apellido");
            }

            if (user["email"] === undefined) {
                errorValidation.push("Por favor ingresa el email");
                setValidationEmail("Por favor ingresa el email");
            }

            if (typeof user["email"] !== "undefined") {
                let posicionArroba = user["email"].lastIndexOf('@');
                let posicionPunto = user["email"].lastIndexOf('.');
        
                if (!(posicionArroba < posicionPunto && posicionArroba > 0 && user["email"].indexOf('@@') === -1 && posicionPunto > 2 && (user["email"].length - posicionPunto) > 2)) {
                    errorValidation.push("Por favor, ingresa un correo válido.");
                    setValidationEmail("Por favor, ingresa un correo válido.");

                }
            }

            if (user["password"] === undefined) {
                errorValidation.push("Por favor ingresa la contraseña");
                setValidationPassword("Por favor ingresa la contraseña");
            }

            if (user["birthday"] === undefined) {
                errorValidation.push("Por favor ingresa la fecha de tu cumpleaños");
                setValidationBirthday("Por favor ingresa la fecha de tu cumpleaños");
            }
            if (errorValidation.length === 0) {
                addUser(user);
            }
        }
}

    return (
        <div className='container-register'>
            <form onSubmit={submit}>
                <div className="input-container">
                <h1 className='title'>New User</h1>
                    <label htmlFor='first_name'><b className='escribe'>*First Name: </b></label>
                    <input 
                        type="text" 
                        id= 'first_name' 
                        onChange={e => setFirst_name(e.target.value)}
                        value={first_name}
                   />
                    {validationFirst_name !== null ?(<p className='validador'>{validationFirst_name}</p>):(<div></div>)}
                </div>

                <div className="input-container">
                    <label htmlFor='last_name'><b className='escribe'>*Last Name: </b></label>
                    <input 
                        type="text" 
                        id= 'last_name'
                        onChange={e => setLast_name(e.target.value)}
                        value={last_name}
                   />
                    {validationLast_name !== null ?(<p className='validador'>{validationLast_name}</p>):(<div></div>)}

                </div>
                
                <div className="input-container">
                    <label htmlFor='email'><b className='escribe'>*Email: </b></label>
                    <input 
                        type="text" 
                        id= 'email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                   />
                    {validationEmail !== null ?(<p className='validador'>{validationEmail}</p>):(<div></div>)}
                </div>

                <div className="input-container">
                    <label htmlFor='password'><b className='escribe'>*Password: </b></label>
                    <input 
                        type="password" 
                        id= 'password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                   />
                    {validationPassword !== null ?(<p className='validador'>{validationPassword}</p>):(<div></div>)}
                </div>
                <div className="input-container">
                    <label htmlFor='birthday'><b className='escribe'>*Birthday: </b></label>
                    <input 
                        type="date" 
                        id= 'birthday'
                        onChange={e => setBirthday(e.target.value)}
                        value={birthday}
                   />
                    {validationBirthday !== null ?(<p className='validador'>{validationBirthday}</p>):(<div></div>)}
                </div>

                

                <button className='boton'>
                    Submit
                </button>

            {
                userEdit &&
                 <button className='boton'
                >Actualizar</button>
                
            }

            </form>
        </div>
    );
};

export default UsersForm;