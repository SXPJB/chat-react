import React from 'react';
import NavBar from "./components/NavBarComponent.jsx";
import {Col, Container, Row} from "react-bootstrap";
import ChatViewComponent from "./components/ChatViewComponent.jsx";

const App = () => {
    return (
        <>
            <NavBar/>
            <Container className='mt-2'>
                <Row>
                    <Col>
                        <ChatViewComponent/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default App;