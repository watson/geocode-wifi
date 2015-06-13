# geocode-wifi

Returns a latitude and a longitude given an array of wifi access points.

[![Build status](https://travis-ci.org/watson/geocode-wifi.svg?branch=master)](https://travis-ci.org/watson/geocode-wifi)

[![js-standard-style](https://raw.githubusercontent.com/feross/standard/master/badge.png)](https://github.com/feross/standard)

## Installation

```
npm install geocode-wifi
```

## Usage

This module needs network access in order to communicate with Google so
it can triangulate the provided access points.

```js
var geocodeWifi = require('geocode-wifi')

var towers = [
  { mac: '0e:1d:41:0c:22:d4', ssid: 'NodeConf', signal: -72 },
  { mac: '01:1c:ef:0c:21:2a', ssid: 'NSA Lobby', signal: -2 },
  { mac: 'e0:53:41:92:00:bb', ssid: 'Microsoft Taco', signal: -89 }
]

geocodeWifi(towers, function (err, location) {
  if (err) throw err
  console.log(location) // => { lat: 38.0690894, lng: -122.8069356, accuracy: 42 }
})
```

Geocode-wifi have special support for the
[node-wifiscanner](https://github.com/mauricesvay/node-wifiscanner)
module. This means you can parse the output of node-wifiscanner directly
into geocode-wifi:

```js
var geocodeWifi = require('geocode-wifi')
var wifiScanner = require('node-wifiscanner')

wifiScanner.scan(function (err, towers) {
  if (err) throw err

  geocodeWifi(towers, function (err, location) {
    if (err) throw err

    console.log(location) // => { lat: 38.0690894, lng: -122.8069356, accuracy: 42 }
  })
})
```

## License

MIT
