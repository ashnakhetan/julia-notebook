import React, {
    createRef,
    useContext,
    useEffect,
    useRef,
    useState,
  } from "react";
  import ReferencePaneCtxt from "./ReferencePaneCtxt";
  import NoteTakingPaneCtxt from "./NoteTakingPaneCtxt";
  
  const SplitPane = ({ children, ...props }) => {
    const [clientHeight, setClientHeight] = useState(null);
    const [clientWidth, setClientWidth] = useState(null);
    const yDividerPos = useRef(null);
    const xDividerPos = useRef(null);
  
    const onMouseHoldDown = (e) => {
      yDividerPos.current = e.clientY;
      xDividerPos.current = e.clientX;
    };
  
    const onMouseHoldUp = () => {
      yDividerPos.current = null;
      xDividerPos.current = null;
    };
  
    const onMouseHoldMove = (e) => {
      if (!yDividerPos.current && !xDividerPos.current) {
        return;
      }
  
      setClientHeight(clientHeight + e.clientY - yDividerPos.current);
      setClientWidth(clientWidth + e.clientX - xDividerPos.current);
  
      yDividerPos.current = e.clientY;
      xDividerPos.current = e.clientX;
    };
  
    useEffect(() => {
      document.addEventListener("mouseup", onMouseHoldUp);
      document.addEventListener("mousemove", onMouseHoldMove);
  
      return () => {
        document.removeEventListener("mouseup", onMouseHoldUp);
        document.removeEventListener("mousemove", onMouseHoldMove);
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
  
    return <div {...props} onMouseDown={onMouseHoldDown} />;
  };
  
  export const SplitPaneTop = (props) => {
    const topRef = createRef();
    const { clientHeight, setClientHeight } = useContext(NoteTakingPaneCtxt);
    const { quotes, setCurrQuote } = useContext(ReferencePaneCtxt);
  
    useEffect(() => {
      if (!clientHeight) {
        setClientHeight(topRef.current.clientHeight);
        return;
      }
  
      topRef.current.style.minHeight = clientHeight + "px";
      topRef.current.style.maxHeight = clientHeight + "px";
    }, [clientHeight]);
  
    return (
      <div {...props} className="split-pane-top" ref={topRef}>
        <h1>Famous quotes:</h1>
        <ul>
          {quotes.map((el, i) => {
            return (
              <li key={i}>
                <a href="#" onClick={() => setCurrQuote(el.id)}>
                  {el.author}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  
  export const SplitPaneBottom = (props) => {
    const { currQuote } = useContext(ReferencePaneCtxt);
  
    return (
      <div {...props} className="split-pane-bottom">
        Current <b>quote id</b>: {currQuote}
      </div>
    );
  };
  
  export const SplitPaneLeft = (props) => {
    const topRef = createRef();
    const { clientWidth, setClientWidth } = useContext(NoteTakingPaneCtxt);
  
    useEffect(() => {
      if (!clientWidth) {
        setClientWidth(topRef.current.clientWidth / 2);
        return;
      }
  
      topRef.current.style.minWidth = clientWidth + "px";
      topRef.current.style.maxWidth = clientWidth + "px";
    }, [clientWidth]);
  
    return <div {...props} className="split-pane-left" ref={topRef} />;
  };
  
  export const SplitPaneRight = (props) => {
    const { quotes, currQuote } = useContext(ReferencePaneCtxt);
    const quote = quotes.find((el) => el.id === currQuote);
  
    return (
      <div {...props} className="split-pane-right">
        <div className="quote">
          <blockquote>{quote.description}</blockquote>—{" "}
          <span>{quote.author}</span>
        </div>
      </div>
    );
  };
  
  export default SplitPane; 