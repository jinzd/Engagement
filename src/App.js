import React, { useState } from "react";
// import Counter from "./components/Counter";
import MyNavBar from "./components/MyNavBar";
import MyBarChart from "./components/MyBarChart";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <MyNavBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="d-inline-block w-75">
        <MyBarChart />
      </div>
      {/* <div className="d-inline-block w-50">
        <Counter />
      </div> */}
    </div>
  );
};

export default App;
