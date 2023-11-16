import { ReactNode } from 'react';

import style from './FilterSideMenu.module.scss';

type Props = {
	children: ReactNode;
};

const FilterSideMenu = (props: Props) => {
	return <aside className={style.container}>{props.children}</aside>;
};

export default FilterSideMenu;
