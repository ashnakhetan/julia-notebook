import "./App.css";
import SplitPane, {
	Divider,
	SplitPaneLeft,
	SplitPaneRight,
} from "./components/SplitPane";
import ReferencePaneCtxt from "./components/ReferencePaneCtxt";
import { useState } from "react";
import pdf from "./data/PDFs/midtermFall2021.pdf";

function App() {
	const [isPDFview, setIsPDFview] = useState(true);
	const [currentPDF, setCurrentPDF] = useState(pdf);

	return (
		<div className="App">
			<ReferencePaneCtxt.Provider
				value={{ isPDFview, setIsPDFview, currentPDF, setCurrentPDF }}
			>
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
