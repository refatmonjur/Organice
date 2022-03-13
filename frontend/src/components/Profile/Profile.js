import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import "./Profile.css";
import { Paper } from '@mui/material';
import { Button } from '@mui/material';


function Profile() {
  return (
    <div>
      <NewHomeNavbar />

      <div className='welcome'>
        Welcome Back,
      </div>

     
     {/* everything goes inside here */}
      <div className='container'>

        {/* image container */}
        <div className='avatar--container'>
         type in something
        </div>
        {/* name field */}
        <div className='namefield-container'>
        <TextField id="outlined-basic" label="Your Name" variant="outlined" size="small" />
        </div>

        {/* update user info */}
        <div className='userinfo-container'>
        <button style={{height: "40px", width: "280px"}}>Update User Info</button>
        </div>

        {/* update password */}
        <div className='password-container'>
        <button style={{height: "40px", width: "280px"}}>Update Password</button>
        </div>


        {/* <div>
          <TextField id="outlined-basic" label="Change Passwordç" variant="outlined" />
        </div>
        <div>
          <TextField id="outlined-basic" label="Change Passwordç" variant="outlined" />
        </div> */}
      </div>
     
     </div>
// {/*      
//       <div className='button'>

//         <TextField id="outlined-basic" label="Change Passwordç" variant="outlined" />
//       </div>

//       <div className='picture'>
//         <Stack>
//           <Avatar
//             sx={{ bgcolor: deepOrange[500] }}
//             alt="Remy Sharp"
//             src="/broken-image.jpg"
//           >
//             R
//           </Avatar>

//         </Stack>
//       </div> */}

  )
}

export default Profile