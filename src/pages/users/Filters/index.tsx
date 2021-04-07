import { Filter, TextInput, FilterProps } from 'react-admin';

const UserFilter = (props: FilterProps) => (
  <Filter {...props}>
    <TextInput label="Name" source="filterName" alwaysOn />
    <TextInput label="Username" source="filterUserName" alwaysOn />
    <TextInput label="Email" source="filterEmail" alwaysOn />
    <TextInput label="Company" source="filterCompany" alwaysOn />
  </Filter>
);

export default UserFilter;
