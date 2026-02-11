# task-review-agent-
# Stabilization & Verification Sprint – Task Review Agent

## Purpose
This project implements stabilization and verification for the Task Review Agent to make it **demo-safe and reliable**.

The focus is on:
- Preventing crashes
- Enforcing a strict output JSON contract
- Handling all failure cases safely
- Ensuring deterministic demo behavior

No core agent logic is modified.

---

## What is implemented
- Strict output contract validator
- Failure handling for invalid and empty inputs
- Golden demo test cases to lock behavior
- Single-command demo runner script
- Clear demo and test instructions

---

## Project Structure
task-review-demo/
├── validators/
│ └── outputValidator.js
├── mock/
│ └── taskReviewAgent.js
├── tests/
│ └── golden/
│ └── goldenTests.js
├── scripts/
│ └── demoRunner.js
└── README.md

## Output Contract
All agent outputs must follow this structure:

```json
{
  "status": "pass | fail",
  "score": 0,
  "summary": "string",
  "failure_reasons": []
}
Failure Handling

The system safely handles:

Empty inputs

Very short inputs

Invalid or irrelevant content

In all such cases:

status is set to fail

Proper failure reasons are returned

The system never crashes

How to Run
Run Demo
node scripts/demoRunner.js

Run Golden Tests
node tests/golden/goldenTests.js

Status

All stabilization and verification tasks are completed.
The system is stable, deterministic, and ready for live demo and final verification 
