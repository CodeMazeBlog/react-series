import React, { Component } from 'react';
import { Form, Well, Button, FormGroup, Col } from 'react-bootstrap';
import { returnInputConfiguration } from '../../../Utility/InputConfiguration';
import * as formUtilityActions from '../../../Utility/FormUtility';
import Input from '../../../UI/Inputs/Input';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import { connect } from 'react-redux';
import moment from 'moment';
import SuccessModal from '../../../components/Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../components/Modals/ErrorModal/ErrorModal';

class UpdateOwner extends Component {
    state = {
        ownerForm: {},
        isFormValid: true,
    }

    componentWillMount = () => {
        this.setState({ ownerForm: returnInputConfiguration() });
    }

    componentDidMount = () => {
        const id = this.props.match.params.id;
        const url = '/api/owner/' + id;
        this.props.onGetOwnerById(url, { ...this.props });
    }

    componentWillReceiveProps = (nextProps) => {
            const updatedOwnerForm = { ...this.state.ownerForm };
            let nameObject = { ...updatedOwnerForm.name };
            let dateObject = { ...updatedOwnerForm.dateOfBirth };
            let addressObject = { ...updatedOwnerForm.address };

            nameObject.value = nextProps.data.name;
            nameObject.valid = true;
            dateObject.value = moment(nextProps.data.dateOfBirth);
            addressObject.value = nextProps.data.address;
            addressObject.valid = true;

            updatedOwnerForm['name'] = nameObject;
            updatedOwnerForm['dateOfBirth'] = dateObject;
            updatedOwnerForm['address'] = addressObject;
            this.setState({ ownerForm: updatedOwnerForm });
    }

    handleChangeEvent = (event, id) => {
        const updatedOwnerForm = { ...this.state.ownerForm };
        updatedOwnerForm[id] = formUtilityActions.executeValidationAndReturnFormElement(event, updatedOwnerForm, id);

        const counter = formUtilityActions.countInvalidElements(updatedOwnerForm);

        this.setState({ ownerForm: updatedOwnerForm, isFormValid: counter === 0 })
    }

    redirectToOwnerList = () => {
        this.props.history.push('/owner-List');
    }

    updateOwner = (event) => {
        event.preventDefault();

        const ownerToUpdate = {
            name: this.state.ownerForm.name.value,
            dateOfBirth: this.state.ownerForm.dateOfBirth.value,
            address: this.state.ownerForm.address.value
        }

        const url = "/api/owner/" + this.props.data.id;

        this.props.onUpdateOwner(url, ownerToUpdate, {...this.props});
    }

    render() {
        const formElementsArray = formUtilityActions.convertStateToArrayOfFormObjects({ ...this.state.ownerForm });
        return (
            <Well>
                <Form horizontal onSubmit={this.updateOwner}>
                    {
                        formElementsArray.map(element => {
                            return <Input key={element.id}
                                elementType={element.config.element}
                                id={element.id} label={element.config.label}
                                type={element.config.type} value={element.config.value}
                                changed={(event) => this.handleChangeEvent(event, element.id)}
                                errorMessage={element.config.errorMessage}
                                invalid={!element.config.valid}
                                shouldValidate={element.config.validation}
                                touched={element.config.touched}
                                blur={(event) => this.handleChangeEvent(event, element.id)} />
                        })
                    }
                    <br />
                    <FormGroup>
                        <Col mdOffset={6} md={1}>
                            <Button type='submit' bsStyle='info' disabled={!this.state.isFormValid}>Update</Button>
                        </Col>
                        <Col md={1}>
                            <Button bsStyle='danger' onClick={this.redirectToOwnerList}>Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <SuccessModal show={this.props.showSuccessModal} modalHeaderText={'Success message'} 
                    modalBodyText={'Action completed successfylly'}
                    okButtonText={'OK'} 
                    successClick={() => this.props.onCloseSuccessModal('/owner-List', { ...this.props })} />
                <ErrorModal show={this.props.showErrorModal} modalHeaderText={'Error message'} 
                    modalBodyText={this.props.errorMessage}
                    okButtonText={'OK'} 
                    closeModal={() => this.props.onCloseErrorModal()} />
            </Well>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.repository.data,
        showSuccessModal: state.repository.showSuccessModal,
        showErrorModal: state.errorHandler.showErrorModal,
        errorMessage: state.errorHandler.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetOwnerById: (url, props) => dispatch(repositoryActions.getData(url, props)),
        onUpdateOwner: (url, owner, props) => dispatch(repositoryActions.putData(url, owner, props)),
        onCloseSuccessModal: (url, props) => dispatch(repositoryActions.closeSuccessModal(props, url)),
        onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOwner);