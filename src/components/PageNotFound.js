import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import Row from 'react-bootstrap/Row';

function PageNotFound () {
    return (
        <Fragment>
            <Row className="justify-content-center">
                <h1>Oops!</h1>
            </Row>
            <Row className="justify-content-center">
                    <p>We can't seem to find the page you're looking for</p>
                    </Row>
            <Row className="justify-content-center">
                    <p><NavLink className='red-link' to='/'>Click here</NavLink> to go back to home page</p>
            </Row>
        </Fragment>
    )
}

export default PageNotFound