import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import Navigation from '../Navigation/Navigation';

const layout = (props) => {
    return (
        <Grid>
            <Row>
                <Navigation/>
            </Row>
            <main>
                {props.children}
            </main>
        </Grid>
    )
}

export default layout;