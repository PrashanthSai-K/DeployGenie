import React from 'react'
import ContainerCPUChart from './ConatinerCPUChart'
import ContainerMemChart from './ConatinerMemChart'
import ContainerDiskMetrics from './ContainerDiskMetrics'

function Chart() {
    return (
        <div>
            Chart
            <ContainerCPUChart container_name={"saik_1_2024-08-19_15-18-14"} />
            <ContainerMemChart container_name={"saik_1_2024-08-19_15-18-14"} />
            <ContainerDiskMetrics />
        </div>
    )
}

export default Chart

