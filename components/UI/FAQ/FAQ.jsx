"use client";
import React from "react";
import ContainerWithSidebar from "@/components/UI/ContainerWithSidebar/ContainerWithSidebar";
import styles from "./FAQ.module.scss";
import useFetch from "@/services/hook/useFetch";
import Loader from "@/components/UI/Loader/Loader";

const FAQ = () => {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("/faq-categories");

  const {
    data: faqsData,
    loading: faqsLoading,
    error: faqsError,
  } = useFetch("/faqs?populate=*");

  const loading = categoriesLoading || faqsLoading;
  const error = categoriesError || faqsError;


  const parseAnswerContent = (content) => {
    return content.map((block, index) => {
      switch (block.type) {
        case "paragraph":
          return (
            <p key={index}>
              {block.children.map((child, i) => formatText(child, i))}
            </p>
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
              {block.children.map((child, i) => formatText(child, i))}
            </HeadingTag>
          );
  
        case "link":
          return (
            <a key={index} href={block.url} target="_blank" rel="noopener noreferrer">
              {block.children[0]?.text}
            </a>
          );
  
        default:
          return null;
      }
    });
  };
  
  
  const formatText = (child, key) => {
    if (!child) return null;
    let textElement = child.text;
  
    if (child.bold) textElement = <strong key={key}>{textElement}</strong>;
    if (child.italic) textElement = <em key={key}>{textElement}</em>;
    if (child.underline) textElement = <u key={key}>{textElement}</u>;
    if (child.strikethrough) textElement = <s key={key}>{textElement}</s>;
  
    return textElement;
  };
  
  const faqData = React.useMemo(() => {
    if (!categoriesData || !faqsData) return null;

    const mappedData = {
      categories: categoriesData.map((category, index) => ({
        id: index + 1,
        name: category.category,
        questions: faqsData
          .filter((faq) => faq.category && faq.category.id === category.id)
          .map((faq) => ({
            question: faq.question,
            answer: parseAnswerContent(faq.answer),
          })),
      })),
    };

    return mappedData;
  }, [categoriesData, faqsData]);
  return (
    <section className={`${styles.faqContainer} container`}>
      <h2>Часто задаваемые вопросы</h2>
      <Loader loading={loading}>
        <ContainerWithSidebar data={faqData} type="Question" />
      </Loader>
    </section>
  );
};


export default FAQ;
