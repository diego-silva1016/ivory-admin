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
        },
        {
          id: 2,
          name: 'Airton Senna',
          username: 'Airton',
          email: 'airton@gmail.com',
          phone: '(31) 49999-9999',
          website: 'www.google.com',
          company: 'Ivory',
        },
        {
          id: 3,
          name: 'Neymar Junior',
          username: 'Neymar',
          email: 'neymar@gmail.com',
          phone: '(31) 59999-9999',
          website: 'www.google.com',
          company: 'Ivory',
        },
        {
          id: 4,
          name: 'Batista',
          username: 'Batista',
          email: 'batista@gmail.com',
          phone: '(31) 69999-9999',
          website: 'www.google.com',
          company: 'Ivory',
        },
        {
          id: 5,
          name: 'Ana',
          username: 'Ana',
          email: 'ana@gmail.com',
          phone: '(31) 99999-7999',
          website: 'www.google.com',
          company: 'Ivory',
        },
        {
          id: 6,
          name: 'Luciano',
          username: 'Luciano',
          email: 'luaciano@gmail.com',
          phone: '(31) 99999-8999',
          website: 'www.google.com',
          company: 'Ivory',
        },
        {
          id: 7,
          name: 'Matheus',
          username: 'Matheus',
          email: 'matheus@gmail.com',
          phone: '(31) 99999-9979',
          website: 'www.google.com',
          company: 'Ivory',
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

      return schema.create('user', data);
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
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
