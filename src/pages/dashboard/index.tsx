import { Box, Card } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDataProvider, useNotify } from 'react-admin';

import styles from './styles.module.scss';
import { UserCharts } from './userCharts';

export interface UserMonthsProps {
  id: string;
  name: string;
  users: number;
}

const Dashboard = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const [loading, setLoading] = useState(false);
  const [usersMonth, setUsersMonth] = useState<UserMonthsProps[]>([]);

  const data = usersMonth;

  useEffect(() => {
    function getUsersMonth() {
      setLoading(true);
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
        .catch((error: Error) => {
          notify(error.message, 'error');
        })
        .finally(() => setLoading(false));
    }

    getUsersMonth();
  }, [dataProvider, notify]);

  return (
    <>
      {!loading && (
        <>
          <Card className={styles.dashboardWelcomeContainer}>
            <Box display="flex">
              <Box flex="1">
                <h1>Bem-vindo ao Ivory Admin!</h1>
                <Box>
                  <p>
                    Neste sistema, você pode realizar cadastros, edições e
                    listagens com paginações e filtros integrados, além de
                    acompanhar os dados graficamente.
                  </p>
                </Box>
              </Box>
            </Box>
          </Card>

          <div className={styles.chartsContainer}>
            <UserCharts data={data} />
            <UserCharts data={data} />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
