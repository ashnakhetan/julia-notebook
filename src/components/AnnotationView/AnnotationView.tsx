import React, { Component } from "react";
import {
	PdfLoader,
	PdfHighlighter,
	Highlight,
	Popup,
	AreaHighlight,
} from "./import-things";
import type { IHighlight, NewHighlight } from "./react-pdf-highlighter/types";
import { testHighlights as _testHighlights } from "./test-highlights";
import { Sidebar } from "./Sidebar";

const testHighlights: Record<string, Array<IHighlight>> = _testHighlights;

interface State {
	url: string;
	highlights: Array<IHighlight>;
}

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
	document.location.hash.slice("#highlight-".length);

const resetHash = () => {
	document.location.hash = "";
};

const HighlightPopup = ({
	comment,
}: {
	comment: { text: string; emoji: string };
}) =>
	comment.text ? (
		<div className="Highlight__popup">
			{comment.emoji} {comment.text}
		</div>
	) : null;

const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf";
const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";

const initialUrl = PRIMARY_PDF_URL;

export default class AnnotationView extends Component<{}, State> {
	// Load highlights from localStorage (if exist)
	state = {
		url: initialUrl,
		highlights: localStorage.getItem(initialUrl)
			? JSON.parse(localStorage.getItem(initialUrl))
			: testHighlights[initialUrl],
	};

	resetHighlights = () => {
		this.setState({
			highlights: [],
		});
	};

	saveHighlights = () => {
		console.log(this.state.highlights);
		localStorage.setItem(this.state.url, JSON.stringify(this.state.highlights));
	};

	toggleDocument = () => {
		const newUrl =
			this.state.url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;

		this.setState({
			url: newUrl,
			highlights: testHighlights[newUrl] ? [...testHighlights[newUrl]] : [],
		});
	};

	scrollViewerTo = (highlight: any) => {};

	scrollToHighlightFromHash = () => {
		const highlight = this.getHighlightById(parseIdFromHash());

		if (highlight) {
			this.scrollViewerTo(highlight);
		}
	};

	componentDidMount() {
		window.addEventListener(
			"hashchange",
			this.scrollToHighlightFromHash,
			false
		);
	}

	getHighlightById(id: string) {
		const { highlights } = this.state;

		return highlights.find((highlight) => highlight.id === id);
	}

	addHighlight(highlight: NewHighlight) {
		const { highlights } = this.state;

		console.log("Saving highlight", highlight);

		this.setState({
			highlights: [{ ...highlight, id: getNextId() }, ...highlights],
		});
	}

	updateHighlight(highlightId: string, position: Object, content: Object) {
		console.log("Updating highlight", highlightId, position, content);

		this.setState({
			highlights: this.state.highlights.map((h: any) => {
				const {
					id,
					position: originalPosition,
					content: originalContent,
					...rest
				} = h;
				return id === highlightId
					? {
							id,
							position: { ...originalPosition, ...position },
							content: { ...originalContent, ...content },
							...rest,
					  }
					: h;
			}),
		});
	}

	transformSelection(content: Object, position: any) {
		this.addHighlight({
			content: content,
			position: position,
			comment: { text: "", emoji: "" },
		});
		// hideTipAndSelection();
		return <span></span>;
	}

	render() {
		const { url, highlights } = this.state;

		return (
			<div className="App" style={{ display: "flex", height: "100vh" }}>
				<Sidebar
					highlights={highlights}
					resetHighlights={this.resetHighlights}
					toggleDocument={this.toggleDocument}
					saveHighlights={this.saveHighlights}
				/>
				<div
					style={{
						height: "100vh",
						width: "75vw",
						position: "relative",
					}}
				>
					<PdfLoader url={url} beforeLoad={<></>}>
						{(pdfDocument) => (
							<PdfHighlighter
								pdfDocument={pdfDocument}
								enableAreaSelection={(event) => true}
								onScrollChange={resetHash}
								// pdfScaleValue="page-width"
								scrollRef={(scrollTo) => {
									this.scrollViewerTo = scrollTo;
									this.scrollToHighlightFromHash();
								}}
								onSelectionFinished={(content, position) =>
									this.transformSelection(position, content)
								}
								highlightTransform={(
									highlight,
									index,
									setTip,
									hideTip,
									viewportToScaled,
									screenshot,
									isScrolledTo
								) => {
									const isTextHighlight = !Boolean(
										highlight.content && highlight.content.image
									);

									const component = isTextHighlight ? (
										<Highlight
											isScrolledTo={isScrolledTo}
											position={highlight.position}
											comment={highlight.comment}
										/>
									) : (
										<AreaHighlight
											isScrolledTo={isScrolledTo}
											highlight={highlight}
											onChange={(boundingRect) => {
												this.updateHighlight(
													highlight.id,
													{ boundingRect: viewportToScaled(boundingRect) },
													{ image: screenshot(boundingRect) }
												);
											}}
										/>
									);

									return (
										<Popup
											popupContent={<HighlightPopup {...highlight} />}
											onMouseOver={(popupContent) =>
												setTip(highlight, (highlight) => popupContent)
											}
											onMouseOut={hideTip}
											key={index}
											children={component}
										/>
									);
								}}
								highlights={highlights}
							/>
						)}
					</PdfLoader>
				</div>
			</div>
		);
	}
}
