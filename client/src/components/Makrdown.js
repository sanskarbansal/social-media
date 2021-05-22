import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/cjs/styles/prism/a";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { vs } from "react-syntax-highlighter/dist/esm/styles/prism/vs-dark";

const components = {
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
            <SyntaxHighlighter showLineNumbers style={vscDarkPlus} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, "")} {...props} />
        ) : (
            <code className={className} {...props} />
        );
    },
};

export default function Makrdown(props) {
    return (
        <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            linkTarget="_blank"
            components={components}
            remarkPlugins={[gfm]}
            children={props.content || props.children}
        />
    );
}
