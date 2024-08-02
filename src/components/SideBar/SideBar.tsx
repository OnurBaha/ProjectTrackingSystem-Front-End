import React, { useState } from 'react'
import "./SideBar.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import { ADMIN_ROLE } from '../../environment/environment';


export default function SideBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const lastPathSegment = pathArray[pathArray.length - 1];
    const user = authService.getUserInfo();

    console.log(lastPathSegment);

    const handleLogout = () => {
        authService.logoutUser();
        navigate("/");
    }


    return (          
    
 <div className="d-flex flex-column  flex-shrink-0 p-3 text-white bg-dark sidebar" style={{ height:"100vh" ,  width: '250px' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 text-white text-decoration-none">
        <span className="fs-5 text-center">Project Tracking System</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li   onClick={()=>navigate("/projeler")} className="nav-item">
        <a className={`nav-link text-white mb-4 ${lastPathSegment === "projeler" ? "active" : ""}`}>
            <svg className="bi me-2" width="16" height="16">
            </svg>
            Projelerim
          </a>
        </li>
        <li  onClick={()=>navigate("/gorevler")}  >
        <a className={`nav-link text-white mb-4 ${lastPathSegment === "gorevler" ? "active" : ""}`}>
            <svg className="bi me-2" width="16" height="16">
            </svg>
            Görevlerim
          </a>
        </li>
        <li onClick={handleLogout}>
          <a   className="nav-link text-white mb-4">
            <svg className="bi me-2" width="16" height="16">
            </svg>
            Çıkış Yap
          </a>
        </li>      
      </ul>
    </div>
  );
};