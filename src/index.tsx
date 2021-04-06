import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model, Response } from 'miragejs';
import App from './App';

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
          username: 'Thanos',
          email: 'diego@gmail.com',
          address: {
            street: 'rua',
            neighborhood: 'bairro',
            country: 'país',
          },
          phone: '(31) 99999-9999',
          website: 'www.google.com',
          company: 'Ivory',
        },
        {
          id: 2,
          name: 'Diego Ribeiro',
          username: 'Thanos',
          email: 'diego@gmail.com',
          address: {
            street: 'rua',
            neighborhood: 'bairro',
            country: 'país',
          },
          phone: '(31) 99999-9999',
          website: 'www.google.com',
          company: 'Ivory',
        },
        {
          id: 3,
          name: 'Diego Ribeiro',
          username: 'Thanos',
          email: 'diego@gmail.com',
          address: {
            street: 'rua',
            neighborhood: 'bairro',
            country: 'país',
          },
          phone: '(31) 99999-9999',
          website: 'www.google.com',
          company: 'Ivory',
        },
        {
          id: 4,
          name: 'Diego Ribeiro',
          username: 'Thanos',
          email: 'diego@gmail.com',
          address: {
            street: 'rua',
            neighborhood: 'bairro',
            country: 'país',
          },
          phone: '(31) 99999-9999',
          website: 'www.google.com',
          company: 'Ivory',
        },
        {
          id: 5,
          name: 'Diego Ribeiro',
          username: 'Thanos',
          email: 'diego@gmail.com',
          address: {
            street: 'rua',
            neighborhood: 'bairro',
            country: 'país',
          },
          phone: '(31) 99999-9999',
          website: 'www.google.com',
          company: 'Ivory',
        },
        {
          id: 6,
          name: 'Diego Ribeiro',
          username: 'Thanos',
          email: 'diego@gmail.com',
          address: {
            street: 'rua',
            neighborhood: 'bairro',
            country: 'país',
          },
          phone: '(31) 99999-9999',
          website: 'www.google.com',
          company: 'Ivory',
        },
        {
          id: 7,
          name: 'Diego Ribeiro',
          username: 'Thanos',
          email: 'diego@gmail.com',
          address: {
            street: 'rua',
            neighborhood: 'bairro',
            country: 'país',
          },
          phone: '(31) 99999-9999',
          website: 'www.google.com',
          company: 'Ivory',
        },
      ],
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/users', (schema, request) => {
      const params = request.queryParams;
      const users = this.schema.all('user');

      const headers = {
        'x-total-count': `${users.length}`,
      };

      return new Response(
        200,
        headers,
        users.models.slice(
          parseInt(params._start, 10),
          parseInt(params._end, 10),
        ),
      );
    });

    this.post('/users', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('user', data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
