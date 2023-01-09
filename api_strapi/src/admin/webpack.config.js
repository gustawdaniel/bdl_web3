'use strict';

console.log("process.env", process.env);
console.log("process.env.API_TOKEN", process.env.API_TOKEN);

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config

  return {
    ...config,
    plugins: [
      ...config.plugins,
      new webpack.EnvironmentPlugin({'DEBUG': false, API_TOKEN: ''}),
      new webpack.DefinePlugin({
        'process.env.XXX': JSON.stringify(process.env.XXX || 'xxx')
      }),
    ]
  };
};
