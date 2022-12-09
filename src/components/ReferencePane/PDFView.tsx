import React, { Component } from "react";
import {
	PdfLoader,
	PdfHighlighter,
	Highlight,
	Popup,
	AreaHighlight,
} from "../AnnotationView/import-things";
import type {
	IHighlight,
	NewHighlight,
} from "../AnnotationView/react-pdf-highlighter/types";
import "./PDFView.css";

interface State {
	url: string;
	highlights: Array<IHighlight>;
}

type Props = {
	currentPDF: string;
};

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

export default class PDFView extends Component<Props, State> {
	// Load highlights from localStorage (if exist)
	state = {
		url: this.props.currentPDF,
		highlights: localStorage.getItem(this.props.currentPDF)
			? JSON.parse(localStorage.getItem(this.props.currentPDF))
			: [],
	};

	resetHighlights = () => {
		this.setState({
			highlights: [],
		});
	};

	saveHighlights = () => {
		localStorage.setItem(this.state.url, JSON.stringify(this.state.highlights));
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

		this.setState({
			highlights: [{ ...highlight, id: getNextId() }, ...highlights],
		});

		this.saveHighlights();
	}

	updateHighlight(highlightId: string, position: Object, content: Object) {
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
			<PdfLoader url={url} beforeLoad={<></>}>
				{(pdfDocument) => (
					<PdfHighlighter
						pdfDocument={pdfDocument}
						enableAreaSelection={(event) => true}
						onScrollChange={resetHash}
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
		);
	}
}
