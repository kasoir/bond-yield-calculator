# Bond Yield Calculator

A full-stack Bond Yield Calculator built with **NestJS (API)**, **React (UI)**, and a **framework-agnostic TypeScript financial engine**.

This project was designed to demonstrate clear separation between financial domain logic and application layers, while leveraging AI as an implementation assistant under strict engineering constraints.

---

## Features

* Compute **Current Yield**
* Compute **Yield to Maturity (YTM)** using numerical solving
* Calculate **Total Interest Earned**
* Identify **Premium / Discount / Par** pricing
* Generate a complete **Cash Flow Schedule**
* Clean architectural separation between:

  * Financial domain (`libs/bond-engine`)
  * API transport (`apps/api`)
  * Presentation layer (`apps/web`)

---

## Inputs

| Parameter          | Description                   |
| ------------------ | ----------------------------- |
| Face Value         | Principal repaid at maturity  |
| Annual Coupon Rate | Stated bond interest rate (%) |
| Market Price       | Current trading price         |
| Years to Maturity  | Remaining life of bond        |
| Coupon Frequency   | Annual or Semi-Annual         |

---

## Outputs

* Current Yield
* Yield to Maturity (YTM)
* Total Interest Earned
* Premium / Discount Classification
* Detailed Cash Flow Table

---

## Financial Assumptions

This calculator models a **plain-vanilla fixed coupon bond** with:

* Constant coupon payments over life
* No embedded options (no call/put)
* No credit risk modeling
* No reinvestment assumptions
* Equal coupon spacing based on frequency
* Principal returned entirely at maturity

Coupon payment per period:

Coupon = Face Value × (Annual Coupon Rate / 100) ÷ Frequency

Number of periods:

Periods = Years to Maturity × Frequency

---

## Yield to Maturity (YTM)

YTM is defined as the discount rate that equates the **present value of all future cash flows** to the bond's market price:

Price = Σ (Coupon / (1 + y/m)^t) + Face / (1 + y/m)^N

There is **no closed-form algebraic solution**, so a numerical root-finding method must be used.

---

## Numerical Method Used

### Newton–Raphson Iteration

We solve for `y` by iteratively refining an estimate:

yₙ₊₁ = yₙ − f(yₙ) / f′(yₙ)

Where:

* `f(y)` represents the bond pricing error at yield `y`
* The derivative `f′(y)` measures sensitivity of price to yield

---

## Why Newton–Raphson Was Chosen

Newton–Raphson was selected because:

* Fast quadratic convergence near the solution
* Deterministic and widely used in fixed-income analytics
* More accurate than approximation formulas commonly seen in textbooks
* Suitable for real-time UI calculations
* Avoids financial “shortcut formulas” that break under premium/discount conditions

Tolerance and safeguards were added to ensure convergence stability.

---

## Architecture Decisions

### 1. Domain Isolation (`libs/bond-engine`)

All financial mathematics live in a pure TypeScript module with:

* No framework dependencies
* Deterministic functions
* Fully testable logic
* Reusable across services, CLI tools, or batch pricing engines

This mirrors real-world quant / pricing library design.

---

### 2. Thin NestJS Layer (`apps/api`)

NestJS acts strictly as:

* Input validation
* Transport orchestration
* Mapping HTTP → domain calls

No financial logic exists in the API layer.

---

### 3. Minimal React Frontend (`apps/web`)

React is intentionally lightweight:

* No state libraries
* No styling frameworks
* Purely a visualization + input surface

This prevents duplication of business logic and keeps correctness centralized.

---

## Running the Project

### Start API

cd apps/api
npm install
npm run start:dev

### Start Frontend

cd apps/web
npm install
npm run dev

Open browser at:

http://localhost:5173

---

## Project Structure

bond-yield-calculator/
├── libs/bond-engine/   → Financial domain logic
├── apps/api/           → NestJS adapter layer
├── apps/web/           → React UI
└── README.md

---

## Engineering Focus

This project emphasizes:

* Correct financial modeling
* Deterministic numerical methods
* Clear architectural boundaries
* Responsible use of AI-assisted development

---

## Future Extensions

* Quarterly / monthly coupon support
* Duration & convexity calculations
* Zero-coupon bond mode
* CSV export of cash flows
* Batch pricing endpoint
