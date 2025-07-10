import { Request, Response, NextFunction} from  'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}


export const verifyToken =(req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Token missing"});

    try{
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string};
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token"});
    }
};
