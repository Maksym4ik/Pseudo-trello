import React from "react"
import ColumnBox from "../ColumnBox";
import s from "../ColumnBox.module.scss"
import AddCard from "../modal/AddCard";

const Dashboard = (props) => {

	const closeSession = () => {
		props.deleteLocalStorage()
	}

	return <div className={s.dashboard}>
		<div className={s.hello}>
			<p>{`Welcome, ${props.auth.username}`} <span className={s.exit} onClick={closeSession}>{`exit`}</span></p>
		</div>
		<AddCard createCard={props.createCard} token={props.auth.token}/>
		{props.dashboard.map((board) => <ColumnBox token={props.auth.token}
																							 deleteCard={props.deleteCard}
																							 updateCardInfo={props.updateCardInfo}
																							 key={board.id}
																							 cards={props.cards} {...board} />)}
	</div>
}

export default Dashboard
