# Saucier

A command line tool for working with [Sauce Labs](http://saucelabs.com).


## Installation

If you have [Node.js](http://nodejs.org/) installed, just run:

```sh
$ npm install saucier -g
```

This will install the `saucier` executable globally on your system.


## Usage

To know what the tool can do, run:

```sh
$ saucier --help
```

You can specify your SauceLabs username and access key through the `--user` and `--key` options, or by creating a `.saucelabs` file in your home directory with the following content:

```js
{
  "username":   "johndoe",
  "access_key": "550e8400-e29b-41d4-a716-446655440000"
}
```

You could then try creating a tunnel to SauceLabs:

```sh
$ saucier create-tunnel

Picked up JAVA_TOOL_OPTIONS: -Dfile.encoding=UTF-8
Sauce Connect 3.0-r28, build 43
* Debug messages will be sent to sauce_connect.log
2013-09-20 17:14:49.228:INFO::jetty-7.x.y-SNAPSHOT
2013-09-20 17:14:49.249:INFO::Started SelectChannelConnector@0.0.0.0:58347
.---------------------------------------------------.
|  Have questions or need help with Sauce Connect?  |
|  Contact us: http://support.saucelabs.com/forums  |
|  Terms of Service: http://saucelabs.com/tos       |
-----------------------------------------------------
2013-09-20 17:14:49,259 - / Starting \
2013-09-20 17:14:49,262 - Please wait for "You may start your tests" to start your tests.
2013-09-20 17:14:49,269 - Forwarding: ['sauce-connect.proxy']:['80'] -> 127.0.0.1:['58347']
2013-09-20 17:14:49,276 - Succesfully connected to local server 127.0.0.1:58347 in 3ms
2013-09-20 17:14:49,542 - {"squid_config":null,"use_caching_proxy":true,"metadata":{"PythonVersion":"2.5.1","OwnerHost":"127.0.0.1","Release":"3.0-r28","OwnerPorts":["58347"],"Ports":["80"],"Platform":"Java-1.7.0_15-Java_HotSpot-TM-_64-Bit_Server_VM,_23.7-b01,_Oracle_Corporation-on-Mac_OS_X-10.8.4-x86_64","Build":"43","ScriptRelease":43,"ScriptName":"sauce_connect"},"use_kgp":true,"tunnel_identifier":"","shared_tunnel":false,"fast_fail_regexps":null,"ssh_port":443,"direct_domains":null,"domain_names":["sauce-connect.proxy"]}
2013-09-20 17:14:53,252 - Tunnel remote VM is provisioned (9c5c4a810f844aff9dbc956f8feac996)
2013-09-20 17:14:53,506 - Tunnel remote VM is booting ..
2013-09-20 17:15:36,098 - Tunnel remote VM is running at maki11188.miso.saucelabs.com
2013-09-20 17:15:36,112 - Succesfully connected to local server 127.0.0.1:58347 in 0ms
2013-09-20 17:15:36,115 - Starting connection to tunnel host...
2013-09-20 17:15:36,117 - Connecting to tunnel host maki11188.miso.saucelabs.com as dalvarez
2013-09-20 17:15:36,198 - Forwarding Selenium with ephemeral port 58353
2013-09-20 17:15:36.201:INFO::jetty-7.x.y-SNAPSHOT
2013-09-20 17:15:36.202:INFO::Started SelectChannelConnector@0.0.0.0:4445
2013-09-20 17:15:36,203 - Selenium HTTP proxy listening on port 4445
2013-09-20 17:15:36,861 - Successful handshake with Sauce Connect server
2013-09-20 17:15:36,999 - Tunnel host version: 0.1.0, remote endpoint ID: 52886b33e6bc4062a91682b58101e671
2013-09-20 17:15:37,002 - Connected! You may start your tests.
```

And launching a browser:

```sh
$ saucier launch firefox-23-windows http://www.github.com --debug

2013-09-20T16:17:35.461Z - verbose: Trying to read cache file (/private/var/folders/89/vy7z378x3gg868p15lkpdj6r0000gp/T/saucelabs_cache.json)
2013-09-20T16:17:35.463Z - verbose: Cache file exists with current version (0.1.0)
2013-09-20T16:17:35.471Z - verbose: Launching Firefox 23.0b5. (Windows 2003)
```


## Testing

To run the test suite, install all dependencies:

```sh
$ make install
```

And then execute:

```sh
$ make lint test
```

If you want to generate a coverage report, make sure `jscoverage` is in your path, and execute:

```sh
$ make coverage
```


## Meta

* Code: `git clone git://github.com/unindented/saucier.git`
* Home: <https://github.com/unindented/saucier/>


## Contributors

Daniel Perez Alvarez ([unindented@gmail.com](mailto:unindented@gmail.com))


## License

Copyright (c) 2013 Daniel Perez Alvarez ([unindented.org](https://unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.
