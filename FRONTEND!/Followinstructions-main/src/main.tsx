
import { createElement } from "react";
import { createRoot } from "react-dom/client";

function renderBootError(error: unknown): void {
  const rootEl = document.getElementById("root");
  const target = rootEl ?? document.body;
  const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  target.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#fff7ed;color:#7c2d12;font-family:Arial,sans-serif;">
      <div style="max-width:900px;width:100%;background:#ffffff;border:1px solid #fdba74;border-radius:12px;padding:16px 18px;box-shadow:0 10px 30px rgba(0,0,0,.08);">
        <h1 style="margin:0 0 10px;font-size:20px;">Frontend failed to start</h1>
        <p style="margin:0 0 8px;font-size:14px;">Open browser console for full stack trace.</p>
        <pre style="margin:0;background:#fff1e6;padding:10px;border-radius:8px;white-space:pre-wrap;word-break:break-word;font-size:13px;">${message}</pre>
      </div>
    </div>
  `;
}

window.addEventListener("error", (event) => {
  renderBootError(event.error ?? event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  renderBootError(event.reason);
});

async function bootstrap() {
  await import("./i18n");
  await import("./styles/index.css");
  const { default: App } = await import("./app/App.tsx");
  const root = createRoot(document.getElementById("root")!);
  root.render(createElement(App));
}

void bootstrap().catch((error) => {
  renderBootError(error);
});
  
