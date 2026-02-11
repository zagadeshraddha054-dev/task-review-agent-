const REQUIRED_KEYS = ["status", "score", "summary", "failure_reasons"];
const ALLOWED_STATUS = ["pass", "fail"];

function validateAgentOutput(output) {
  if (typeof output !== "object" || output === null || Array.isArray(output)) {
    return invalid("Output is not a valid JSON object");
  }

  for (const key of REQUIRED_KEYS) {
    if (!(key in output)) {
      return invalid(`Missing required key: ${key}`);
    }
  }

  for (const key of Object.keys(output)) {
    if (!REQUIRED_KEYS.includes(key)) {
      return invalid(`Unexpected key present: ${key}`);
    }
  }

  if (!ALLOWED_STATUS.includes(output.status)) {
    return invalid("Invalid status value");
  }

  if (!Number.isInteger(output.score) || output.score < 0 || output.score > 100) {
    return invalid("Score must be between 0 and 100");
  }

  if (output.status === "fail" && output.score !== 0) {
    return invalid("Score must be 0 when status is fail");
  }

  if (typeof output.summary !== "string" || output.summary.trim() === "") {
    return invalid("Summary must be non-empty");
  }

  if (!Array.isArray(output.failure_reasons)) {
    return invalid("failure_reasons must be an array");
  }

  if (output.status === "fail" && output.failure_reasons.length === 0) {
    return invalid("failure_reasons required when status is fail");
  }

  if (output.status === "pass" && output.failure_reasons.length !== 0) {
    return invalid("failure_reasons must be empty when status is pass");
  }

  return { valid: true, data: output };
}

function invalid(reason) {
  return {
    valid: false,
    error: reason,
    safe_response: {
      status: "fail",
      score: 0,
      summary: "Invalid agent output blocked",
      failure_reasons: [reason]
    }
  };
}

module.exports = { validateAgentOutput };
