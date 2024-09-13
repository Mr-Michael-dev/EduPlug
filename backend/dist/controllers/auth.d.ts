import { Request, Response, NextFunction } from 'express';
export declare const protect: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const register: (req: Request, res: Response) => Promise<Response>;
export declare const verifyEmail: (req: Request, res: Response) => Promise<Response>;
export declare const login: (req: Request, res: Response) => Promise<Response>;
export declare const getProfile: (req: Request, res: Response) => Promise<Response>;
export declare const updateProfile: (req: Request, res: Response) => Promise<Response>;
