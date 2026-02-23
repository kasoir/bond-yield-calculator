/**
 * Finds a root of a real function using the Newton-Raphson numerical method.
 *
 * The method iteratively improves an initial guess to find `x` such that `f(x) ≈ 0`.
 * This is used specifically for calculating Yield To Maturity (YTM) because YTM
 * cannot be solved algebraically for bonds with more than one period.
 *
 * @param f The target function to find the root of
 * @param df The first derivative of the target function
 * @param initialGuess An initial estimate of the root
 * @param tolerance The acceptable error margin (convergence threshold)
 * @param maxIterations Maximum allowed iterations before halting
 * @returns An approximation of the root
 */
export function newtonRaphson(
    f: (x: number) => number,
    df: (x: number) => number,
    initialGuess: number,
    tolerance: number = 1e-7,
    maxIterations: number = 100
): number {
    let x = initialGuess;

    for (let i = 0; i < maxIterations; i++) {
        const fx = f(x);

        // If within our tolerance, we have found our root
        if (Math.abs(fx) < tolerance) {
            return x;
        }

        const dfx = df(x);

        // Prevent division by zero if the derivative becomes perfectly flat
        if (dfx === 0) {
            break;
        }

        x -= fx / dfx;
    }

    return x;
}
