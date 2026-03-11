const fs = require('fs');
const path = require('path');

const contentTypes = [
  {
    name: 'faq',
    kind: 'collectionType',
    attributes: {
      category: { type: 'string', required: true },
      question: { type: 'string', required: true },
      answer: { type: 'text', required: true }
    }
  },
  {
    name: 'why-choose-us',
    kind: 'collectionType',
    attributes: {
      title: { type: 'string', required: true },
      description: { type: 'text', required: true },
      icon: { type: 'string', required: true }
    }
  },
  {
    name: 'hero-slide',
    kind: 'collectionType',
    attributes: {
      subtitle: { type: 'string', required: true },
      title: { type: 'string', required: true },
      highlight: { type: 'string', required: true },
      description: { type: 'text', required: true },
      ctaText: { type: 'string' },
      ctaHref: { type: 'string' },
      secondaryCtaText: { type: 'string' },
      secondaryCtaHref: { type: 'string' },
      bgGradient: { type: 'string' },
      features: { type: 'json' },
      stats: { type: 'json' }
    }
  },
  {
    name: 'company-info',
    kind: 'singleType',
    attributes: {
      name: { type: 'string', required: true },
      tagline: { type: 'string' },
      description: { type: 'text' },
      email: { type: 'email', required: true },
      phone: { type: 'string', required: true },
      phoneRaw: { type: 'string' },
      whatsappMessage: { type: 'text' },
      address: { type: 'text' },
      rcNumber: { type: 'string' },
      foundedYear: { type: 'integer' }
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
    kind: ct.kind,
    collectionName: ct.name.replace(/-/g, '_') + (ct.kind === 'collectionType' ? 's' : ''),
    info: {
      singularName: ct.name,
      pluralName: ct.name + (ct.kind === 'collectionType' ? 's' : ''),
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

console.log('More schemas generated successfully!');
