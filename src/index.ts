import type { Core } from '@strapi/strapi';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // 1. Seed initial data
    try {
      const serviceCount = await strapi.db.query('api::service.service').count();
      if (serviceCount === 0) {
        console.log('Seeding initial data...');
        
        // ... (Services)
        const services = [
          {
            title: "IT Infrastructure",
            slug: "it-infrastructure",
            shortDescription: "Robust and scalable IT infrastructure solutions for modern businesses.",
            fullDescription: "We design, implement, and maintain enterprise-grade IT infrastructure that forms the backbone of your digital operations. From network architecture to server management, our team ensures your systems are secure, reliable, and optimized for performance.",
            icon: "Server",
            features: ["Network Design & Implementation", "Server Virtualization", "Data Center Solutions", "Infrastructure Monitoring", "Disaster Recovery Planning", "24/7 Technical Support"],
            processSteps: [{ title: "Assessment", description: "We analyze your current infrastructure and identify improvement areas." }, { title: "Design", description: "Our architects create a customized infrastructure blueprint aligned with your business goals." }, { title: "Implementation", description: "We deploy the solution with minimal disruption to your operations." }, { title: "Support", description: "Ongoing monitoring and support ensure optimal performance." }],
            publishedAt: new Date()
          },
          {
            title: "Software Development",
            slug: "software-development",
            shortDescription: "Custom software solutions tailored to your business requirements.",
            fullDescription: "Our experienced development team creates bespoke software solutions that address your unique business challenges. From web applications to enterprise systems, we deliver scalable, secure, and user-friendly software that drives business growth.",
            icon: "Code",
            features: ["Web Application Development", "Mobile App Development", "Enterprise Software", "API Development & Integration", "Database Design", "Software Maintenance"],
            processSteps: [{ title: "Requirements Gathering", description: "We work closely with you to understand your business needs and objectives." }, { title: "Planning", description: "Our team creates a detailed project plan including timelines and milestones." }, { title: "Development", description: "We build your solution using modern technologies and best practices." }, { title: "Testing & Deployment", description: "Rigorous testing ensures quality before seamless deployment." }],
            publishedAt: new Date()
          },
          {
            title: "Cybersecurity",
            slug: "cybersecurity",
            shortDescription: "Comprehensive security solutions to protect your digital assets.",
            fullDescription: "In an era of increasing cyber threats, our cybersecurity services provide comprehensive protection for your business. We offer vulnerability assessments, penetration testing, security audits, and incident response to safeguard your data and systems.",
            icon: "Shield",
            features: ["Vulnerability Assessment", "Penetration Testing", "Security Audits", "Incident Response", "Security Awareness Training", "Compliance Management"],
            processSteps: [{ title: "Discovery", description: "We identify your assets and potential vulnerabilities." }, { title: "Analysis", description: "Our experts assess risks and prioritize security measures." }, { title: "Implementation", description: "We deploy appropriate security solutions." }, { title: "Monitoring", description: "Continuous monitoring and regular updates protect against emerging threats." }],
            publishedAt: new Date()
          },
          {
            title: "Cloud Solutions",
            slug: "cloud-solutions",
            shortDescription: "Scalable cloud services for modern business operations.",
            fullDescription: "Transform your business with our cloud solutions. We help organizations migrate to the cloud, optimize cloud infrastructure, and implement hybrid cloud strategies that enhance flexibility, reduce costs, and improve collaboration.",
            icon: "Cloud",
            features: ["Cloud Migration", "Cloud Architecture Design", "AWS/Azure/Google Cloud", "Hybrid Cloud Solutions", "Cloud Security", "Cost Optimization"],
            processSteps: [{ title: "Evaluation", description: "We assess your requirements and recommend the best cloud strategy." }, { title: "Planning", description: "Our team creates a migration roadmap with clear milestones." }, { title: "Migration", description: "We execute the migration with minimal downtime." }, { title: "Optimization", description: "Ongoing optimization ensures cost-effectiveness and performance." }],
            publishedAt: new Date()
          },
          {
            title: "IT Consulting",
            slug: "it-consulting",
            shortDescription: "Strategic IT guidance to drive business transformation.",
            fullDescription: "Our IT consulting services help businesses leverage technology to achieve their strategic objectives. We provide expert advice on digital transformation, IT strategy, technology selection, and process optimization.",
            icon: "Briefcase",
            features: ["Digital Transformation", "IT Strategy Planning", "Technology Assessment", "Process Optimization", "Vendor Management", "IT Governance"],
            processSteps: [{ title: "Consultation", description: "We understand your business goals and current state." }, { title: "Analysis", description: "Our experts analyze your technology landscape and identify opportunities." }, { title: "Strategy", description: "We develop a comprehensive IT strategy aligned with your business objectives." }, { title: "Execution", description: "We support the implementation of recommended solutions." }],
            publishedAt: new Date()
          },
          {
            title: "Managed IT Support",
            slug: "managed-it-support",
            shortDescription: "Reliable managed IT services to keep your business running smoothly.",
            fullDescription: "Our managed IT support services provide proactive monitoring, maintenance, and support for your IT infrastructure. We act as your virtual IT department, ensuring your systems are always up and running efficiently.",
            icon: "Headphones",
            features: ["24/7 Help Desk Support", "Proactive Monitoring", "System Maintenance", "User Support", "Patch Management", "Remote Support"],
            processSteps: [{ title: "Onboarding", description: "We assess your environment and establish monitoring protocols." }, { title: "Setup", description: "Our team configures tools and establish support processes." }, { title: "Support", description: "We provide ongoing support and proactive maintenance." }, { title: "Reporting", description: "Regular reports keep you informed about system health and issues." }],
            publishedAt: new Date()
          }
        ];
        for (const service of services) await strapi.db.query('api::service.service').create({ data: service });

        // Projects
        const projects = [
          { title: "Enterprise Resource Planning System", slug: "enterprise-resource-planning", category: "Software", description: "Custom ERP solution for a leading manufacturing company in Nigeria.", fullDescription: "We developed a comprehensive ERP system that streamlined operations for a major manufacturing company. The solution integrated inventory management, finance, HR, and production planning into a single unified platform.", tags: ["React", "Node.js", "PostgreSQL", "AWS"], client: "Manufacturing Corp Nigeria", year: "2024", publishedAt: new Date() },
          { title: "Fintech Mobile Application", slug: "fintech-mobile-app", category: "Web", description: "Secure mobile banking app with advanced features for a Nigerian bank.", fullDescription: "We built a secure, user-friendly mobile banking application featuring bill payments, fund transfers, savings goals, and real-time notifications. The app serves over 100,000 active users.", tags: ["React Native", "TypeScript", "AWS Amplify", "Biometrics"], client: "Heritage Bank", year: "2023", publishedAt: new Date() },
          { title: "Hospital Information System", slug: "hospital-information-system", category: "Software", description: "Comprehensive HIS for a multi-specialty hospital in Lagos.", fullDescription: "We developed a complete hospital management system covering patient records, appointments, billing, pharmacy, and laboratory management. The system improved operational efficiency by 40%.", tags: ["Angular", "Java", "MySQL", "HL7"], client: "Reddington Hospital", year: "2023", publishedAt: new Date() },
          { title: "E-Commerce Platform", slug: "e-commerce-platform", category: "Web", description: "Full-featured online store for a major retail brand.", fullDescription: "We built a scalable e-commerce platform with product catalog, shopping cart, payment integration, inventory management, and analytics dashboard. The platform handles over 10,000 daily orders.", tags: ["Next.js", "Shopify", "Stripe", "Redis"], client: "Shoprite Nigeria", year: "2022", publishedAt: new Date() },
          { title: "Network Security Infrastructure", slug: "network-security-audit", category: "Security", description: "Complete security overhaul for a financial institution.", fullDescription: "We conducted a comprehensive security assessment and implemented a robust security infrastructure including firewall, IDS/IPS, SIEM, and endpoint protection for a leading Nigerian bank.", tags: ["Fortinet", "Splunk", "Palo Alto", "CrowdStrike"], client: "First Bank Nigeria", year: "2022", publishedAt: new Date() },
          { title: "Cloud Migration Project", slug: "cloud-migration", category: "Infrastructure", description: "Seamless migration to AWS for a logistics company.", fullDescription: "We successfully migrated on-premises infrastructure to AWS, implementing a hybrid cloud architecture that improved scalability and reduced operational costs by 35%.", tags: ["AWS", "Terraform", "Kubernetes", "Docker"], client: "DHL Nigeria", year: "2021", publishedAt: new Date() }
        ];
        for (const project of projects) await strapi.db.query('api::project.project').create({ data: project });

        // Stats
        const stats = [
          { value: 200, suffix: "+", label: "Clients", publishedAt: new Date() },
          { value: 500, suffix: "+", label: "Projects", publishedAt: new Date() },
          { value: 10, suffix: "+", label: "Years Experience", publishedAt: new Date() },
          { value: 98, suffix: "%", label: "Client Satisfaction", publishedAt: new Date() }
        ];
        for (const stat of stats) await strapi.db.query('api::stat.stat').create({ data: stat });

        // Team
        const team = [
          { name: "Dr. Oladipo Adeyemi", role: "Chief Executive Officer", linkedin: "https://linkedin.com", publishedAt: new Date() },
          { name: "Mrs. Chidinma Nwankwo", role: "Chief Technology Officer", linkedin: "https://linkedin.com", publishedAt: new Date() },
          { name: "Mr. Tunde Bakare", role: "Head of Operations", linkedin: "https://linkedin.com", publishedAt: new Date() },
          { name: "Ms. Amara Okonkwo", role: "Head of Business Development", linkedin: "https://linkedin.com", publishedAt: new Date() }
        ];
        for (const member of team) await strapi.db.query('api::team-member.team-member').create({ data: member });

        // Testimonials
        const testimonials = [
          { name: "Dr. Adedamola Okonkwo", company: "Reddington Hospital", role: "Chief Medical Director", quote: "Swift Professional Solutions transformed our hospital operations with their comprehensive IT solution. Their team was professional, knowledgeable, and delivered beyond our expectations.", rating: 5, publishedAt: new Date() },
          { name: "Mr. Chukwuemeka Nwachukwu", company: "Heritage Bank", role: "Head of Digital Banking", quote: "The fintech mobile app they developed has been instrumental in our digital transformation journey. User adoption exceeded 150% of our targets.", rating: 5, publishedAt: new Date() },
          { name: "Mrs. Folake Adeyemi", company: "Shoprite Nigeria", role: "E-Commerce Director", quote: "Our online sales increased by 300% after launching the new e-commerce platform. The team's attention to detail and technical expertise is unmatched.", rating: 5, publishedAt: new Date() },
          { name: "Mr. Olumide Williams", company: "Manufacturing Corp Nigeria", role: "CEO", quote: "The ERP system has revolutionized how we operate. Inventory turnover improved by 45% and we have real-time visibility into all our operations.", rating: 5, publishedAt: new Date() },
          { name: "Mr. Ibrahim Suleiman", company: "First Bank Nigeria", role: "CISO", quote: "Their cybersecurity expertise is world-class. They identified vulnerabilities we didn't know existed and secured our infrastructure comprehensively.", rating: 5, publishedAt: new Date() }
        ];
        for (const test of testimonials) await strapi.db.query('api::testimonial.testimonial').create({ data: test });

        // Blog Posts
        const posts = [
          { title: "Digital Transformation in Nigeria: Trends and Opportunities", slug: "digital-transformation-nigeria-2024", excerpt: "Explore the latest digital transformation trends shaping Nigerian businesses and how organizations can leverage technology for growth.", content: "Full article content here...", author: "Dr. Sarah Johnson", date: "January 15, 2024", category: "Digital Transformation", readTime: "8 min read", publishedAt: new Date() },
          { title: "Essential Cybersecurity Best Practices for Nigerian Businesses", slug: "cybersecurity-best-practices", excerpt: "Learn the critical cybersecurity measures every business in Nigeria should implement to protect against evolving cyber threats.", content: "Full article content here...", author: "Mr. Emmanuel Adeyemi", date: "January 10, 2024", category: "Cybersecurity", readTime: "6 min read", publishedAt: new Date() },
          { title: "Why Cloud Computing is the Future of Nigerian Business", slug: "cloud-computing-benefits", excerpt: "Discover how cloud computing is enabling Nigerian businesses to scale, reduce costs, and improve operational efficiency.", content: "Full article content here...", author: "Mrs. Grace Oluwole", date: "January 5, 2024", category: "Cloud Solutions", readTime: "7 min read", publishedAt: new Date() }
        ];
        for (const post of posts) await strapi.db.query('api::blog-post.blog-post').create({ data: post });

        // FAQs
        const faqs = [
          { category: "Services", question: "What services do you offer?", answer: "We offer a comprehensive range of ICT services including IT Infrastructure, Software Development, Cybersecurity, Cloud Solutions, IT Consulting, and Managed IT Support. Our team of certified professionals delivers tailored solutions to meet your business needs.", publishedAt: new Date() },
          { category: "Consultation", question: "How quickly can you respond to inquiries?", answer: "We typically respond to all inquiries within 24 hours. For urgent matters, please call us directly or reach out via WhatsApp for immediate assistance.", publishedAt: new Date() },
          { category: "Consultation", question: "Do you offer free consultations?", answer: "Yes, we offer free initial consultations to understand your needs and recommend the best solutions for your business. Schedule a call with our experts today.", publishedAt: new Date() },
          { category: "Industries", question: "What industries do you serve?", answer: "We serve clients across various industries including banking, healthcare, manufacturing, retail, logistics, education, government, and more. Our diverse experience allows us to understand industry-specific challenges.", publishedAt: new Date() },
          { category: "Support", question: "Do you offer remote support?", answer: "Yes, we provide remote IT support services to clients across Nigeria and beyond. Our remote support team is available 24/7 to resolve issues quickly and efficiently.", publishedAt: new Date() },
          { category: "Support", question: "What are your support hours?", answer: "Our standard support hours are Mon-Fri: 8:00 AM - 6:00 PM. We also offer 24/7 emergency support for critical issues through our managed IT support packages.", publishedAt: new Date() },
          { category: "Services", question: "Do you provide ongoing maintenance?", answer: "Absolutely! We offer comprehensive maintenance packages that include regular updates, security patches, performance monitoring, and proactive support to keep your systems running smoothly.", publishedAt: new Date() },
          { category: "Consultation", question: "How do I get started?", answer: "Simply fill out the contact form above, call us, or reach out via WhatsApp. Our team will schedule a consultation to discuss your needs and propose the best solutions.", publishedAt: new Date() }
        ];
        for (const faq of faqs) await strapi.db.query('api::faq.faq').create({ data: faq });

        // Why Choose Us
        const reasons = [
          { title: "Local Expertise", description: "Deep understanding of the Nigerian business landscape and regulatory environment.", icon: "MapPin", publishedAt: new Date() },
          { title: "Proven Track Record", description: "Over 500 successful projects delivered across various industries.", icon: "Award", publishedAt: new Date() },
          { title: "24/7 Support", description: "Round-the-clock technical support to keep your business running smoothly.", icon: "Clock", publishedAt: new Date() },
          { title: "Certified Professionals", description: "Team of certified experts with international qualifications.", icon: "BadgeCheck", publishedAt: new Date() },
          { title: "Scalable Solutions", description: "Solutions that grow with your business needs.", icon: "TrendingUp", publishedAt: new Date() },
          { title: "Competitive Pricing", description: "High-quality services at cost-effective rates.", icon: "PiggyBank", publishedAt: new Date() }
        ];
        for (const reason of reasons) await strapi.db.query('api::why-choose-us.why-choose-us').create({ data: reason });

        // Hero Slides
        const heroSlides = [
          {
            subtitle: "Leading ICT Company in Nigeria",
            title: "Empowering Businesses with",
            highlight: "Cutting-Edge ICT Solutions",
            description: "Swift Professional Solutions Limited delivers world-class IT services across Nigeria — from Lagos to Abuja and beyond. Transform your business with innovative technology solutions.",
            ctaText: "Get a Free Consultation", ctaHref: "/contact",
            secondaryCtaText: "View Our Services", secondaryCtaHref: "/services",
            bgGradient: "from-primary via-primary to-[#1e3a8a]",
            features: [ { icon: "Code", label: "Custom Software" }, { icon: "Shield", label: "Cyber Security" }, { icon: "Cloud", label: "Cloud Solutions" } ],
            stats: [ { value: "200+", label: "Clients" }, { value: "500+", label: "Projects" }, { value: "98%", label: "Success Rate" } ],
            publishedAt: new Date()
          },
          {
            subtitle: "Enterprise Security Solutions",
            title: "Protect Your Business with",
            highlight: "Advanced Cybersecurity",
            description: "Comprehensive security solutions to safeguard your digital assets. From vulnerability assessments to 24/7 monitoring, we keep your business secure against evolving threats.",
            ctaText: "Explore Security Services", ctaHref: "/services/cybersecurity",
            secondaryCtaText: "Get a Security Audit", secondaryCtaHref: "/contact",
            bgGradient: "from-[#1e3a8a] via-[#0f172a] to-[#020617]",
            features: [ { icon: "Shield", label: "Penetration Testing" }, { icon: "Zap", label: "24/7 Monitoring" }, { icon: "CheckCircle", label: "Compliance" } ],
            stats: [ { value: "500+", label: "Systems Secured" }, { value: "100%", label: "Threat Detection" }, { value: "24/7", label: "Support" } ],
            publishedAt: new Date()
          },
          {
            subtitle: "Cloud Transformation",
            title: "Scale Your Business with",
            highlight: "Cloud Solutions",
            description: "Transform your infrastructure with our cloud services. We provide seamless migration, architecture design, and management for AWS, Azure, and Google Cloud platforms.",
            ctaText: "Cloud Services", ctaHref: "/services/cloud-solutions",
            secondaryCtaText: "Contact Us", secondaryCtaHref: "/contact",
            bgGradient: "from-[#0891b2] via-[#0f172a] to-[#020617]",
            features: [ { icon: "Cloud", label: "Cloud Migration" }, { icon: "Server", label: "Infrastructure" }, { icon: "Zap", label: "Cost Optimization" } ],
            stats: [ { value: "99.9%", label: "Uptime" }, { value: "50%", label: "Cost Savings" }, { value: "100+", label: "Migrations" } ],
            publishedAt: new Date()
          },
          {
            subtitle: "Software Development",
            title: "Build Your Vision with",
            highlight: "Custom Software",
            description: "From web applications to enterprise solutions, our expert developers create scalable, secure, and user-friendly software tailored to your business needs.",
            ctaText: "Development Services", ctaHref: "/services/software-development",
            secondaryCtaText: "View Portfolio", secondaryCtaHref: "/portfolio",
            bgGradient: "from-[#7c3aed] via-[#4f46e5] to-[#1e1b4b]",
            features: [ { icon: "Code", label: "Web Apps" }, { icon: "Briefcase", label: "Enterprise" }, { icon: "Headphones", label: "Mobile" } ],
            stats: [ { value: "200+", label: "Apps Built" }, { value: "50+", label: "Developers" }, { value: "100%", label: "Custom" } ],
            publishedAt: new Date()
          }
        ];
        for (const slide of heroSlides) await strapi.db.query('api::hero-slide.hero-slide').create({ data: slide });

        // Company Info
        await strapi.db.query('api::company-info.company-info').create({
          data: {
            name: "Swift Professional Solutions Limited",
            tagline: "Driving Digital Transformation Across Nigeria",
            description: "Swift Professional Solutions Limited delivers world-class IT services across Nigeria — from Lagos to Abuja and beyond.",
            email: "info@swiftpro.com.ng",
            phone: "+234 800 SWIFT PRO",
            phoneRaw: "23480079438776",
            whatsappMessage: "Hello Swift Professional Solutions, I'd like to enquire about your services.",
            address: "Victoria Island, Lagos, Nigeria",
            rcNumber: "RC-1234567",
            foundedYear: 2014,
            publishedAt: new Date()
          }
        });

        console.log('✅ Seeding completed!');
      }
    } catch (error) {
      console.error('Error seeding data:', error);
    }

    // 2. Set public permissions via DB query
    try {
      console.log('Setting public permissions...');
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' }
      });
      
      if (publicRole) {
        const apis = ['service', 'project', 'blog-post', 'team-member', 'testimonial', 'stat', 'faq', 'why-choose-us', 'hero-slide', 'company-info'];
        
        for (const api of apis) {
           for (const action of ['find', 'findOne']) {
              const actionString = `api::${api}.${api}.${action}`;
              
              const exists = await strapi.db.query('plugin::users-permissions.permission').findOne({
                where: { action: actionString, role: publicRole.id }
              });
              
              if (!exists) {
                await strapi.db.query('plugin::users-permissions.permission').create({
                  data: {
                    action: actionString,
                    role: publicRole.id
                  }
                });
                console.log(`✅ Created permission: ${actionString}`);
              }
           }
        }
      }
    } catch (e) {
        console.error("Error setting permissions:", e);
    }
  },
};
