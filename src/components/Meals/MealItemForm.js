import { useRef } from 'react'
import Input from '../UI/Input'
import styles from './MealItemForm.module.css'

const MealItemForm = props => {
	const inputRef = useRef()

	const submitHandler = e => {
		e.preventDefault()
		const amount = parseInt(inputRef.current.value)
		props.onAddToCart(amount)
	}

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<Input
				ref={inputRef}
				id={Date.now()}
				label={'Amount'}
				name={'amount'}
				type={'number'}
				min={1}
				max={5}
				step={1}
				defaultValue={1}
			/>
			<button>Add to Cart</button>
		</form>
	)
}

export default MealItemForm