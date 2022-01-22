install: # install
	npm ci

gendiff: # 
	node bin/gendiff.js

publish: # publish the package
	npm publish --dry-run

lint:  # linter checks
	npx eslint .