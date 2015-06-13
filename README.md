# geocode-wifi

Returns a latitude and a longitude given an array of wifi access points.

[![Build status](https://travis-ci.org/watson/geocode-wifi.svg?branch=master)](https://travis-ci.org/watson/geocode-wifi)

[![js-standard-style](https://raw.githubusercontent.com/feross/standard/master/badge.png)](https://github.com/feross/standard)

## Installation

```
npm install geocode-wifi
```

## Usage

```js
var geocodeWifi = require('geocode-wifi')

var towers = [...]

geocodeWifi(towers, function (err, location) {
  if (err) throw err
  console.log(location) // => { lat: 38.0690894, lng: -122.8069356, accuracy: 42 }
})
```

The array of access points (`towers` in the above example) is just an
array of simple JavaScript objects - one for each access point. Each
object should look similar to this:

```js
{
  mac: 'e0:1c:41:0c:22:d4',
  ssid: 'WCAir',
  signal: -72
}
```

Geocode-wifi have special support for the
[node-wifiscanner](https://github.com/mauricesvay/node-wifiscanner)
module. This means you can parse the output of node-wifiscanner directly
into geocode-wifi:

```js
var geocodeWifi = require('geocode-wifi')
var wifiScanner = require('node-wifiscanner')

wifiScanner.scan(function (err, data) {
  if (err) throw err

  geocodeWifi(data, function (err, location) {
    if (err) throw err

    console.log(location) // => { lat: 38.0690894, lng: -122.8069356, accuracy: 42 }
  })
})
```

## License

MIT
