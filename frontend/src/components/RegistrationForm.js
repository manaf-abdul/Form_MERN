import React, { useState } from 'react'
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DatePicker';
import { Form, Row, Col, Container, Button } from 'react-bootstrap'

function RegistrationForm() {
  const categorieslist = ['FT', 'PT', 'consultant']
  const [value, setValue] = React.useState(new Date());
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('')
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('')
  // console.log(value)
  return (
    <>
      <div className="App">
        <Container className='pt-5'>
          <Form>

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
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="mobile" className='display: inline-block'>
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
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
                    {categorieslist && categorieslist.map((Categories) => (
                      <option key={Categories._id} value={Categories.name}>
                        {Categories}
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
                <Form.Group controlId="name">
                  <Form.Label>Email Id</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="name">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="name" className='pt-4'>
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
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>

  );
}

export default RegistrationForm;