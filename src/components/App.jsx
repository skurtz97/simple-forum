import {ChakraProvider, Box} from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import theme from "../theme";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Box bg="gray.50" minH="100vh" py="12">
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Router>
        </Box>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
