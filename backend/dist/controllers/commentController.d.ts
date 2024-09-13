import { Request, Response } from 'express';
export declare const addComment: (req: Request, res: Response) => Promise<void>;
export declare const getComments: (req: Request, res: Response) => Promise<void>;
export declare const updateComment: (req: Request, res: Response) => Promise<void>;
export declare const deleteComment: (req: Request, res: Response) => Promise<void>;
