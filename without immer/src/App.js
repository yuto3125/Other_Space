import React, { useRef, useCallback, useState } from 'react';
// import logo from './logo.svg';
// import './App.css';

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: '', username: '' });
  const [data, setData] = useState({
    array: [],
    dummy: null,
  });
  const onChange = useCallback(
    e => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: [value],
      });
    },
    [form]
  );
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };
      setData({
        ...data,
        array: data.array.concat(info),
      });
      setForm({
        name: '',
        username: '',
      });
      nextId.current += 1;
    },
    [data, form.name, form.username]
  );
  const onRemove = useCallback(
    id => {
      setData({
        ...data,
        array: data.array.filter(info => info.id !== id),
      });
    },
    [data]
  );
  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input
          className="input username"
          name="username"
          placeholder="ID"
          value={form.username}
          onChange={onChange}
        />
        <input
          className="input name"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="list">
        <ul className="lists">
          {data.array.map(info => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              ID: {info.username}, Name: {info.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
