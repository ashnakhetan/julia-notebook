import React from "react";
import brush from "../assets/icons/brush.svg";
import circle from "../assets/icons/circle.svg";
import eraser from "../assets/icons/eraser.svg";
import rectangle from "../assets/icons/rectangle.svg";
import triangle from "../assets/icons/triangle.svg";

function Toolbar() {
	return (
		<div class="container">
            <section class="tools-board">
                <div class="row">
                    {/* <label class="title">Shapes</label> */}
                        <ul class="options">
                            <li class="option tool" id="rectangle">
                            <img src={rectangle} alt=""></img>
                            {/* <span>Rectangle</span> */}
                            </li>
                            <li class="option tool" id="circle">
                            <img src={circle} alt=""></img>
                            {/* <span>Circle</span> */}
                            </li>
                            <li class="option tool" id="triangle">
                            <img src={triangle} alt=""></img>
                            {/* <span>Triangle</span> */}
                            </li>
                            {/* <li class="option">
                            <input type="checkbox" id="fill-color"></input>
                            <label for="fill-color">Fill color</label>
                            </li> */}
                        </ul>
                </div>        
                <div class="row">
                    {/* <label class="title">Options</label> */}
                        <ul class="options">
                            <li class="option active tool" id="brush">
                            <img src={brush} alt=""></img>
                            {/* <span>Brush</span> */}
                            </li>
                            <li class="option tool" id="eraser">
                            <img src={eraser} alt=""></img>
                            {/* <span>Eraser</span> */}
                            </li>
                            <li class="option">
                            <input type="range" id="size-slider" min="1" max="30" value="5"></input> 
                            </li>
                        </ul>
                </div>
                <div class="row colors">
                    {/* <label class="title">Colors</label> */}
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
                {/* <div class="row buttons">
                <button class="clear-canvas">Clear Canvas</button>
                <button class="save-img">Save As Image</button>
                </div> */}
            </section>
            {/* <section class="drawing-board">
                <canvas></canvas>
            </section> */}
        </div>
	);
}

export default Toolbar;