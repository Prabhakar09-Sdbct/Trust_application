import { Button, Grid, Paper } from '@mui/material';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { writeFile, utils } from 'xlsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../getLPTheme';


export default function Testimonials({mode}) {
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
      {/* <button >Export to Excel</button> */}
      <Paper elevation={3} style={{ padding: '1em', height: 400, width: '100%', backgroundColor: '#fff', border: '1px solid #ccc' }}>
        <Grid item xs={12} style={{ paddingBottom: '1em'}} >
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
            border: '1px solid rgba(224, 224, 224, 1)',
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid rgba(224, 224, 224, 1)',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid rgba(224, 224, 224, 1)',
            },
          }}

        />

      </Paper>
    </Container>
    </ThemeProvider>
  );
}