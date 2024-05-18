import React, { useState } from 'react'
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context-data';

import { Field, Formik,Form } from 'formik'
import * as yup from 'yup' 
import ReadInputError from './ReadInputError';
import { Button } from 'react-bootstrap';


function Login() {

  let loginValidation = yup.object({
    email:yup
    .string()
    .required()
    .matches( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Invalid Email Address'),
    password:yup
    .string()
    .required()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:')
  })



// navigate
let navi = useNavigate()

// context data
let {data,setdata} = useAuth()

// recieve navigate data from restricted routes
let location = useLocation()

// let redirectPath = location.state?.path || '/'



// toatify
//success
let notifySuccess = () => toast.success('🦄 LOGIN SUCCESSFULL!', {

  position: "top-center",
  autoClose: 4999,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark"
  
  });

//unsuccess
  let notifyfail = () => toast.warn('🦄 LOGIN UNSUCCESSFULL!', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark"
  
    });





// onLoginClick

let onLoginClick = async(para) =>{
let response = await fetch(`https://ecommerce-json-data-dmxu.onrender.com/users?email=${para.email}&password=${para.password}`,{method:'GET'})
// console.log(response);
if(response.ok){
  let responseBody = await response.json()
  // console.log(responseBody);
  if(responseBody.length>0){
    // console.log(responseBody);

setdata({
...data, 
isLoggedIn:true,
currentUserName:responseBody[0]?.fullName,
currentUserId:responseBody[0]?.id
})
    // console.log('LOGIN SUCCESS');
    notifySuccess()
    setTimeout(() => {
      // navi(redirectPath,{replace:true})
      navi('/store',{replace:true})
    }, 1000);
  }else{
    // console.log('LOGIN FAILed');
    notifyfail()
  }
}
}


  return (
    <div className='bg_image_login'>

      <Formik
        validationSchema={loginValidation}
        initialValues={{email:'', password: ''}}
        onSubmit={(value)=>{
          console.log(value);
          onLoginClick(value)
        }}
      >

        <div className='form_bg_login rounded-4 border border-2 border-light text-white m-auto overflow-hidden'>
          <Form>

          <h3 className='text-center py-2 text-bg-dark text-uppercase border-bottom border-2 '>Login</h3>

            <div className='mt-5 mb-4 px-4'>
              
              {/* <label htmlFor="">UserEmail</label> */}
              <Field 
                type="text" 
                name="email"
                placeholder="UserEmail"
                className='rounded border border-2 border-dark-subtle ps-3 p-2 w-100'
              />
              <ReadInputError name={`email`}/>
            
            </div>
          
            <div className='my-4 px-4'>
              {/* <label htmlFor="">UserPassword</label> */}
              <Field 
                type="text" 
                name="password" 
                placeholder="UserPassword"
                className='rounded border border-2 border-dark-subtle ps-3 p-2 w-100'
              />
              <ReadInputError name={`password`}/>
            </div>

              <Button type='submit' variant='outline-light ' className=' d-block mx-auto mb-4 mt-5 text-uppercase px-4 py-2'>Login</Button>
          
          </Form>
        </div>
      
      </Formik>
              
      
<ToastContainer
  position="top-center"
  autoClose={4999}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
/>
    </div>
  )
}

export default Login