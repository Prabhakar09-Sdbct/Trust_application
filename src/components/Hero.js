import { Input, alpha } from '@mui/material';
import {
  Container,
  TextField,
  Typography,
  Grid,
  Button,
  Paper,
  Box
} from '@mui/material';
import { styled } from '@mui/system';
import * as React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Hero.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../getLPTheme';


export default function Hero({ mode }) {

  const LPtheme = createTheme(getLPTheme(mode));

  const handlePrint = () => {

    const input = document.getElementById('receipt-form');
    html2canvas(input, { scale: 3 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a3');
        pdf.addImage(imgData, 'PNG', 10, 10, 280, 150);
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
      });
  };

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '20px',
    maxWidth: '800px',
    margin: '20px auto',
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: '2px',
    borderStyle: 'solid',
  }));

  const Logo = styled('div')({
    backgroundImage: 'url("/path-to-logo.jpg")', // Add path to logo image
    backgroundSize: 'cover',
    width: '80px',
    height: '80px',
    margin: '0 auto',
  });

  return (
    <ThemeProvider theme={LPtheme}>
      <Box
        id="hero"
        sx={(theme) => ({
          width: '100%',
          backgroundImage:
            theme.palette.mode === 'light'
              ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
              : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
          backgroundSize: '100% 20%',
          backgroundRepeat: 'no-repeat',
        })}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Box textAlign="center" class="outer-box">
            <StyledPaper elevation={3} className="container" id="receipt-form">
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Logo />
                </Grid>
                <Grid item xs={8}>
                  <Box textAlign="center">
                    <Typography variant="h5" style={{ color: '#FF5733', fontWeight: 'bold' }}>
                      Dummy Trust Name
                    </Typography>
                    <Typography variant="body1" style={{ color: '#000' }}>
                      Mobile: +91 99999999 / 0000000000
                    </Typography>
                    <Typography variant="body1" style={{ color: '#000' }}>
                      Email: dummy@gmail.com, Website: www.dummy.org / www.dummy.com
                    </Typography>
                    <Typography variant="body1" style={{ color: '#000' }}>
                      PAN CARD NO.: 11111111
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Logo />
                </Grid>
              </Grid>

              <Box textAlign="center" my={2}>
                <Typography variant="h6" style={{ color: '#000', fontWeight: 'bold' }}>
                  RECEIPT
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <input type="number" id="number" placeholder="No." class="outlined-input" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <input type="date" id="date" placeholder="Date" class="outlined-input" />
                </Grid>
                <Grid item xs={12}>
                  <input type="text" id="name" placeholder="Received with Thanks from Smt/Sri" class="outlined-input" />
                </Grid>
                <Grid item xs={12}>
                  <input type="text" id="amount" placeholder="the sum of Rupees" class="outlined-input" />
                </Grid>
                <Grid item xs={12}>
                  <input type="text" id="paymentDetails" placeholder="Only by Cash/Cheque/DD No." class="outlined-input" />
                </Grid>
                <Grid item xs={12}>
                  <input type="date" id="datedOn" placeholder="Payment Date" class="outlined-input" />
                </Grid>
              </Grid>
            </StyledPaper>
            <Grid item xs={12} class="button-style" >
              <Button variant="contained" color="primary"  onClick={handlePrint}>
                Submit
              </Button>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
