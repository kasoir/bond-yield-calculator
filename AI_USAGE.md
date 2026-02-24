# AI Assistance and Validation Notes

## How AI Was Used

AI (Gemini 3.1 Pro) was used as an implementation accelerator, not as a decision-maker.

The development process followed a **structured prompting approach**:

1. The system architecture was designed manually before any code generation.
2. AI was instructed to implement isolated components under strict constraints.
3. Each layer was generated separately to prevent cross-layer leakage.

Prompts specified:

* Exact folder boundaries
* No external financial libraries
* Pure function requirements
* Explicit numerical method (Newton–Raphson)
* Separation of domain vs framework responsibilities

This ensured AI acted similarly to a junior engineer working under specification.

---

## What Was Validated Manually

The following were reviewed and verified without AI trust:

### Financial Logic

* Coupon formula correctness
* Cash flow schedule structure
* Principal repayment timing
* Premium/discount classification behavior

### Numerical Solver

* Confirmed Newton–Raphson implementation
* Verified convergence tolerance
* Tested against known bond examples
* Ensured stable results for:

  * Discount bonds
  * Premium bonds
  * Near-par pricing

### Architectural Integrity

* Ensured no financial calculations leaked into React or NestJS layers
* Refactored imports to maintain domain isolation
* Verified deterministic outputs from `bond-engine`

### Tooling Corrections

* Adjusted module system (CommonJS) for NestJS compatibility
* Resolved TypeScript build and import behavior manually

---

## Why AI Was Used This Way

The goal was to:

* Reduce boilerplate creation time
* Maintain full ownership of correctness
* Demonstrate controlled, review-driven AI usage

AI generated code quickly, but **all correctness-sensitive areas were validated manually**, especially financial math and numerical solving.

---

## Key Principle Followed

AI assisted with implementation speed.

Human oversight ensured:

* Mathematical validity
* Architectural soundness
* Production-style structure

This mirrors how AI would be used responsibly in a real engineering environment.
