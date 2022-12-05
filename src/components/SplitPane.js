import React, {
	createRef,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import NoteTakingPaneCtxt from "./NoteTakingPaneCtxt";
import NoteTakingPane from "./NoteTakingPane/NoteTakingPane";
import ReferencePane from "./ReferencePane/ReferencePane";

const SplitPane = ({ children, ...props }) => {
	const [clientHeight, setClientHeight] = useState(null);
	const [clientWidth, setClientWidth] = useState(null);
	const yDividerPos = useRef(null);
	const xDividerPos = useRef(null);

	const getCoords = (e) => {
		e.preventDefault(); // We don't want to scroll

		if (e.pointerType === "mouse") {
			return { x: e.clientX, y: e.clientY };
		} else {
			return { x: e.screenX, y: e.screenY };
		}
	};

	const onMouseHoldDown = (e) => {
		e.preventDefault(); // We don't want to scroll

		const coords = getCoords(e);

		yDividerPos.current = coords.y;
		xDividerPos.current = coords.x;
	};

	const onMouseHoldUp = () => {
		yDividerPos.current = null;
		xDividerPos.current = null;
	};

	const onMouseHoldMove = (e) => {
		e.preventDefault(); // We don't want to scroll
		if (!yDividerPos.current && !xDividerPos.current) {
			return;
		}
		const coords = getCoords(e);

		setClientHeight(clientHeight + coords.y - yDividerPos.current);
		setClientWidth(clientWidth + coords.x - xDividerPos.current);

		yDividerPos.current = coords.y;
		xDividerPos.current = coords.x;
	};

	useEffect(() => {
		document.addEventListener("pointerup", onMouseHoldUp);
		document.addEventListener("pointermove", onMouseHoldMove);

		return () => {
			document.removeEventListener("pointerup", onMouseHoldUp);
			document.removeEventListener("pointermove", onMouseHoldMove);
		};
	});

	return (
		<div {...props}>
			<NoteTakingPaneCtxt.Provider
				value={{
					clientHeight,
					setClientHeight,
					clientWidth,
					setClientWidth,
					onMouseHoldDown,
				}}
			>
				{children}
			</NoteTakingPaneCtxt.Provider>
		</div>
	);
};

export const Divider = (props) => {
	const { onMouseHoldDown } = useContext(NoteTakingPaneCtxt);

	return (
		<div
			{...props}
			onPointerDown={onMouseHoldDown}
			onClick={() => console.log("divider clicked")}
		/>
	);
};

export const SplitPaneLeft = (props) => {
	const topRef = createRef();
	const { clientWidth, setClientWidth } = useContext(NoteTakingPaneCtxt);

	useEffect(() => {
		if (!clientWidth) {
			// multiply by a scaling factor -- this amount of half the screen
			setClientWidth(topRef.current.clientWidth * (10 / 11));
			return;
		}

		topRef.current.style.minWidth = clientWidth + "px";
		topRef.current.style.maxWidth = clientWidth + "px";
	});

	return (
		<div {...props} className="split-pane-left" ref={topRef}>
			<ReferencePane />
		</div>
	);
};

export const SplitPaneRight = (props) => {
	return (
		<div {...props} className="split-pane-right">
			<NoteTakingPane />
		</div>
	);
};

export default SplitPane;
