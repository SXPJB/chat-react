import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useChatContext} from "../context/ChatContext.jsx";

const LoginFromComponent = () => {
    const {show,hideModal,login} = useChatContext()
    const [user,setUser] = useState({
        nickname:''
        })
    const onSubmit = e =>{
        e.preventDefault()
        login(user)
        setUser({
            nickname:''
        })
    }

     return (
        <Modal
            show={show}
            onHide={hideModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Label>Nickname:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='@Example'
                        value={user.nickname}
                        onChange={e=> setUser({...user, nickname: e.target.value})}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={hideModal}> Close </Button>
                <Button variant='primary' onClick={onSubmit}>Login!</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginFromComponent;