import { Field, Form, Formik } from 'formik'
import React from 'react'
import { Button } from 'react-bootstrap'
import * as yup from 'yup' 
import ReadInputError from './ReadInputError'
import { useAuth } from '../context-data'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

function Register() {

  //context data
  let {data,setdata} = useAuth()

  //navigate to store
  let navi = useNavigate()

  let countryData=[
    {id:1,countryname:'India'},
    {id:2,countryname:'Nepal'},
    {id:3,countryname:'Bhutan'},
    {id:4,countryname:'Maldives'},
    {id:5,countryname:'Qatar'}
  ]

  let formValidation = yup.object({
    fullName:yup.string().required(),
    email:yup
    .string()
    .required()
    .matches( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Invalid Email Address'),
    password:yup.string().required()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:'),
    gender:yup.string().required('Select Any One'),
    country:yup.string().required('Select Any One'),
    receiveNewsLetters:yup.string().required('Select Any One'),
    dateOfBirth:yup.string().required()
  })

  // toatify ===
//success
  let notifyRegSuccess = () => toast.success('🦄 REGISTER SUCCESSFULL!', {
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
  let notifyRegfail = () => toast.warn('🦄 REGISTER UNSUCCESSFULL!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"  
  });



  // register click
  let onRegisterClick = async(para)=>{
  let response = await fetch(`https://ecommerce-json-data-dmxu.onrender.com/users`,{method:"POST",body:JSON.stringify(para),headers:{"Content-type":"application/json"}})
  if(response.ok){
    let responseBody = await response.json()
    setdata({
      ...data, 
      isLoggedIn:true,
      currentUserName:responseBody?.fullName,
      currentUserId:responseBody?.id
      })
    // alert('Registration Successfull')
    // console.log(responseBody);
    notifyRegSuccess()
setTimeout(() => {
  navi('/store')
}, 3000);
  }else{
    notifyRegfail()
  }
  }

  return (
    <div className='bg_image_register py-5'>
      <Formik 
          validationSchema={formValidation}
          initialValues={
            {email:'',
            password:'',
            fullName:'',
            gender:'',
            dateOfBirth:'',
            country:'',
            receiveNewsLetters:''}
          }

          onSubmit={(values)=>{
          console.log(values);
          onRegisterClick(values)
        }}
      >

        <div className='form_bg_register rounded-4 border border-2 border-light text-white w-25 m-auto overflow-hidden'>

          <Form>
            
            <h3 className='text-center py-2 text-bg-dark text-uppercase border-bottom border-2 '>Register</h3>

            {/* name */}
              <div className="my-4 px-4">
                {/* <label htmlFor="">UserName :: </label> */}
                <Field type='text' name="fullName" placeholder="UserName" className='rounded border border-2 border-dark-subtle ps-3 p-1 w-100'/>
                <ReadInputError name={`fullName`}/>
            </div>

            {/* email */}
            <div className="my-4 px-4">
              {/* <label htmlFor="">UserEmail :: </label> */}
              <Field type='text' name="email" placeholder="UserEmail" className='rounded border border-2 border-dark-subtle ps-3 p-1 w-100'/>
              <ReadInputError name={`email`}/>
            </div>

            {/* pass */}
            <div className="my-4 px-4">
              {/* <label htmlFor="">UserPassword :: </label> */}
              <Field type='text' name="password" placeholder="UserPassword" className='rounded border border-2 border-dark-subtle ps-3 p-1 w-100'/>
              <ReadInputError name={`password`}/>
            </div>

            {/* dateOfBirth */}
            <div className="my-4 px-4">
              {/* <label htmlFor="">UserAge :-</la  bel> */}
              <Field type='date' name="dateOfBirth" className='rounded border border-2 border-dark-subtle ps-3 p-1 w-100 '/>
              <ReadInputError name={`dateOfBirth`}/>
            </div>

            {/* country */}
            <div className="my-4 px-4">
              {/* <label htmlFor="">Country :-</label>  */}
              <Field name="country" as='select' className='rounded border border-2 border-dark-subtle ps-3 p-1 w-100 '>
                <option value=''>Country Select</option>
                {
                  countryData.map(ele=>{
                    return <option key={ele.id} value={ele.countryname}>{ele.countryname}</option>
                  })
                }
              </Field>
              <ReadInputError name={`country`}/>
            </div>

            {/* gender */}
            <div className="my-4 px-4">
              <label htmlFor="">Gender :- </label> 

              <Field type='radio'  name='gender' value='male' className='ms-4 me-2'/> 
              <label htmlFor="">MALE </label>

              <Field type='radio' name='gender'  value='female' className='ms-4 me-2'/>
              <label htmlFor="">FEMALE </label> 

              <ReadInputError name={`gender`}/>
            </div>

            {/* recieveNewsLetter */}
            <div className="my-4 px-4">
              <label htmlFor="" className='me-3'>ReceiveNewsLetters :-</label> 

              <Field className='ms-2 me-2' 
              type='radio' 
              name='receiveNewsLetters' 
              value='true'/>
              <label htmlFor="">Yes</label>

              <Field className='ms-3 me-2'
              type='radio' 
              name='receiveNewsLetters' 
              value='false'/>
              <label htmlFor="">No</label>
              <ReadInputError name={`receiveNewsLetters`}/>
            </div>

            {/* submit */}
            <Button type='submit' variant='outline-light ' className='d-block mx-auto mb-4 mt-5 text-uppercase '>Register</Button>
         
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

export default Register