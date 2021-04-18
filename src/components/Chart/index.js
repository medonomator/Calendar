import React, { useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import styles from "./chart.module.sass";

import Ellipse from "../../assets/svg/ellipse.svg";

const Chart = ({ numbers }) => {
  const [toggler, changeToggler] = useState(0);

  const toggle = (e) => {
    changeToggler(!toggler);

    console.log(toggler);

    // if (toggler) {
    //   e.target.style = "transform: translateX(50px)";
    // } else {
    //   e.target.style = "transform: translateX(0)";
    // }
  };

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.chartTop}>
        <h4 className={styles.h4}>HABIT DEVELOPMENT</h4>
        <div className={styles.togglerWrap}>
          <span>MONTH</span>
          <div
            className={styles.svgContainer}
            onClick={() => changeToggler(!toggler)}
          >
            <img
              style={{
                right: toggler ? "-27px" : "0",
              }}
              className={styles.svg}
              src={Ellipse}
              alt="alt"
            />
          </div>
          <span>YEAR</span>
        </div>
      </div>
      <LineChart width={800} height={400} data={numbers}>
        <XAxis
          tickLine={true}
          xAxisId={0}
          label={{ value: "1", angle: 10, position: "bottom" }}
          interval={"preserveEnd"}
        />
        <YAxis unit="%" type="number" domain={[0, 100]} />
        <Tooltip />
        <Line dataKey="pv" stroke="#f2c938" strokeWidth={3} />
      </LineChart>

      <div className={styles.resetProgressCont}>
        <button
          className={styles.resetProgress}
          onClick={() => alert("In development")}
        >
          Reset progress
        </button>
      </div>
    </div>
  );
};

export default Chart;
