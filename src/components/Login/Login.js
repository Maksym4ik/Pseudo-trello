import React from "react"
import s from "./Login.module.scss"
import {Field, reduxForm} from "redux-form";
import {required, minLength} from "../utils/validators";
import {Input} from "../utils/FormControl";

const minLength8 = minLength(8);

const SignIn = (props) => {

	return <form className={s.form} onSubmit={props.handleSubmit}>
		<label className={s.title}>SIGN IN</label>
		<label>Login</label>
		<Field validate={[required]} type={'text'} name={"username"} component={Input}/>
		<label>Password</label>
		<Field validate={[required, minLength8]} type={'password'} name={"password"} component={Input}/>
		<button>Sign In</button>
	</form>
}

const SignUp = (props) => {

	return <form className={s.form} onSubmit={props.handleSubmit}>
		<label className={s.title}>SIGN UP</label>
		<label>Login</label>
		<Field validate={[required]} type={'text'} name={"username"} component={Input}/>
		<label>Email</label>
		<Field validate={[required]} type={'email'} name={"email"} component={Input}/>
		<label>Password</label>
		<Field validate={[required, minLength8]} type={'password'} name={"password"} component={Input}/>
		<button>Sign Up</button>
	</form>
}

const SignInReduxForm = reduxForm({form: "signIn"})(SignIn)
const SignUpReduxForm = reduxForm({form: "signUp"})(SignUp)


const Login = (props) => {

	const signInUser = puller => {
		props.signInUser(puller)
	}

	const signUpUser = (puller) => {
		props.signUpUser(puller)
	}

	return <div className={s.loginContent}>
		<SignUpReduxForm onSubmit={signUpUser}/>
		<SignInReduxForm onSubmit={signInUser}/>
	</div>
}

export default Login



