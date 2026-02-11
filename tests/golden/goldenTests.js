const { validateAgentOutput } = require("../../validators/outputValidator");
const { taskReviewAgent } = require("../../mock/taskReviewAgent");

function runDeterministicTest(name, input, expectedStatus) {
  let baseline = null;

  for (let i = 0; i < 3; i++) {
    const raw = taskReviewAgent(input);
    const result = validateAgentOutput(raw);

    if (!result.valid) {
      throw new Error(`${name}: validation failed`);
    }

    const output = result.data;

    if (output.status !== expectedStatus) {
      throw new Error(`${name}: wrong status`);
    }

    if (!baseline) baseline = JSON.stringify(output);
    else if (baseline !== JSON.stringify(output)) {
      throw new Error(`${name}: non-deterministic output`);
    }
  }

  console.log(`✅ ${name} deterministic`);
}

runDeterministicTest(
  "PASS CASE",
  "This submission clearly explains the solution.",
  "pass"
);

runDeterministicTest(
  "FAIL CASE",
  "Irrelevant content",
  "fail"
);

runDeterministicTest(
  "EMPTY CASE",
  "",
  "fail"
);

console.log("Golden tests passed with determinism");
