# NEPv Visualizer

Interactive visualization of a nonlinear eigenvalue problem with eigenvector dependency (NEPv).

![Demo](assets/demo.gif)

---

## Run Locally

Clone the repository:

```bash
git clone https://github.com/tam1rlan1/nepv-visualizer.git
```

Move into the project folder:

```bash
cd nepv-visualizer
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local address shown in the terminal (usually http://localhost:5173).            
            
            
            
## Problem Statement & Motivation

In a Standard Eigenvalue Problem, the matrix is static: $Ax = \lambda x$ [1]. However, in a Nonlinear Eigenvalue Problem with eigenvector dependency (NEPv), the matrix operator depends on the eigenvector itself: $A(x)x = \lambda x$.

This dynamic feedback loop appears in complex physical systems, such as calculating the Bose-Einstein condensate (Gross-Pitaevskii equation), where the potential depends on the quantum particle itself [2]. This project provides an interactive 2D visualization to build intuition for this feedback loop.

## Methodology (The Math)

To solve this 2x2 NEPv visually, the application implements a variation of the Nonlinear Power Method [3]. The iterative steps computed on each click are:

**Normalization**: $x_n = \frac{x}{||x||}$ (Crucial to prevent vector explosion).

**Matrix Application**: $y = A(x_n)x_n$ (The matrix dynamically updates based on the normalized vector).

**Eigenvalue Approximation**: $\lambda \approx x_n^T y$ (Computed using the Generalized Rayleigh Quotient).

## Why Iteration Converges

The iteration acts as a fixed-point process. Starting from an initial vector x, the system repeatedly constructs a matrix A(x), applies it to the vector, and normalizes the result.

If the process stabilizes, the updated vector eventually stops changing significantly:

$$x_{n+1} \approx x_n$$

At that point, the dynamically generated matrix approximately preserves the direction of the vector, meaning the system approaches a self-consistent nonlinear eigenvector solution.

This behavior is conceptually similar to the classical power iteration method, where repeated matrix application amplifies stable dominant directions while suppressing unstable ones.

## Evaluation & Experimental Results

Dataset: N/A (Interactive mathematical visualization, not a data-driven ML model).
Evaluation Method: Visual analytic convergence.
Results: The visualizer successfully demonstrates the core mechanics. Users can track the vector's iteration trail (yellow dots) until the system stabilizes at an equilibrium point. This visually demonstrates that the vector x has approached a self-consistent state where the dynamically generated matrix A(x) approximately preserves its direction.

## Limitations & Design Choices

Dimensions: Strictly limited to 2x2 matrices to allow for clear, easy, interactive 2D plotting.
Non-linearity: The dependency is hardcoded to linearly affect the diagonal elements for educational simplicity. Real-world NEPv equations involve complex differential dependencies.
Algorithm: The power iteration method only finds the dominant eigenpair and is not guaranteed to converge for all possible non-linear matrices.

## AI Acknowledgment & References
AI tools (LLMs) were used to assist with UI brainstorming, React component structuring, debugging, and parts of the visualization implementation.

The mathematical model, iteration logic, normalization process, and eigenvalue calculations were manually reviewed, tested, and adjusted to ensure consistency with the referenced NEPv concepts. 

## References:
1.Trefethen, L. N., & Bau, D. Numerical Linear Algebra. SIAM, 1997.

2.Altmann R. (2019). Iteration methods for nonlinear PDE eigenvalue problems (Presentation).

3.Eastman, S., & Estep, D. A power method for nonlinear operators. Applicable Analysis.
