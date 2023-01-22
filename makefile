

ensure-dependencies:
	@echo "Ensuring docker is installed..."
	@docker info

brand:
	@echo "Creating our datasources manifest file..."
	@node_modules/make-manifest/bin/make-manifest
	@cat ./manifest.json

package:
	@echo "Building our datasources docker image..."
	@docker build --tag datasources .
	@docker images

qa:
	@echo "Checking that our datasources tests dont fail..."
	@npm run qa