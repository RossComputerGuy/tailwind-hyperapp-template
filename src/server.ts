import { getPort } from 'get-port-please';
import { join } from 'path';
import express from 'express';
import logger from './logger';
import { isDev } from './config';

const app = express();

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, _, next) => {
  logger.debug(`Received connection to ${req.path} from ${req.ip} (UA: ${req.headers['user-agent']})`);
  next();
});

if (isDev) app.use('/index.js.map', express.static(join(__dirname, 'client.mjs.map')));
app.use('/index.js', express.static(join(__dirname, 'client.mjs')));
app.use('/styles.css', express.static(join(__dirname, 'styles.css')));
app.use(express.static(join(__dirname, 'static')));

app.use((_, res) => res.render('index', {}));

getPort({
  random: true,
  portRange: [1000, 8000],
}).then((port) => {
  app.listen(port, () => {
    logger.info(`Server is now listening at http://localhost:${port}`);
  });
}).catch(err => {
  logger.error(`Failed to initialize server: ${err}`);
});
