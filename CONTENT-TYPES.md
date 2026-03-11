# Swift Professional Solutions CMS Content Types

## Access Your Strapi Admin:
**URL:** http://localhost:1337/admin

## Server Information:
- **Project:** swiftpro-server (Strapi CMS)
- **Client:** swiftpro (Next.js Frontend)
- **Database:** SQLite (.tmp/data.db)
- **API Base:** http://localhost:1337

## Content Types to Create:

### 1. Service Content Type
- **API ID:** `service`
- **Display Name:** Service

**Fields:**
- `title` (Text, Required)
- `slug` (UID, Required, attached to title)
- `shortDescription` (Text, Required)
- `fullDescription` (Rich Text)
- `icon` (Text) - Values: Server, Code, Shield, Cloud, Briefcase, Headphones
- `features` (JSON)
- `processSteps` (JSON)

**Permissions:** Enable FIND and FINDONE for Public

---

### 2. Project Content Type
- **API ID:** `project`
- **Display Name:** Project

**Fields:**
- `title` (Text, Required)
- `slug` (UID, Required, attached to title)
- `category` (Enumeration, Required) - Values: Web, Infrastructure, Software, Security
- `description` (Text, Required)
- `fullDescription` (Rich Text)
- `image` (Media, single)
- `tags` (JSON, required)
- `client` (Text)
- `year` (Text)

**Permissions:** Enable FIND and FINDONE for Public

---

### 3. Blog Post Content Type
- **API ID:** `blog-post`
- **Display Name:** Blog Post

**Fields:**
- `title` (Text, Required)
- `slug` (UID, Required, attached to title)
- `excerpt` (Text, Required)
- `content` (Rich Text)
- `image` (Media, single)
- `author` (Text)
- `date` (Date)
- `category` (Text)
- `readTime` (Text)

**Permissions:** Enable FIND and FINDONE for Public

---

### 4. Team Member Content Type
- **API ID:** `team-member`
- **Display Name:** Team Member

**Fields:**
- `name` (Text, Required)
- `role` (Text, Required)
- `image` (Media, single)
- `linkedin` (Text)

**Permissions:** Enable FIND and FINDONE for Public

---

### 5. Testimonial Content Type
- **API ID:** `testimonial`
- **Display Name:** Testimonial

**Fields:**
- `name` (Text, Required)
- `company` (Text)
- `role` (Text)
- `quote` (Rich Text)
- `rating` (Number) - Min: 1, Max: 5
- `image` (Media, single)

**Permissions:** Enable FIND and FINDONE for Public

---

### 6. Stat Content Type
- **API ID:** `stat`
- **Display Name:** Stat

**Fields:**
- `value` (Number, Required)
- `suffix` (Text)
- `label` (Text, Required)

**Permissions:** Enable FIND and FINDONE for Public

## Sample Data:

### Services:
1. **IT Infrastructure** - "Robust and scalable IT infrastructure solutions for modern businesses."
2. **Software Development** - "Custom software solutions tailored to your business requirements."
3. **Cybersecurity** - "Comprehensive security solutions to protect your digital assets."
4. **Cloud Solutions** - "Scalable cloud services for modern business operations."
5. **IT Consulting** - "Strategic IT guidance to drive business transformation."
6. **Managed IT Support** - "Reliable managed IT services to keep your business running smoothly."

### Projects:
- **Enterprise Resource Planning System** (Software category)
- **Fintech Mobile Application** (Web category)
- **Hospital Information System** (Software category)

### Blog Posts:
- **Digital Transformation in Nigeria: Trends and Opportunities**
- **Essential Cybersecurity Best Practices for Nigerian Businesses**
- **Why Cloud Computing is the Future of Nigerian Business**

## API Endpoints:

Your Strapi will provide these endpoints:
- `/api/services`
- `/api/projects`
- `/api/blog-posts`
- `/api/team-members`
- `/api/testimonials`
- `/api/stats`

## Next.js Integration:

Your Next.js app is ready to fetch from Strapi. Update `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

**The app includes fallback data** in `lib/constants.ts` so it works even when Strapi is not running!

## Start Strapi:

```bash
cd ~/Documents/serverio/strapi-backend
npm run develop
```

---

**Ready!** 🎉 Your Strapi instance is running and your Next.js app is integrated!