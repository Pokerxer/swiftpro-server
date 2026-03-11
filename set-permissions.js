module.exports = async (strapi) => {
  try {
    const roleService = strapi.plugin('users-permissions').service('role');
    
    // Find the public role
    const roles = await roleService.find();
    const publicRole = roles.find(role => role.type === 'public');
    
    if (!publicRole) return;
    
    // Get full role with permissions
    const role = await roleService.findOne(publicRole.id);
    
    // APIs to make public
    const publicApis = [
      'api::service.service',
      'api::project.project',
      'api::blog-post.blog-post',
      'api::team-member.team-member',
      'api::testimonial.testimonial',
      'api::stat.stat'
    ];
    
    let permissionsChanged = false;
    
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
  } catch (error) {
    console.error('Error setting permissions:', error.message);
  }
};
