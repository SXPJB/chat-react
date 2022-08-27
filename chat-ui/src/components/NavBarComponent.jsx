import React from "react";
import {Button, Container, Navbar} from "react-bootstrap";
import {useChatContext} from "../context/ChatContext.jsx";

const NavBar = () =>{
    const {user,logout,showModal} = useChatContext()
    const {nickname } = user

    return(
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand >Hello: {nickname}</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse
                    className='justify-content-end'>
                    <Button
                        variant={!user.id ? 'outline-success': 'outline-danger'}
                        onClick={!user.id ? showModal : logout}
                    >
                        {!user.id? 'Login': 'Logout'}
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar