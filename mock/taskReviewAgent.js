function taskReviewAgent(input) {
  if (!input || input.trim().length < 10) {
    return {
      status: "fail",
      readiness_percent: 0,
      analysis: {
        strengths: [],
        weaknesses: ["Input too short or empty"]
      },
      improvement_hints: [],
      meta: {
        engine_version: "mock-v1",
        evaluation_time_ms: 0
      }
    };
  }

  if (input.toLowerCase().includes("irrelevant")) {
    return {
      status: "fail",
      readiness_percent: 0,
      analysis: {
        strengths: [],
        weaknesses: ["Irrelevant content"]
      },
      improvement_hints: [],
      meta: {
        engine_version: "mock-v1",
        evaluation_time_ms: 0
      }
    };
  }

  return {
    status: "pass",
    readiness_percent: 82,
    analysis: {
      strengths: ["Clear explanation"],
      weaknesses: []
    },
    improvement_hints: ["Add more examples"],
    meta: {
      engine_version: "mock-v1",
      evaluation_time_ms: 0
    }
  };
}

module.exports = { taskReviewAgent };
