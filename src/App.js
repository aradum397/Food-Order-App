import { useState } from 'react'
import { CartProvider } from './store/cart-context'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'

function App() {
	const [cartShow, setCartShow] = useState(false)

	const showCart = () => {
		setCartShow(true)
	}

	const hideCart = () => {
		setCartShow(false)
	}

	return (
		<CartProvider>
			{cartShow && <Cart onHideCart={hideCart} />}
			<Header onShowCart={showCart} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	)
}

export default App
