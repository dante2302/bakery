import { Component, FC, JSXElementConstructor} from "react";
import { Route, Navigate  } from "react-router-dom";

export default function GuardedRoute(rest: any, loggedIn: boolean, Element: FC){
    return(
        <Route {...rest} render={() => {
            loggedIn 
            ? 
            <Element />
            :
            <Navigate to="login" />
        }}
        />
    )
}