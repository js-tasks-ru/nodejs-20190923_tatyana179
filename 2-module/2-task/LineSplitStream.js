const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.data = '';
  }

  _transform(chunk, encoding, callback) {
    this.data += chunk;
    if (this.data.includes(os.EOL)) {
      const arr = this.data.split(`${os.EOL}`);

      arr.filter((item, index) => {
        return index < arr.length - 1
      }).forEach(i => {
        this.push(i)
      })

      this.data = arr.filter((item, index) => {
        return index === arr.length - 1
      }).join('');
    }
    callback();
  }

  _flush(callback) {
    callback(null, this.data);
  }
}

module.exports = LineSplitStream;
