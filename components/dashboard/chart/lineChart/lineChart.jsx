"use client"

import styles from "./lineChar.module.css"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: "Sun",
        view: 4000,
        click: 2400,
    },
    {
        name: "Mon",
        view: 3000,
        click: 1398,
    },
    {
        name: "Tue",
        view: 2000,
        click: 3800,
    },
    {
        name: "Wed",
        view: 2780,
        click: 3908,
    },
    {
        name: "Thu",
        view: 1890,
        click: 4800,
    },
    {
        name: "Fri",
        view: 2390,
        click: 3800,
    },
    {
        name: "Sat",
        view: 3490,
        click: 4300,
    },
];

const WeekLyLineChart = () => {
    return (

        <div className=' bg-[#09526C] shadow-xl text-white' >
            <div className={styles.container}>
                <h2 className={styles.title}>Weekly Recap</h2>
                <ResponsiveContainer width="100%" height="90%">
                    <LineChart
                        width={500}
                        height={500}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip contentStyle={{ background: "#026376", border: "none" }} />
                        <Legend />
                        <Line type="monotone" dataKey="view" stroke="#8884d8" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="click" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
                    
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>



    )

}

export default WeekLyLineChart;