import React from "react";
import { Nav, Navbar } from 'react-bootstrap';
import "../../styles/sidenavbar.css"

const SideNavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="left" className="flex-column sidebar">
          <Nav className="flex-column">
            <Nav.Link href="#expenses" className="link-text mt-2"><h4>Expenses</h4></Nav.Link>
            <Nav.Link href="#piggybank" className="link-text"><h4>Piggy Bank</h4></Nav.Link>
            <Nav.Link href="#groups" className="link-text"><h4>Groups</h4></Nav.Link>
            <Nav.Link href="#friends" className="link-text"><h4>Friends</h4></Nav.Link>
            <Nav.Link href="#budgethistory" className="link-text"><h4>Budget History</h4></Nav.Link>
          </Nav>
      </Navbar>
    )
}

export default SideNavBar;