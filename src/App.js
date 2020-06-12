import React from 'react';
import './App.css';
import DashboardContainer from "./components/Dashboard/DashboardContainer";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'

function App() {
	return (
		<DndProvider backend={HTML5Backend}>
			<div className="App">
				<DashboardContainer/>
			</div>
		</DndProvider>
	);
}

export default App;
