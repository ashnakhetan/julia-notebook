import { useContext } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import AnnotationView from "../AnnotationView/AnnotationView.tsx";
import PDFView from "./PDFView";
import { AppContext } from "../../App";

export default function ReferencePane(props) {
	const { isPDFview, currentPDF } = useContext(AppContext);

	return (
		<div className="referencePane">
			{isPDFview ? (
				<PDFView currentPDF={currentPDF} />
			) : (
				<AnnotationView currentPDF={currentPDF} />
			)}
		</div>
	);
}
