import { Edit, SimpleForm, TextInput, EditProps } from 'react-admin';

export const UserEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="phone" />
      <TextInput source="website" />
      <TextInput source="company" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
