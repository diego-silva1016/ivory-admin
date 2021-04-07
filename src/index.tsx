import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model, Registry, Response } from 'miragejs';

// eslint-disable-next-line import/no-unresolved
import { ModelDefinition } from 'miragejs/-types';
// eslint-disable-next-line import/no-unresolved
import Schema from 'miragejs/orm/schema';
import App from './App';

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

interface ParamsProps {
  _sort?: 'name' | 'username' | 'email' | 'phone' | 'website' | 'company';
  _start?: string;
  _end?: string;
  _order?: 'ASC' | 'DESC';
}

const Props: ModelDefinition<UserProps> = Model;

type AppRegistry = Registry<{ user: typeof Props }, { Factory: any }>;
type AppSchema = Schema<AppRegistry>;

createServer({
  models: {
    user: Model,
  },

  seeds(server) {
    server.db.loadData({
      users: [
        {
          id: 1,
          name: 'Diego Ribeiro',
          username: 'Diego',
          email: 'diego@gmail.com',
          phone: '(31) 39999-9999',
          website: 'www.google.com',
          company: 'Ivory',
          createdAt: new Date(2021, 0, 20),
        },
        {
          id: 2,
          name: 'Airton Senna',
          username: 'Airton',
          email: 'airton@gmail.com',
          phone: '(31) 49999-9999',
          website: 'www.google.com',
          company: 'Ivory',
          createdAt: new Date(2021, 0, 20),
        },
        {
          id: 3,
          name: 'Neymar Junior',
          username: 'Neymar',
          email: 'neymar@gmail.com',
          phone: '(31) 59999-9999',
          website: 'www.google.com',
          company: 'Ivory',
          createdAt: new Date(2021, 0, 20),
        },
        {
          id: 4,
          name: 'Batista',
          username: 'Batista',
          email: 'batista@gmail.com',
          phone: '(31) 69999-9999',
          website: 'www.google.com',
          company: 'Ivory',
          createdAt: new Date(2021, 2, 20),
        },
        {
          id: 5,
          name: 'Ana',
          username: 'Ana',
          email: 'ana@gmail.com',
          phone: '(31) 99999-7999',
          website: 'www.google.com',
          company: 'Ivory',
          createdAt: new Date(2021, 2, 20),
        },
        {
          id: 6,
          name: 'Luciano',
          username: 'Luciano',
          email: 'luaciano@gmail.com',
          phone: '(31) 99999-8999',
          website: 'www.google.com',
          company: 'Ivory',
          createdAt: new Date(2021, 2, 20),
        },
        {
          id: 7,
          name: 'Matheus',
          username: 'Matheus',
          email: 'matheus@gmail.com',
          phone: '(31) 99999-9979',
          website: 'www.google.com',
          company: 'Ivory',
          createdAt: new Date(),
        },
      ] as UserProps[],
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/users', (schema: AppSchema, request) => {
      const params: ParamsProps = request.queryParams;
      const users = schema.all('user');

      const headers = {
        'x-total-count': `${users.length}`,
      };

      const modelsFormatados = users.models.sort((a, b) => {
        if (params._order === 'ASC') {
          if (a[params._sort || 'id'] < b[params._sort || 'id']) return -1;
          if (a[params._sort || 'id'] > b[params._sort || 'id']) return 1;

          return 0;
        }
        if (a[params._sort || 'id'] < b[params._sort || 'id']) return 1;
        if (a[params._sort || 'id'] > b[params._sort || 'id']) return -1;

        return 0;
      });

      return new Response(
        200,
        headers,
        modelsFormatados.slice(
          parseInt(params._start || '0', 10),
          parseInt(params._end || '10', 10),
        ),
      );
    });

    this.get('/users/:id', (schema, request) => {
      const { id } = request.params;
      const user = this.schema.find('user', id);

      return new Response(200, {}, user?.attrs);
    });

    this.post('/users', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('user', { ...data, createdAt: new Date() });
    });

    this.put('/users/:id', (schema, request) => {
      const { id } = request.params;

      const updatedUser = JSON.parse(request.requestBody);
      const user = this.schema.find('user', id);

      user?.update(updatedUser);

      return new Response(200, {}, updatedUser);
    });

    this.delete('/users/:id', (schema, request) => {
      const { id } = request.params;

      const removeUser = this.schema.find('user', id);

      removeUser?.destroy();

      return new Response(200);
    });

    this.get('/dashboard', (schema: AppSchema) => {
      const users = schema.all('user');

      const usersMonth = users.models.reduce(
        (accumulator, currentValue) => {
          accumulator[currentValue.createdAt.getMonth()].users += 1;
          return accumulator;
        },
        [
          {
            id: 0,
            name: 'Janeiro',
            users: 0,
          },
          {
            id: 1,
            name: 'Fevereiro',
            users: 0,
          },
          {
            id: 2,
            name: 'Março',
            users: 0,
          },
          {
            id: 3,
            name: 'Abril',
            users: 0,
          },
          {
            id: 4,
            name: 'Maio',
            users: 0,
          },
          {
            id: 5,
            name: 'Junho',
            users: 0,
          },
          {
            id: 6,
            name: 'Julho',
            users: 0,
          },
          {
            id: 7,
            name: 'Agosto',
            users: 0,
          },
          {
            id: 8,
            name: 'Setembro',
            users: 0,
          },
          {
            id: 9,
            name: 'Outubro',
            users: 0,
          },
          {
            id: 10,
            name: 'Novembro',
            users: 0,
          },
          {
            id: 11,
            name: 'Dezembro',
            users: 0,
          },
        ],
      );

      const headers = {
        'x-total-count': `${users.length}`,
      };

      return new Response(
        200,
        headers,
        usersMonth.slice(0, new Date().getMonth() + 1),
      );
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
