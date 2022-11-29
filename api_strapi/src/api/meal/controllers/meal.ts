import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::meal.meal',  ({ strapi }) =>  ({

  async create(ctx) {
    ctx.request.body.data.dish_token = 0;
    ctx.request.body.data.adm_token = 0;

    console.log("ctx.state.user", ctx.state.user);

    ctx.request.body.data.user = ctx.state.user.id;

    console.log("body", ctx.request.body);
    // some logic here
    const response = await super.create(ctx);
    // some more logic

    return response;
  },


  async update(ctx) {
    console.log("ctx params", ctx.params);
    console.log("ctx request body", ctx.request.body);

    delete ctx.request.body.data.dish_token;
    delete ctx.request.body.data.adm_token;

    if(ctx.request.body.data.social_media_post) {
      ctx.request.body.data.adm_token = 100;
    }
    if(ctx.request.body.data.meal_image) {
      const meal = await strapi.service('api::meal.meal').findOne(ctx.params.id, {
        populate: 'recipe'
      });
      console.log(meal);
      const recipe = await strapi.service('api::recipe.recipe').findOne(meal.recipe.id, {}) as {dish_revard_for_cooking: number}
      console.log("recipe", recipe);
      ctx.request.body.data.dish_token = recipe.dish_revard_for_cooking;
    }

    console.log("ctx.request.body.data", ctx.request.body.data);
    // some logic here
    const response = await super.update(ctx);
    // some more logic

    return response;
  }

}));
