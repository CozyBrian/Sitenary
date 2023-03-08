import Close from "../../assets/icons/close.svg";
import { useAppDispatch } from "../../hooks";
import { action } from "../../redux";
// import cn from "classnames";
import "./styles.scss";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useEffect, useState } from "react";

const EmptySiteOverlay = () => {
  const appdispatch = useAppDispatch();
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    import("../../assets/guide.md" as any).then((res) => {
      fetch(res.default)
        .then((response) => response.text())
        .then((text) => setMarkdown(text));
    });
  }, []);

  return (
    <div className="overlay-container">
      <div className="markdown-box">
        <div className="dialogue-box__header">
          <div className="dialogue-box__title">Guide</div>
          <div
            onClick={() => appdispatch(action.app.setIsSiteDataEmpty(false))}
            className="dialogue-box__close"
          >
            <img src={Close} alt="close-icon" />
          </div>
        </div>
        <div className="dialogue-box__content">
          <ReactMarkdown
            children={markdown}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    PreTag="div"
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmptySiteOverlay;
