import app from './app';
import { baseConfig } from './configs/';

const { env, port, hostname } = baseConfig;

app.listen(port, hostname, () => {
	console.log('[server]: is running at http://%s:%d, in %s mode', hostname, port, env);
});
