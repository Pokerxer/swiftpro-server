const fs = require('fs');
const path = require('path');

const contentTypes = [
  {
    name: 'service',
    attributes: {
      title: { type: 'string', required: true },
      slug: { type: 'uid', targetField: 'title', required: true },
      shortDescription: { type: 'text', required: true },
      fullDescription: { type: 'richtext' },
      icon: { type: 'string' },
      features: { type: 'json' },
      processSteps: { type: 'json' }
    }
  },
  {
    name: 'project',
    attributes: {
      title: { type: 'string', required: true },
      slug: { type: 'uid', targetField: 'title', required: true },
      category: { type: 'enumeration', enum: ['Web', 'Infrastructure', 'Software', 'Security'], required: true },
      description: { type: 'text', required: true },
      fullDescription: { type: 'richtext' },
      image: { type: 'media', multiple: false, allowedTypes: ['images'] },
      tags: { type: 'json' },
      client: { type: 'string' },
      year: { type: 'string' }
    }
  },
  {
    name: 'blog-post',
    attributes: {
      title: { type: 'string', required: true },
      slug: { type: 'uid', targetField: 'title', required: true },
      excerpt: { type: 'text', required: true },
      content: { type: 'richtext' },
      image: { type: 'media', multiple: false, allowedTypes: ['images'] },
      author: { type: 'string' },
      date: { type: 'string' },
      category: { type: 'string' },
      readTime: { type: 'string' }
    }
  },
  {
    name: 'team-member',
    attributes: {
      name: { type: 'string', required: true },
      role: { type: 'string', required: true },
      image: { type: 'media', multiple: false, allowedTypes: ['images'] },
      linkedin: { type: 'string' }
    }
  },
  {
    name: 'testimonial',
    attributes: {
      name: { type: 'string', required: true },
      company: { type: 'string' },
      role: { type: 'string' },
      quote: { type: 'text' },
      rating: { type: 'integer' },
      image: { type: 'media', multiple: false, allowedTypes: ['images'] }
    }
  },
  {
    name: 'stat',
    attributes: {
      value: { type: 'integer', required: true },
      suffix: { type: 'string' },
      label: { type: 'string', required: true }
    }
  }
];

contentTypes.forEach(ct => {
  const dir = path.join(__dirname, 'src', 'api', ct.name);
  const ctDir = path.join(dir, 'content-types', ct.name);
  const controllersDir = path.join(dir, 'controllers');
  const routesDir = path.join(dir, 'routes');
  const servicesDir = path.join(dir, 'services');
  
  fs.mkdirSync(ctDir, { recursive: true });
  fs.mkdirSync(controllersDir, { recursive: true });
  fs.mkdirSync(routesDir, { recursive: true });
  fs.mkdirSync(servicesDir, { recursive: true });
  
  // schema.json
  const schema = {
    kind: 'collectionType',
    collectionName: ct.name.replace('-', '_') + 's',
    info: {
      singularName: ct.name,
      pluralName: ct.name + 's',
      displayName: ct.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    },
    options: {
      draftAndPublish: true
    },
    pluginOptions: {},
    attributes: ct.attributes
  };
  fs.writeFileSync(path.join(ctDir, 'schema.json'), JSON.stringify(schema, null, 2));
  
  // controller
  fs.writeFileSync(path.join(controllersDir, `${ct.name}.ts`), `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreController('api::${ct.name}.${ct.name}');\n`);
  
  // route
  fs.writeFileSync(path.join(routesDir, `${ct.name}.ts`), `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreRouter('api::${ct.name}.${ct.name}');\n`);
  
  // service
  fs.writeFileSync(path.join(servicesDir, `${ct.name}.ts`), `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreService('api::${ct.name}.${ct.name}');\n`);
});

console.log('Schemas generated successfully!');
