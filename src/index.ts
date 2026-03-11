import type { Core } from '@strapi/strapi';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Set public permissions
    try {
      const roleService = strapi.plugin('users-permissions').service('role');
      const roles = await roleService.find();
      const publicRole = roles.find(role => role.type === 'public');
      
      if (publicRole) {
        const role = await roleService.findOne(publicRole.id);
        
        const publicApis = [
          'api::service.service',
          'api::project.project',
          'api::blog-post.blog-post',
          'api::team-member.team-member',
          'api::testimonial.testimonial',
          'api::stat.stat'
        ];
        
        let permissionsChanged = false;
        
        if (!role.permissions) {
            console.log("No permissions found in role object");
        } else {
            publicApis.forEach(api => {
            if (role.permissions[api]) {
                ['find', 'findOne'].forEach(action => {
                if (role.permissions[api].controllers[api.split('.')[1]][action]) {
                    if (!role.permissions[api].controllers[api.split('.')[1]][action].enabled) {
                    role.permissions[api].controllers[api.split('.')[1]][action].enabled = true;
                    permissionsChanged = true;
                    }
                }
                });
            }
            });
            
            if (permissionsChanged) {
               await roleService.updateRole(role.id, role);
               console.log('✅ Public permissions enabled for all APIs');
            }
        }
      }
    } catch (e) {
        console.error("Error setting permissions:", e);
    }
  },
};
