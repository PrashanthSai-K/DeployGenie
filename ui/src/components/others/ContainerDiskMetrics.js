import React, { useState, useEffect } from 'react'
import Chart from 'react-google-charts';
import axios from 'axios';
import Login from '../login/Login';

function ContainerDiskMetrics({container_name}) {
    const [networkData, setNetworkData] = useState([]);
    const [diskData, setDiskData] = useState([]);

    const now = new Date();
    const endStamp = now.getTime() / 1000;
    const startStamp = endStamp - 5 * 60;

    const convertToAmPm = (timeStr) => {
        let [hours, minutes] = timeStr.split(":");
        let amPm = "AM";
        hours = parseInt(hours);
        
        if (hours >= 12) {
          amPm = "PM";
          if (hours > 12) {
            hours -= 12;
          }
        } else if (hours === 0) {
          hours = 12;
        }
      
        return `${hours}:${minutes} ${amPm}`;
      };

    const fetchNetworkData = async () => {
        try {
            const responseTX = await axios.get(`http://localhost:9090/api/v1/query_range`, {
                params: {
                    query: `sum(rate(container_network_transmit_bytes_total{name="${container_name}"}[5m])) by (name)`,
                    start: startStamp,
                    end: endStamp,
                    step: 50,
                }
            });
            const responseRX = await axios.get(`http://localhost:9090/api/v1/query_range`, {
                params: {
                    query: `sum(rate(container_network_receive_bytes_total{name="${container_name}"}[5m])) by (name)`,
                    start: startStamp,
                    end: endStamp,
                    step: 50,
                }
            });
            console.log(responseRX);
            
            // Assuming both TX and RX have the same length
            const dataTX = responseTX.data.data.result[0].values.map(entry => [
                convertToAmPm(new Date(entry[0] * 1000).toLocaleTimeString()),  // Time
                parseFloat(entry[1])  // TX value
            ]);
    
            const dataRX = responseRX.data.data.result[0].values.map(entry => parseFloat(entry[1]));  // Only RX values
    
            // Combine TX and RX data into a single array
            const networkData = dataTX.map((item, index) => [...item, dataRX[index]]);
    
            setNetworkData([['Time', 'Transmit (TX)', 'Receive (RX)'], ...networkData]);        
        } catch (error) {
            console.log(error);
        }
    };



    const fetchDiskData = async () => {
        const responseReads = await axios.get(`http://localhost:9090/api/v1/query_range`, {
            params: { 
                query: 'sum(rate(container_fs_reads_total{name="saik_1_2024-08-12_12-07-41"}[5m])) by (name)',
                start: startStamp,
                end: endStamp,
                step: 50,
            }
        });
        const responseWrites = await axios.get(`http://localhost:9090/api/v1/query_range`, {
            params: { 
                query: 'sum(rate(container_fs_writes_total{name="saik_1_2024-08-12_12-07-41"}[5m])) by (name)',
                start: startStamp,
                end: endStamp,
                step: 50,
            }
        });        
        // Assuming both TX and RX have the same length
        const dataRead = responseReads.data.data.result[0].values.map(entry => [
            convertToAmPm(new Date(entry[0] * 1000).toLocaleTimeString()),  // Time
            parseFloat(entry[1])  // TX value
        ]);

        const dataWrite = responseWrites.data.data.result[0].values.map(entry => parseFloat(entry[1]));  // Only RX values

        // Combine TX and RX data into a single array
        const diskData = dataRead.map((item, index) => [...item, dataWrite[index]]);

        setDiskData([['Time', 'Reads', 'Writes'], ...diskData]);
    };

    useEffect(() => {
        fetchNetworkData();
        // fetchDiskData();
    }, []);

    const options = {
        title: "Container Metrics",
        hAxis: { title: "Time", titleTextStyle: { color: "#333" }, textStyle: { fontSize: 12 } },
        vAxis: { minValue: 0, textStyle: { fontSize: 12 } },
        chartArea: { width: "70%", height: "60%" },
    };

    return (
        <div className='h-full w-full'>
            {networkData.length > 0 ? (
                <Chart
                    chartType="AreaChart"
                    width="100%"
                    height="300px"
                    data={networkData}
                    options={{ ...options, title: "Network I/O (TX/RX)" }}
                />
            ) : (
                <p className='p-5 font-medium lg:text-center lg:pr-96'>No Container Metrics Found</p>
            )}
            {/* {diskData.length > 0 && (
                <Chart
                    chartType="AreaChart"
                    width="100%"
                    height="300px"
                    data={diskData}
                    options={{ ...options, title: "Disk I/O (Reads/Writes)" }}
                />
            )} */}
        </div>
    );
}

export default ContainerDiskMetrics