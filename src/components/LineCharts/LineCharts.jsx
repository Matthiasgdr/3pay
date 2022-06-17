import React from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Line } from 'recharts'

const data = [{name: 'janvier', uv: 400, pv: 2400, amt: 2400}, {name: 'fevrier', uv: 400, pv: 2400, amt: 2400}, {name: 'mars', uv: 400, pv: 2400, amt: 2400}, {name: 'avril', uv: 400, pv: 2400, amt: 2400}]
const LineCharts = () => {
  return (
    <LineChart width={730} height={250} data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  )
}

export default LineCharts