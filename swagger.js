import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        title: 'Kew - UsersAPI',
        version: '1.0.0',
        description: 'Users API'
    },
    host: 'localhost:3000',
    basePath: '/users'
};

const outFile = './swagger_output.json';
const routes = ['./routes/users.js'];

swaggerAutogen()(outFile, routes, doc);