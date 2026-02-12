const { taskReviewAgent } = require("../mock/taskReviewAgent");
const { validateAgentOutput } = require("../validators/outputValidator");

console.log("🚀 Demo Runner\n");

const engineOutputs = [
  {
    status: "pass",
    readiness_percent: 82,
    analysis: {
      strengths: ["Clear explanation"],
      weaknesses: []
    },
    improvement_hints: ["Add more examples"],
    meta: {
      engine_version: "real-engine-v1",
      evaluation_time_ms: 0
    }
  },
  {
    status: "fail",
    readiness_percent: 0,
    analysis: {
      strengths: [],
      weaknesses: ["Input too short or empty"]
    },
    improvement_hints: [],
    meta: {
      engine_version: "real-engine-v1",
      evaluation_time_ms: 0
    }
  }
];

engineOutputs.forEach(engineOutput => {
  const start = Date.now();

  const raw = taskReviewAgent(engineOutput);
  const validation = validateAgentOutput(raw);

  const output = validation.valid
    ? validation.data
    : validation.safe_response;

  output.meta.evaluation_time_ms = Date.now() - start;

  console.log(JSON.stringify(output, null, 2));
  console.log("––––––––––––––––\n");
});

console.log("✅ Demo completed safely");
