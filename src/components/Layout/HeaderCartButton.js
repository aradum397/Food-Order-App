import { useContext, useState, useEffect } from 'react'
import { CartContext } from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon'
import styles from './HeaderCartButton.module.css'

const HeaderCartButton = props => {
	const [btnHighlight, setButtonHighlight] = useState(false)

	const cartCtx = useContext(CartContext)

	const numberOfItems = cartCtx.items.reduce((current, item) => {
		return current + item.amount
	}, 0)

	const btnStyles = `${styles.button} ${btnHighlight ? styles.bump : ''}`

	useEffect(() => {
		if (cartCtx.items.length > 0) {
			setButtonHighlight(true)
		}
		const bumpTimer = setTimeout(() => {
			setButtonHighlight(false)
		}, 300)
		return () => clearTimeout(bumpTimer)
	}, [cartCtx.items])

	return (
		<button className={btnStyles} onClick={props.onClick}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={styles.badge}>{numberOfItems}</span>
		</button>
	)
}

export default HeaderCartButton
