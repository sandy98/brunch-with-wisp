
(def version "0.0.3")

(def factorial (fn [n] (if (< n 2) n (* n (factorial (- n 1))))))