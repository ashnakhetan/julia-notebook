import React from "react";
import type { IHighlight } from "./react-pdf-highlighter";

interface Props {
	highlights: Array<IHighlight>;
	resetHighlights: () => void;
	toggleDocument: () => void;
	saveHighlights: () => void;
}

const updateHash = (highlight: IHighlight) => {
	document.location.hash = `highlight-${highlight.id}`;
};

export function Sidebar({
	highlights,
	toggleDocument,
	resetHighlights,
	saveHighlights,
}: Props) {
	return (
		<div className="sidebar">
			<ul className="sidebar__highlights">
				{highlights.map((highlight, index) => (
					<li
						key={index}
						className="sidebar__highlight"
						onClick={() => {
							updateHash(highlight);
						}}
					>
						<div>
							{highlight.content.text ? (
								<blockquote style={{ marginTop: "0.5rem" }}>
									{highlight.content.text}
								</blockquote>
							) : null}

							{highlight.content.image ? (
								<div
									className="highlight__image"
									style={{
										marginTop: "0.5rem",
										touchAction: "default",
									}}
								>
									<img src={highlight.content.image} alt={"Screenshot"} />
								</div>
							) : null}
						</div>

						<div className="highlight__location">
							Page {highlight.position.pageNumber}
						</div>
					</li>
				))}
			</ul>

			{/* <button onClick={saveHighlights}>save highlights</button> */}
		</div>
	);
}
