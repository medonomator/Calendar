import React, { useState } from "react";
import Calendar from "./components/Calendar";
import Chart from "./components/Chart";

const App = () => {
  const [numbers, setNumbers] = useState([]);

  const pushNumber = (item) => {
    const array = [...numbers];
    array.push(item);
    setNumbers(array);
  };

  return (
    <div className="App">
      <Calendar pushNumber={pushNumber} />
      <Chart numbers={numbers} />
    </div>
  );
};

export default App;
