import React from "react";
import { useToggleTheme } from "../../theme/context";

const Toolbar = () => {
  const { toggleTheme, setTheme } = useToggleTheme();

  return (
    <div>
      <button onClick={toggleTheme}>toggle theme</button>
      <button onClick={() => setTheme("red")}>red theme</button>
    </div>
  );
};

export default Toolbar;
