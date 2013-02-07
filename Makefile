
SRC = $(wildcard local/*/*.js)
CSS = $(wildcard local/*/*.css)
HTML = $(wildcard local/*/*.html)
TEMPLATES = $(HTML:.html=.js)
COMPONENTS = $(wildcard local/*/component.json)

build: components $(SRC) $(CSS) $(TEMPLATES) $(COMPONENTS)
	@component build

components: component.json $(COMPONENTS)
	@component install

%.js: %.html
	@component convert $<

release: build
	uglifyjs build/build.js -cm -o build/build.min.js

components-dev: component.json $(COMPONENTS)
	@component install -d

test: components-dev $(SRC) $(CSS) $(TEMPLATES) $(COMPONENTS)
	@component build -d

clean:
	rm -fr build components $(TEMPLATES)

.PHONY: clean
