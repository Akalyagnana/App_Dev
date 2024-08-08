import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Tooltip } from '@mui/material';

const Header = () => {
  return (
    <div>
        <div className='Headertop'>
          <div className='nearcp'>
          
          <div className='elementhead'>
            <NavLink to="/" style={{color:"black", 
            textDecoration:'none',
            fontSize:'30px',
            fontFamily:'fantasy'
            }}>{"LMS Solutions"}</NavLink>
            
            </div>

          
            <div className='elementhead'>
            <NavLink to="/aboutus" style={{color:"black", 
            textDecoration:'none',
            fontSize:'25px'
            }}>{"About us"}</NavLink>
            </div>
            
          
          
            <div className='elementhead'>
            <NavLink to="/contactus" style={{color:"black", 
            textDecoration:'none',
            fontSize:'25px'
            }}>{"Contact Us"}</NavLink>
            
            </div>
            
            <div className='manageshipment'>
              <NavLink to='/manageship' style={{color:"black",
                textDecoration:'none',
                fontSize:'25px'
              }}>{"Manage Shipments"}</NavLink>

            </div>
          
          </div>
          <div>
            <Tooltip title="Profile">
            <NavLink to="/profile" style={{textDecoration:'none',
              color:'black',
            }}>
            <AccountCircleIcon sx={{fontSize:40}}/>
            </NavLink>
            </Tooltip>
            
          </div>

        </div>
    </div>
  )
}

export default Header