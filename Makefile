# Setup

ROOT_DIR   := $(CURDIR)
BAK_DIR    := $(ROOT_DIR)/bak
BIN_DIR    := $(ROOT_DIR)/bin
SRC_DIR    := $(ROOT_DIR)/lib
TEST_DIR   := $(ROOT_DIR)/test
NPM_DIR    := $(ROOT_DIR)/node_modules
NPMBIN_DIR := $(NPM_DIR)/.bin

COV_HTML   := $(ROOT_DIR)/coverage.html

SAUCE_URL  := http://saucelabs.com/downloads/Sauce-Connect-latest.zip
SAUCE_LOG  := $(ROOT_DIR)/sauce_connect.log

# Commands

NPM    := $(shell which npm)
JSCOV  := $(shell which jscoverage)
JSHINT := $(NPMBIN_DIR)/jshint
MOCHA  := $(NPMBIN_DIR)/mocha

# Rules

all: lint test coverage

install:
	@$(NPM) install

clean:
	@rm -f $(COV_HTML) $(SAUCE_LOG)

lint:
	@$(JSHINT) $(BIN_DIR) $(SRC_DIR)

test:
	@$(MOCHA)

coverage:
	@mv $(SRC_DIR) $(BAK_DIR)
	@$(JSCOV) $(BAK_DIR) $(SRC_DIR)
	@$(MOCHA) --reporter html-cov > $(COV_HTML)
	@rm -rf $(SRC_DIR)
	@mv $(BAK_DIR) $(SRC_DIR)

update:
	@mkdir -p tmp/
	@wget -O tmp/Sauce-Connect.zip $(SAUCE_URL)
	@unzip -d tmp/ tmp/Sauce-Connect.zip
	@mv tmp/Sauce-Connect.jar support/
	@rm -rf tmp/

todo:
	@fgrep -H -e TODO -e FIXME -r bin lib test || true

.PHONY: clean lint test coverage update todo
