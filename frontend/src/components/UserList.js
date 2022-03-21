import React, { forwardRef, useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import MaterialTable from 'material-table'
import { Container, Col, Button,Row } from 'react-bootstrap'
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

const UserList = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([])
  console.log(users)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const userData = await axios.get('/api/users/userlist')
    console.log(userData)
    setUsers(userData.data)
  }


  const columns = [
    { title: "Name", field: "name", },
    { title: "Email", field: "email", },
    { title: "Location", field: "location" },
    { title: "Mobile", field: "mobile" },
    { title: "Dob", field: "DOB" },
    { title: "Job Type", field: "jobType.name" },
    { title: "Image", field: "image.url", render: rowData => <a href={`${rowData.image.url}`} target='blank'>Image</a> }
  ]

  return (
    <Container className='pt-5'>
      <Row>
      <Col>
      <h2>User List</h2>
      </Col>
      <Col className='text-right'>
        <Button className='my-3' onClick={() => navigate('/register')}>
          Create User
        </Button>
      </Col>
      </Row>
      <MaterialTable title={'Users'}
        data={users}
        columns={columns}
        icons={tableIcons}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        editable={{
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
            console.log(oldData)
            //Backend call
            axios.delete(`/api/users/${oldData._id}`)
              .then(resp => {
                getData()
                resolve()
              })
          })
        }}
        actions={[
          {
            icon: EditIcon,
            tooltip: 'Edit User',
            onClick: (event, rowData) => {
              // Do save operation
              navigate(`/register/${rowData._id}`)
            }
          },
        ]}
      />
    </Container>
  )
}

export default UserList