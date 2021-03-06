var path = require('path');

var JAR_FILE         = path.resolve(__dirname, '../support/Sauce-Connect.jar');
var SAUCE_USERNAME   = 'johndoe';
var SAUCE_ACCESS_KEY = '550e8400-e29b-41d4-a716-446655440000';

describe('SauceConnect', function () {
  var SauceConnect;
  var connect;

  describe('#constructor', function () {
    beforeEach(function () {
      SauceConnect = require('../lib/saucier/sauce_connect');
    });

    it('can be instantiated with `new`', function () {
      connect = new SauceConnect();
      connect.should.be.an.instanceof(SauceConnect);
    });
    it('can be instantiated without `new`', function () {
      connect = SauceConnect();
      connect.should.be.an.instanceof(SauceConnect);
    });
  });

  describe('with faked out dependencies', function () {
    var proc;
    var dependencies;

    function prepare() {
      // Fake the child_process module...
      proc = chai.FakeProc();
      dependencies = {
        childProc: {
          spawn: sinon.spy(function () {
            return proc;
          })
        }
      };
      // ... and inject it into the context.
      SauceConnect = rewire('../../lib/saucier/sauce_connect');
      SauceConnect.__set__(dependencies);
    }

    describe('#version', function () {
      beforeEach(function () {
        prepare();
        connect = new SauceConnect();
      });

      it('spawns `Sauce-Connect.jar` with `--version`', function () {
        connect.version(function () {});
        dependencies.childProc.spawn.should.have.been.calledWithExactly(
          'java',
          ['-jar', JAR_FILE, '--version'],
          { detached: true }
        );
      });
      it('notifies the callback of the version returned by `Sauce-Connect.jar`', function (done) {
        connect.version(function (err, version) {
          should.not.exist(err);
          version.should.equal('foobar');
          done();
        });

        proc.stdout.emit('data', 'foo');
        proc.stdout.emit('data', 'bar\n');
        proc.emit('close', 0);
      });
      it('notifies the callback of errors returned by `Sauce-Connect.jar`', function (done) {
        connect.version(function (err, version) {
          err.should.equal('foobar');
          should.not.exist(version);
          done();
        });

        proc.stderr.emit('data', 'foo');
        proc.stderr.emit('data', 'bar\n');
        proc.emit('close', 1);
      });
    });

    describe('#tunnel', function () {
      beforeEach(function () {
        prepare();
        connect = new SauceConnect({
          username:  SAUCE_USERNAME,
          accessKey: SAUCE_ACCESS_KEY
        });
      });

      it('spawns `Sauce-Connect.jar` with the provided username and access key', function () {
        connect.tunnel();
        dependencies.childProc.spawn.should.have.been.calledWithExactly(
          'java',
          ['-jar', JAR_FILE, SAUCE_USERNAME, SAUCE_ACCESS_KEY],
          { detached: true }
        );
      });
      it('spawns `Sauce-Connect.jar` with `--debug` if passed the `debug` option', function () {
        connect.tunnel({ debug: true });
        dependencies.childProc.spawn.should.have.been.calledWithExactly(
          'java',
          ['-jar', JAR_FILE, SAUCE_USERNAME, SAUCE_ACCESS_KEY, '--debug'],
          { detached: true }
        );
      });
      it('spawns `Sauce-Connect.jar` with `--shared-tunnel` if passed the `shared` option', function () {
        connect.tunnel({ shared: true });
        dependencies.childProc.spawn.should.have.been.calledWithExactly(
          'java',
          ['-jar', JAR_FILE, SAUCE_USERNAME, SAUCE_ACCESS_KEY, '--shared-tunnel'],
          { detached: true }
        );
      });
    });
  });
});
