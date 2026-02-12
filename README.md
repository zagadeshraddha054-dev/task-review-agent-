Task Review Engine – Stabilization & Verification Sprint
Input Format

The task review engine expects a structured payload containing assignment details and the submitted work.

{
  "assignment": {
    "title": "Stabilization Sprint",
    "requirements": ["Validator", "Golden tests"],
    "deliverables": ["GitHub repo", "README"],
    "timeline": {
      "assigned_date": "YYYY-MM-DD",
      "due_date": "YYYY-MM-DD",
      "submitted_date": "YYYY-MM-DD"
    }
  },
  "submission": {
    "content": "Description of work done",
    "artifacts_present": ["GitHub repo", "README"]
  }
}


Plain text inputs are not used. All evaluations are based on this structured input.

Output Format

The engine produces a deterministic, production-aligned JSON output.

{
  "score": number,
  "readiness_percent": number,
  "status": "pass | borderline | fail",
  "review": {
    "done_well": [],
    "missing": [],
    "timeline_comment": ""
  },
  "analysis": {
    "accuracy": number,
    "completeness": number,
    "quality": number
  },
  "internal": {
    "risks": [],
    "next_task_preview": ""
  },
  "meta": {
    "deterministic": true,
    "evaluation_time_ms": number
  }
}
All required fields are strictly validated. Any invalid output is replaced with a safe failure response.

How to Run
Run Demo
node scripts/demoRunner.js

This runs the task review engine with a sample assignment payload and prints the validated output.

Run Golden Tests
node tests/golden/goldenTests.js

This executes predefined PASS, BORDERLINE, and FAIL cases.

Determinism Confirmation

Deterministic behavior is confirmed through golden tests:
Each test case runs the same input multiple times
Outputs are compared for byte-level equality
Any difference causes the test to fail

Expected result:

✅ Determinism verified across repeated runs

Project Structure
project-root/
├── mock/
│   └── taskReviewAgent.js
├── validators/
│   └── outputValidator.js
├── scripts/
│   └── demoRunner.js
├── tests/
│   └── golden/
│       └── goldenTests.js
└── README.md

## Daily State Log

## Day 1
Reviewed the task requirements, understood the production output contract, and identified gaps in the existing mock-based approach.

## Day 2
Updated the code to use a deterministic, assignment-aware review engine and aligned all outputs with the required JSON schema.

## Day 3
Added strict validation and golden tests to prove deterministic behavior, and ensured the demo runs safely and consistently.
