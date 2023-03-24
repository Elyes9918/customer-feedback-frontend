import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import {currentUser} from "../../../../utils/currentUser";
import {currentAccessToken} from "../../../../utils/currentAccessToken";
import {  RootState, useAppSelector,useAppDispatch} from "../../../../app/store";
import { getUserByEmailAction } from "../../../../features/userSlice";
import { findUpper } from "../../../../utils/Utils";



const User = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);

  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const accesToken = currentAccessToken();
  //const cUser = currentUser();


  useEffect(()=>{
    // CurrentUser();
    dispatch(getUserByEmailAction(accesToken.username));

  },[])

  const handleSignout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("refresh_token");
  };

  const handleRoleDesignation = (arr) => {

    if(arr !== undefined){
    if(arr.includes("ROLE_ADMIN")){ return "Administrator"}
    else if(arr.includes("ROLE_GESTIONNAIRE")){ return "Gestionnaire"}
    else if(arr.includes("ROLE_MEMBER")){ return "Member"}
    else if(arr.includes("ROLE_CLIENT")){ return "Client"}
    else return "Client"
  }

  }

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          {/* <UserAvatar icon="user-alt" className="sm" /> */}
          <UserAvatar className="sm" text={findUpper(user.firstName+" "+user.lastName)} theme="primary" />
          <div className="user-info d-none d-md-block">
            <div className="user-status">{handleRoleDesignation(user.roles)}</div>
            <div className="user-name dropdown-indicator">{user.firstName} {user.lastName}</div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <UserAvatar  text={findUpper(user.firstName+" "+user.lastName)} theme="primary" />
            <div className="user-info">
              <span className="lead-text">{user.firstName} {user.lastName}</span>
              <span className="sub-text">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/user-profile" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            <LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}>
              Login Activity
            </LinkItem>
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
