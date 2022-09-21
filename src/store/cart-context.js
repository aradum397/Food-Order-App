import React, { useReducer } from 'react'

export const CartContext = React.createContext({
	items: [],
	totalAmount: 0,
	addItem: item => {},
	removeItem: id => {}
})

const defaultCart = {
	items: [],
	totalAmount: 0
}

const cartReducer = (state, action) => {
	if (action.type === 'ADD_ITEM') {
		const newTotalAmount = state.totalAmount + action.item.price * action.item.amount
		const itemIndex = state.items.findIndex(item => item.id === action.item.id)
		const cartItem = state.items[itemIndex]
		let newItems
		if (cartItem) {
			const newItem = {
				...cartItem,
				amount: cartItem.amount + action.item.amount
			}
			newItems = [...state.items]
			newItems[itemIndex] = newItem
		} else {
			newItems = state.items.concat(action.item)
		}
		return {
			items: newItems,
			totalAmount: newTotalAmount
		}
	}
	if (action.type === 'REMOVE_ITEM') {
		const itemIndex = state.items.findIndex(
			(item) => item.id === action.id
		)
		const cartItem = state.items[itemIndex]
		const newTotalAmount = state.totalAmount - cartItem.price
		let newItems
		if (cartItem.amount === 1) {
			newItems = state.items.filter(item => item.id !== action.id)
		} else {
			const newItem = { ...cartItem, amount: cartItem.amount - 1 }
			newItems = [...state.items,]
			newItems[itemIndex] = newItem
		}
		return {
			items: newItems,
			totalAmount: newTotalAmount
		}
	}
	return defaultCart
}

export const CartProvider = props => {
	const [cartState, cartDispatch] = useReducer(cartReducer, defaultCart)

	const addItemHandler = item => {
		cartDispatch({ type: 'ADD_ITEM', item: item })
	}

	const removeItemHandler = id => {
		cartDispatch({ type: 'REMOVE_ITEM', id: id })
	}

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemHandler,
		removeItem: removeItemHandler
	}

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	)
}
