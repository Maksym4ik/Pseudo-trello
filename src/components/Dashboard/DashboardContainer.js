import React from "react";
import {connect} from "react-redux";
import Dashboard from "./Dashboard"
import Login from "../Login/Login";
import {
	signUpUser,
	signInUser,
	createCard,
	getUserCards,
	isTokenActive,
	deleteCard,
	deleteLocalStorage,
	updateCardInfo
} from "../../redux/api-reducer";

class DashboardContainer extends React.Component {

	componentDidMount() {
		const tokenStorage = localStorage.getItem("lreijfnvk")
		if (!this.props.auth.isAuth && tokenStorage) {
			this.props.isTokenActive(tokenStorage)
		}
	}

	render() {
		return this.props.auth.isAuth === true ? <Dashboard {...this.props} /> :
			<Login signInUser={this.props.signInUser} signUpUser={this.props.signUpUser}/>
	}

}

let mapStateToProps = (state) => {
	return {
		dashboard: state.api.dashboard,
		cards: state.api.cards,
		auth: state.api.auth
	}
}
let mapDispatchToProps = {
	signUpUser,
	signInUser,
	createCard,
	getUserCards,
	isTokenActive,
	deleteCard,
	deleteLocalStorage,
	updateCardInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)

