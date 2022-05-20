import React, { useState } from 'react'
import { Table, Space, Button, Tag,message } from 'antd';
import { EditFilled, DeleteFilled, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DelApi from './DelApi';


const UserList = ({setUserFormDrawer, setEditValues, editValues, list, setList, setRecord,setSearchData,searchData,refresh,setRefresh}) => {

  function refreshPage() {
    window.location.reload(false);
  }

  const handleChange = (record) => {setRecord(record)
    const id = record.id;
    DelApi(id);
    success(record.username)
    setRefresh(!refresh)
    return id;
  };

  const success = (username) => {
    message.success('successfully deleted user: '+username,5);
  };
  

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
    },
    {
      title: 'Client',
      dataIndex: 'client',
      sorter: (a, b) => a.client.localeCompare(b.client),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: status => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'volcano'} key={status}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Equipment Count',
      dataIndex: 'equipments',
      render: equipments => (<p>{equipments.length-parseInt(equipments.length/2)}</p>)

    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <Space size={40}>
          <Button
            onClick={() => {
              setEditValues({ id: record.id, username: record.username, password: record.password, fullname: record.fullname, mobile: record.mobile, role:record.role, client: record.client, email:record.email, status:record.status, equipments:record.equipments, date:record.date });
              setUserFormDrawer({ show: true, mode: "edit"});
            }}
            type="primary" shape="circle"
            icon={<EditFilled />} size={'small'}
          />
          <Button
            onClick={() => {
                handleChange(record); 
                               
                            }}
            type="primary" shape="circle"
            icon={<DeleteFilled />} size={'small'}
          />
        </Space>
      ),
    }
  ];



  return (
    <div className="data-table">
      <Table columns={columns} dataSource={list.filter((item) => {
          return item?.username.toLowerCase().includes(searchData);
        })} pagination={{ position: ["bottomCenter"], defaultPageSize: [8] }} />

    </div>
  )
}

export default UserList
