import { useState, useContext } from "react";
import { getAnnotationsDummy } from "../../data/dummy-annotations";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import bayes from "../../data/Bayes' Theorem.pdf";
import NoteTakingPaneCtxt from "../NoteTakingPaneCtxt";

export default function ReferencePane(props) {
	const { clientWidth } = useContext(NoteTakingPaneCtxt);

	const [annotations, setAnnotations] = useState(getAnnotationsDummy());

	const [numPages, setNumPages] = useState(null);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	const options = {};

	return (
		<div className="referencePane">
			{/* <ul>
				{annotations.map((annotation, index) => {
					return <li key={index}>{annotation.color}</li>;
				})}
			</ul> */}

			<Document
				file={bayes}
				onLoadSuccess={onDocumentLoadSuccess}
				options={options}
			>
				{/* TODO: this makes the page load really slowly on resize... */}
				{Array.from(new Array(numPages), (el, index) => (
					<Page
						key={`page_${index + 1}`}
						pageNumber={index + 1}
						width={clientWidth}
					/>
				))}
			</Document>
		</div>
	);
}
