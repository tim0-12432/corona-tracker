import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import App from "./App";
import Vaccinations from "./components/Vaccinations/Vaccinations";
import Manual from "./components/Manual/Manual";

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/corona-tracker/vaccinations" exact component={ Vaccinations } />
                <Route path="/corona-tracker/manual/" exact component={ Manual } />
                <Route path="/corona-tracker/" exact component={ App } />
                <Route render={() =>
                    <div>
                        <h1>404</h1>
                        <h4>Page not found</h4>
                        <Link to="/corona-tracker/" >To Main page</Link>
                    </div>
                } />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;