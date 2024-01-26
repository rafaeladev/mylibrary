import React from "react";

interface PageTitleProps {
  title: string;
  color: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, color }) => {
  return (
    <h1 className="font-serif text-5xl">
      <span className={`inline-block text-mc-${color}`}>{title}</span>
      <i className={`mx-6 font-sans text-2xl not-italic text-mc-violet`}>un</i>
      <span className="inline-block text-mc-beige">livre</span>
    </h1>
  );
};

export default PageTitle;