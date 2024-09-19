import { useState } from "react";
import "../App.css";

function MyForm({ onFormSubmit }) {
  // Estado Inicial
  const [inputs, setInputs] = useState({});

  // Cuando se escribe algo cambian las variables
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Manda los Datos
  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(inputs);
  };

  // Render del Form
  return (
    <form className="App-forms" onSubmit={handleSubmit}>
      <label>
        Username
        <input
          type="text"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Password
        <input
          type="text"
          name="password"
          value={inputs.password || ""}
          onChange={handleChange}
        />
      </label>
      <input type="submit" />
    </form>
  );
}

export default MyForm;
