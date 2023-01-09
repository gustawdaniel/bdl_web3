node_modules: package.json
	npm i

up: node_modules
	npm run develop

up-admin:
  npx strapi develop --watch-admin

ssh:
	ssh -t root@165.22.29.8 "cd strapi && bash"
