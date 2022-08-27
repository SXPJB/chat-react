import React from 'react';
import NavBar from "./components/NavBarComponent.jsx";
import {Col, Container, Row} from "react-bootstrap";
import ChatViewComponent from "./components/ChatViewComponent.jsx";
import LoginFromComponent from "./components/LoginFromComponent.jsx";
import {useChatContext} from "./context/ChatContext.jsx";

const App = () => {
    const {user} = useChatContext()
    return (
        <>
            <NavBar/>
            <Container className='mt-2'>
                <Row>
                    <Col className='text-center'>
                        {user.id?<ChatViewComponent/>:<h1>Need login for chat!</h1>}
                    </Col>
                </Row>
            </Container>
            <LoginFromComponent/>
        </>
    );
};

export default App;