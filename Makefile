
all : doc/html/index.html

clean:
	rm -f *~

doc/html/index.html: sub/programme.js
	mkdir -p doc/html
	jsdoc --directory=doc/html $<

.PHONY: all clean