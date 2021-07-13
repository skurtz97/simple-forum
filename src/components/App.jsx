import { ChakraProvider, Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import theme from "../theme";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Thread from "./Thread";

function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Flex bg="gray.200" minH="100vh" py="12" direction="column">
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/thread/:threadId" component={Thread} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Router>
        </Flex>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
