import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../constants/baseURL.js";
import { goToFeed, goToSignUp } from "../../routes/coordinator.js";
import { FormContainer, InputContainer } from "./styled.js";
import useForms from "../../hooks/useForms.js";

function LoginPage() {
  const navigate = useNavigate()
  const { form, onChange } = useForms({ email: "", password: "" })

  const enviaLogin = (e) => {
    e.preventDefault()
    console.log(form)

    const body = {
      email: form.email,
      password: form.password
    }

    axios.post(`${baseURL}/user/login`, body)
    .then((resp)=>{
      console.log(resp.data.token);
      localStorage.setItem('token', resp.data.token)
      goToFeed(navigate)
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <main>
      <h1>Login</h1>
      <FormContainer onSubmit={enviaLogin} >
        <InputContainer>
          <label htmlFor="email">E-mail:</label>
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            id="email"
            required
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Senha:</label>
          <input
           name="password"
          value={form.password}
          onChange={onChange}
            id="password"
            required
          />
        </InputContainer>
        <button>Entrar</button>
        <button onClick={() => goToSignUp(navigate)}>Não tenho cadastro</button>
      </FormContainer>
    </main>
  );
}

export default LoginPage;
