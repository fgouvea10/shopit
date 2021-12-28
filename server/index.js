const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');

dotenv.config({ path: 'server/config/config.env' })

connectDatabase();

app.listen(3333, () => {
  console.log(`Server is running on localhost:3333`);
});
