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

$ cat /tmp/access.json

[
  {
    "remote_addr": "47.29.201.179",
    "remote_user": "-",
    "time_local": "[28/Feb/2019:13:17:10 +0000]",
    "request": "GET /?p=1 HTTP/2.0",
    "status": 200,
    "body_bytes_sent": 5316,
    "http_referer": "https://domain1.com/?p=1",
    "http_user_agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36",
    "gzip_ratio": "2.75"
  },
  ...
]

```

### Example Converting JSON file to log file
```shell
$ cli.js /tmp/access.json -t text -o /tmp/access.log      

Converting to text file
Saving text file proceeded to: /tmp/access.log

$ cat /tmp/access.log

47.29.201.179 - - [28/Feb/2019:13:17:10 +0000] "GET /?p=1 HTTP/2.0" 200 5316 "https://domain1.com/?p=1" "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36" "2.75"
47.29.201.179 - - [28/Feb/2019:13:17:10 +0000] "GET /?p=2 HTTP/2.0" 200 5316 "https://domain1.com/?p=2" "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36" "2.75"
47.29.201.179 - - [28/Feb/2019:13:17:10 +0000] "GET /?p=3 HTTP/2.0" 200 5316 "https://domain1.com/?p=3" "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36" "2.75"
...
```
