import { useEffect, useState } from "react";
import { getAnnotationsDummy } from "../../data/dummy-annotations";

export default function ReferencePane(props) {
	const [annotations, setAnnotations] = useState(getAnnotationsDummy());

	return (
		<div className="referencePane">
			<ul>
				{annotations.map((annotation, index) => {
					return <li key={index}>{annotation.color}</li>;
				})}
			</ul>
		</div>
	);
}
