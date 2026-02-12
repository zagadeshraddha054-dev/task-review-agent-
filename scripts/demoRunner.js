const { taskReviewAgent } = require("../mock/taskReviewAgent");
const { validateAgentOutput } = require("../validators/outputValidator");

const payload = {
  assignment: {
    title: "Stabilization Sprint",
    requirements: ["Validator", "Golden tests"],
    deliverables: ["GitHub repo", "README"],
    timeline: {
      assigned_date: "2025-02-01",
      due_date: "2025-02-05",
      submitted_date: "2025-02-04"
    }
  },
  submission: {
    content: "Validator and Golden tests implemented",
    artifacts_present: ["GitHub repo", "README"]
  }
};

console.log("🚀 Demo Runner\n");

const start = Date.now();
const raw = taskReviewAgent(payload);
const validation = validateAgentOutput(raw);

const output = validation.valid
  ? validation.data
  : validation.safe_response;

output.meta.evaluation_time_ms = Date.now() - start;

console.log(JSON.stringify(output, null, 2));
console.log("\n✅ Demo completed safely");
