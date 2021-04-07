import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import UserList from './users/UserList';
import UserCreate from './users/UserCreate';
import UserEdit from './users/UserEdit';

import './styles/global.scss';
import Login from './login';

function App() {
  const dataProvider = jsonServerProvider('https://localhost:3000/api');

  return (
    <Admin loginPage={Login} dataProvider={dataProvider}>
      <Resource
        name="users"
        list={UserList}
        create={UserCreate}
        edit={UserEdit}
      />
    </Admin>
  );
}

export default App;
