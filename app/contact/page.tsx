import React, { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setStatus("Thank you for reaching out! I'll get back to you soon.");
        form.reset();
      } else {
        setStatus("Sorry, there was an error. Please try again later.");
      }
    } catch {
      setStatus("Sorry, there was an error. Please try again later.");
    }
  }

  return (
    <main style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <h1>Contact Me</h1>
      <p>
        Interested in custom software development? Fill out the form below or email me at {" "}
        <a href="mailto:your@email.com">your@email.com</a>.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Message:
          <textarea name="message" rows={5} required />
        </label>
        <button type="submit">Send</button>
      </form>
      {status && <p>{status}</p>}
    </main>
  );
} 