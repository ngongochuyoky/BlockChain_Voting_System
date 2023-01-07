import { Paper, Grid, Divider, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import { memo, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const options = {
    indexAxis: 'y',
    responsive: true,
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
};

const createDataBarChart = (candidates) => {
    const labels = candidates.map((candidate) => candidate.name);
    const votes = candidates.map((candidate) => candidate.voteCount);
    const data = {
        labels,
        datasets: [
            {
                label: 'Vote Count',
                data: votes,
                backgroundColor: 'rgb(51, 194, 255)',
                borderRadius: '10',
            },
        ],
    };
    return data;
};

function BarChart(props) {
    const [data, setData] = useState({});
    useEffect(() => {
        const dataBarChart = createDataBarChart(props.candidates);
        setData(dataBarChart);
    }, [props.candidates]);
    return (
        <Paper>
            <Grid container>
                <Grid item xs={12} sx={{ p: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {props.positionName}
                    </Typography>
                </Grid>
                <Divider width="100%" />
                <Grid item xs={12} sx={{ p: 2}} >
                    {Object.keys(data).length !== 0 && <Bar options={options} data={data} />}
                </Grid>
            </Grid>
        </Paper>
    );
}

export default memo(BarChart);
