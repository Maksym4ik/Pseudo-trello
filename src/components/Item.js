import React from "react"
import s from "./ColumnBox.module.scss";
import {useDrag} from "react-dnd";
import {ItemTypes} from "./utils/itemsType";

const Item = ({id,text,seq_num,row,deleteCard,token}) => {
	const deleteThisCard = () => {
		deleteCard(id,token)
	}

	const [{ isDragging }, drag] = useDrag({
		item: {
			type: ItemTypes.CARD,
			id,
			text,
			seq_num,
			row
		},
		collect: monitor => ({
			isDragging: !! monitor.isDragging()
		})
	})

	return <section style={{opacity: isDragging ? '0.2' : '1'}}  ref={drag} className={s.item}>
		<h5>{`id: ${id}`}</h5>
		<p>{text}</p>
		<div className={s.delete} onClick={deleteThisCard}>delete</div>
	</section>
}

export default Item;
