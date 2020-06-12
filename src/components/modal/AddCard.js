import React, {useState} from "react"
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import s from "./Modal.module.scss"
import {Field, reduxForm} from "redux-form";
import {Input} from "../utils/FormControl";
import {required} from "../utils/validators";


const AddCardForm = (props) => {

	return <form className={s.form} onSubmit={props.handleSubmit}>
		<label>Your text</label>
		<Field validate={[required]} type={'text'} name={"text"} component={Input}/>
		<label>Choose label</label>
		<Field validate={[required]} name={"row"} component={"select"} autoComplete={"off"}>
			<option value="0">ON-HOLD</option>
			<option value="1">IN-PROGRESS</option>
			<option value="2">NEEDS-REVIEW</option>
			<option value="3">APPROVED</option>
		</Field>
		<button>add card</button>
	</form>
}
const AddCardReduxForm = reduxForm({form: "addCard"})(AddCardForm)


const AddCard = (props) => {

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const sendNewCard = puller => {
		props.createCard(puller, props.token)
		handleClose()
	}

	return (
		<>
			<Button className={s.add} variant="primary" onClick={handleShow}>
				Add Card
			</Button>

			<Modal  show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Card</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddCardReduxForm onSubmit = {sendNewCard} />
				</Modal.Body>
			</Modal>
		</>
	);
}

export default AddCard
