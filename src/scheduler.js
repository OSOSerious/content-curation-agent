const schedule = require('node-schedule');

function scheduleUpdates(mainFunction) {
  // Schedule content updates to run every hour
  schedule.scheduleJob('0 * * * *', mainFunction);
}

function sendDigests(digestContent) {
  // Send scheduled digests
  console.log('Sending digest:', digestContent);
}

module.exports = {
  scheduleUpdates,
  sendDigests
};
