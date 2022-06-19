import React from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Line } from 'recharts'

const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'décembre']
months.reverse()
const data = []
const LineCharts = () => {
  const currentMonth = new Date().getMonth()
  // {name: 'janvier', uv: 400, pv: 2400, amt: 2400}
  if(data.length <= 0) {
    for( var i = 1; i < 8; i++) {
      var index = (i + currentMonth) % months.length;
      data.push({
        name: months[index],
        wallet: 200,
        banque: 300,
        amt: 2400
      })
    }
    data.reverse()
  }
  return (
    <LineChart width={730} height={250} data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="wallet" stroke="#8884d8" />
      <Line type="monotone" dataKey="banque" stroke="#82ca9d" />
    </LineChart>
  )
}

export default LineCharts