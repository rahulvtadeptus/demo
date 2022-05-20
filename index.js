import DashboardLayout from "Components/DashboardLayout";
import React,{useState,useEffect} from "react";
import Header from "./header";
import UserForm from "./userForm";
import UserList from "./userList";
import ListApi from "./ListApi";
import EqpList from "./EqpList";




const Users = () => {

  const [record, setRecord] = useState([])

  const [formdata, setfromData]= useState("")
   const [searchData, setSearchData] = useState("");
   const [refresh,setRefresh]= useState(true);
  

  const [list, setList] = useState([])
  const [eqplist,setEqplist]= useState([])
  

  useEffect(() => {
    ListApi().then(setList);
    EqpList().then(setEqplist);
  }, [refresh]);

  const [ editValues, setEditValues] = useState([])


const [UserFormDrawer, setUserFormDrawer] = useState({mode:true,show:false})


  return (
    <DashboardLayout header={<Header UserFormDrawer={UserFormDrawer} setUserFormDrawer={setUserFormDrawer} setSearchData={setSearchData} searchData={searchData} />} selectedMenuItem="5">
        <UserForm UserFormDrawer={UserFormDrawer} setUserFormDrawer={setUserFormDrawer} editValues={editValues}  record={record} formdata={formdata}  setfromData={setfromData} refresh={refresh} setRefresh={setRefresh} eqplist={eqplist} setEqplist={setEqplist}/>
      <UserList UserFormDrawer={UserFormDrawer} setUserFormDrawer={setUserFormDrawer} setSearchData={setSearchData} searchData={searchData} editValues={editValues} setEditValues={setEditValues} list={list} setList= {setList} setRecord={setRecord} refresh={refresh} setRefresh={setRefresh}/>
    </DashboardLayout>
  );
};

export default Users;
