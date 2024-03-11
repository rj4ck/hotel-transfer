import next from 'next';
import express from 'express'

import apiRoutes from './api/routes';
import { baseConfig } from './configs';

const { env, port, hostname } = baseConfig;

const dev = env !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();

    app.use('/api', apiRoutes);

    app.get('*', (req, res) => {
        return handle(req, res);
    });

    app.listen(port, () => {
        console.log('[Server]: is running at http://%s:%d, in %s mode', hostname, port, env);
    });
}).catch((error) => {
    console.error('Error init server:', error);
    process.exit(1);
});
