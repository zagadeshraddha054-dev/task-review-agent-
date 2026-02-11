const REQUIRED_KEYS = [
  "status",
  "readiness_percent",
  "analysis",
  "improvement_hints",
  "meta"
];

const ALLOWED_STATUS = ["pass", "fail"];

function validateAgentOutput(output) {
  if (typeof output !== "object" || output === null || Array.isArray(output)) {
    return invalid("Output is not a valid JSON object");
  }

  // Required keys
  for (const key of REQUIRED_KEYS) {
    if (!(key in output)) return invalid(`Missing key: ${key}`);
  }

  // No extra keys
  for (const key of Object.keys(output)) {
    if (!REQUIRED_KEYS.includes(key)) {
      return invalid(`Unexpected key: ${key}`);
    }
  }

  // status
  if (!ALLOWED_STATUS.includes(output.status)) {
    return invalid("Invalid status value");
  }

  // readiness_percent
  if (
    !Number.isInteger(output.readiness_percent) ||
    output.readiness_percent < 0 ||
    output.readiness_percent > 100
  ) {
    return invalid("readiness_percent must be 0–100");
  }

  if (output.status === "fail" && output.readiness_percent !== 0) {
    return invalid("Fail status must have readiness_percent = 0");
  }

  // analysis
  if (
    typeof output.analysis !== "object" ||
    !Array.isArray(output.analysis.strengths) ||
    !Array.isArray(output.analysis.weaknesses)
  ) {
    return invalid("Invalid analysis block");
  }

  // improvement_hints
  if (!Array.isArray(output.improvement_hints)) {
    return invalid("improvement_hints must be an array");
  }

  // meta
  if (
    typeof output.meta !== "object" ||
    typeof output.meta.engine_version !== "string" ||
    !Number.isInteger(output.meta.evaluation_time_ms)
  ) {
    return invalid("Invalid meta block");
  }

  return { valid: true, data: output };
}

function invalid(reason) {
  return {
    valid: false,
    safe_response: {
      status: "fail",
      readiness_percent: 0,
      analysis: { strengths: [], weaknesses: [] },
      improvement_hints: [],
      meta: {
        engine_version: "unknown",
        evaluation_time_ms: 0
      }
    }
  };
}

module.exports = { validateAgentOutput };
