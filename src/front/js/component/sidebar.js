import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { FaMoneyBillAlt, FaUserFriends } from "react-icons/fa"
import { MdGroups } from "react-icons/md"
import "../../styles/sidebar.css"

export const SideBar = () => {
  return (
    <div className="sidebar-container">
        <Sidebar>
            <Menu>
                <MenuItem> <FaMoneyBillAlt /> Expenses </MenuItem>
                <MenuItem> <BsFillPiggyBankFill /> Piggy Banks </MenuItem>
                <MenuItem> <MdGroups /> Groups </MenuItem>
                <MenuItem> <FaUserFriends /> Friends </MenuItem>
            </Menu>
        </Sidebar>
    </div>
  );
};
