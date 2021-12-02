import React from 'react';
import { graphql } from 'gatsby';

const Page = ({ data }) => {
  return (
    <pre className="text-xs bg-gray-50 p-4">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export const query = graphql`
  {
    allNyTimesArticles(
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
