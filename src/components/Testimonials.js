import { Button, Grid, Paper } from '@mui/material';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { utils, writeFile } from 'xlsx';
import getLPTheme from '../getLPTheme';


export default function Testimonials({ mode }) {
  const [receipts, setReceipts] = React.useState([]);

  const LPtheme = createTheme(getLPTheme(mode));


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'number', headerName: 'Number', width: 70 },
    {
      field: 'date', headerName: 'Date', width: 200
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'paymentDetails', headerName: 'Payment Details', width: 150 },
    { field: 'datedOn', headerName: 'Date On', width: 200 }
  ];

  const exportToExcel = (receipts) => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(receipts);

    utils.book_append_sheet(wb, ws, 'Receipts');

    writeFile(wb, 'receipts.xlsx');
  };

  const StyledPaper = styled(Paper)(({ theme }) => ({
    height: 450,
    padding: '1em',
    paddingBottom: '8em',
    width: '100%',
    border: theme.palette.mode === 'dark' ? '' : '1px solid #ccc',
    backgroundColor: theme.palette.mode === 'dark' ? '#090E10' : '#ffffff',

  }));

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await fetch('http://localhost:3001/getReceipts');
        const data = await response.json();
        console.log("data", data);
        setReceipts(data);
      } catch (error) {
        console.error('Error fetching receipts:', error);
      }
    };

    fetchReceipts();
  }, []);


  return (
    <ThemeProvider theme={LPtheme}>
      <Container
        id="testimonials"
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <StyledPaper elevation={3} className="container" id="receipt-form"
          style={{
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 10px 10px, rgba(60, 64, 67, 0.15) 0px 2px 10px 10px'
          }}
        >
          <Grid item xs={12} style={{ paddingBottom: '1em' }} >
            <Button variant="contained" color="primary" onClick={() => exportToExcel(receipts)}>
              Export
            </Button>
          </Grid>
          <DataGrid
            rows={receipts}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            sx={{
              border: `1px solid ${LPtheme.palette.grey[300]}`,
              '& .MuiDataGrid-cell': {
                borderBottom: `1px solid ${LPtheme.palette.grey[300]}`,
                color: LPtheme.palette.text.primary,
                backgroundColor: LPtheme.palette.background.default,
                '&:hover': {
                  backgroundColor: LPtheme.palette.action.selected,
                },
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: LPtheme.palette.grey[100],
                borderBottom: `1px solid ${LPtheme.palette.grey[300]}`,
                color: LPtheme.palette.text.primary,
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: LPtheme.palette.background.paper,
                color: LPtheme.palette.text.primary,
              },
              '& .MuiTablePagination-root': {
                color: LPtheme.palette.text.secondary,
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: LPtheme.palette.action.hover,
              },
            }}

          />

        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
}