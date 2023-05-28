/**
 * @author Gedeon Ndunde Gibango
 * @date 27/05/2023
 * @MyYouTubeChannel NdundeCode
 */

import React from "react";
import { Navigate, Route, Switch } from "react-router-dom";

import ListOfUser from "../components/user/ListOfUser";
import UserDetail from "../components/user/UserDetail";
import PageNotFound from "../components/layout/PageNotFound";

export const RoutedContent = () => {
    return (
      <Switch>
        <Route path="/" component={ListOfUser} exact />
        <Route path="/list-of-user" component={ListOfUser} exact />
        <Route path="/user-detail" component={UserDetail} exact />
  
        {/* NOT FOUND */}
        <Route path="*" component={PageNotFound} />
      </Switch>
    );
  };