import React, { useMemo, useRef, useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { themeColors } from "../themeColors";

const IntroductionDocsSms = () => {
    const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);

  const sections = [
    { id: "overview", title: "Overview" },
    { id: "key-concepts", title: "Key Concepts" },
    { id: "quickstart", title: "Quickstart" },
    { id: "auth", title: "Authentication" },
    { id: "messages", title: "Sending Messages" },
  ];

  const [active, setActive] = useState("overview");
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current || document;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
  return (
    
     <div
      className={`flex min-h-screen w-full ${
        isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
      }`}
    >
      <div className="min-h-screen w-full max-w-6xl mx-auto rounded-lg mt-3 mb-5 bg-gradient-to-b from-slate-50 to-white text-slate-800 ">
        {/* Topbar */}
        <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b ">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500 grid place-items-center shadow-md">
              <span className="text-white font-bold">SMS</span>
            </div>
            <div className="flex-1">
              <h1 className="text-lg md:text-xl font-semibold leading-tight">
                SMS API – Introduction
              </h1>
              <p className="text-sm text-slate-500 hidden md:block">
                Everything you need to send your first SMS and handle delivery
                receipts.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <a
                href="#quickstart"
                className="px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition shadow"
              >
                Start building
              </a>
              <a
                href="#faq"
                className="px-3 py-2 rounded-xl border hover:bg-slate-50"
              >
                FAQ
              </a>
            </div>
          </div>
        </header>

        {/* Layout */}
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar */}
          <nav className="lg:sticky lg:top-[68px] h-max rounded-2xl border bg-white shadow-sm">
            <div className="p-3 border-b">
              <SearchBox />
            </div>
            <ul className="p-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 ring-emerald-400 ${
                      active === s.id
                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                        : ""
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        active === s.id ? "bg-emerald-600" : "bg-slate-300"
                      }`}
                    />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main */}
          <main ref={containerRef} className="space-y-12">
            <Section id="overview" title="Overview">
              <p>
                The SMS API lets your application send and receive text
                messages, handle delivery reports, and automate customer
                communication at scale. This page provides a concise tour of the
                core pieces you need to launch quickly: authentication, sending
                SMS, handling delivery reports, and error recovery.
              </p>
              <Callout type="tip" title="TL;DR">
                You’ll create an API Key, send a test SMS with cURL or SDK, and
                expose a <code>/webhooks/sms</code> endpoint to receive delivery
                receipts.
              </Callout>
              <KpiGrid />
            </Section>

            <Section id="key-concepts" title="Key Concepts">
              <List>
                <li>
                  <strong>Sender ID:</strong> Your registered number or alphanumeric sender used to send SMS.
                </li>
                <li>
                  <strong>Access Token:</strong> Bearer token used to
                  authenticate API requests.
                </li>
                <li>
                  <strong>Delivery Receipt (DLR):</strong> Webhook notifying when
                  an SMS is delivered or failed.
                </li>
                <li>
                  <strong>Message Segments:</strong> SMS longer than 160 chars
                  are split into multiple segments.
                </li>
              </List>
            </Section>

            <Section id="quickstart" title="Quickstart">
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <strong>Create an API key:</strong> In your dashboard, go to{" "}
                  <em>Developers → API Keys</em> and generate a server key.
                  Store it as <code>SMS_API_KEY</code>.
                </li>
                <li>
                  <strong>Find your Sender ID:</strong> Note your{" "}
                  <code>SENDER_ID</code> from the dashboard.
                </li>
                <li>
                  <strong>Send a test SMS:</strong> Use the sample below to send
                  a simple text.
                </li>
                <li>
                  <strong>Expose a webhook:</strong> Receive and log delivery
                  reports.
                </li>
              </ol>

              <CodeTabs
                tabs={[
                  {
                    label: "cURL",
                    code: `curl -X POST https://api.example.com/sms/v1/messages \\\n -H "Authorization: Bearer $SMS_API_KEY" \\\n -H "Content-Type: application/json" \\\n -d '{\n "to": "+15551234567",\n "from": "MyBrand",\n "text": "Hello from the SMS API 👋"\n}'`,
                  },
                  {
                    label: "Node.js",
                    code: `import fetch from 'node-fetch';

const res = await fetch('https://api.example.com/sms/v1/messages', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer ' + process.env.SMS_API_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: '+15551234567',
    from: 'MyBrand',
    text: 'Hello from the SMS API 👋',
  }),
});
const data = await res.json();
console.log(data);`,
                  },
                  {
                    label: "Python",
                    code: `import os, json, requests

r = requests.post(
  'https://api.example.com/sms/v1/messages',
  headers={
    'Authorization': f"Bearer {os.environ['SMS_API_KEY']}",
    'Content-Type': 'application/json'
  },
  data=json.dumps({
    'to': '+15551234567',
    'from': 'MyBrand',
    'text': 'Hello from the SMS API 👋'
  })
)
print(r.status_code, r.json())`,
                  },
                ]}
              />
            </Section>

            <Section id="auth" title="Authentication">
              <p>
                Authenticate requests using the{" "}
                <code>Authorization: Bearer &lt;token&gt;</code> header. Keys
                are scoped per project. Rotate keys regularly and restrict them
                server-side only.
              </p>
              <Callout type="warn" title="Do not expose tokens in client apps">
                Keep secrets on the server. Use environment variables and a
                secrets manager.
              </Callout>
              <CodeBlock
                title="Example request with Bearer token"
                code={`GET /sms/v1/profile HTTP/1.1\nHost: api.example.com\nAuthorization: Bearer <YOUR_TOKEN>\n`}
              />
            </Section>

            <Section id="messages" title="Sending Messages">
              <p className="mb-4">
                Send text SMS by specifying the <code>to</code>,{" "}
                <code>from</code>, and <code>text</code> fields in the payload.
              </p>
              <CodeBlock
                title="Send a text SMS"
                code={`POST /sms/v1/messages\nContent-Type: application/json\n\n{\n "to": "+15551234567",\n "from": "MyBrand",\n "text": "Your order #7421 is out for delivery."\n}`}
              />
            </Section>

            {/* Footer */}
            <footer className="pt-6 mt-6 border-t text-sm text-slate-500 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p>© {new Date().getFullYear()} Celitix. SMS API Documentation</p>
              <div className="flex items-center gap-3">
                <a className="hover:underline" href="#">
                  Terms
                </a>
                <a className="hover:underline" href="#">
                  Privacy
                </a>
                <a
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white"
                  href="#quickstart"
                >
                  Get started
                </a>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};
    

export default IntroductionDocsSms;


function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
        {title}
      </h2>
      <div className="text-slate-700 leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

function SearchBox() {
  const [q, setQ] = useState("");
  return (
    <label className="group relative block">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search docs (⌘K)"
        className="w-full rounded-xl border px-3 py-2 pr-9 focus:ring-2 ring-emerald-400 outline-none"
      />
      <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">
        ⌘K
      </kbd>
    </label>
  );
}

function Callout({ type = "info", title, children }) {
  const styles = {
    info: "bg-sky-50 text-sky-800 border-sky-200",
    tip: "bg-emerald-50 text-emerald-800 border-emerald-200",
    warn: "bg-amber-50 text-amber-800 border-amber-200",
  }[type];
  return (
    <div className={`border rounded-2xl p-4 ${styles}`}>
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}

function List({ children }) {
  return <ul className="list-disc pl-5 space-y-2">{children}</ul>;
}

function CodeBlock({ title, code }) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="text-sm font-semibold">{title}</div>
        <CopyBtn text={code} />
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function CodeTabs({ tabs }) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 px-3 pt-3">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setIdx(i)}
            className={`px-3 py-1.5 rounded-xl text-sm border-b-2 -mb-[1px] ${
              idx === i
                ? "border-emerald-600 text-emerald-700 bg-emerald-50"
                : "border-transparent hover:bg-slate-50"
            }`}
          >
            {t.label}
          </button>
        ))}
        <div className="ml-auto px-3">
          <CopyBtn text={tabs[idx].code} />
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code>{tabs[idx].code}</code>
      </pre>
    </div>
  );
}

function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setOk(true);
      setTimeout(() => setOk(false), 1200);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <button
      onClick={copy}
      className="text-xs px-2 py-1 rounded-lg border hover:bg-slate-50"
    >
      {ok ? "Copied" : "Copy"}
    </button>
  );
}

function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="rounded-2xl border bg-white shadow-sm divide-y">
      {items.map((it, i) => (
        <details
          key={i}
          open={open === i}
          onToggle={(e) => e.target.open && setOpen(i)}
        >
          <summary className="cursor-pointer list-none px-4 py-3 font-medium flex items-center justify-between">
            {it.q}
            <span className="text-slate-400">{open === i ? "–" : "+"}</span>
          </summary>
          <div className="px-4 pb-4 text-slate-700">{it.a}</div>
        </details>
      ))}
    </div>
  );
}

function KpiGrid() {
  const stats = [
    { label: "Messages per day", value: "10M+" },
    { label: "Avg. latency", value: "< 200ms" },
    { label: "Uptime SLA", value: "99.9%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="rounded-2xl border bg-white p-4 shadow-sm text-center"
        >
          <div className="text-2xl font-bold text-emerald-600">{s.value}</div>
          <div className="text-sm text-slate-500">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
