const c = require('yoctocolors-cjs');

const getFileName = () => {
  return __filename.split('\\').pop();
};

const logInfo = (message) => {
  const fileName = getFileName();
  console.log(c.green('[INFO]') + ` ${fileName} - ${message}`);
};

const logError = (message) => {
  const fileName = getFileName();
  console.log(c.red('[ERROR]') + ` ${fileName} - ${message}`);
};

const logWarn = (message) => {
  const fileName = getFileName();
  console.log(c.yellow('[WARN]') + ` ${fileName} - ${message}`);
};

const logSuccess = (message) => {
  const fileName = getFileName();
  console.log(c.blue('[SUCCESS]') + ` ${fileName} - ${message}`);
};

const logDatabaseConnection = (status) => {
  if (status === 'connected') {
    console.log(
      c.green('[DATABASE]') + ` ${c.bold('Connected successfully!')} ✅`
    );
  } else if (status === 'failed') {
    console.log(c.red('[DATABASE]') + ` ${c.bold('Connection failed.')} ❌`);
  }
};

module.exports = {
  logInfo,
  logError,
  logWarn,
  logSuccess,
};
