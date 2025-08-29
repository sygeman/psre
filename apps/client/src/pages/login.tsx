import { createEffect } from "solid-js";

const widgetVersion = 22;
const botUsername = 'sgmn_dev_bot';
const buttonSize = 'medium'

export function LoginPage() {
  let hiddenDivRef;


  createEffect(() => {
    window.onAuthCallback = (user) => {
      console.log('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://telegram.org/js/telegram-widget.js?${widgetVersion}`;
    script.setAttribute('data-telegram-login', botUsername);
    script.setAttribute('data-size', buttonSize);
    script.setAttribute('data-onauth', 'onAuthCallback(user)');

    hiddenDivRef.after(script);
  });

  return (
      <div class="h-full w-full">
        Login
        <div ref={hiddenDivRef} hidden />
      </div>
  );
}
