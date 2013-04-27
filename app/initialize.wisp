
(def utils (require "lib/utils"))

($ 
  (fn []
    (do 
      ;(alert (str "Barebones Brunch with a touch of Wisp utils.\nUtils version" utils.version))
      (.on ($ "form") "submit" (fn [ev]
        (do
         (if ev.preventDefault (ev.preventDefault))
         (.text ($ "#result") (utils.factorial (parseInt (.val ($ "#txt-n")))))
         false))))))

