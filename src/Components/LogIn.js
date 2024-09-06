import '../App.css'
import MyForm from './MyForm'
import React from "react";

function LogIn() {

    // Dictamina lo que se hace con la informacion de la form
    const handleFormSubmit = (data) => {
       // Hace el Pass aca
        alert(`Username: ${data.username}\nPassword: ${data.password}`);
    };

    // Se llama a MyForm y se usa la data
    return (
            <div className="App">
                <MyForm onFormSubmit={handleFormSubmit} />
            </div>
    );
}
export default LogIn;