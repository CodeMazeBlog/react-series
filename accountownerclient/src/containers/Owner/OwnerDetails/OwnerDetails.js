import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Well, Row, Col } from 'react-bootstrap';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import Moment from 'react-moment';
import OwnersAccounts from '../../../components/OwnerComponents/OwnersAccounts/OwnersAccounts';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

class OwnerDetails extends Component {
    componentDidMount = () => {
        let id = this.props.match.params.id;
        let url = '/api/owner/' + id + '/account';
        this.props.onGetData(url, { ...this.props })
    }

    renderTypeOfUserConditionally = (owner) => {
        let typeOfUser = null;

        if (owner.accounts && owner.accounts.length <= 2) {
            typeOfUser = (
                <Row>
                    <Col md={3}>
                        <strong>Type of user:</strong>
                    </Col>
                    <Col md={3}>
                        <span className={'text-success'}>Beginner user.</span>
                    </Col>
                </Row>
            );
        }
        else {
            typeOfUser = (
                <Row>
                    <Col md={3}>
                        <strong>Type of user:</strong>
                    </Col>
                    <Col md={3}>
                        <span className={'text-info'}>Advanced user.</span>
                    </Col>
                </Row>
            );
        }

        return typeOfUser;
    }

    render() {
        const owner = this.props.data;

        return (
            <Aux>
                <Well>
                    <Row>
                        <Col md={3}>
                            <strong>Owner name:</strong>
                        </Col>
                        <Col md={3}>
                            {owner.name}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <strong>Date of birth:</strong>
                        </Col>
                        <Col md={3}>
                            <Moment format="DD/MM/YYYY">{owner.dateOfBirth}</Moment>
                        </Col>
                    </Row>
                    {this.renderTypeOfUserConditionally(owner)}
                </Well>
                <OwnersAccounts accounts={owner.accounts} />
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.repository.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetData: (url, props) => dispatch(repositoryActions.getData(url, props))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerDetails);