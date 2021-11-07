import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const GraphVitalsModal = (props) => {
  const data = [
    {
      name: "Page A",
      uv: 38,
    },
    {
      name: "Page B",
      uv: 36.8,
    },
    {
      name: "Page C",
      uv: 40,
    },
    {
      name: "Page D",
      uv: 36.8,
    },
    {
      name: "Page E",
      uv: 37,
    },
    {
      name: "Page F",
      uv: 36,
    },
  ];

  return (
    <div className="offset-lg-2 col-lg-8 col-md-12 col-sm-12">
      <div
        className="metrics-form-custom"
        style={{ width: "100%", height: 300 }}
      >
        <ResponsiveContainer width="99%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphVitalsModal;
