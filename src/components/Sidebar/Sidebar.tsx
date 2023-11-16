import { Link, NavLink } from 'react-router-dom';

import logo from '../../img/logo.svg';
import style from './Sidebar.module.scss';

const Sidebar = () => {
	return (
		<nav className={style.sidebar}>
			<Link to='/' className={style.logo_container}>
				<img className={style.logo} src={logo} alt='logo'></img>
			</Link>
			<ul className={style.text_container}>
				<NavLink className={style.link} to='/dashboard'>
					дэшборд
				</NavLink>
				<NavLink className={style.link} to='/logs'>
					логи
				</NavLink>
				<NavLink className={style.link} to='/people'>
					люди
				</NavLink>
				<NavLink className={style.link} to='/projects'>
					проекты
				</NavLink>
				<NavLink className={style.link} to='/settings'>
					настройки
				</NavLink>
			</ul>
		</nav>
	);
};

export default Sidebar;
