import {
  Filter,
  TextInput,
  FilterProps,
  ReferenceInput,
  SelectInput,
} from 'react-admin';

type FilterPropsAtualizado = Omit<FilterProps, 'children'>;

const UserFilter = (props: FilterPropsAtualizado) => (
  <Filter {...props}>
    <TextInput label="Name" source="filterName" alwaysOn />
    <TextInput label="Username" source="filterUserName" alwaysOn />
    <TextInput label="Email" source="filterEmail" alwaysOn />
    {/* <TextInput label="Company" source="filterCompany" alwaysOn /> */}
    <ReferenceInput
      label="Company"
      source="filterCompany"
      reference="users"
      using="company"
      alwaysOn
    >
      <SelectInput optionText="company" />
    </ReferenceInput>
  </Filter>
);

export default UserFilter;
