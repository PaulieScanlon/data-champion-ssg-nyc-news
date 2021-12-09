require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const fetch = require('node-fetch');

const YEAR = 1980;
const MONTH = 11;

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest
}) => {
  const response = await fetch(
    `https://api.nytimes.com/svc/archive/v1/${YEAR}/${MONTH}.json?api-key=${process.env.NY_TIMES_ARCHIVE_API}`
  );

  const data = await response.json();

  data.response.docs.forEach((item) => {
    createNode({
      ...item,
      id: item._id,
      internal: {
        type: 'NyTimesArticle',
        contentDigest: createContentDigest(item)
      }
    });
  });
};
