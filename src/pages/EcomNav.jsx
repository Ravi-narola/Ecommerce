import React from 'react'
import { NavLink } from 'react-router-dom';
import navstyle from './EcomNav.module.css'
import { useAuth } from '../context-data'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo  from '../image/Logo.png';
import { Button, Image } from 'react-bootstrap';

function EcomNav() {

// context DATA
let {data,setdata,logout} = useAuth()
console.log(data);

  return (
    <>
       <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <Image src={logo} className='me-5 p-1'/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-between align-items-center  w-100 ">
            <div className='d-lg-flex '>
                {
                  !data?.isLoggedIn ?   <NavLink  to="/" className={`fs-5 text-black mx-3 fw-medium `}>Login</NavLink> : ''
                }

                {
                  !data?.isLoggedIn ?   <NavLink  to="/register" className={`fs-5 text-black mx-3 fw-medium `}>Register</NavLink> : ''
                }

                {
                  !!data?.isLoggedIn ?    <NavLink  to="/dashboard" className={`fs-5 text-black mx-3 fw-medium `}>Dashboard</NavLink> : ''
                }

                {
                  !!data?.isLoggedIn ?      <NavLink  to="/Store" className={`fs-5 text-black mx-3 fw-medium `}>Store</NavLink> : ''
                }
            </div>

            {
              data?.isLoggedIn ?      
            (
              <NavDropdown title={`${data?.currentUserName}`} id="basic-nav-dropdown"  className={`${navstyle.navdrop} my-3 mx-4 my-sm-0 mx-sm-4`}>
                <NavDropdown.Item href="#action/3.1" className='bg-transparent'>
                        <Button variant="success" className='w-100' onClick={()=>logout()}>LOGOUT</Button> 
                </NavDropdown.Item>
              </NavDropdown> 
            )
            : 
            ''
            }      

          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
     </>
  )
}

export default EcomNav