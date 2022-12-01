import { React } from "react";
import { useState, useRef } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import brush from "../../assets/icons/brush.svg";
import circle from "../../assets/icons/circle.svg";
import eraser from "../../assets/icons/eraser.svg";
import rectangle from "../../assets/icons/rectangle.svg";
import triangle from "../../assets/icons/triangle.svg";

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
		<div>
		<div class="container">
            <section class="tools-board">
                <div class="row">
                        <ul class="options">
                            <li class="option tool" id="rectangle">
                            <img src={rectangle} alt=""></img>
                            </li>
                            <li class="option tool" id="circle">
                            <img src={circle} alt=""></img>
                            </li>
                            <li class="option tool" id="triangle">
                            <img src={triangle} alt=""></img>
                            </li>
                        </ul>
                </div>        
                <div class="row">
                        <ul class="options">
                            {/* <li class="option active tool" id="brush">
                            <img src={brush} alt="" value="pen"
							onClick={(e) => {setTool(e.target.value);}}></img>
                            </li> */}
                            {/* <li class="option tool" id="eraser">
                            <img src={eraser} alt="" value="eraser"
							onClick={(e) => {setTool(e.target.value);}}></img>
                            </li> */}
							<button value="pen"
								onClick={(e) => {setTool(e.currentTarget.value);}}>
								<img src={brush} alt="" ></img>
							</button>
							<button value="eraser"
								onClick={(e) => {setTool(e.currentTarget.value);}}> 
								<img src={eraser} alt=""></img>
							</button>
                            <li class="option">
                            <input type="range" id="size-slider" min="1" max="30" value="5"></input> 
                            </li>
                        </ul>
                </div>
                <div class="row colors">
                        <ul class="options">
                            <li class="option"></li>
                            <li class="option selected"></li>
                            <li class="option"></li>
                            <li class="option"></li>
                            <li class="option">
                            <input type="color" id="color-picker" value="#4A98F7"></input>
                            </li>
                        </ul>
                </div>
            </section>
        </div>
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
		</div>
	);
}
