import { useState, useEffect, useCallback } from 'react';
import { createHook } from 'hookleton';

const URL = 'https://randomuser.me/api/?results=10';

const useFetchUsers = createHook(() => {
  const [users, setUsers] = useState({});
  const [again, updater] = useState();

  async function fetchData() {
    const response = await fetch(URL);
    const data = await response.json();
    console.log('[useFetch]: Fetched 10 random users');
    setUsers(data);
  }

  useEffect(() => {
    fetchData();
  }, [again]);

  const fetchAgain = () => updater(s => ~s);

  return [users, fetchAgain];
});

const Hookletons = () => {
  useFetchUsers.use();
  return null;
};

const RenderUser = ({ render }) => {
  const [data, fetchAgain] = useFetchUsers();
  return (
    <ul style={{ listStyle: 'none', borderStyle: 'solid' }}>
      {data.results ? (
        data.results.map((user, idx) => (
          <li key={idx}>
            <span>{idx}: </span>
            {render(user)}
            <br />
          </li>
        ))
      ) : (
        <span>loading...</span>
      )}
      <li>
        <button onClick={fetchAgain}>fetch Again</button>
      </li>
    </ul>
  );
};

const Name = ({ name }) => (
  <span>
    {name.first} {name.last}
  </span>
);

const Gender = ({ gender }) => <span>{gender}</span>;

const Location = ({ location }) => (
  <span>
    {location.city}, {location.state}
  </span>
);

const Email = ({ email }) => <span>{email}</span>;

const Users = () => (
  <table>
    <tbody>
      <tr>
        <td>
          <RenderUser render={Name} />
        </td>
        <td>
          <RenderUser render={Gender} />
        </td>
        <td>
          <RenderUser render={Location} />
        </td>
        <td>
          <RenderUser render={Email} />
        </td>
      </tr>
    </tbody>
  </table>
);

// Repeat `Users` component 4 times
export default () => (
  <>
    <Hookletons />
    <h1>
      Fetched 10 random users from: <span>{URL}</span>
    </h1>
    <ul style={{ listStyle: 'none' }}>
      {Array.from({ length: 4 }).map((_, idx) => (
        <li key={idx}>
          <Users />
        </li>
      ))}
    </ul>
  </>
);
