const { upload, destroy } = require('./upload');
const transporter = require('./transporter');

module.exports = { upload, destroy, transporter };
