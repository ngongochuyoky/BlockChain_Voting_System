import { useState } from 'react';
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
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { visuallyHidden } from '@mui/utils';
import Modal from './Modal';
import { sendMailNotification } from '~/api/candidate';
import useSnackMessages from '~/utils/hooks/useSnackMessages';

// Data form
//data = [{name, dateOfBirth, email, voteCount, description}, ...]

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
    const [open, setOpen] = useState(false);
    const [source, setSource] = useState();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('voteCount');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { showSuccessSnackbar, showErrorSnackbar } = useSnackMessages();

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClickShow = (event, row) => {
        setSource(row);
        setOpen(true);
    };
    const handleClickSend = async (event, row) => {
        const response = await sendMailNotification({
            email: row.email,
            positionName: props.positionName, 
            electionName: props.electionName,
        });
        response.status === 'success' ? showSuccessSnackbar(response.message) : showErrorSnackbar(response.message);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                                                <TableCell component="th" id={labelId} scope="row">
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <Box>
                                                            <Avatar
                                                                variant="rounded"
                                                                src={row.imgHash}
                                                                sx={{ width: 64, height: 64 }}
                                                            >
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
                                                    <Button
                                                        variant="text"
                                                        onClick={(event) => handleClickShow(event, row)}
                                                        startIcon={<VisibilityIcon />}
                                                    >
                                                        Show
                                                    </Button>
                                                    <Button
                                                        variant="text"
                                                        onClick={(event) => handleClickSend(event, row)}
                                                        startIcon={<ForwardToInboxIcon />}
                                                    >
                                                        Send
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                            ) : (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        No records found
                                    </TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
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
            {open && <Modal source={source} setOpen={setOpen} />}
        </Box>
    );
}

EnhancedTable.propTypes = {
    rows: PropTypes.array.isRequired,
    electionName: PropTypes.string.isRequired,
    positionName: PropTypes.string.isRequired,
};
