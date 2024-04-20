const fs = require('fs')
const jpeg = require('jpeg-js')
const jsQR = require('jsqr')
const nodeWebcam = require('node-webcam')

const captureQrCode = (opts) => {
  opts = opts || {}
  return new Promise((resolve, reject) => {
    if (opts.retryUntilTimeout) {
      setTimeout(() => {
        resolve()
      }, opts.retryUntilTimeout)
    }
    const captureAndDetect = () => {
      nodeWebcam.capture('webcam', {
        output: 'jpeg',
        callbackReturn: 'buffer'
      }, (err, buffer) => {
        if (err) {
          reject(err)
        } else {
          const rawImage = jpeg.decode(buffer)
          const qrCode = jsQR(rawImage.data, rawImage.width, rawImage.height)
          if (qrCode) {
            resolve(qrCode.data)
          } else {
            if (opts.retry) {
              // Keep looking until QR code is found
              setTimeout(() => {
                captureAndDetect()
              }, 1000)
            } else {
              resolve()
            }
          }
        }
      })
    }
    captureAndDetect()
  })
}

module.exports = captureQrCode
