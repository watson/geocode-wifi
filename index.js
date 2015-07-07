'use strict'

var qs = require('querystring')
var https = require('https')
var once = require('once')

var processBody = function (body, cb) {
  if (body.status !== 'OK') return cb()

  cb(null, {
    lat: body.location.lat,
    lng: body.location.lng,
    accuracy: body.accuracy
  })
}

module.exports = function (towers, cb) {
  cb = once(cb)

  var wifi = (towers || [])
    .slice(0, 20) // if the URL is too long, Google will repond with 411
    .map(function (tower) {
      var ss = 'signal' in tower ? tower.signal : tower.signal_level
      return qs.escape('mac:' + tower.mac + '|ssid:' + tower.ssid + '|ss:' + ss)
    })
    .join('&wifi=')

  if (wifi) wifi = '&wifi=' + wifi

  var opts = {
    hostname: 'maps.googleapis.com',
    method: 'POST',
    path: '/maps/api/browserlocation/json?browser=firefox&sensor=true' + wifi
  }

  var req = https.request(opts, function (res) {
    var buffers = []
    res.on('data', buffers.push.bind(buffers))
    res.on('end', function () {
      if (res.statusCode >= 300) return cb(new Error('Geocoding service returned unexpected status code: ' + res.statusCode))

      var body = Buffer.concat(buffers)

      try {
        body = JSON.parse(body)
      } catch (e) {
        return cb(e)
      }

      processBody(body, cb)
    })
  })
  req.on('error', cb)
  req.on('close', function () {
    cb(new Error('Connection to geocoding service closed unexpectedly'))
  })
  req.end()
}
