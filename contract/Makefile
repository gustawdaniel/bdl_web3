include .env
export

node_modules: package.json
	npm i

up: node_modules
	npx ts-node-dev --no-notify --respawn --transpile-only src/rest.ts

clean:
	tsc --build --clean

ping:
	ts-node src/ping.ts
