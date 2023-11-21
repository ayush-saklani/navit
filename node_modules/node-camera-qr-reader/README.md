# node-camera-qr-reader

Capture and read a QR code from a camera from nodejs.

## Usage
```
const captureQrCode = require('node-camera-qr-reader')

const opts = {
  retry: true,                // keep checking until a QR is found, default: false
  retryUntilTimeout: 10000    // milliseconds until giving up, default: never give up
}

const content = await captureQrCode(opts)
```

## Dependencies

### Linux
`sudo apt-get install fswebcam`

### MacOS
`brew install imagesnap`
