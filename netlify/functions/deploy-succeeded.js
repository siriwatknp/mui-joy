const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  console.log("event", event);
  console.log("context", context);
  console.log(
    "process.env.CIRCLE_CI_API_TOKEN",
    process.env.CIRCLE_CI_API_TOKEN
  );
  const payload = JSON.parse(event.body);
  console.log("payload", payload);
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
          "playwright-base-url": payload.deploy_url,
        },
      }),
    }
  );
  const data = response.json();
  console.log("data", data);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
