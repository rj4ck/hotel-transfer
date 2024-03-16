import { Request, Response, NextFunction } from 'express';

import { baseConfig } from '../../configs';

const withErrorStack = (stack: unknown) => {

    if (baseConfig.env !== 'production') {
        return { stack } ;
    }
};

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
    const {
        stack,
        message,
    } = error;

    res.status(400).json({ message: message, ...withErrorStack(stack) });
}
