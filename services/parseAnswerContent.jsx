import React from "react";

export const parseAnswerContent = (content) => {
    return content.map((block, index) => {
        switch (block.type) {
            case "paragraph":
                return (
                    <p key={index}>{parseLevelContent(block.children)}</p>
                );
            case "list":
                return block.format === "unordered" ? (
                    <ul key={index} style={{ listStyleType: "disc", marginLeft: "20px" }}>
                        {block.children.map((item, i) => (
                            <li key={i}>{formatText(item.children[0], i)}</li>
                        ))}
                    </ul>
                ) : (
                    <ol key={index} style={{ listStyleType: "decimal", marginLeft: "20px" }}>
                        {block.children.map((item, i) => (
                            <li key={i}>{formatText(item.children[0], i)}</li>
                        ))}
                    </ol>
                );
            case "heading":
                const HeadingTag = `h${block.level}`;
                return (
                    <HeadingTag key={index}>
                        {parseLevelContent(block.children)}
                    </HeadingTag>
                );
            case "link":
                return (
                    <a key={index} href={block.url} target="_blank" rel="noopener noreferrer">
                        {block.children.map((child, i) => formatText(child, i))}
                    </a>
                );
            default:
                return null;
        }
    });
};

const parseLevelContent = (content) => {
    return content.map((block, index) => {
        switch (block.type) {
            case "text":
                return formatText(block, index)
            case "link":
                return <a key={index} href={block.url} target="_blank" rel="noopener noreferrer">
                    { block.children.map((b, i) => formatText(b, i) )}
                </a>;
            default:
                return null;
        }
    })
}

const formatText = (child, key) => {
    if (!child) return null;
    let textElement = child.text;

    if (child.bold) textElement = <strong key={key}>{textElement}</strong>;
    if (child.italic) textElement = <em key={key}>{textElement}</em>;
    if (child.underline) textElement = <u key={key}>{textElement}</u>;
    if (child.strikethrough) textElement = <s key={key}>{textElement}</s>;

    return textElement;
};
