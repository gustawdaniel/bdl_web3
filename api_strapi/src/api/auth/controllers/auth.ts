import {getService} from "@strapi/plugin-users-permissions/server/utils";
import crypto from "crypto";
import mailgun from "mailgun-js";

export default {
  sendOtp: async (ctx) => {
    const {email} = ctx.request.body;
    const username = email, provider = 'local';

    const identifierFilter = {
      $or: [
        {email: email.toLowerCase()},
        {username: email.toLowerCase()},
        {username},
        {email: username},
      ],
    };

    let user = await strapi.query('plugin::users-permissions.user').findOne({
      where: {...identifierFilter, provider},
    });


    if (user) {
      console.log(user);
    } else {
      const pluginStore = await strapi.store({type: 'plugin', name: 'users-permissions'});

      const settings = await pluginStore.get({key: 'advanced'});

      const role = await strapi
        .query('plugin::users-permissions.role')
        .findOne({where: {type: settings.default_role}});

      const newUser = {
        provider,
        role: role.id,
        email: email.toLowerCase(),
        username,
        confirmed: !settings.email_confirmation,
      };

      user = await getService('user').add(newUser);
    }

    const confirmationToken = crypto.randomBytes(2).toString('hex').toUpperCase()
    await strapi.plugin('users-permissions').service('user').edit(user.id, {confirmationToken});

    const DOMAIN = process.env.MAILGUN_DOMAIN;
    const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});
    const data = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: user.email,
      subject: `Login to admeal.xyz`,
      text: `Token: ${confirmationToken}`
    };
    const body: {id: string, message: string} = await new Promise((resolve, reject) => {
      mg.messages().send(data, function (error, body) {
        if (error) reject(error)
        else resolve(body)
      });
    })

    return {
//      confirmationToken,
      ...body
    }
  },

  checkToken: async (ctx,next) => {
    return strapi.controllers['plugin::users-permissions.auth'].emailConfirmation(ctx, next, true)
  }
};
