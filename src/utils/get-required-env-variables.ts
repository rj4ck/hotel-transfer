import dotenv from 'dotenv';

dotenv.config();
export const getRequiredEnvVariable = (name: string): string => {
    const value = process.env[name];

    if (!value) {
        throw new Error(`The environment variable ${name} is not defined.`);
    }

    return value;
};
