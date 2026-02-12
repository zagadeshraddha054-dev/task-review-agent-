/**
 * Deterministic Task Review Engine
 * Evaluates assignment + submission and returns structured output
 */

function taskReviewAgent(payload) {
  const { assignment, submission } = payload;

  const requirementsMet = assignment.requirements.filter(req =>
    submission.content.toLowerCase().includes(req.toLowerCase())
  );

  const missingRequirements = assignment.requirements.filter(
    req => !requirementsMet.includes(req)
  );

  const onTime =
    assignment.timeline.submitted_date <= assignment.timeline.due_date;

  const readiness_percent = Math.min(
    100,
    Math.floor((requirementsMet.length / assignment.requirements.length) * 100)
  );

  return {
    score: requirementsMet.length,
    readiness_percent,
    status: readiness_percent >= 70 ? "pass" : "fail",

    review: {
      done_well: requirementsMet,
      missing: missingRequirements,
      timeline_comment: onTime ? "Submitted on time" : "Late submission"
    },

    analysis: {
      accuracy: readiness_percent,
      completeness: readiness_percent,
      quality: readiness_percent >= 70 ? 75 : 50
    },

    internal: {
      risks: missingRequirements.length > 0 ? ["Incomplete requirements"] : [],
      next_task_preview: "Improve missing areas"
    },

    meta: {
      deterministic: true,
      evaluation_time_ms: 0
    }
  };
}

module.exports = { taskReviewAgent };
