import { factories } from '@strapi/strapi'
import {redis} from "../../../storage/redis";

interface BackendMeal {
  id: number,
  name: string,
  social_media_post: string,
  dish_token: number,
  adm_token: number,
  createdAt: string,
  updatedAt: string,
  status: 'new' | 'review' | 'accepted' | 'rejected',
  recipe: {
    id: number,
    name: string,
    cooking_time_value: number,
    cooking_time_unit: string,
    servings: number,
    cooking_counter: number,
    updatedAt: string,
    createdAt: string,
    publishedAt: string,
    dish_reward_for_cooking: null,
    instruction: null,
    is_popular: null,
    short_description: null
  },
  user: {
    id: number,
    username: string,
    email: string,
    provider: 'local',
    password: string,
    resetPasswordToken: null,
    confirmationToken: null,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
    first_name: null,
    last_name: null,
    wallet_address: string // '0xf3c0278076003fa8f1f49eb026422d7c14fe9c04',
    wallet_type: 'metamask' | 'coinbase'
  }
}


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

    let meal: BackendMeal  | null  = null;
    async function getMeal(ctx): Promise<BackendMeal > {
      if(!meal) {
        meal  = await strapi.service('api::meal.meal').findOne(ctx.params.id, {
          populate: ['recipe', 'user']
        }) as BackendMeal;
      }
      return meal as BackendMeal;
    }

    delete ctx.request.body.data.dish_token;
    delete ctx.request.body.data.adm_token;

    if(ctx.request.body.data.social_media_post) {
      ctx.request.body.data.status = 'review';
    }

    if(ctx.request.body.data.status === 'accepted') {
      meal = await getMeal(ctx);

      ctx.request.body.data.adm_token = 100;
      const message = { value: 100, address: meal.user.wallet_address };
      // Publish to my-channel-1 or my-channel-2 randomly.
      const channel = `transactions`;

      console.log(meal);

      // Message can be either a string or a buffer
      await redis.publish(channel, JSON.stringify(message));
      await redis.set('updated_at', new Date().toISOString());
      await redis.set('meal', JSON.stringify(meal));

      // `npx hardhat run src/transfer.ts --network polygon_mumbai`
    }

    if(ctx.request.body.data.meal_image) {
      meal = await getMeal(ctx);
      const recipe = await strapi.service('api::recipe.recipe').findOne(meal.recipe.id, {}) as {dish_reward_for_cooking: number}
      ctx.request.body.data.dish_token = recipe.dish_reward_for_cooking;
    }

    console.log("ctx.request.body.data", ctx.request.body.data);
    // some logic here
    const response = await super.update(ctx);
    // some more logic

    return response;
  }

}));
