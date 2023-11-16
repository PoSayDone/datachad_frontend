import { Route, Routes, useLocation } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './views/Dashboard/Dashboard';
import Logs from './views/Logs/Logs';
import People from './views/People/People';
import Projects from './views/Projects/Projects';
import Settings from './views/Settings/Settings';

function App() {
	const location = useLocation();
	return (
		<>
			<Sidebar />
			<main>
				<Routes key={location.pathname} location={location}>
					<Route path='/dashboard' key='/' element={<Dashboard />} />
					<Route path='/logs' key='/' element={<Logs />} />
					<Route path='/people' key='/' element={<People />} />
					<Route path='/projects' key='/' element={<Projects />} />
					<Route path='/settings' key='/' element={<Settings />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
