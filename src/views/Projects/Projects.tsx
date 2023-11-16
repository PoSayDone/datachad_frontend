import Search from '../../components/Search/Search';
import { UserData } from './data.js';
import style from './Projects.module.scss';

const Projects = () => {
	return (
		<div className='container'>
			<h1>Проекты</h1>
			<Search placeholder={'Найти проект'} />
			<div className={style.container}>
				{UserData.map((project) => {
					return (
						<div key={project.name} className={style.project}>
							<div className={style.text}>
								<h3>{project.name}</h3>
								<p>{project.description}</p>
							</div>
							<div className={style.users}>
								<span className={`material-symbols-rounded`}>person</span>
								<span>
									{project.current_people}/{project.max_people}
								</span>
							</div>
							<button className={style.more}>
								<span className={`material-symbols-rounded`}>more_vert</span>
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Projects;
