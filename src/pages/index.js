import React from 'react';
import { graphql } from 'gatsby';

const Page = ({ data }) => {
  const {
    allNyTimesArticle: { nodes }
  } = data;

  return (
    <main className="container mx-auto max-w-5xl grid gap-16 p-8">
      <div className="grid gap-6 px-5">
        <h1 className="text-5xl font-black grid gap-1">
          <span>New York Times</span>
          <span className="text-brand-primary">November 1980</span>
        </h1>
        <div>
          <h2 className="text-lg">
            {`Displaying ${nodes.length} Articles sourced from the `}
            <a
              className="text-brand-default"
              href="https://www.nytimes.com"
              rel="nopener"
            >
              New York Times
            </a>
          </h2>
          <span className="font-black">
            Copyright (c) 2020 The New York Times Company. All Rights Reserved.
          </span>
        </div>
      </div>

      <ul className="grid gap-8">
        {nodes.map((item, index) => {
          const { pub_date, headline, abstract, web_url } = item;
          return (
            <li
              key={index}
              className="cursor-pointer flex flex-col shadow-md rounded-lg bg-gray-50 transform transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white"
            >
              <a
                href={web_url}
                rel="noreferrer"
                target="_blank"
                className="flex flex-grow flex-col p-8"
              >
                <div className="grid grid-cols-auto-1fr gap-1 text-sm text-gray-500 mb-4">
                  <span role="img" aria-label="Newspaper">
                    📰
                  </span>
                  {new Date(pub_date).toDateString()}
                </div>

                <h2 className="text-2xl font-black flex-grow mb-4">
                  {headline.main}
                </h2>
                <p className="text-md mb-4">{abstract}</p>
                <div className="flex justify-end">
                  <span className="text-brand-primary">
                    Read article{' '}
                    <span role="img" aria-label="pencil" className="text-md">
                      ✏️
                    </span>
                  </span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export const query = graphql`
  {
    allNyTimesArticle(
      filter: {
        pub_date: { eq: "1980-11-23T05:00:00+0000" }
        abstract: { ne: "" }
      }
    ) {
      nodes {
        pub_date
        headline {
          main
        }
        abstract
        web_url
      }
    }
  }
`;

export default Page;
