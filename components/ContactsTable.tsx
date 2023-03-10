import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
import { useContactContext } from '../context/ContactContext';

interface ContactsTableProps {
  setPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
}

export default function ContactsTable({
  setPage,
  setRowsPerPage,
}: ContactsTableProps) {
  const { contactList, handleSingleContact } = useContactContext();

  const { count, perPage, currentPage, totalPages, contacts } = contactList;

  const router = useRouter();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    newPage++;

    if (newPage === totalPages) setPage(1);
    else setPage(newPage === 0 ? 1 : newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleActionContact = (action: string, id: string) => {
    handleSingleContact(id);

    router.push({
      pathname: `/contacts/[id]${action === 'view' ? '' : `/${action}`}`,
      query: { id: id },
    });
  };

  function defaultLabelDisplayedRows({
    from,
    to,
    count,
  }: {
    from: number;
    to: number;
    count: number;
  }) {
    if (currentPage && totalPages)
      return `Page ${currentPage} of ${totalPages}`;
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((item) => (
            <TableRow key={item.id}>
              <TableCell align="left">
                <Box
                  onClick={() => handleActionContact('view', item.id)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    width: { xs: '45vw', sm: '350px', md: '250px' },
                  }}
                >
                  <AccountCircleIcon
                    fontSize="large"
                    sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
                  />
                  <Box>
                    <Typography variant="body1">
                      {`${item.firstName} ${item.lastName}`}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: '70%' }}>
                      {item.email}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell
                align="right"
                sx={{ width: { xs: '20vw', sm: 'auto' } }}
              >
                <Tooltip title="Edit">
                  <IconButton
                    color="success"
                    onClick={() => handleActionContact('edit', item.id)}
                  >
                    <ModeEditOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleActionContact('delete', item.id)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              labelRowsPerPage="Rows"
              labelDisplayedRows={defaultLabelDisplayedRows}
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={count}
              rowsPerPage={perPage}
              page={currentPage - 1}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
