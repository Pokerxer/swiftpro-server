const strapi = require('@strapi/strapi');
strapi().start().then(async (app) => {
  try {
    const roleService = app.plugin('users-permissions').service('role');
    const roles = await roleService.find();
    const publicRole = roles.find(r => r.type === 'public');
    
    const apis = ['service', 'project', 'blog-post', 'team-member', 'testimonial', 'stat'];
    
    for (const api of apis) {
       for (const action of ['find', 'findOne']) {
          const actionString = `api::${api}.${api}.${action}`;
          
          const exists = await app.db.query('plugin::users-permissions.permission').findOne({
            where: { action: actionString, role: publicRole.id }
          });
          
          if (!exists) {
            await app.db.query('plugin::users-permissions.permission').create({
              data: {
                action: actionString,
                role: publicRole.id
              }
            });
            console.log(`Created permission: ${actionString}`);
          }
       }
    }
    
    console.log("Permissions updated successfully.");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
});
