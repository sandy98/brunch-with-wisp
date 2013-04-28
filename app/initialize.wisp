
(def utils (require "lib/utils"))

($ 
  (fn []
    (do 
      ;(alert (str "Barebones Brunch with a touch of Wisp utils.\nUtils version" utils.version))
      ;(alert (str "Sqrt of 2: " (.sqrt utils 2)))
      (.on ($ "form") "submit" (fn [ev]
        (do
         (if ev.preventDefault (ev.preventDefault))
         (.text ($ "#factorial") (.factorial utils (parseInt (.val ($ "#txt-n")))))
         (.text ($ "#sqrt") (.sqrt utils (parseInt (.val ($ "#txt-n")))))
         false))))))

