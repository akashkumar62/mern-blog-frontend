import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from "@mui/material"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';


const Header = () => {
    const dispatch= useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    const [value,setValue] =useState()
    return (
        <AppBar position='sticky'
            sx={{
                background: " linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(48,30,90,0.8689558098630077) 35%, rgba(0,212,255,1) 100%)"
            }}>
            <Toolbar>
                <Typography variant='h4'>
                    BlogsApp
                </Typography>
              {isLoggedIn &&  <Box display="flex" marginLeft="auto" marginRight="auto">
                    <Tabs textColor='inherit'  
                    value={value} onChange={(e,val)=>setValue(val)} >
                        <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
                        <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                        <Tab LinkComponent={Link} to="/bolgs/add" label="Add Blog" />


                    </Tabs>

                </Box>}
                <Box display="flex" marginLeft="auto">
                  {!isLoggedIn &&  <> <Button LinkComponent={Link} to="/auth"
                    sx={{ margin: 1, borderRadius: 10 }}
                        variant="contained"
                        color='warning'>Login</Button>

                    <Button LinkComponent={Link} to="/auth"
                    sx={{ margin: 1, borderRadius: 10 }}
                        variant="contained"
                            color='warning'>Signup</Button> </>}

                   {isLoggedIn && <Button
                   onClick={()=>dispatch(authActions.logout())}
                   LinkComponent={Link} to="/auth"
                    sx={{ margin: 1, borderRadius: 10 }}
                        variant="contained"
                        color='warning'>Logout</Button>}

                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
