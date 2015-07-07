'use strict'

var test = require('tape')
var geocodeWifi = require('./')

var towers1 = [
  { mac: 'bc:ae:c5:c3:dd:56',
    ssid: 'Arconet Camp',
    signal: '-75' },
  { mac: '5c:d9:98:5a:93:72',
    ssid: 'Arconet',
    signal: '-73' },
  { mac: '1c:af:f7:ce:fb:f9',
    ssid: 'Arconet',
    signal: '-62' },
  { mac: '00:24:a5:15:d2:c2',
    ssid: 'Arconet Amphitheatre',
    signal: '-69' }
]

var towers2 = [
  { mac: 'bc:ae:c5:c3:dd:56',
    ssid: 'Arconet Camp',
    signal_level: '-75' },
  { mac: '5c:d9:98:5a:93:72',
    ssid: 'Arconet',
    signal_level: '-73' },
  { mac: '1c:af:f7:ce:fb:f9',
    ssid: 'Arconet',
    signal_level: '-62' },
  { mac: '00:24:a5:15:d2:c2',
    ssid: 'Arconet Amphitheatre',
    signal_level: '-69' }
]

test('no array', function (t) {
  geocodeWifi(undefined, function (err, location) {
    t.error(err)
    if (location !== undefined) {
      t.ok('lat' in location)
      t.ok('lng' in location)
      t.ok('accuracy' in location)
    }
    t.end()
  })
})

test('empty array', function (t) {
  geocodeWifi([], function (err, location) {
    t.error(err)
    if (location !== undefined) {
      t.ok('lat' in location)
      t.ok('lng' in location)
      t.ok('accuracy' in location)
    }
    t.end()
  })
})

test('incomplete array', function (t) {
  geocodeWifi([{}], function (err, location) {
    t.error(err)
    if (location !== undefined) {
      t.ok('lat' in location)
      t.ok('lng' in location)
      t.ok('accuracy' in location)
    }
    t.end()
  })
})

test('normal array', function (t) {
  geocodeWifi(towers1, function (err, location) {
    t.error(err)
    t.deepEqual(location, { accuracy: 22, lat: 34.34273700000001, lng: -112.1004467 })
    t.end()
  })
})

test('node-wifiscanner array', function (t) {
  geocodeWifi(towers2, function (err, location) {
    t.error(err)
    t.deepEqual(location, { accuracy: 22, lat: 34.34273700000001, lng: -112.1004467 })
    t.end()
  })
})
