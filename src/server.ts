import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import mongoose = require("mongoose");

//routes
import { IndexRoute } from "./routes/index";

//interfaces
import { IUser } from "./interfaces/user";

//models
import { IModel } from "./models/model";
import { IUserModel } from './models/user.model';

//schemas
import { userSchema } from "./schemas/user";

export class Server {

  public app: express.Application;

  private model: IModel; //an instance of IModel

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {

    //instance defaults
    this.model = new Object();

    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();

    //add api
    this.api();
  }

  /**
    * Create REST API routes
    *
    * @class Server
    * @method api
    */
  public api() {
    //empty for now
  }

  /**
    * Configure application    
    *
    * @class Server
    * @method config
    */
  public config() {

    const MONGODB_CONNECTION: string = "mongodb://localhost:27017/heros";

    //provedor de arquivos staticos
    this.app.use(express.static(path.join(__dirname, "public")));

    //configuracao da view pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    // interface de logs 
    this.app.use(logger("dev"));

    // interface de parseamento json
    this.app.use(bodyParser.json());

    // inteface de parseamento query string
    this.app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    // inteface para parseamento de cookies
    this.app.use(cookieParser("SECRET_GOES_HERE"));

    // inteface de sobrescrita de metodos
    this.app.use(methodOverride());

    //use q promises
    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;
    
    //connect to mongoose
    let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
    
    //create models
    this.model.user = connection.model<IUserModel>("User", userSchema);

     //catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });

    //error handling
    this.app.use(errorHandler());
}

  /**
    * Create router
    *
    * @class Server
    * @method api
    */
  public routes() {
        
    let router: express.Router;
    router = express.Router();

    //IndexRoute
    IndexRoute.create(router);

    //use router middleware
    this.app.use(router);
  }
}
