import HeaderCartButton from './HeaderCartButton'
import styles from './Header.module.css'
import meals from '../../assets/meals.jpg'

const Header = props => {
	return (
		<>
			<header className={styles.header}>
				<h1>Meals</h1>
				<HeaderCartButton onClick={props.onShowCart} />
			</header>
			<div className={styles['main-image']}>
				<img src={meals} alt='A table full of food' />
			</div>
		</>
	)
}

export default Header
