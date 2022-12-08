import React, { Component } from "react";
import type { IHighlight, NewHighlight } from "./react-pdf-highlighter/types";
import { testHighlights as _testHighlights } from "./test-highlights";
import { Sidebar } from "./Sidebar";
import "./AnnotationView.css";

const testHighlights: Record<string, Array<IHighlight>> = _testHighlights;

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

export default class AnnotationView extends Component<Props, State> {
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
		return <></>;
	}

	render() {
		const { highlights } = this.state;

		return (
			<div style={{ display: "flex" }}>
				<Sidebar
					highlights={highlights}
					resetHighlights={this.resetHighlights}
					toggleDocument={this.toggleDocument}
					saveHighlights={this.saveHighlights}
				/>
			</div>
		);
	}
}
