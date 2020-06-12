import * as axios from "axios"

//AC's name
const IS_AUTH = "IS_AUTH"
const DISPATCH_CARDS = "DISPATCH_CARDS"

let initialStale =
	{
		dashboard: [
			{
				color: "#ff7636",
				name: "ON-HOLD",
				id: "0"
			},
			{
				color: "#0094c0",
				name: "IN-PROGRESS",
				id: "1"
			},
			{
				color: "#fecc45",
				name: "NEEDS-REVIEW",
				id: "2"
			},
			{
				color: "#00bc69",
				name: "APPROVED",
				id: "3"
			},
		],
		auth: {
			isAuth: false,
			username: "",
			token: ""
		},
		cards: []
	};

let ApiReducer = (state = initialStale, action) => {

	switch (action.type) {
		case IS_AUTH:
			return {
				...state, auth: {...action.authInfo}
			}
		case DISPATCH_CARDS:
			return {
				...state, cards: [...action.cards]
			}
		default:
			return state
	}
}

export default ApiReducer;

//add info while logIn
const isAuthUser = authInfo => ({type: IS_AUTH, authInfo})
//add cards after loading from server
const dispatchCards = cards => ({type: DISPATCH_CARDS, cards})

//check for token isActive
export const isTokenActive = (tokenStorage) => {
	return dispatch => {
		const userStorage = localStorage.getItem("username")
		dispatch(isAuthUser({
			isAuth: true,
			username: userStorage,
			token: tokenStorage
		}))
		dispatch(getUserCards(tokenStorage))
	}
}

//loading cards user
export const getUserCards = (token) => {
	return dispatch => {
		axios.get("https://trello.backend.tests.nekidaem.ru/api/v1/cards/", {
			headers: {Authorization: token}
		})
			.then(res => {
				dispatch(dispatchCards(res.data))
			})
			.catch(err => {
				console.error(err);
			})
	}
}

//create user account
export const signUpUser = (puller) => {
	return (dispatch) => {
		axios.post("https://trello.backend.tests.nekidaem.ru/api/v1/users/create/",
			puller)
			.then(res => {
				dispatch(isAuthUser({
					isAuth: true,
					username: puller.username,
					token: `JWT ${res.data.token}`
				}))
				localStorage.setItem('lreijfnvk', `JWT ${res.data.token}`)
				localStorage.setItem('username', puller.username)
				return res
			})
			.then(res => {
				dispatch(getUserCards(`JWT ${res.data.token}`))
			})
			.catch(err => {
				console.error(err);
			})

	}
}

//connect to user account via log and pass
export const signInUser = (puller) => {
	return dispatch => {
		axios.post("https://trello.backend.tests.nekidaem.ru/api/v1/users/login/",
			puller)
			.then(res => {
				dispatch(isAuthUser({
					isAuth: true,
					username: puller.username,
					token: `JWT ${res.data.token}`
				}))
				localStorage.setItem('lreijfnvk', `JWT ${res.data.token}`)
				localStorage.setItem('username', puller.username)
				return res
			})
			.then(res => {
				dispatch(getUserCards(`JWT ${res.data.token}`))
			})
			.catch(err => {
				console.error(err);
			})
	}
}

//create new card via modal, need data (text, row) and token
export const createCard = (data, token) => {
	return dispatch => {
		axios.post("https://trello.backend.tests.nekidaem.ru/api/v1/cards/", data, {
			headers: {Authorization: token}
		})
			.then(res => {
				dispatch(getUserCards(token))
			})
			.catch(err => {
				console.error(err);
			})
	}
}

//delete card by id
export const deleteCard = (id, token) => {
	return dispatch => {
		axios.delete(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/${id}/`, {
			headers: {Authorization: token}
		})
			.then(res => {
				if (res.status === 204)
					dispatch(getUserCards(token))
			})
			.catch(err => {
				console.error(err);
			})
	}

}

//close Session or delete Local storage token
export const deleteLocalStorage = () => {
	return dispatch => {
		dispatch(isAuthUser({
			isAuth: false,
			username: "",
			token: ""
		}))
		localStorage.removeItem('lreijfnvk')
		localStorage.removeItem('username')
	}
}

//update row using react-dnd
export const updateCardInfo = (token, patchedCard) => {
	return dispatch => {
		// dispatch(updateCard(cards))
		axios.patch(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/${patchedCard.id}/`, {
			row: patchedCard.row,
			seq_num: patchedCard.seq_num,
			text: patchedCard.text
		}, {
			headers: {Authorization: token}
		})
			.then(res => {
				if (res.status === 200) {
					dispatch(getUserCards(token))
				}
			})
			.catch(err => {
				console.error(err);
			})
	}
}

