# 9000 MHz

Fake PC hardware store monorepo.

**Frontend:** TS, Vite, Vue, Tanstack Query.

**Backend:** TS, Fastify, Mongoose, MongoDB.

**Site:** https://9000mhz.ru

**Storybook:** https://ui.9000mhz.ru

**Design:** https://www.figma.com/file/TOqDhQK83b2x4zM0Gtev94/9000-MHz

**Youtube live coding:** https://youtube.com/playlist?list=PLOICX-WjKEZcwBaFQAfogv0vUvjcnr3Lj

## Installation

1. Install Node.js 18 https://nodejs.org/en
2. Install MongoDB 6 https://www.mongodb.com/try/download/community
3. `npm install` - install deps from root folder
4. Create .env files in `/apps` subfolders
5. Run `mongorestore` in `/apps/back` folder to restore database dump (optional)
6. `npm run build` - build all apps and packages
7. `npm run dev` - start all apps and packages in dev mode
8. Create first manager in admin app with url `/setup`
