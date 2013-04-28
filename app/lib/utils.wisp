
(def version "0.0.5")

(def factorial (fn [n] (if (< n 2) 1 (* n (factorial (- n 1))))))

(def average (fn [v1 v2] (/ (+ v1 v2) 2)))
 
(def square (fn [n] (* n n)))

(def abs (fn [n] (if (< n 0) (* -1 n) n)))
  
(def sqrt (fn [n]
  (def improve (fn [guess]
    (average guess (/ n guess))))
  (def good-enough? (fn [guess]
    (< (abs (- (square guess) n)) 0.0000000001)))
  (def tryit (fn [guess]
    (if (good-enough? guess)
      guess
      (tryit (improve guess)))))
  (tryit 1)))

