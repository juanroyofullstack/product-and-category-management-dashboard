import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const Header = () => {
    return (
        <AppBar position="fixed" className="bg-blue-500 flex">
            <Toolbar className="flex justify-between">
                <Link href="/">
                    <Typography variant="h6" className="text-white">
                        Dashboard
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;