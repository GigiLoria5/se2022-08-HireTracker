import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const HomepageContent = styled('section')(({ theme }) => ({
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        height: '100vh',
        minHeight: 'auto',
        maxHeight: 'auto',
    },
}));

function Homepage(props) {
    const { children } = props;

    return (
        <Container className="container-full-size">
            <HomepageContent>
                <Container
                    sx={{
                        mt: 3,
                        mb: 14,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {children}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            backgroundColor: 'common.black',
                            opacity: 0.5,
                            zIndex: -1,
                        }}
                    />
                    <Box className='homepage-background' />
                </Container>
                <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    component="a"
                    href=""
                    sx={{ minWidth: 200 }}
                >
                    Register
                </Button>
            </HomepageContent>
        </Container>
    );
}

export default Homepage