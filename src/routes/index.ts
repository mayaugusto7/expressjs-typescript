
import { Router, Request, Response, NextFunction } from 'express';
import { BaseRoute } from './route';


export class IndexRoute extends BaseRoute {

    public static create(router: Router) {
        
        //log
        console.log("[IndexRoute::create] Creating index route.");
    
          //add home page route
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            new IndexRoute().index(req, res, next);
        });
    }

    constructor() {
        super();
    }

    //Home page router
    public index(req: Request, res: Response, next: NextFunction) {
        //set custom title
        this.title = "Home | Tour of Heros";
    
        //set options
        let options: Object = {
          "message": "Welcome to the Tour of Heros 3"
        };
    
        //render template
        this.render(req, res, "index", options);
      }
}