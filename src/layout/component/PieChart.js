import { memo, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import randomColor from 'randomcolor';
import {
    Paper,
    Grid,
    Divider,
    Typography,
    Box,
    Table,
    TableContainer,
    TableHead as MuitableHead,
    TableRow,
    TableCell ,
    TableBody,
} from '@mui/material';
import { bubbleSort } from '~/utils/BubbleSort';
import { Stack } from '@mui/system';
import { styled } from '@mui/material/styles';

const createDataPieChart = (candidates) => {
    const labels = candidates.map((candidate) => candidate.name);
    const votes = candidates.map((candidate) => candidate.voteCount);
    const data = {
        labels,
        datasets: [
            {
                label: 'Vote Percentage',
                data: votes,
                backgroundColor: labels.map((label) =>
                    randomColor({
                        luminosity: 'bright',
                        format: 'rgb',
                        alpha: 0.7,
                    }),
                ),
                borderWidth: 1,
            },
        ],
    };
    return data;
};

ChartJS.register(ArcElement, Tooltip);

const TableHead = styled(MuitableHead)(({theme}) => ({
    backgroundColor: '#fff',
}))

function PieChart(props) {
    const [data, setData] = useState({});
    const [candidates, setCandidates] = useState([]);
    const [votes, setVotes] = useState(1);
    
    useEffect(() => {
        const candidates = bubbleSort(JSON.parse(JSON.stringify(props.candidates)));
        setCandidates(candidates);
        const votes = candidates.reduce((total, candidate) => {
            return total + candidate.voteCount
        }, 0);
        setVotes(votes);
        const dataPieChart = createDataPieChart(candidates);
        setData(dataPieChart);
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
                <Grid item xs={12} sx={{ p: 2 }}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Box sx={{ m: 4 }}>
                                {Object.keys(data).length !== 0 && <Doughnut data={data} />}
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            {candidates.length && (
                                <Box>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    Top
                                                </TableCell>
                                                <TableCell>
                                                    Name
                                                </TableCell>
                                                <TableCell>
                                                Percentage
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <Stack direction="row">
                                                        <Box sx={{width: 20, height: 20,  backgroundColor: data.datasets[0].backgroundColor[0]}}/>
                                                        <Typography variant='subtitle2' color='rgb(255, 181, 71)' sx={{ml: 1}}>#1</Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>
                                                    {candidates[0].name}
                                                </TableCell>
                                                <TableCell>
                                                {((candidates[0].voteCount/votes)*100).toFixed(1)} %
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Stack direction="row">
                                                        <Box sx={{width: 20, height: 20,  backgroundColor: data.datasets[0].backgroundColor[1]}}/>
                                                        <Typography variant='subtitle2' color='rgb(255, 25, 67)' sx={{ml: 1}}>#2</Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>
                                                    {candidates[1].name}
                                                </TableCell>
                                                <TableCell>
                                                {((candidates[1].voteCount/votes)*100).toFixed(1)} %
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Stack direction="row">
                                                        <Box sx={{width: 20, height: 20,  backgroundColor: data.datasets[0].backgroundColor[2]}}/>
                                                        <Typography variant='subtitle2' sx={{ml: 1}}>#3</Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>
                                                    {candidates[2].name}
                                                </TableCell>
                                                <TableCell>
                                                {((candidates[2].voteCount/votes)*100).toFixed(1)} %
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default memo(PieChart);
