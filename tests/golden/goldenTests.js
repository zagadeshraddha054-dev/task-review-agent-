const { taskReviewAgent } = require("../../mock/taskReviewAgent");

// Helper function to check determinism
function runDeterminismTest(testName, payload, expectedStatus) {
  let baseline = null;

  for (let i = 0; i < 3; i++) {
    const output = taskReviewAgent(payload);

    if (output.status !== expectedStatus) {
      throw new Error(
        `${testName}: Expected status ${expectedStatus}, got ${output.status}`
      );
    }

    const current = JSON.stringify(output);

    if (!baseline) {
      baseline = current;
    } else if (baseline !== current) {
      throw new Error(`${testName}: Output is not deterministic`);
    }
  }

  console.log(`✅ ${testName} (${expectedStatus}) is deterministic`);
}

/* ---------------- PASS CASE ---------------- */
const passPayload = {
  assignment: {
    title: "Pass Case",
    requirements: ["Validator", "Golden tests"],
    deliverables: [],
    timeline: {
      assigned_date: "2025-02-01",
      due_date: "2025-02-05",
      submitted_date: "2025-02-04"
    }
  },
  submission: {
    content: "Validator and Golden tests implemented correctly",
    artifacts_present: []
  }
};

/* -------------- BORDERLINE CASE -------------- */
const borderlinePayload = {
  assignment: {
    title: "Borderline Case",
    requirements: ["Validator", "Golden tests", "README"],
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

/* ---------------- FAIL CASE ---------------- */
const failPayload = {
  assignment: {
    title: "Fail Case",
    requirements: ["Validator", "Golden tests"],
    deliverables: [],
    timeline: {
      assigned_date: "2025-02-01",
      due_date: "2025-02-05",
      submitted_date: "2025-02-06"
    }
  },
  submission: {
    content: "Unrelated content",
    artifacts_present: []
  }
};

/* -------- RUN GOLDEN TESTS -------- */
runDeterminismTest("PASS CASE", passPayload, "pass");
runDeterminismTest("BORDERLINE CASE", borderlinePayload, "borderline");
runDeterminismTest("FAIL CASE", failPayload, "fail");

console.log("🎯 All golden tests passed with determinism");
