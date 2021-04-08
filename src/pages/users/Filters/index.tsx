import { useMemo } from 'react';
import {
  Filter,
  TextInput,
  FilterProps,
  SelectInput,
  useGetList,
} from 'react-admin';

type FilterPropsAtualizado = Omit<FilterProps, 'children'>;

interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: string;
  createdAt: Date;
}

interface CompanyProps {
  id: string;
  company: string;
}

const UserFilter = (props: FilterPropsAtualizado) => {
  const { data } = useGetList<UserProps>('users');

  const listaCompanys = useMemo(() => {
    const companys: CompanyProps[] = [];

    Object.keys(data).forEach(function (item) {
      if (item === '1') {
        companys.push({ id: data[item].company, company: data[item].company });
      } else {
        const companyExist = companys.find(
          company => company.company === data[item].company,
        );

        if (!companyExist)
          companys.push({
            id: data[item].company,
            company: data[item].company,
          });
      }
    });

    return companys;
  }, [data]);

  return (
    <Filter {...props}>
      <TextInput label="Name" source="filterName" alwaysOn />
      <TextInput label="Username" source="filterUserName" alwaysOn />
      <TextInput label="Email" source="filterEmail" alwaysOn />
      <SelectInput
        label="Company"
        optionText="company"
        source="filterCompany"
        choices={listaCompanys}
        alwaysOn
      />
    </Filter>
  );
};

export default UserFilter;
