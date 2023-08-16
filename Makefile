build: src/* src/components/* src/components/texted/* public/*
	npm run build

deploy: build
	rsync -a --del -v build ofdx.net:src/ofdx/somenotes/react/
