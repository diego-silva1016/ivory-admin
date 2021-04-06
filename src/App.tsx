import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import UserList from './users';

function App() {
  const dataProvider = jsonServerProvider(
    'https://jsonplaceholder.typicode.com',
  );

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} />
    </Admin>
  );
}

export default App;
