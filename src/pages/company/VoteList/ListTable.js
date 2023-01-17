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
    Paper,
    Button,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';
import FormEnterKey from './FormEnterKey';
import useSnackMessages from '~/utils/hooks/useSnackMessages';
import { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

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
        id: 'id',
        numeric: false,
        label: 'Vote ID',
        isSort: true,
    },
    {
        id: 'name',
        numeric: false,
        label: 'Voter name',
        isSort: true,
    },
    {
        id: 'email',
        numeric: false,
        label: 'Voter Email',
        isSort: true,
    },
    {
        id: 'voteTime',
        numeric: false,
        label: 'Vote Time',
        isSort: true,
    },
    {
        id: 'isCheck',
        numeric: true,
        label: 'Status',
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
                        align={headCell.numeric ? 'center' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.isSort ? (
                            <TableSortLabel
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
                            </TableSortLabel>
                        ) : (
                            headCell.label
                        )}
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

export default function EnhancedTable(props) {
    dayjs.extend(utc);
    const [openFormEnterKey, setOpenFormEnterKey] = useState(false);
    const [source, setSource] = useState();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('voteCount');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { showSuccessSnackbar, showErrorSnackbar } = useSnackMessages();

    //Handle Edit, Delete
    const handleClickCheckVote = (event, row) => {
        setSource(row);
        setOpenFormEnterKey(true);
    };

    //Handle Sort
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    //Start: Handle Page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //End: Handle Page

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={props.rows.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
                            {props.rows.length ? (
                                stableSort(props.rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                <TableCell
                                                    component="th"
                                                    sx={{ fontWeight: 600 }}
                                                    id={labelId}
                                                    scope="row"
                                                >
                                                    {row.id}
                                                </TableCell>
                                                <TableCell sx={{color: 'rgb(255, 163, 25)', fontWeight: 500}}>{row.name}</TableCell>
                                                <TableCell>{row.email}</TableCell>
                                                <TableCell>{dayjs.utc(row.voteTime).local().format()}</TableCell>
                                                <TableCell>
                                                    {row.isCheck ? (
                                                        <Box
                                                            sx={{
                                                                color: 'rgb(255, 255, 255)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderRadius: '10px',
                                                                width: '100px',
                                                                backgroundColor: 'rgb(87, 202, 34)',
                                                                fontSize: '0.8rem',
                                                            }}
                                                        >
                                                            DONE
                                                        </Box>
                                                    ) : (
                                                        <Box
                                                            sx={{
                                                                color: 'rgb(255, 255, 255)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderRadius: '10px',
                                                                width: '100px',
                                                                backgroundColor: 'rgb(255, 163, 25)',
                                                                fontSize: '0.8rem',
                                                            }}
                                                        >
                                                            PENDING
                                                        </Box>
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        variant="text"
                                                        sx={{ color: 'rgb(87, 202, 34)' }}
                                                        onClick={(event) => handleClickCheckVote(event, row)}
                                                        startIcon={<EditIcon />}
                                                    >
                                                        Check Vote
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No records found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {/* FormEditVoter edit */}
            {openFormEnterKey && (
                <FormEnterKey
                    source={source}
                    setOpenFormEnterKey={setOpenFormEnterKey}
                    setReRender={props.setReRender}
                    reRender={props.reRender}
                />
            )}
        </Box>
    );
}

EnhancedTable.propTypes = {
    setReRender: PropTypes.func.isRequired,
    reRender: PropTypes.bool.isRequired,
    rows: PropTypes.array.isRequired,
};
