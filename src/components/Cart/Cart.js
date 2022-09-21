import { useContext } from 'react'
import { CartContext } from '../../store/cart-context'
import Modal from '../UI/Modal'
import CartItem from './CartItem'
import styles from './Cart.module.css'

const Cart = props => {
	const cartCtx = useContext(CartContext)

	const itemAddHandler = item => {
		cartCtx.addItem({...item, amount: 1})
	}

	const itemRemoveHandler = id => {
		cartCtx.removeItem(id)
	}

	const cardItems = cartCtx.items.map(item => {
		return (
			<CartItem
				key={item.id}
				name={item.name}
				amount={item.amount}
				price={item.price}
				onAdd={itemAddHandler.bind(null, item)}
				onRemove={itemRemoveHandler.bind(null, item.id)}
			/>
		)
	})
	return (
		<Modal>
			<ul>{cardItems}</ul>
			<div className={styles.total}>
				<span>Total amount:</span>
				<span>${cartCtx.totalAmount.toFixed(2)}</span>
			</div>
			<div className={styles.actions}>
				<button
					className={styles['button--alt']}
					onClick={props.onHideCart}>
					Close
				</button>
				{cartCtx.items.length > 0 && (
					<button className={styles.button}>Order</button>
				)}
			</div>
		</Modal>
	)
}

export default Cart
