import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./auth";
import SecuredRoute from "./auth/secured-route";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

const previousSession = JSON.parse(localStorage.getItem("session"));

function App() {
  const [session, setSession] = useState(previousSession);

  useEffect(() => {
    if (session) {
      localStorage.setItem("session", JSON.stringify(session));
    } else {
      localStorage.removeItem("session");
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/register"} component={Register} />
          <SecuredRoute exact path={"/"} component={Home} />
          <Route render={() => <div>Not found [404]</div>}></Route>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
