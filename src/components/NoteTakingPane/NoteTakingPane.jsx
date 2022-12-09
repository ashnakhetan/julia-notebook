import { React, useContext } from "react";
import { useState, useRef } from "react";
import { Stage, Layer, Line, Text, Rect } from "react-konva";
import { AppContext } from "../../App";
import brush from "../../assets/icons/brush.svg";
import circle from "../../assets/icons/circle.svg";
import eraser from "../../assets/icons/eraser.svg";
import rectangle from "../../assets/icons/rectangle.svg";
import triangle from "../../assets/icons/triangle.svg";
import "./NoteTakingPane.css";

export default function NoteTakingPane() {
	const { isPDFview, setIsPDFview } = useContext(AppContext);

	const [tool, setTool] = useState("pen");
	const [lines, setLines] = useState([]);
	// const [startX, setStartX] = useState();
	// const [startY, setStartY] = useState();
	// const [endX, setEndX] = useState();
	// const [endY, setEndY] = useState();
	const [color, setColor] = useState("#000");
	const isDrawing = useRef(false);
	//const [rect, setRect] = useState(false);

	const handleMouseDown = (e) => {
		e.evt.preventDefault();

		isDrawing.current = true;
		const pos = e.target.getStage().getPointerPosition();
		setLines([...lines, { tool, points: [pos.x, pos.y], color }]);
	};

	const handleMouseMove = (e) => {
		e.evt.preventDefault();

		// no drawing - skipping
		if (!isDrawing.current) {
			return;
		}
		//if (tool === "pen" || tool === "eraser") {
		const stage = e.target.getStage();
		const point = stage.getPointerPosition();
		let lastLine = lines[lines.length - 1];
		// add point
		lastLine.points = lastLine.points.concat([point.x, point.y]);

		// replace last
		lines.splice(lines.length - 1, 1, lastLine);
		setLines(lines.concat());
		// } else if (tool  === "rectangle") {
		// 	drawRect(e);
		// } else if (tool  === "circle") {
		// 	drawCircle(e);
		// } else {
		// 	drawTriangle(e);
		// }
	};

	const handleMouseUp = (e) => {
		e.evt.preventDefault();

		isDrawing.current = false;
		// setRect(false);
	};

	// const drawRect = (e) => {
	// 	// e.evt.preventDefault();
	// 	const stage = e.target.getStage();
	// 	const point = stage.getPointerPosition();
	// 	setEndX(point.x);
	// 	setEndY(point.y);
	// 	// setRect(true);

	// 	// return (
	// 	// 	<Rect
	// 	// 	x={startX}
	// 	// 	y={startY}
	// 	// 	width={point.x - startX}
	// 	// 	height={point.y - startY}
	// 	// 	fill={color}
	// 	// 	/>
	// 	// );
	// }

	// const drawCircle = (e) => {

	// }

	// const drawTriangle = (e) => {

	// }

	const chooseTool = (e) => {
		document.querySelector(".options .active").classList.remove("active");
		e.currentTarget.classList.add("active");
		setTool(e.currentTarget.id);
	};

	const chooseColor = (e) => {
		//e.evt.preventDefault();
		document.querySelector(".options .selected").classList.remove("selected");
		e.target.classList.add("selected");
		let col = window
			.getComputedStyle(e.target)
			.getPropertyValue("background-color");
		console.log("color: ", col);
		setColor(col);
	};

	const pickColor = (e) => {
		e.target.parentElement.style.background = e.target.value; //e.target????
		e.target.parentElement.click();
	};

	const changeReferenceView = () => {
		setIsPDFview(!isPDFview);
	};

	return (
		<div className="noteTakingPane">
			<div className="controls">
				<div className="searchBar" onClick={changeReferenceView}>
					{" "}
					{isPDFview ? "annotation view" : "PDF view"}
				</div>
				<div className="tools-board">
					{/* <div class="row">
                        <ul class="options">
                            <li class="option tool" id="rectangle" onClick={chooseTool}>
                            <img src={rectangle} alt=""></img>
                            </li>
                            <li class="option tool" id="circle" onClick={chooseTool}>
                            <img src={circle} alt=""></img>
                            </li>
                            <li class="option tool" id="triangle" onClick={chooseTool}>
                            <img src={triangle} alt=""></img>
                            </li>
                        </ul>
                </div>         */}
					<div className="row">
						<ul className="options">
							<button
								className="option active tool"
								id="pen"
								value="pen"
								onClick={chooseTool}
							>
								<img src={brush} alt=""></img>
							</button>
							<button
								className="option tool"
								id="eraser"
								value="eraser"
								onClick={chooseTool}
							>
								<img src={eraser} alt=""></img>
							</button>
						</ul>
					</div>
					<div className="row colors">
						<ul className="options">
							<li className="option" onClick={chooseColor}></li>
							<li className="option selected" onClick={chooseColor}></li>
							<li className="option" onClick={chooseColor}></li>
							<li className="option" onClick={chooseColor}></li>
							<li className="option" onClick={chooseColor}>
								<input
									type="color"
									id="color-picker"
									value="#4A98F7"
									onChange={pickColor}
								></input>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<Stage
				className="drawingArea"
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
							stroke={color}
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
