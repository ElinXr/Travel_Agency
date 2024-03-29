import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (data) => {
    // Изпращане на данните за вход до вашия API
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          // Успешен вход
          // Пренасочване на потребителя към таблото за управление
          window.location.href = '/admin/dashboard';
        } else {
          // Неуспешен вход
          setErrorMessage('Невалидни данни за вход');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1>Вход</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Имейл</label>
        <input
          type="email"
          name="email"
          id="email"
          ref={register({ required: true })}
        />
        {errors.email && <p className="error">Въведете валиден имейл адрес</p>}
        <label htmlFor="password">Парола</label>
        <input
          type="password"
          name="password"
          id="password"
          ref={register({ required: true })}
        />
        {errors.password && <p className="error">Въведете парола</p>}
        <button type="submit">Вход</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <p>
          Нямате акаунт? <Link to="/register">Регистрирайте се</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;