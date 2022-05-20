import React, { useContext, useState, useEffect } from "react";
import CreateApi from "./CreateApi";
import {
  Input, Drawer,Form,Select,Button,Space,message,DatePicker,Tooltip
} from "antd";
import {InfoCircleOutlined} from '@ant-design/icons';
import EditApi from "./EditApi";
import moment from 'moment';

const {Option} = Select

const UserForm = ({ UserFormDrawer, setUserFormDrawer, editValues,record,formdata,setfromData,setRefresh,refresh,eqplist,setEqplist }) => {


  const contactNoRegex = /^[0][4,5][0-9]{8,9}$/;
  const dateFormat = 'YYYY/MM/DD';


  const[form]=Form.useForm()
  const [edit,setEdit] = useState([])
  const [sub,setsub] = useState(false)

  const onCloseUserDrawer = () => {
    setUserFormDrawer({ ...UserFormDrawer, show: false}) ;
    // refreshPage()
      
};
 


  

  const onFinish=(values)=>{
    console.log("values:",values)
    values.equipments=values.equipments.toString()
    console.log(values)
    if(values.username!=null && values.fullname!=null && values.password!=null ){
      
      setUserFormDrawer({ ...UserFormDrawer, show: false })
      success(values.username,UserFormDrawer.mode)
    }
    else{
      setUserFormDrawer({ ...UserFormDrawer, show: true })
      
    }
    
    if(UserFormDrawer.mode=="add"){

      setfromData(values)
      
    }
    else if(UserFormDrawer.mode=="edit"){
      values.id = editValues.id;
      setEdit(values);
      
    }
    setsub(!sub);
     
  }
   
  
  useEffect(()=>{
    if (setsub && UserFormDrawer.mode==="add")
    {
      CreateApi(formdata)
      setRefresh(!refresh)
      
    }
    else if(setsub && UserFormDrawer.mode==="edit") 
    {
      EditApi(edit)
      setRefresh(!refresh)
      
    }
    
    
  },[sub]);



const success = (username,op) => {
  message.success('successfully '+op+'ed user: '+username,5);
};






  form.setFieldsValue({
    username: UserFormDrawer.mode==="add"?null:editValues.username,
    password: UserFormDrawer.mode==="add"?null:editValues.password,
    fullname: UserFormDrawer.mode==="add"?null:editValues.fullname,
    mobile: UserFormDrawer.mode==="add"?null:editValues.mobile,
    role: UserFormDrawer.mode==="add"?null:editValues.role,
    client: UserFormDrawer.mode==="add"?null:editValues.client,
    email: UserFormDrawer.mode==="add"?null:editValues.email,
    status: UserFormDrawer.mode==="add"?null:editValues.status,
    equipments: UserFormDrawer.mode==="add"?null:editValues.equipments,
    date: UserFormDrawer.mode==="add"?null:moment(editValues.date)
  })
  
  return (
    <Drawer
      visible={UserFormDrawer.show}
      onClose={onCloseUserDrawer}
      closable
      title={UserFormDrawer.mode === "add" ? "Add User" : "Edit User"}
      width={400}
      className="main-drawer"
    >
      <Form   layout="vertical" onFinish={onFinish} form = {form} >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username" }]}
        >
          <Input  />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password />
        </Form.Item>
    
        <Form.Item
          label="Full Name"
          name="fullname"
          
          rules={[{ required: true, message: "Please input your full name" }]}
        >
          <Input    />
        </Form.Item>

        <Form.Item label="Contact Number" name="mobile"
          
          rules={[{ required: true, message: 'Enter contact number!' },
          { pattern : contactNoRegex, message : 'Invalid Contact No.' },
          ]} >
          <Input type="text"    suffix={(
                    <Tooltip placement="left" title="Allowed formats 05XXXXXXXX / 04XXXXXXX">
                    <InfoCircleOutlined  style={{ color : 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                    )} />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select allowClear >
            <Option value="Software">Software</Option>
            <Option value="Test">Test</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Client"
          name="client"
          
          rules={[{ required: true, message: "Please select a client" }]}
        >
              <Select>
                <Option value="Adaptus">Adaptus</Option>
                <Option value="Dtalkz">Dtalkz</Option>
              </Select>
        </Form.Item>
       
        <Form.Item
          label="Email Id"
          name="email"
          
          rules={[{ required: true, message: "Please input your email id" },{ type: "email", message: 'Not a valid email id!' }]}
        >
          <Input  />
        </Form.Item>
        
        <Form.Item
          label="Status"
          name="status"
          
          rules={[{ required: true, message: "Please select the status" }]}
        >
          <Select >
            <Option value="ACTIVE">ACTIVE</Option>
            <Option value="INACTIVE">INACTIVE</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Equipments"
          name="equipments">
           <Select mode="multiple" allowClear optionFilterProp="label" >
            {
              eqplist&&eqplist.map(opt=>{
              return <Option value={opt.id} key={opt.id} >{opt.equipmentname}</Option>
                           
        })}
        </Select>
        </Form.Item>

        <Form.Item label="Expiry Date" name="date" 
          rules={[{ required: true, message: "Please select the date" }]}>
          <DatePicker />
        </Form.Item>

        <Space>
        <Form.Item>
        <Button 
          type="primary" 
          shape="round" 
           htmlType="submit" >
        Save
        </Button>
        </Form.Item>
      </Space>

      </Form>
      
    </Drawer>
  );
};

export default UserForm;
