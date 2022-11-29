import { React } from "react";
import { useState, useRef } from "react";
import { Stage, Layer, Line, Text } from "react-konva";

export default function NoteTakingPane() {
	const [tool, setTool] = useState("pen");
	const [lines, setLines] = useState([]);
	const isDrawing = useRef(false);

	const handleMouseDown = (e) => {
		e.evt.preventDefault();

		isDrawing.current = true;
		const pos = e.target.getStage().getPointerPosition();
		setLines([...lines, { tool, points: [pos.x, pos.y] }]);
	};

	const handleMouseMove = (e) => {
		e.evt.preventDefault();
		// no drawing - skipping
		if (!isDrawing.current) {
			return;
		}
		const stage = e.target.getStage();
		const point = stage.getPointerPosition();
		let lastLine = lines[lines.length - 1];
		// add point
		lastLine.points = lastLine.points.concat([point.x, point.y]);

		// replace last
		lines.splice(lines.length - 1, 1, lastLine);
		setLines(lines.concat());
	};

	const handleMouseUp = (e) => {
		e.evt.preventDefault();

		isDrawing.current = false;
	};

	return (
		<div className="noteTakingPane">
			<Stage
				width={1000}
				height={1000}
				onPointerDown={handleMouseDown}
				onPointerMove={handleMouseMove}
				onPointerUp={handleMouseUp}
			>
				<Layer>
					{lines.map((line, i) => (
						<Line
							key={i}
							points={line.points}
							stroke="#000"
							strokeWidth={5}
							tension={0.5}
							lineCap="round"
							lineJoin="round"
							globalCompositeOperation={
								line.tool === "eraser" ? "destination-out" : "source-over"
							}
						/>
					))}
				</Layer>
			</Stage>
			{/* <select
				value={tool}
				onChange={(e) => {
					setTool(e.target.value);
				}}
			>
				<option value="pen">Pen</option>
				<option value="eraser">Eraser</option>
			</select> */}
		</div>
	);
}
