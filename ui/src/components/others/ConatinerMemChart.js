import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from "react-google-charts";



const ContainerMemChart = ({ container_name }) => {
    const [chartData, setChartData] = useState(null);

    const now = new Date();
    const endStamp = now.getTime() / 1000; // Convert to seconds
    const startStamp = endStamp - 5 * 60; // 5 minutes ago in seconds

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/v1/query_range`, {
                    params: {
                        query: `rate(container_memory_usage_bytes{name="${container_name}"}[5m])`,
                        start: startStamp,
                        end: endStamp,
                        step: 50,
                    }
                });
                const result = response.data.data.result[0].values;
                var data = [["time", "usage"]];
                result.map(entry => {
                    const date = new Date(entry[0] * 1000).toLocaleTimeString()
                    const time = parseFloat(entry[1])
                    data.push([date, time])
                });
                setChartData(data);
            } catch (error) {
                console.log(error);

            }
        }
        fetchData();
    }, []);

    const data = [
        ["Year", "Sales", "Expenses"],
        ["2013", 1000, 400],
        ["2014", 1170, 460],
        ["2015", 660, 1120],
        ["2016", 1030, 540],
    ];

    const options = {
        title: "Memory Utilzation",
        hAxis: {
            title: "Time",
            titleTextStyle: {
                color: "#333"
            },
            textStyle: {
                fontSize: 12,
            },
        },
        vAxis: {
            minValue: 0,
            maxValue: 5000000,
            textStyle: {
                fontSize: 12,
            },
        },
        chartArea: { width: "70%", height: "60%" },
    };

    return (
        <>
            <div className='h-full w-11/12 lg:w-5/12'>
                {chartData ? (
                    <Chart
                        chartType="AreaChart"
                        width="100%"   
                        height="100%"
                        data={chartData}
                        options={options}
                    />
                ) : (
                    <p className='p-5 font-medium'>No Container Metrics Found</p>
                )}
            </div>
        </>
    )
};

export default ContainerMemChart;
