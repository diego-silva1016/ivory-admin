import { List, Datagrid, TextField, EmailField, ListProps } from 'react-admin';

export const UserList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="website" />
      <TextField source="company" />
    </Datagrid>
  </List>
);

export default UserList;
