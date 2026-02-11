const { validateAgentOutput } = require("../../validators/outputValidator");
const { taskReviewAgent } = require("../../mock/taskReviewAgent");

function runTest(name, input, expectedStatus) {
  const output = taskReviewAgent(input);
  const result = validateAgentOutput(output);

  if (!result.valid) {
    throw new Error(`${name} failed validation`);
  }

  if (result.data.status !== expectedStatus) {
    throw new Error(`${name} expected ${expectedStatus}`);
  }

  console.log(`✅ ${name}`);
}

runTest("PASS CASE", "This submission clearly explains the solution in detail.", "pass");
runTest("BORDERLINE CASE", "Brief but valid explanation.", "pass");
runTest("FAIL CASE", "Irrelevant content.", "fail");
runTest("EMPTY CASE", "", "fail");

console.log("🎯 All golden tests passed");
