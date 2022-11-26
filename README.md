# node-cli-example
[![CI](https://github.com/lutfailham96/node-cli-example/actions/workflows/ci.yml/badge.svg)](https://github.com/lutfailham96/node-cli-example/actions/workflows/ci.yml)

This project is just example of parsing `nginx` access log using CLI on Node.js

## Access Log Format
```
$remote_addr - $remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $gzip_ratio
```

## Command Usage
```shell
$ cli -h

Options:
      --version  Show version number                                   [boolean]
  -t, --type     Output type                                            [string]
  -o, --output   Output file name                                       [string]
  -h, --help     Show help                                             [boolean]
```

### Example Converting log file to JSON file
```shell
$ cli.js ../samples/access.log -t json -o /tmp/access.json

Converting to JSON file
Saving json file proceeded to: /tmp/access.json

```

### Example Converting JSON file to log file
```shell
$ cli.js /tmp/access.json -t text -o /tmp/access.log      

Converting to text file
Saving text file proceeded to: /tmp/access.log
```
