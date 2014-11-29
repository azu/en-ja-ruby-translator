install:
	mkdir -p data/gene95 2>&1
	wget http://www.namazu.org/~tsuchiya/sdic/data/gene95.tar.bz2 -P data/
	tar xvf ./data/gene95.tar.bz2 -C ./data/gene95
	nkf -Sw -Lu -m0 --in-place ./data/gene95/gene.txt
	npm install
	node tools/dict-to-json.js
	mkdir -p dist 2>&1
	npm run build
