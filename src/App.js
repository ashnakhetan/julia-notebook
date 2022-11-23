import logo from "./logo.svg";
import "./App.css";
import SplitPane, {
	Divider,
	SplitPaneBottom,
	SplitPaneLeft,
	SplitPaneRight,
	SplitPaneTop,
} from "./components/SplitPane";
import { useState } from "react";
import ReferencePaneCtxt from "./components/ReferencePaneCtxt";

function App() {
	const [currQuote, setCurrQuote] = useState(1);

	return (
		<div className="App">
			<ReferencePaneCtxt.Provider value={{}}>
				<SplitPane className="split-pane-row">
					<SplitPaneLeft>
						<SplitPane className="split-pane-col">
							<SplitPaneTop />
							<Divider className="separator-row" />
							<SplitPaneBottom />
						</SplitPane>
					</SplitPaneLeft>
					<Divider className="separator-col" />

					<SplitPaneRight />
				</SplitPane>
			</ReferencePaneCtxt.Provider>
		</div>
	);
}

export default App;
