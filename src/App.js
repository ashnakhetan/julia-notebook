import "./App.css";
import SplitPane, {
	Divider,
	SplitPaneLeft,
	SplitPaneRight,
} from "./components/SplitPane";
import ReferencePaneCtxt from "./components/ReferencePaneCtxt";

function App() {
	return (
		<div className="App">
			<ReferencePaneCtxt.Provider value={{}}>
				<SplitPane className="split-pane-row">
					<SplitPaneLeft />
					<Divider className="separator-col" />
					<SplitPaneRight />
				</SplitPane>
			</ReferencePaneCtxt.Provider>
		</div>
	);
}

export default App;
