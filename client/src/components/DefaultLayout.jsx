import React from "react";
import { Button, Dropdown } from 'antd'; 
import "./../resources/DefaultLayout.css";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';

function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem('resume-user'))
    const navigate = useNavigate();
    const items = [
        {
          key: '1',
          label: (
            <Link to="/home">
              Home
            </Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link to="/profile">
              Profile
            </Link>
          ),
        },
        {
          key: '3',
          label: (
            <Link to="/template">
              Resume Templates
            </Link>
          ),
        },
        {
          key: '4',
          label: (
            <Link to="/upload">
              Resume Review
            </Link>
          ),
        },
        {
          key: '5',
          label: (
            <items onClick={()=>{
                localStorage.removeItem("resume-user");
                navigate("/landing");
            }} target="_blank" rel="noopener noreferrer" >
              Logout
            </items>
          ),
        },
      ];
  
  return (
    <div className="layout">
      <div className="header">
        <h1 onClick={()=>navigate('/home')} style={{cursor:"pointer"}}>
        <img src={require(".././pages/images/navlogo.jpeg")} alt="Bootstrap" className="px-1 mx-3 navimage" />
        </h1>
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Button icon={<UserOutlined />}>{user.username}</Button>
        </Dropdown>
      </div>

      <div className="content" style={{overflow:"scroll"}}>{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
