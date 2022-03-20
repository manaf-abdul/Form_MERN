import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DatePicker';
import { Form, Row, Col, Container, Button } from 'react-bootstrap'

function RegistrationForm() {
  const [value, setValue] = React.useState(new Date());
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('')
  const [category, setCategory] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [email, setEmail] = useState('')
  const [avatar,setAvatar]=useState('')
  const [avatarPreview, setAvatarPreview]=useState('/images/default_avatar.jpg')

  const myForm=new FormData()
  myForm.set('name',name)
  myForm.set('mobile',mobile)
  myForm.set('category',category)
  myForm.set('email',email)
  myForm.set('image',avatar)
  myForm.set('DOB',value)


  const getCategoryDetails=async()=>{
      const catData= await axios.get('http://localhost:5000/api/category')
    setCategoriesList(catData.data)
    console.log(catData.data)
  }

  useEffect(()=>{
    getCategoryDetails()
  },[])

  const submitHandler=async(e)=>{
    e.preventDefault()
    const config= { headers: { "Content-Type":"multipart/form-data" } };
    const updateUser=await axios.post('http://localhost:5000/api/users/',{name,mobile,category,email,value},config)
    console.log(updateUser)
  }

  // console.log(value)
  // console.log(category)

  const imageHandler =(e)=>{
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    console.log(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  }


  return (
    <>
      <div className="App">
        <Container className='pt-5'>
          <Form onSubmit={submitHandler}>

            <h4>Registration</h4>
            <Row className='pt-3'>
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="mobile" className='display: inline-block'>
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="name">
                  <Form.Label>JobType</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    as='select'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categoriesList && categoriesList.map((Categories) => (
                      <option key={Categories._id} value={Categories._id}>
                        {Categories.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="name">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
              <Form.Group controlId="name" id='registerimage'>
                  <img src={avatarPreview} alt='avatar Preview'></img>
                  <Form.Control
                  className='form-control-sm'
                    type="file"
                  // value={name}
                  onChange={imageHandler}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="name">
                  <Form.Label>Email Id</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                
                <Form.Group controlId="name" className='pt-4'>

                <Form.Label>Date of Birth</Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Custom input"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={({ inputRef, inputProps, InputProps }) => (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <input ref={inputRef} {...inputProps} />
                          {InputProps?.endAdornment}
                        </Box>
                      )}
                    />
                  </LocalizationProvider>
                </Form.Group>
                <div className='pt-5'>
                <Button type='submit' variant='primary'>
                    Update
                  </Button>
                  </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>

  );
}

export default RegistrationForm;