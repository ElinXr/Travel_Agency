import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка на валидността на данните за вход
    if (!username || !password) {
      return alert('Въведете валидно име и парола.');
    }

    // Автентифициране на потребителя
    // ...

    // Пренасочване на потребителя към таблото за управление
    if (isAuthenticated) {
      window.location.href = '/admin/dashboard';
    }
  };

  return (
    <div className="container">
      <h1>Влизане</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Име</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Парола</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Влизане</button>
      </form>
      <p>
        Нямате акаунт? <Link to="/register">Регистрирайте се</Link>.
      </p>
    </div>
  );
};

export default Login;
