import { useState, createContext } from "react";
import NoteTakingPane from "./components/NoteTakingPane/NoteTakingPane";
import ReferencePane from "./components/ReferencePane/ReferencePane";
import pdf from "./data/PDFs/midtermFall2021.pdf";
import "./App.css";

export const AppContext = createContext();

function App() {
	const [isPDFview, setIsPDFview] = useState(true);
	const [currentPDF, setCurrentPDF] = useState(pdf);

	return (
		<div className="App">
			<AppContext.Provider
				value={{ isPDFview, setIsPDFview, currentPDF, setCurrentPDF }}
			>
				<ReferencePane />
				<NoteTakingPane />
			</AppContext.Provider>
		</div>
	);
}

export default App;
