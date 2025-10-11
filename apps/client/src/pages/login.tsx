import { createEffect } from "solid-js"

const widgetVersion = 22
const botUsername = "sgmn_dev_bot"
const buttonSize = "large"

export function LoginPage() {
  let hiddenDivRef

  createEffect(() => {
    window.onAuthCallback = async (data) => {
      const response = await fetch("http://localhost:4500/api/login", {
        method: "POST",
        body: JSON.stringify({ data }),
      })

      const token = await response.text()
      if (token) {
        localStorage.setItem("token", token)
        location.reload()
      }
    }

    const script = document.createElement("script")
    script.async = true
    script.src = `https://telegram.org/js/telegram-widget.js?${widgetVersion}`
    script.setAttribute("data-telegram-login", botUsername)
    script.setAttribute("data-size", buttonSize)
    script.setAttribute("data-onauth", "onAuthCallback(user)")
    script.setAttribute("data-userpic", JSON.stringify(Boolean(true)))

    hiddenDivRef.after(script)
  })

  return (
    <div class="size-screen flex items-center justify-center">
      <div ref={hiddenDivRef} hidden />
    </div>
  )
}
