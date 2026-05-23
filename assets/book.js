/* Hunting SRGs — shared interactive helpers */

(function () {
    "use strict";

    // ---------- KaTeX auto-render ----------

    function renderMath() {
        if (typeof renderMathInElement === "function") {
            renderMathInElement(document.body, {
                delimiters: [
                    { left: "$$", right: "$$", display: true },
                    { left: "\\[", right: "\\]", display: true },
                    { left: "$",  right: "$",  display: false },
                    { left: "\\(", right: "\\)", display: false }
                ],
                throwOnError: false,
                strict: false
            });
        }
    }

    // ---------- Current-page highlight in sidebar ----------

    function highlightCurrentNav() {
        const here = window.location.pathname.split("/").pop() || "index.html";
        document.querySelectorAll(".nav-sidebar a").forEach(a => {
            const target = a.getAttribute("href").split("/").pop();
            if (target === here) a.classList.add("current");
        });
    }

    // ---------- SRG feasibility calculator ----------
    // Publishes window.SRG with pure-JS helpers used by chapter widgets.

    function srgDerive(n, k, lam, mu) {
        // Returns { feasible, r, s, f, g, reason } given (n, k, λ, μ).
        if (!Number.isInteger(n) || !Number.isInteger(k) ||
            !Number.isInteger(lam) || !Number.isInteger(mu)) {
            return { feasible: false, reason: "Non-integer parameter" };
        }
        if (!(0 < k && k < n - 1)) return { feasible: false, reason: "Need 0 < k < n-1" };
        if (lam < 0 || lam >= k) return { feasible: false, reason: "Need 0 ≤ λ < k" };
        if (mu <= 0 || mu > k) return { feasible: false, reason: "Need 0 < μ ≤ k" };

        // Handshake: k(k - λ - 1) = (n - k - 1) μ
        if (k * (k - lam - 1) !== (n - k - 1) * mu) {
            return { feasible: false, reason: "k(k−λ−1) ≠ (n−k−1)μ (handshake fails)" };
        }

        // Eigenvalues: x² − (λ − μ) x − (k − μ) = 0
        const b = lam - mu;
        const c = -(k - mu);
        const disc = b * b - 4 * c;
        if (disc < 0) return { feasible: false, reason: "Discriminant < 0" };
        const sqd = Math.sqrt(disc);
        const r = (b + sqd) / 2;
        const s = (b - sqd) / 2;

        // Multiplicities
        // f = ((n-1) - ((2k + (n-1)(λ−μ)) / sqrt(disc))) / 2  requires sqd ≠ 0
        let f, g;
        if (sqd === 0) {
            // conference case: λ − μ = 0, n = 4μ + 1, k = 2μ; multiplicities n−1 equally split? rare.
            f = (n - 1) / 2;
            g = (n - 1) / 2;
        } else {
            f = ((n - 1) - (2 * k + (n - 1) * (lam - mu)) / sqd) / 2;
            g = (n - 1) - f;
        }

        const mult_integer = Number.isInteger(f) && Number.isInteger(g);

        return {
            feasible: mult_integer,
            r, s, f, g,
            reason: mult_integer ? "Parameter tuple is feasible" : "Non-integer multiplicities"
        };
    }

    function srgFormat(obj) {
        if (!obj.feasible) return obj.reason;
        const rfmt = Number.isInteger(obj.r) ? obj.r : obj.r.toFixed(4);
        const sfmt = Number.isInteger(obj.s) ? obj.s : obj.s.toFixed(4);
        return `r = ${rfmt},  s = ${sfmt},  f = ${obj.f},  g = ${obj.g}`;
    }

    window.SRG = { derive: srgDerive, format: srgFormat };

    // ---------- Init ----------

    function init() {
        highlightCurrentNav();
        // KaTeX auto-render fires after the KaTeX auto-render extension has loaded;
        // the HTML pages add a <script onload> that calls window.BookInit.renderMath.
        renderMath();
    }

    window.BookInit = { init, renderMath };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
