const { taskReviewAgent } = require("../../mock/taskReviewAgent");

const payload = {
  assignment: {
    title: "Determinism Test",
    requirements: ["Validator"],
    deliverables: [],
    timeline: {
      assigned_date: "2025-02-01",
      due_date: "2025-02-05",
      submitted_date: "2025-02-05"
    }
  },
  submission: {
    content: "Validator implemented",
    artifacts_present: []
  }
};

let baseline = null;

for (let i = 0; i < 5; i++) {
  const output = JSON.stringify(taskReviewAgent(payload));
  if (!baseline) baseline = output;
  else if (baseline !== output) {
    throw new Error("❌ Non-deterministic output detected");
  }
}

console.log("✅ Determinism verified across repeated runs");
