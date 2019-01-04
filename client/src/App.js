import React, { Component } from "react";

import { BrowserRouter as Router, Switch } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import LayoutForSearch from "./containers/Layout/LayoutForSearch";
import DashboardBuilder from "./containers/DashboardBuilder/DashboardBuilder";
import Welcome from "./components/Welcome/Welcome";

import EmptyLayout from "./components/EmptyLayout/EmptyLayout";
import AppRoute from "./components/AppRoute/AppRoute";
import AllRules from "./containers/Rules/AllRules/AllRules";
import RuleDetails from "./containers/Rules/RuleDetails/RuleDetails";
import AddRule from "./containers/Rules/AddRule/AddRule";
import SearchRule from "./containers/Rules/SearchRule/SearchRule";
import EditRule from "./containers/Rules/EditRule/EditRule";
import SearchByTag from "./containers/Rules/SearchByTag/SearchByTag";
import Status from "./containers/Status/Status";
import Customers from "./containers/Customers/Customers";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <AppRoute
            exact
            path="/"
            layout={Layout}
            component={DashboardBuilder}
          />
          <AppRoute
            exact
            path="/dashboard"
            layout={Layout}
            component={DashboardBuilder}
          />
          <AppRoute
            exact
            path="/welcome"
            layout={EmptyLayout}
            component={Welcome}
          />

          <AppRoute exact path="/rules" layout={Layout} component={AllRules} />
          <AppRoute
            exact
            path="/rule/:id"
            layout={Layout}
            component={RuleDetails}
          />
          <AppRoute exact path="/add" layout={Layout} component={AddRule} />
          <AppRoute
            exact
            path="/search/:name"
            layout={LayoutForSearch}
            component={SearchRule}
          />
          <AppRoute
            exact
            path="/searchrule/:name"
            layout={Layout}
            component={SearchRule}
          />
          <AppRoute
            exact
            path="/edit/:id"
            layout={Layout}
            component={EditRule}
          />
          <AppRoute
            exact
            path="/searchtag/:tag"
            layout={Layout}
            component={SearchByTag}
          />
          <AppRoute exact path="/status" layout={Layout} component={Status} />
          <AppRoute
            exact
            path="/customers"
            layout={Layout}
            component={Customers}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
