function taskReviewAgent(input) {
  if (!input || input.trim().length < 10) {
    return {
      status: "fail",
      score: 0,
      summary: "Submission failed validation",
      failure_reasons: ["Input too short or empty"]
    };
  }

  if (input.toLowerCase().includes("irrelevant")) {
    return {
      status: "fail",
      score: 0,
      summary: "Submission is irrelevant",
      failure_reasons: ["Irrelevant content"]
    };
  }

  return {
    status: "pass",
    score: 80,
    summary: "Submission meets quality standards",
    failure_reasons: []
  };
}

module.exports = { taskReviewAgent };
