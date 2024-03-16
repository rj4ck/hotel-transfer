import next from 'next';
import express from 'express'

import { baseConfig } from './configs';
import apiRoutes from './api/modules/routes';
import errorHandler from "./api/middlewares/error-handler";

const { env, port, hostname } = baseConfig;

const dev = env !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api', apiRoutes);

    app.get('*', (req, res) => {
        return handle(req, res);
    });

    app.use(errorHandler);

    app.listen(port, () => {
        console.log('[Server]: is running at http://%s:%d, in %s mode', hostname, port, env);
    });
}).catch((error) => {
    console.error('Error init server:', error);
    process.exit(1);
});
