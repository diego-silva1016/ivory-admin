import { List, Datagrid, TextField, EmailField, ListProps } from 'react-admin';
import UserFilter from './Filters';

export const UserList = (props: ListProps) => (
  <>
    <List filters={<UserFilter />} {...props}>
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
  </>
);

export default UserList;
