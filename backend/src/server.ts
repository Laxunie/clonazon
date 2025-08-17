    import express, { type Application, type Request, type Response } from 'express';

    const app: Application = express();
    const port: number = 3000;

    app.get('/', (req: Request, res: Response) => {
      res.send('Hello from TypeScript Node.js Backend!');
    });

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });