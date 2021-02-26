
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Add from "./Container/Add";
import Home from "./Container/Home";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add" component={Add} />
      </Switch>
    </Router>
  );
};

export default Routes;
