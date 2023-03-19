import app from './server.js';
import connection from './config/db.js';

connection.once('open', () => {
  app.listen(3000, () => {
    console.log('http://localhost:3000');
  });
});
