import React from "react";
import {Button, Container, Navbar} from "react-bootstrap";
import {useChatContext} from "../context/ChatContext.jsx";

const NavBar = () =>{
    const {user} = useChatContext()
    const {id, nickname } = user
    console.log(id)
    return(
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand >Hello: {nickname}</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse
                    className='justify-content-end'>
                    <Button
                        variant='outline-success'>
                        Login
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar