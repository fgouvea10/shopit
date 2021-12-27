const app = require('./app');

const dotenv = require('dotenv');

dotenv.config({ path: 'server/config/config.env' })

app.listen(process.env.PORT, () => {
  console.log('Server is running');
});
