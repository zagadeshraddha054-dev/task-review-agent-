const { taskReviewAgent } = require("../mock/taskReviewAgent");
const { validateAgentOutput } = require("../validators/outputValidator");

const inputs = [
  "Clear and structured explanation.",
  "Very short",
  "",
  "Irrelevant content"
];

console.log(" Demo Runner\n");

inputs.forEach(input => {
  const start = Date.now();
  const raw = taskReviewAgent(input);
  const validation = validateAgentOutput(raw);

  const output = validation.valid
    ? validation.data
    : validation.safe_response;

  output.meta.evaluation_time_ms = Date.now() - start;

  console.log(JSON.stringify(output, null, 2));
  console.log("––––––––––––––––\n");
});

console.log("✅ Demo completed safely");
