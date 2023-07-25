import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { goToFeed, goToLogin } from '../../routes/coordinator';
import { FormContainer, InputContainer } from './styled';
import { baseURL } from '../../constants/baseURL.js';
import useForms from '../../hooks/useForms.js';

function SignUpPage() {
  const navigate = useNavigate();
  const { form, onChange } = useForms({ name: '', email: '', password: '' });

  const signup = (e) => {
    e.preventDefault();
    console.log(form)

    const userData = {
      name: form.name,
      email: form.email,
      password: form.password
    };


    axios.post(`${baseURL}/user/signup`, userData)
      .then((resp) => {
        console.log(resp);
       localStorage.setItem('token', resp.data.token);
        goToFeed(navigate) 
      })
      .catch((error) => {
       console.log(error);
       // alert(error.message); 
      });
  };

  return (
    <main>
      <h1>Cadastro</h1>
      <FormContainer onSubmit={signup}>
          <InputContainer>
            <label htmlFor="name">Nome:</label>
            <input
              name="name"
              pattern="[a-zA-Z\u00C0-\u00FF ]{3,}"
              title="Nome de usuário deve ter no mínimo 3 caracteres. Podendo conter letras, acentos e espaço"
              value={form.name}
              onChange={onChange}
              id="name"
              required
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="email">E-mail:</label>
            <input
              id="email"
              required
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="password">Senha:</label>
            <input
              id="password"
              required
              name="password"
              value={form.password}
              onChange={onChange}
            />
          </InputContainer>

          <button>Cadastrar</button>
          <button onClick={() => goToLogin(navigate)}>Já sou cadastrado</button>
      </FormContainer>
    </main>
  );
}

export default SignUpPage;
