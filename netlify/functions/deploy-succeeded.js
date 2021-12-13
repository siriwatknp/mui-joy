const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  console.log("event", event);
  console.log("context", context);
  console.log(
    "process.env.CIRCLE_CI_API_TOKEN",
    process.env.CIRCLE_CI_API_TOKEN
  );
  try {
    const { payload } = JSON.parse(event.body);
    console.log("payload.branch", payload.branch);
    console.log("payload.deploy_url", payload.deploy_url);
    const response = await fetch(
      "https://circleci.com/api/v2/project/github/siriwatknp/mui-joy/pipeline",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Basic ${process.env.CIRCLE_CI_API_TOKEN}`,
        },
        body: JSON.stringify({
          branch: payload.branch,
          parameters: {
            workflow: "e2e-website",
            PLAYWRIGHT_TEST_BASE_URL: payload.deploy_url,
          },
        }),
      }
    );
    const json = response.json();
    console.log("json", json);
    return {
      statusCode: 200,
      body: JSON.stringify(json),
    };
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
