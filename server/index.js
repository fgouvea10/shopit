const app = require('./app');

const dotenv = require('dotenv');

dotenv.config({ path: 'server/config/config.env' })

app.listen(3333, () => {
  console.log(`Server is running on localhost:3333`);
});
