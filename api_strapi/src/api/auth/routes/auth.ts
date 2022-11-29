export default {
  routes: [
    {
     method: 'POST',
     path: '/auth/otp',
     handler: 'auth.sendOtp',
     config: {
       policies: ['global::is-public'],
       middlewares: [],
     },
    },
    {
      method: 'GET',
      path: '/auth/otp',
      handler: 'auth.checkToken',
      config: {
        policies: ['global::is-public'],
        middlewares: [],
      },
    },
  ],
};
