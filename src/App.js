import React from "react";
import { Example } from "./components";

import { ToggleThemeProvider } from "./components/theme/context";
import Theme from "./components/theme";
import Toolbar from "./components/Toolbar";

const App = () => {
  return (
    <ToggleThemeProvider>
      <Theme>
        <Example />
        <Toolbar />
      </Theme>
    </ToggleThemeProvider>
  );
};

export default App;
