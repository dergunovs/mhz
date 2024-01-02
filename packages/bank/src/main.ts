const isDevMode = import.meta.env.DEV;

export function createBankPayment(
  id: string,
  name: string,
  order: string,
  price: string,
): string | undefined {
  const mountElement = document.querySelector<HTMLDivElement>(`#${id}`);

  if (!mountElement) return;

  const srcdoc = `
  <div style='font-family:sans-serif;background:aliceblue;padding:20px;border-radius:16px'>
    <h1 style='margin-top:0'>Mhz Bank</h1>

    <p>
      Remind you that this is not a real online store. Enter anything in input below, or cancel you payment.
    </p>

    <p>
      Customer: <b>${name}</b>
    </p>

    <p>
      Order: <b>${order}</b>
    </p>

    <p>
      Price: <b>${price}</b>
    </p>

    <p>
      <input type='text' placeholder='Card number' style='padding:8px'/>
    </p>

    <div>
      <button onClick='window.top.postMessage(&quot;submit&quot;, &quot;*&quot;)' style='padding:8px 16px;background:green;color:white'>Submit</button>
      <button onClick='window.top.postMessage(&quot;cancel&quot;, &quot;*&quot;)' style='padding:8px 16px'>Cancel</button>
    </div>
  <div>
  `;

  return (mountElement.innerHTML = `
  <iframe
    srcdoc="${srcdoc}"
    id="bankFrame"
    title="Mhz Bank payment"
    width="320"
    height="380"
    referrerpolicy="no-referrer"
    sandbox="allow-scripts"
    loading="lazy"
    style="border:0">
    <p>Your browser is not supporting IFrames.</p>
  </iframe>
`);
}

if (isDevMode) {
  createBankPayment("app", "John Doe", "1743534534", "12000 ₽");

  window.addEventListener("message", (event) => {
    alert(event.data);
  });
}
