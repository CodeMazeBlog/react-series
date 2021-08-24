import React from 'react';
import Row  from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'

const layout = (props) => {
    return (
        <Container>
            <Row>
                This is the place for the navigation component.
            </Row>
            <main>
                {props.children}
            </main>
        </Container>
    )
}

export default layout;
