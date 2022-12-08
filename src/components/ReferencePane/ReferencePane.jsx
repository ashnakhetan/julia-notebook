import { useContext } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import NoteTakingPaneCtxt from "../NoteTakingPaneCtxt";
import ReferencePaneCtxt from "../ReferencePaneCtxt";
import AnnotationView from "../AnnotationView/AnnotationView.tsx";
import PDFView from "./PDFView";

export default function ReferencePane(props) {
	const { isPDFview } = useContext(ReferencePaneCtxt);
	const { clientWidth } = useContext(NoteTakingPaneCtxt);
	const { currentPDF } = useContext(ReferencePaneCtxt);

	return (
		<div className="referencePane">
			{isPDFview ? (
				<PDFView clientWidth={clientWidth} currentPDF={currentPDF} />
			) : (
				<AnnotationView currentPDF={currentPDF} />
			)}
		</div>
	);
}
