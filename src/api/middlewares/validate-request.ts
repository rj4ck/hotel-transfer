import { Schema } from 'yup';
import { Request, Response, NextFunction } from 'express';

const validateMiddleware = (schema: Schema<any>) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        next();
    } catch (error) {
        const errorData = error as Error;

        return res.status(400).json({ type: errorData.name, message: errorData.message });
    }
};

export default validateMiddleware;
