import { Card, CardContent, CardHeader } from '@material-ui/core';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { UserMonthsProps } from '../index';
import styles from './styles.module.scss';

interface UserChartsProps {
  data: UserMonthsProps[] | undefined;
}

export function UserCharts({ data }: UserChartsProps) {
  return (
    <Card>
      <CardHeader title="Usuários" />

      <CardContent>
        <div className={styles.chartContent}>
          <ResponsiveContainer>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="users"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
              <XAxis dataKey="name" fontSize={14} />
              <YAxis fontSize={14} />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
