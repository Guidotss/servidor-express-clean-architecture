import express, { Router, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";

interface ServerOptions {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private serverListener: any;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: ServerOptions) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors({ 
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      optionsSuccessStatus: 200
    }));
    this.app.use(this.routes);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  async stop() {
    this.serverListener?.close();
  }
}
