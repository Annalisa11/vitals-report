const c = require('yoctocolors-cjs');

const getFileName = () => {
  const originalPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const stack = new Error().stack;
  Error.prepareStackTrace = originalPrepareStackTrace;

  const res = stack[2].getFileName();

  return res.split('\\').pop();
};

const logInfo = (message) => {
  const fileName = getFileName();
  console.log(c.blue('[INFO]   ') + ` ${fileName} - ${message}`);
};

const logError = (message, error) => {
  const fileName = getFileName();
  console.log(c.red('[ERROR]  ') + ` ${fileName} - ${message}`, error);
};

const logWarn = (message) => {
  const fileName = getFileName();
  console.log(c.yellow('[WARN]   ') + ` ${fileName} - ${message}`);
};

const logSuccess = (message) => {
  const fileName = getFileName();
  console.log(c.green('[SUCCESS]') + ` ${fileName} - ${message}`);
};

module.exports = {
  logInfo,
  logError,
  logWarn,
  logSuccess,
};
