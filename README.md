Stabilization & Verification Sprint – Task Review Engine
Overview

This project implements a deterministic, assignment-aware task review engine as part of the Stabilization and Verification Sprint.
The goal is to ensure stable, predictable, and demo-safe evaluation output that strictly follows the mandated production contract.

The system focuses on:

Deterministic behavior

Strict output validation

Clear separation between engine logic, validation, tests, and demo execution

What Changed

The following updates were made based on the assignment requirements:

Replaced mock-style logic with a deterministic task review engine

Engine now evaluates assignment + submission payloads

Output aligned to the canonical production JSON contract

Introduced strict schema validation to prevent malformed outputs

Added golden tests to explicitly prove deterministic behavior

Updated demo runner to use real assignment payloads instead of plain text input

All changes were made within the existing codebase.

Input Format (Assignment-Aware)

The review engine expects a structured payload:

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


Plain text inputs are no longer used.

Output Contract (Production-Aligned)

All outputs strictly follow this structure:

{
  "score": number,
  "readiness_percent": number,
  "status": "pass | fail | borderline",
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


Any deviation from this contract is rejected by the validator and replaced with a safe failure response.

Validation & Stability

Required fields are strictly enforced

Invalid or malformed outputs never reach the demo

A controlled fallback response is always returned on validation failure

No randomness is used anywhere in the system

This guarantees demo safety and predictable behavior.

Determinism Verification

Golden tests run the same payload multiple times and compare outputs to ensure:

Identical input always produces identical output

No hidden non-determinism exists

Behavior is locked for demo and verification

Demo Execution
Run the demo
node scripts/demoRunner.js


The demo:

Uses a real assignment payload

Runs the review engine

Validates output against the production schema

Prints only safe, validated results

Golden Tests
Run determinism tests
node tests/golden/goldenTests.js


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
