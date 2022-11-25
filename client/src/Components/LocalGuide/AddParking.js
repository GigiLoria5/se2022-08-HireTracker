import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
//import Grid from "@mui/material/Grid";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Autocomplete from '@mui/material/Autocomplete';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TextField } from '@mui/material';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import {getCountries, getProvincesByCountry, getCitiesByProvince} from '../../Utils/GeoData'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MapLocator from '../Map/MapLocator';
import { floatInputSanitizer } from '../../Utils/InputSanitizer';


const zoomLevel = 15;
const initialLat = 51.505;
const initialLng = -0.09;

function AddParking() {
    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [position, setPosition] = useState({ lat: initialLat, lng: initialLng });

    const [message, setMessage] = useState("");
    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]); 
    const [address, setAddress] = useState(""); 
    const [width, setWidth] = React.useState(window.innerWidth);

    const updateWidth = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize",updateWidth);
    });

    useEffect(() => {
        window.scrollTo(0, 0)
        getCountries().then(cn => {
            setCountries([...cn]);
        });

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (country !== '') {
            getProvincesByCountry(country).then(pv => {
                setProvinces([...pv]);
            })
        }
        if (province !== '') {
            getCitiesByProvince(country, province).then(c => {
                setCities([...c]);
            })
        }
        
        // eslint-disable-next-line
    }, [country, province]);

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
            }
        },
    });

    const handleSubmission = async (ev) => {
        ev.preventDefault();
        if(!country || !province || !city){
            setMessage("Parking lot geographical info missing");
            return;
        }
        
    };

    const handleChangeLng = (newLng) => {
        const newLngSanitized = floatInputSanitizer(newLng);
        setPosition({ ...position, lng: isNaN(newLngSanitized) ? "0" : newLngSanitized });
    }

    const handleChangeLat = (newLat) => {
        const newLatSanitized = floatInputSanitizer(newLat);
        setPosition({ ...position, lat: isNaN(newLatSanitized) ? "0" : newLatSanitized });
    }


    const thm = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    
    return (
        <div>
            <Grid container >
                
                <ThemeProvider theme={theme} >
                    <Grid xs={12}>
                        <Typography variant="h4" margin={2} marginTop={4} gutterBottom sx={thm}>
                            ADD A PARKING LOT
                        </Typography>
                    </Grid>
                    <Grid xs={0} md={2}></Grid>

                    <Grid xs={12} md={8} marginTop={3} >
                        <Paper elevation={3} sx={{  ...thm, mb:4}} >
                            <Grid container>

                                <Grid xs={12} md={6} sx={thm}>
                                    <Typography variant="h6" sx={thm} margin={1} marginTop={4} align='center'>
                                        Click on the map to add a parking lot
                                    </Typography>

                                    {/*MAP*/}
                                    <Box component="div" width={'100%'} align='center'>
                                        <Box component="div" sx={{ maxWidth: "40ch", marginTop: 2 }}>
                                            <MapLocator position={position} setPosition={setPosition} radius={null} height={'200px'} width={'300px'} initialLat={initialLat} initialLng={initialLng} zoomLevel={zoomLevel}/>
                                        </Box>
                                    </Box>
                                    
                                    <Stack direction='row' justifyContent="center" alignItems="center" marginTop={2}>
                                        <TextField variant="outlined" color='primary' label="Latitude" sx={{ width: '13ch', m:1, mb:1 }}  value={position ? `${position.lat}` : ""} onChange={(e) => handleChangeLat(e.target.value)} disabled /> 
                                        <TextField variant="outlined" color='primary' label="Longitude" sx={{ width: '13ch', m:1, mb:1 }} value={position ? `${position.lng}` : ""} onChange={(e) => handleChangeLng(e.target.value)} disabled/>
                                    </Stack>
                                </Grid>
                                <Grid xs={12} md={6} sx={thm}>
                                    {width < 900 ? <Grid></Grid> : <Grid marginTop={13}></Grid>}

                                    <Stack direction='column' sx={{ mb:2, m:1 }}  align='center'>
                                        {/*COUNTRY FIELD*/}
                                        <Autocomplete
                                            required
                                            disablePortal
                                            id="combo-box-demo"
                                            options={countries}
                                            sx={{ m:1, width: '28ch' }}
                                            onChange={e => {
                                                e.preventDefault();
                                                const name = e._reactName === "onKeyDown" ? e.target.value : e.target.textContent;
                                                setCountry(name); setProvince(''); setCity('')}}
                                            renderInput={(params) => <TextField {...params}  label="Country" />}
                                        />
                                        {/*PROVINCE/REGION FIELD*/}
                                        <Autocomplete
                                            required
                                            disabled={!(country)}
                                            disablePortal
                                            id="combo-box-demo2"
                                            options={provinces}
                                            key={country}
                                            sx={{ m:1.25, width: '28ch' }}
                                            onChange={e => {
                                                e.preventDefault(); 
                                                const name = e._reactName === "onKeyDown" ? e.target.value : e.target.textContent;
                                                setProvince(name); setCity('')}}
                                            renderInput={(params) => <TextField {...params}  label="Province/Region" />}
                                        />
                                        {/*CITY FIELD*/}
                                        <Autocomplete
                                            required
                                            disabled={!(country&&province)}
                                            disablePortal
                                            id="combo-box-demo3"
                                            options={cities}
                                            key={[province, country]}
                                            sx={{ m:1.25, width: '28ch' }}
                                            onChange={e => {
                                                e.preventDefault();
                                                const name = e._reactName === "onKeyDown" ? e.target.value : e.target.textContent;
                                                setCity(name)}} 
                                            renderInput={(params) => <TextField {...params} label="City"/>}
                                        />
                                        <TextField variant="outlined" color='primary' label="Address" sx={{ width: '28ch', m:1, mb:1 }}  value={address}  /> 

                                    </Stack>
                                </Grid>
                            </Grid>

                            
                            {message && <Alert sx={{m:1}} severity="error" onClose={() => setMessage('')}>{message}</Alert>}   

{/****************************************************SUBMIT BUTTONS********************************************************/}     
                        <Stack direction="row" justifyContent="center" alignItems="center">
                            <Button sx={{ m:1, mb:4, mt:4, minWidth: '80px'}} component={Link} to={"/local-guide-page"} variant="contained" color='secondary'>CANCEL</Button>
                            <Button sx={{ m:1, mb:4, mt:4, minWidth: '80px'}} onClick={handleSubmission} variant="contained" color='primary'>ADD PARKING LOT</Button>
                        </Stack>

                        </Paper>
                    </Grid>
                </ThemeProvider>
                
            </Grid>
            
            
        </div>
    );
}
export default AddParking;