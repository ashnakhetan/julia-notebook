import "./App.css";

function App() {
	return (
		<div className="App">
			<ReferencePaneCtxt.Provider value={{}}>
				<SplitPane className="split-pane-row">
					<SplitPaneLeft>
						<SplitPane className="split-pane-col">
							{/* <SplitPaneTop /> */}
							{/* <Divider className="separator-row" /> */}
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
