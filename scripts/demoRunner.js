const { taskReviewAgent } = require("../mock/taskReviewAgent");
const { validateAgentOutput } = require("../validators/outputValidator");

const inputs = [
  { name: "PASS CASE", input: "This submission clearly explains the solution in detail." },
  { name: "BORDERLINE CASE", input: "Brief but valid explanation." },
  { name: "FAIL CASE", input: "Irrelevant content." },
  { name: "EMPTY CASE", input: "" }
];

console.log(" Demo Runner\n");

inputs.forEach(({ name, input }) => {
  const start = Date.now();
  let finalOutput;

  try {
    const raw = taskReviewAgent(input);
    const validation = validateAgentOutput(raw);
    finalOutput = validation.valid ? validation.data : validation.safe_response;
  } catch {
    finalOutput = {
      status: "fail",
      score: 0,
      summary: "Unhandled error",
      failure_reasons: ["Exception caught"]
    };
  }

  console.log(`${name}`);
  console.log(JSON.stringify(finalOutput, null, 2));
  console.log(` ${Date.now() - start} ms\n`);
});

console.log("✅ Demo completed");
