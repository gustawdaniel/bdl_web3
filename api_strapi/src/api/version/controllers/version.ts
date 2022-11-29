import pJson from '../../../../package.json'

export default {
  get: async (ctx, next) => {
    return {
      name: pJson.name,
      version: pJson.version
    }
  }
};
