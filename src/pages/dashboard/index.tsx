import { useEffect, useState } from 'react';
import { useDataProvider } from 'react-admin';

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

interface UserMonthsProps {
  id: string;
  name: string;
  users: number;
}

const Dashboard = () => {
  const dataProvider = useDataProvider();
  const [usersMonth, setUsersMonth] = useState<UserMonthsProps[]>([]);

  const data = usersMonth;

  useEffect(() => {
    function getUsersMonth() {
      dataProvider
        .getList<UserMonthsProps>('dashboard', {
          pagination: {
            page: 0,
            perPage: 1,
          },
          sort: {
            field: '',
            order: '',
          },
          filter: 2,
        })
        .then(res => setUsersMonth(res.data))
        .catch(err => console.log('erro'));
    }

    getUsersMonth();
  }, [dataProvider]);

  return (
    <AreaChart
      width={500}
      height={200}
      data={data}
      margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
    >
      <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#7884d8" />
      <XAxis dataKey="name" fontSize={14} />
      <YAxis fontSize={14} />
      <Tooltip />
    </AreaChart>
  );
};

export default Dashboard;
