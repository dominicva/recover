import { Line } from 'recharts';

export default function AreaItem({
  dataKey,
  stroke,
  fill,
  strokeWidth = 2,
}: {
  dataKey: string;
  stroke: string;
  fill: string;
  strokeWidth?: number;
}) {
  return (
    <Line
      key={dataKey}
      dot={false}
      type="natural"
      dataKey={dataKey}
      stroke={stroke}
      fill={fill}
      strokeWidth={strokeWidth}
    />
  );
}
