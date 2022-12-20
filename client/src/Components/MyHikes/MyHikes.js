import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import HowToStart from './HowToStart';
import MyCompletedHikes from './MyCompletedHikes';

function MyHikes() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#008037',
            },
            secondary: {
                main: '#e3e3e3',
            },
            third: {
                main: "#ffffff"
            },
            fourth: {
                main: "#701f1f"
            }
        },
    });

    return(
        <div>
            <Grid container >
                <ThemeProvider theme={theme}>
                    <Grid xs={12} marginTop={2} >
                        <HowToStart/>
                        <MyCompletedHikes/>
                    </Grid>
                </ThemeProvider>
            </Grid>
        </div>
    )
}

export default MyHikes