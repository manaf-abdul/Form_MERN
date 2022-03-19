import React,{forwardRef,useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import MaterialTable from 'material-table'
import {Container} from 'react-bootstrap'
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

  const navigate=useNavigate();
  // const data=[
  //   {name:"manaf",email:"manaf@gmail.com",id:"3"}
  // ]
    const columns=[
        {title:"Name",field:"name",},
        {title:"Email",field:"email",},
        {title:"Location",field:"location"},
        {title:"Mobile",field:"mobile"},
        {title:"Dob",field:"DOB"},
        {title:"Actions"}
    ]
 
const [users,setUsers]=useState([])  
console.log(users)  

useEffect(()=>{
    getData()
},[])

const getData=async()=>{
  const userData=await axios.get('http://localhost:5000/api/users/userlist')
  console.log(userData)
  setUsers(userData.data)
}
    
  return (
    <Container className='pt-5'>  
        <MaterialTable title='UserList'
        data={users}
        columns={columns}
        icons={tableIcons}
        editable={{
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
            //Backend call
            console.log(oldData._id)
            axios.delete(`http://localhost:5000/api/users/${oldData._id}`)
              .then(resp => {
                getData()
                resolve()
              })
          })
        }}
        />
    </Container>    
  )
}

export default UserList