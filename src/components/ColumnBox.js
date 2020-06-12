import React from "react"
import s from "./ColumnBox.module.scss"
import Item from "./Item";
import {useDrop} from "react-dnd";
import {ItemTypes} from "./utils/itemsType";

const ColumnBox = (props) => {

	const [{isOver}, drop] = useDrop({
		accept: ItemTypes.CARD,
		drop: (item, monitor) => {
			if (item.row !== props.id) {
				props.updateCardInfo(props.token, {...item, row: props.id})
			}
		},
		collect: monitor => ({
			isOver: !!monitor.isOver()
		})
	})

	let mappingItem = [];
	props.cards.forEach((card) => {
		if (props.id === card.row) {
			mappingItem = [...mappingItem, <Item token={props.token}
																					 deleteCard={props.deleteCard}
																					 key={card.id}
																					 text={card.text}
																					 id={card.id}
																					 row={card.row}
																					 seq_num={card.seq_num}/>]
		}
	})

	return <div className={s.columnBox}>
		<div style={{backgroundColor: props.color}} className={s.header}>
			<span>{`${props.name} ${mappingItem.length}`}</span>
		</div>
		<div style={{border: isOver ? "2px solid white" : "none"}} ref={drop} className={s.content}>
			{mappingItem}
		</div>
	</div>
}

export default ColumnBox
