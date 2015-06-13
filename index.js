'use strict'

var qs = require('querystring')
var request = require('request')

module.exports = function (towers, cb) {
  var wifi = (towers || []).map(function (tower) {
    var ss = 'signal' in tower ? tower.signal : tower.signal_level
    return qs.escape('mac:' + tower.mac + '|ssid:' + tower.ssid + '|ss:' + ss)
  }).join('&wifi=')

  if (wifi) wifi = '&wifi=' + wifi

  var opts = {
    method: 'POST',
    url: 'https://maps.googleapis.com/maps/api/browserlocation/json?browser=firefox&sensor=true' + wifi,
    json: true
  }

  request(opts, function (err, res, body) {
    if (err) return cb(err)
    if (res.statusCode >= 300) return cb(new Error('Google returned non-2xx status: ' + res.statusCode))
    if (!body) return cb(new Error('Google didn\'t return any data'))
    if (body.status !== 'OK') return cb()

    cb(null, {
      lat: body.location.lat,
      lng: body.location.lng,
      accuracy: body.accuracy
    })
  })
}
