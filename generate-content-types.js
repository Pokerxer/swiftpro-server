const fs = require('fs');
const path = require('path');

const contentTypes = [
  {
    name: 'company-info',
    attributes: {
      name: { type: 'string', required: true },
      tagline: { type: 'string' },
      description: { type: 'text' },
      email: { type: 'string' },
      phone: { type: 'string' },
      phoneRaw: { type: 'string' },
      whatsappMessage: { type: 'text' },
      address: { type: 'string' },
      rcNumber: { type: 'string' },
      foundedYear: { type: 'integer' }
    }
  },
  {
    name: 'hero-slide',
    attributes: {
      title: { type: 'string', required: true },
      subtitle: { type: 'text' },
      ctaPrimaryText: { type: 'string' },
      ctaPrimaryLink: { type: 'string' },
      ctaSecondaryText: { type: 'string' },
      ctaSecondaryLink: { type: 'string' },
      backgroundImage: { type: 'media', multiple: false },
      order: { type: 'integer' }
    }
  },
  {
    name: 'faq',
    attributes: {
      question: { type: 'string', required: true },
      answer: { type: 'text', required: true },
      category: { type: 'string' },
      order: { type: 'integer' }
    }
  },
  {
    name: 'why-choose-us',
    attributes: {
      title: { type: 'string', required: true },
      description: { type: 'text', required: true },
      icon: { type: 'string' }
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
  fs.writeFileSync(path.join(controllersDir, `${ct.name}.ts`), `// @ts-nocheck\nimport { factories } from '@strapi/strapi';\n\nexport default factories.createCoreController('api::${ct.name}.${ct.name}');\n`);
  
  // route
  fs.writeFileSync(path.join(routesDir, `${ct.name}.ts`), `// @ts-nocheck\nimport { factories } from '@strapi/strapi';\n\nexport default factories.createCoreRouter('api::${ct.name}.${ct.name}');\n`);
  
  // service
  fs.writeFileSync(path.join(servicesDir, `${ct.name}.ts`), `// @ts-nocheck\nimport { factories } from '@strapi/strapi';\n\nexport default factories.createCoreService('api::${ct.name}.${ct.name}');\n`);
});

console.log('Additional content types generated successfully!');