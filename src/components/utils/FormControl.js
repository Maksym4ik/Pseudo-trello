import React from "react"

export const Input = ({input, meta, ...props}) => {

	const isError = meta.touched && meta.error;

	return <div>
		<input {...input} {...props}/>
		<p>{isError && meta.error}</p>
	</div>

}
