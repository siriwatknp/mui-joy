const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  console.log("event", event);
  console.log("context", context);
  try {
    await fetch(
      "https://circleci.com/api/v2/project/github/siriwatknp/mui-joy/pipeline",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          branch: "ci-setup",
          parameters: {
            workflow: "e2e-website",
            "playwright-base-url": "https://mui.com",
          },
        }),
      }
    );
    return {
      statusCode: 200,
      body: JSON.stringify({}),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
