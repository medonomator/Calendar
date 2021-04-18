import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import styles from "./chart.module.sass";

const Chart = ({ numbers }) => {
  return (
    <div className={styles.chartWrapper}>
      <h4 className={styles.h4}>HABIT DEVELOPMENT</h4>
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
    </div>
  );
};

export default Chart;
