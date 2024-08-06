const app = require('./app');
const { PORT, USE_DUMMY_DATA } = require('./config');

app.listen(PORT, () => {
  console.log(`Api proxy is running on port ${PORT}`);
  console.log(`> Dummy Data in use: ${USE_DUMMY_DATA === true}`);
});
