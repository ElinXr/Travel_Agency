import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Dashboard = () => {
  const [administrators, setAdministrators] = useState([]);
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    // Извличане на списък с администратори
    axios.get('/api/administrators')
      .then((response) => {
        setAdministrators(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (data) => {
    // Добавяне на нов администратор
    axios.post('/api/administrators', data)
      .then((response) => {
        // Успешно добавяне
        // Опресняване на списъка с администратори
        setAdministrators([...administrators, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    // Редактиране на съществуващ администратор
    const administrator = administrators.find((administrator) => administrator._id === id);
    const formData = new FormData();
    formData.append('name', administrator.name);
    formData.append('email', administrator.email);
    axios.put(`/api/administrators/${id}`, formData)
      .then((response) => {
        // Успешно редактиране
        // Опресняване на списъка с администратори
        const updatedAdministrators = administrators.map((administrator) => {
          if (administrator._id === id) {
            return response.data;
          }
          return administrator;
        });
        setAdministrators(updatedAdministrators);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    // Изтриване на администратор
    if (window.confirm('Сигурни ли сте, че искате да изтриете този администратор?')) {
      axios.delete(`/api/administrators/${id}`)
        .then((response) => {
          // Успешно изтриване
          // Опресняване на списъка с администратори
          const updatedAdministrators = administrators.filter((administrator) => administrator._id !== id);
          setAdministrators(updatedAdministrators);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="container">
      <h1>Табло за управление</h1>
      <p>
        <Link to="/admin/login">Изход</Link>
      </p>
      <h2>Списък с администратори</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Име</th>
            <th>Имейл</th>
            <th>Дата на създаване</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {administrators.map((administrator) => (
            <tr key={administrator._id}>
              <td>{administrator.name}</td>
              <td>{administrator.email}</td>
              <td>{administrator.createdAt}</td>
              <td>
                <button onClick={() => handleEdit(administrator._id)}>Редактиране</button>
                <button onClick={() => handleDelete(administrator._id)}>Изтриване</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Добавяне на нов администратор</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Име</label>
        <input
          type="text"
          name="name"
          id="name"
          ref={register({ required: true })}
        />
        {errors.name && <p className="error">Въведете име</p>}
        <label htmlFor="email">Имейл</label>
        <input
          type="email"
          name="email"
          id="email"
          ref={register({ required: true })}
        />
        {errors.email && <p className="error">Въведете валиден имейл адрес</p>}
        <button type="submit">Добавяне</button>
      </form>
    </div>
  );
};

export default Dashboard;
