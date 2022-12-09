import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Avatar,
    Typography,
    Paper,
    Button,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { visuallyHidden } from '@mui/utils';
import AvatarDefault from '~/assets/images/avatar_default.jpg';
import Dapp from '~/component/Dapp';

function createData(name, dateOfBirth, email, voteCount, description) {
    return {
        name,
        dateOfBirth,
        email,
        voteCount,
        description,
    };
}

// Data form
//data = [{name, dateOfBirth, email, voteCount, description}, ...]
const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        label: 'Name',
        isSort: true,
    },
    {
        id: 'dateOfBirth',
        numeric: true,
        label: 'Date of birth',
        isSort: true,
    },
    {
        id: 'email',
        numeric: true,
        label: 'Email',
        isSort: true,
    },
    {
        id: 'voteCount',
        numeric: true,
        label: 'Vote Count',
        isSort: true,
    },
    {
        id: 'actions',
        numeric: true,
        label: 'Actions',
        isSort: false,
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={(orderBy === headCell.id) ? order : false}
                    >
                        {headCell.isSort ? (<TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>) : headCell.label}
                       
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const [open, setOpen] = useState(false);
    const [source, setSource] = useState();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date_of_birth');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(()=> {
        const getCandidates = async () => {
            const dapp = Dapp();
            await dapp.connectWallet();
            await dapp.getCandidates();
        }
        getCandidates();
    },[])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, row) => {
        setSource(row);
        setOpen(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ width: '100%' }} >
            <Paper sx={{ width: '100%' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.name}
                                        >
                                            <TableCell component="th" id={labelId} scope="row">
                                                <Box
                                                    sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                                >
                                                    <Box>
                                                        <Avatar variant="rounded" src={AvatarDefault} sx={{ width: 64, height: 64 }}>
                                                            H
                                                        </Avatar>
                                                    </Box>
                                                    <Box sx={{ ml: 2 }}>
                                                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                                            {row.name}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">{row.dateOfBirth}</TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">{row.voteCount}</TableCell>
                                            <TableCell align="right">
                                                <Button variant="text" onClick={(event) => handleClick(event, row)} startIcon={<VisibilityIcon />}>
                                                    Show
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            
        </Box>
    );
}