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
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import Modal from './Modal';
import { deleteVoter } from '~/api/voter';
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
        label: 'Full Name',
        isSort: true,
    },
    {
        id: 'email',
        numeric: false,
        label: 'Email',
        isSort: true,
    },
    {
        id: 'password',
        numeric: false,
        label: 'Hash password',
        isSort: true,
    },
    {
        id: 'actions',
        numeric: false,
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
    const [openAlertDelete, setOpenAlertDelete] = useState(false);
    const [source, setSource] = useState();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('voteCount');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { showSuccessSnackbar, showErrorSnackbar } = useSnackMessages();

    
     //Handle Edit, Delete
     const handleClickEdit = (event, row) => {
        setSource(row);
        setOpen(true);
    };
   
    const handleClickDelete = (event, row) => {
        setSource(row);
        setOpenAlertDelete(true);
    };
    //Handle Alert Delete
    const handleCloseAlertDelete = () => {
        setOpenAlertDelete(false);
    };
    const handleAgreementDelete = async () => {
        setOpenAlertDelete(false);
        const response = await deleteVoter({ email: source.email });
        response.status === 'success' ? showSuccessSnackbar(response.message) : showErrorSnackbar(response.message);
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
                                                <TableCell component="th" id={labelId} scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>{row.email}</TableCell>
                                                <TableCell>{row.password}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="text"
                                                        onClick={(event) => handleClickEdit(event, row)}
                                                        startIcon={<EditIcon />}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="text"
                                                        onClick={(event) => handleClickDelete(event, row)}
                                                        startIcon={<DeleteIcon />}
                                                    >
                                                        Delete
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
            {/* Alert Delete */}
            <div>
                <Dialog
                    open={openAlertDelete}
                    onClose={handleCloseAlertDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this Voter account?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAlertDelete}>Disagree</Button>
                        <Button onClick={handleAgreementDelete} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Box>
    );
}

EnhancedTable.propTypes = {
    rows: PropTypes.array.isRequired,
};
