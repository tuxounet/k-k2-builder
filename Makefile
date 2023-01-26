
install:
	@npm install

nuke: 
	@npm run nuke 

clean: 
	@npm run clean

build: install clean
	@npm run build

test: 
	@npm run test
