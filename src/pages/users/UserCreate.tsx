import { Create, SimpleForm, TextInput, CreateProps } from 'react-admin';

export const UserCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="phone" />
      <TextInput source="website" />
      <TextInput source="company" />
    </SimpleForm>
  </Create>
);

export default UserCreate;
