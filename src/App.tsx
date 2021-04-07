import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import UserList from './users/UserList';
import UserCreate from './users/UserCreate';
import UserEdit from './users/UserEdit';

function App() {
  const dataProvider = jsonServerProvider('https://localhost:3000/api');

  return (
    <Admin dataProvider={dataProvider}>
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
