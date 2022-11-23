import "./App.css";
import NoteTakingPane from "./components/NoteTakingPane/NoteTakingPane";
import ReferencePane from "./components/ReferencePane/ReferencePane";

function App() {
	return (
		<div className="App">
			<ReferencePane />
			<NoteTakingPane />
		</div>
	);
}

export default App;
