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

const Graph = (props: GraphProps) => {
  const total: { count: number; score: number; color: string }[] = [];

  props.answers.forEach((e) => {
    let score = total.find((x) => x.score === e.score);

    if (!score) {
      score = {
        score: e.score!,
        count: 0,
        color: "",
      };
      total.push(score);
    }

    score.count++;
  });

  total.forEach((e) => {
    if (e.score === 9 || e.score === 10) e.color = "#15803c";
    if (e.score === 7 || e.score === 8) e.color = "#ea5a0c";
    if (e.score >= 1 && e.score <= 6) e.color = "#b91c1c";
  });

  total.sort((a,b) => a.score - b.score);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white opacity-90 rounded-lg shadow-sm px-4 py-2">
          <strong>{payload[0].value}</strong> -{" "}
          {((payload[0].value * 100) / props.countTotal).toFixed(1)}%
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer className="text-sm" height={200}>
      <BarChart data={total}>
        <Tooltip content={<CustomTooltip />} />

        <Bar dataKey="count" fill="#8884d8">
          {total.map((entry, index) => (
            <Cell key={`cell-${entry.score}`} fill={entry.color} />
          ))}
        </Bar>

        <XAxis type="category" dataKey="score" interval={0} />
        <YAxis type="number" dataKey="count" orientation="right" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Graph;
