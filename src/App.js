import "./App.css";
import SplitPane, {
	Divider,
	SplitPaneLeft,
	SplitPaneRight,
} from "./components/SplitPane";
import ReferencePaneCtxt from "./components/ReferencePaneCtxt";
import { useState } from "react";

function App() {
	const [isPDFview, setIsPDFview] = useState(true);

	return (
		<div className="App">
			<ReferencePaneCtxt.Provider value={{ isPDFview, setIsPDFview }}>
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
