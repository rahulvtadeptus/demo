import React,{useState,useEffect} from "react";
import { Button, Input, Space } from "antd";
import { SlidersOutlined } from "@ant-design/icons";
import EqpList from "./EqpList";

const Header = ({UserFormDrawer,setUserFormDrawer,setSearchData,searchData}) => {

  return (
    <div className="users-header">
      <Space align="center" size={20}>
        <h4 className="header-title">Users</h4>
      </Space>
      <Space className="pull-right">
      <Button type="primary" shape="round" onClick={()=>{
        setUserFormDrawer({mode:"add",show:true})
          }}>
          Add User
        </Button>
        <div className="inputSearch">
        <Input.Search
          placeholder="Search User"
          className="vertical-align-middle"
          enterButton
          onChange={(e) => {

            setSearchData(e.target.value.toLowerCase());
            
        }}
        />
        </div>
        
      </Space>
    </div>
  );
};

export default Header;