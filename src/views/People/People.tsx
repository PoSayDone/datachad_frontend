import { useState } from 'react';

import Search from '../../components/Search/Search';
import { UserData } from './data.js';
import style from './People.module.scss';

const People = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	return (
		<div className='container'>
			<h1>Люди</h1>
			<Search
				placeholder={'Поиск людей'}
				value={searchValue}
				onChange={(e: React.ChangeEvent<any>) => setSearchValue(e.target.value)}
			/>
			<div className={style.container}>
				{UserData.filter((user) => user.name.includes(searchValue)).map((user) => {
					return (
						<div key={user.name} className={style.user}>
							<div className={style.avatar} />
							<div className={style.text_block}>
								<h4>{user.name}</h4>
								<span>{user.role}</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default People;
