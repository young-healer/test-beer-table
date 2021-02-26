import React from "react";

import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartSeriesItemTooltip,
    ChartTooltip
} from '@progress/kendo-react-charts';
import '@progress/kendo-theme-default/dist/all.css';

import bottleError from '../../assets/bottle-error.svg'

const ColumnChart = ({seriesData}) => {

    const defaultTooltipRender = ({ point }) => {
        return (
            <div>
                <span style={{ display: 'flex', flexDirection: 'column' , alignItems: 'center', width: '80px' }}>
                    {point.dataItem.imageUrl
                        ? <img alt='error' style={{ width: "20px" }} src={point.dataItem.imageUrl} />
                        : <img alt='error' style={{ width: "20px" }} src={bottleError} />
                    }
                    <b>{point.dataItem.name}</b>
                </span>
            </div>
        )
    };

    return (
        <Chart style={{ width: "100%", height: "250px" }}>
            <ChartTooltip render={defaultTooltipRender} />

            <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={seriesData.map(v => v.value).sort((a, b) => a - b)} />
            </ChartCategoryAxis>
            <ChartSeries>
                <ChartSeriesItem data={seriesData.sort((a, b) => a.value - b.value)} color="green" />
                <ChartSeriesItemTooltip />
            </ChartSeries>
        </Chart>
    )
}

export default ColumnChart