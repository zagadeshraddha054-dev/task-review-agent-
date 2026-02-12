function validateAgentOutput(output) {
  const requiredKeys = [
    "score",
    "readiness_percent",
    "status",
    "review",
    "analysis",
    "internal",
    "meta"
  ];

  if (typeof output !== "object" || output === null) {
    return invalid();
  }

  for (const key of requiredKeys) {
    if (!(key in output)) return invalid();
  }

  if (!["pass", "fail", "borderline"].includes(output.status)) {
    return invalid();
  }

  return { valid: true, data: output };
}

function invalid() {
  return {
    valid: false,
    safe_response: {
      score: 0,
      readiness_percent: 0,
      status: "fail",
      review: { done_well: [], missing: [], timeline_comment: "" },
      analysis: { accuracy: 0, completeness: 0, quality: 0 },
      internal: { risks: [], next_task_preview: "" },
      meta: { deterministic: true, evaluation_time_ms: 0 }
    }
  };
}

module.exports = { validateAgentOutput };
