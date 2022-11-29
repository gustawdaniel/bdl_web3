export default {
  routes: [
    {
     method: 'GET',
     path: '/version',
     handler: 'version.get',
     config: {
       policies: ['global::is-public'],
       middlewares: [],
     },
    },
  ],
};
