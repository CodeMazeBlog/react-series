import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Home.css';

const home = (props) => {
    return (
        <Row>
            <Col md={12}>
                <div className={'homeText'}>
                    "WELCOME TO ACCOUNT-OWNER APPLICATION"
                </div>
            </Col>
        </Row>
    )
}

export default home;