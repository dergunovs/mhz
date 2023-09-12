import "./style.css";

const isDevMode = import.meta.env.DEV;

export function createBankPayment(id: string): string | undefined {
  const mountElement = document.querySelector<HTMLDivElement>(`#${id}`);

  if (!mountElement) return;

  const srcdoc = `
  <p>
    Hello
  </p>`;

  return (mountElement.innerHTML = `
  <iframe
    srcdoc="${srcdoc}"
    id="bankFrame"
    title="Mhz Bank payment"
    width="342"
    height="400"
    referrerpolicy="no-referrer"
    sandbox="allow-scripts"
    loading="lazy"
    style="border:0">
    <p>Your browser is not supporting IFrames.</p>
  </iframe>
`);
}

if (isDevMode) createBankPayment("app");
