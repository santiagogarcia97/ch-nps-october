import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GraphProps } from "./Interfaces";

const GraphAnswer2 = (props: GraphProps) => {
  const total: {
    count: number;
    option: string;
    text: string;
    color: string;
  }[] = [];

  props.answers.forEach((e) => {
    let op = total.find((x) => x.option === e.option);

    if (!op) {
      op = {
        option: e.option,
        count: 0,
        text: e.optionText,
        color:
          e.score === 9 || e.score === 10
            ? "#15803c"
            : e.option == "R"
            ? "#ea5a0c"
            : "#b91c1c",
      };
      total.push(op);
    }

    op.count++;
  });

  total.sort((a, b) => b.count - a.count);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white opacity-90 rounded-lg shadow-sm px-4 py-2">
          <p>{payload[0].payload.text}</p>
          <strong>{payload[0].value}</strong> -{" "}
          {((payload[0].value * 100) / props.countTotal).toFixed(1)}%
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer className="text-sm">
      <BarChart data={total} layout="vertical">
        <Tooltip content={<CustomTooltip />} />

        <Bar dataKey="count" fill="#8884d8">
          {total.map((entry, index) => (
            <Cell key={`cell-${entry.count}`} fill={entry.color} />
          ))}
        </Bar>

        <YAxis
          type="category"
          dataKey="text"
          width={300}
          interval={0}
          mirror
          orientation="right"
          tick={{
            fill: "rgba(0, 0, 0)",
            //stroke: "rgba(0, 0, 0)",
            //strokeWidth: "2px",
            //strokeLinecap: "butt",
            //strokeLinejoin: "miter",
            fontSize: "0.875rem",
            // paintOrder:"stroke"
          }}
        />
        <XAxis
          type="number"
          dataKey="count"
          domain={[0, Math.round((total[0].count * 10) / 7)]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraphAnswer2;
