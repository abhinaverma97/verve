"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const BACKEND_URL = "http://localhost:8000";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [timelineData, setTimelineData] = useState(null);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [loadingTimeline, setLoadingTimeline] = useState(false);
  const [error, setError] = useState(null);

  // Simulation Form State
  const [simChannel, setSimChannel] = useState("Form");
  const [simName, setSimName] = useState("John Doe");
  const [simIdentifier, setSimIdentifier] = useState("john.doe@example.com");
  const [simMessage, setSimMessage] = useState("Hey, my AC is making a loud noise and blowing warm air. Need help ASAP.");
  const [simulating, setSimulating] = useState(false);
  const [simResponse, setSimResponse] = useState(null);
  const [resetting, setResetting] = useState(false);

  // Load leads on mount
  useEffect(() => {
    fetchLeads();
  }, []);

  // Fetch timeline whenever selected lead changes
  useEffect(() => {
    if (selectedLeadId) {
      fetchTimeline(selectedLeadId);
    } else {
      setTimelineData(null);
    }
  }, [selectedLeadId]);

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/dashboard/leads`);
      if (!res.ok) throw new Error("Failed to fetch leads");
      const data = await res.json();
      setLeads(data);
      if (data.length > 0 && !selectedLeadId) {
        setSelectedLeadId(data[0].customer_id);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to backend server on port 8000. Is the backend running?");
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchTimeline = async (leadId) => {
    setLoadingTimeline(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/dashboard/timeline/${leadId}`);
      if (!res.ok) throw new Error("Failed to fetch timeline");
      const data = await res.json();
      setTimelineData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load timeline details.");
    } finally {
      setLoadingTimeline(false);
    }
  };

  const handleSimulate = async (e) => {
    e.preventDefault();
    if (!simIdentifier || !simMessage) return;

    setSimulating(true);
    setSimResponse(null);

    try {
      const res = await fetch(`${BACKEND_URL}/api/dashboard/simulate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: simChannel,
          identifier: simIdentifier,
          message: simMessage,
          name: simChannel === "Form" ? simName : "",
        }),
      });

      if (!res.ok) throw new Error("Simulation failed");
      const data = await res.json();
      setSimResponse(data);
      
      // Refresh leads list
      await fetchLeads();
      
      // Select the lead that was simulated
      if (data.customer_id) {
        setSelectedLeadId(data.customer_id);
        await fetchTimeline(data.customer_id);
      }
    } catch (err) {
      console.error(err);
      alert("Simulation error: " + err.message);
    } finally {
      setSimulating(false);
    }
  };

  const handleReset = async () => {
    if (!confirm("Reset all demo data? This will clear every lead, timeline, and prediction from the database.")) return;
    setResetting(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/dashboard/reset`, { method: "DELETE" });
      if (!res.ok) throw new Error("Reset failed");
      // Clear all local state
      setLeads([]);
      setSelectedLeadId(null);
      setTimelineData(null);
      setSimResponse(null);
      setError(null);
    } catch (err) {
      console.error(err);
      alert("Reset error: " + err.message);
    } finally {
      setResetting(false);
    }
  };

  // Quick preset loader for simulation panel
  const applyPreset = (channel) => {
    setSimChannel(channel);
    if (channel === "Form") {
      setSimName("Alice Vance");
      setSimIdentifier("alice.vance@gmail.com");
      setSimMessage("My AC unit stopped working entirely. Need emergency repair tonight.");
    } else if (channel === "Email") {
      setSimIdentifier("alice.vance@gmail.com");
      setSimMessage("Checking back, when can the technician arrive?");
    } else if (channel === "SMS") {
      setSimIdentifier("+15550199");
      setSimMessage("I am available at 3 PM tomorrow. Can you book that?");
    } else if (channel === "WhatsApp") {
      setSimIdentifier("whatsapp:+15550199");
      setSimMessage("Is there a WhatsApp number I can share photos to? Here is one detail: it is a Carrier model.");
    } else if (channel === "Voice") {
      setSimIdentifier("+15550199");
      setSimMessage("Yes I am ready to confirm the service cost of 150 dollars.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)] flex flex-col font-sans selection:bg-[var(--color-accent)] selection:text-[#0b0b0f]">
      {/* Header */}
      <header className="border-b border-[var(--color-line)] bg-[var(--color-bg-soft)] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display font-bold text-xl tracking-tight text-[var(--color-accent)] hover:opacity-85">
            VERVE
          </Link>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--color-line)] text-[var(--color-muted)] uppercase tracking-wider">
            Journey Intelligence Dashboard
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchLeads} 
            className="btn-line rounded-full px-4 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12" />
            </svg>
            Refresh
          </button>
          <button
            onClick={handleReset}
            disabled={resetting}
            className="rounded-full px-4 py-1.5 text-xs font-semibold border border-red-800 text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {resetting ? "Clearing..." : "Reset Demo"}
          </button>
          <Link href="/" className="btn-accent rounded-full px-4 py-1.5 text-xs text-center font-semibold">
            Back to Home
          </Link>
        </div>
      </header>

      {error && (
        <div className="bg-red-950/40 border-y border-red-800 text-red-200 px-6 py-3 text-sm flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-100">✕</button>
        </div>
      )}

      {/* Main Grid */}
      <div className="flex-1 grid lg:grid-cols-12 overflow-hidden">
        {/* Left Panel: Leads list (3 cols) */}
        <aside className="lg:col-span-3 border-r border-[var(--color-line)] bg-[var(--color-bg-soft)] overflow-y-auto p-4 flex flex-col gap-4">
          <h2 className="font-display text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider px-2">
            Active Journey Timelines ({leads.length})
          </h2>
          
          {loadingLeads ? (
            <div className="flex-1 flex items-center justify-center py-12 text-sm text-[var(--color-faint)]">
              Loading active profiles...
            </div>
          ) : leads.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-center px-4">
              <p className="text-sm text-[var(--color-faint)] mb-4">No leads found in database.</p>
              <button onClick={() => applyPreset("Form")} className="btn-accent text-xs rounded-full px-4 py-2">
                Load Demo Lead
              </button>
            </div>
          ) : (
            <div className="space-y-2 flex-1">
              {leads.map((l) => {
                const isSelected = l.customer_id === selectedLeadId;
                const urgency = l.latest_prediction?.urgency_score || 0;
                
                return (
                  <button
                    key={l.customer_id}
                    onClick={() => setSelectedLeadId(l.customer_id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-[var(--color-accent)] bg-[var(--color-surface)] text-[var(--color-ink)]"
                        : "border-[var(--color-line)] hover:border-[var(--color-muted)] hover:bg-[var(--color-surface)]/40 text-[var(--color-muted)]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-display font-medium text-sm text-[var(--color-ink)] truncate">{l.name}</span>
                      {urgency > 0.6 && (
                        <span className="h-2 w-2 rounded-full bg-[var(--color-warm)] animate-pulse" title="High Urgency" />
                      )}
                    </div>
                    <div className="text-xs text-[var(--color-faint)] truncate mt-0.5">
                      {l.email || l.phone}
                    </div>
                    
                    {l.latest_prediction && (
                      <div className="flex items-center gap-3 mt-3 pt-2 border-t border-[var(--color-line-soft)] text-[10px] uppercase tracking-wider text-[var(--color-faint)]">
                        <div>Conv: <span className="text-[var(--color-accent)] font-semibold">{(l.latest_prediction.conversion_score * 100).toFixed(0)}%</span></div>
                        <div>Urgency: <span className={urgency > 0.6 ? "text-[var(--color-warm)] font-semibold" : "text-[var(--color-muted)]"}>{(urgency * 100).toFixed(0)}%</span></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </aside>

        {/* Center Panel: Timeline & Intelligence (6 cols) */}
        <section className="lg:col-span-6 overflow-y-auto p-6 flex flex-col gap-6">
          {selectedLeadId && timelineData ? (
            <>
              {/* Profile Bar */}
              <div className="panel p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[var(--color-surface)]">
                <div>
                  <h1 className="font-display text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                    {timelineData.customer.name}
                  </h1>
                  <p className="text-xs text-[var(--color-muted)] mt-1 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Email: <strong className="text-[var(--color-ink)]">{timelineData.customer.email || "N/A"}</strong></span>
                    <span>Phone: <strong className="text-[var(--color-ink)]">{timelineData.customer.phone || "N/A"}</strong></span>
                  </p>
                </div>
                <div className="flex gap-4 border-l border-[var(--color-line)] pl-4">
                  <div>
                    <div className="text-[10px] text-[var(--color-faint)] uppercase tracking-wider">Conversion Prob</div>
                    <div className="font-display font-bold text-xl text-[var(--color-accent)]">
                      {((timelineData.timeline.filter(t => t.type === "prediction").pop()?.conversion_score || 0) * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[var(--color-faint)] uppercase tracking-wider">Urgency</div>
                    <div className={`font-display font-bold text-xl ${
                      (timelineData.timeline.filter(t => t.type === "prediction").pop()?.urgency_score || 0) > 0.6 
                        ? "text-[var(--color-warm)]" 
                        : "text-[var(--color-muted)]"
                    }`}>
                      {((timelineData.timeline.filter(t => t.type === "prediction").pop()?.urgency_score || 0) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Decision Log Block */}
              {timelineData.timeline.filter(t => t.type === "decision").length > 0 && (
                <div className="panel border-[var(--color-warm)] bg-[var(--color-warm)]/5 p-5 rounded-2xl relative overflow-hidden">
                  <div className="absolute right-0 top-0 text-[10px] font-bold tracking-wider text-[var(--color-warm)] bg-[var(--color-warm)]/15 px-3 py-1 rounded-bl-xl uppercase font-display">
                    Intelligence Verdict
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="p-2.5 rounded-xl bg-[var(--color-warm)]/10 text-[var(--color-warm)] mt-1">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[var(--color-faint)] font-semibold">Recommended Next Action</div>
                      <h3 className="font-display text-lg font-bold text-[var(--color-ink)] mt-0.5">
                        {timelineData.timeline.filter(t => t.type === "decision").pop().next_action}
                      </h3>
                      <p className="text-xs text-[var(--color-muted)] mt-1.5 italic leading-relaxed">
                        "{timelineData.timeline.filter(t => t.type === "decision").pop().reason}"
                      </p>
                      <div className="flex items-center gap-2 mt-3 text-[10px] text-[var(--color-faint)] font-mono">
                        <span>Best Channel: {timelineData.timeline.filter(t => t.type === "decision").pop().selected_channel}</span>
                        <span>•</span>
                        <span>Updated: {new Date(timelineData.timeline.filter(t => t.type === "decision").pop().timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Timeline */}
              <div className="flex flex-col gap-4">
                <h2 className="font-display text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider px-1">
                  Unified Memory Timeline
                </h2>
                
                <div className="relative border-l border-[var(--color-line)] ml-4 pl-6 space-y-8 py-2">
                  {timelineData.timeline.map((item, idx) => {
                    const timeStr = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    
                    if (item.type === "message") {
                      const isUser = item.direction === "inbound";
                      const channel = item.channel;
                      
                      return (
                        <div key={idx} className="relative">
                          {/* Circle marker on line */}
                          <div className={`absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 bg-[var(--color-bg)] flex items-center justify-center ${
                            isUser ? "border-[var(--color-accent)]" : "border-purple-400"
                          }`}>
                            <div className={`h-1.5 w-1.5 rounded-full ${isUser ? "bg-[var(--color-accent)]" : "bg-purple-400"}`} />
                          </div>
                          
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="text-[10px] font-mono text-[var(--color-faint)]">{timeStr}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase font-semibold ${
                              channel === "WhatsApp" ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800" :
                              channel === "Email" ? "bg-blue-950/60 text-blue-400 border border-blue-800" :
                              channel === "SMS" ? "bg-violet-950/60 text-violet-400 border border-violet-800" :
                              channel === "Voice" ? "bg-amber-950/60 text-amber-400 border border-amber-800" :
                              "bg-gray-950/60 text-gray-400 border border-gray-800"
                            }`}>
                              {channel}
                            </span>
                          </div>
                          
                          <div className={`mt-2 p-4 rounded-2xl border ${
                            isUser 
                              ? "bg-[var(--color-surface)] border-[var(--color-line)]"
                              : "bg-[var(--color-bg-soft)] border-[var(--color-line-soft)] text-[var(--color-muted)]"
                          }`}>
                            <div className="text-[10px] text-[var(--color-faint)] font-display uppercase tracking-wider mb-1">
                              {isUser ? "Lead Sent" : "Verve AI Sent"}
                            </div>
                            <p className="text-sm leading-relaxed whitespace-pre-line text-[var(--color-ink)]">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      );
                    }
                    
                    if (item.type === "event") {
                      return (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[28px] top-1 h-2 w-2 rounded-full bg-[var(--color-faint)]" />
                          <div className="flex items-center gap-3 text-xs text-[var(--color-faint)]">
                            <span className="font-mono">{timeStr}</span>
                            <span className="font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                              ✦ EVENT: {item.event_type.replace("_", " ")}
                            </span>
                          </div>
                          {item.metadata && Object.keys(item.metadata).length > 0 && (
                            <div className="mt-1 text-[11px] text-[var(--color-faint)] bg-[var(--color-line-soft)]/50 p-2 rounded-lg font-mono truncate max-w-full">
                              {JSON.stringify(item.metadata)}
                            </div>
                          )}
                        </div>
                      );
                    }
                    
                    return null;
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-24 text-center">
              <svg className="w-16 h-16 text-[var(--color-faint)] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="font-display font-semibold text-lg text-[var(--color-muted)] mt-4">
                Select a lead to visualize timeline
              </h3>
              <p className="text-sm text-[var(--color-faint)] mt-2">
                Use the simulation panel on the right to inject a new user conversation.
              </p>
            </div>
          )}
        </section>

        {/* Right Panel: Simulation Dashboard (3 cols) */}
        <aside className="lg:col-span-3 border-l border-[var(--color-line)] bg-[var(--color-bg-soft)] p-6 overflow-y-auto flex flex-col gap-6">
          <div>
            <h2 className="font-display text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-2">
              Journey Simulator
            </h2>
            <p className="text-xs text-[var(--color-faint)]">
              Simulate events from any channel. Standard phone/email format creates a unified profile instantly.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-1.5">
            <div className="text-[10px] text-[var(--color-faint)] uppercase tracking-wider font-semibold">Test Presets</div>
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => applyPreset("Form")} className="btn-line rounded-lg px-2.5 py-1 text-[10px] cursor-pointer">Website Form</button>
              <button onClick={() => applyPreset("Email")} className="btn-line rounded-lg px-2.5 py-1 text-[10px] cursor-pointer">Email Reply</button>
              <button onClick={() => applyPreset("SMS")} className="btn-line rounded-lg px-2.5 py-1 text-[10px] cursor-pointer">SMS</button>
              <button onClick={() => applyPreset("WhatsApp")} className="btn-line rounded-lg px-2.5 py-1 text-[10px] cursor-pointer">WhatsApp</button>
              <button onClick={() => applyPreset("Voice")} className="btn-line rounded-lg px-2.5 py-1 text-[10px] cursor-pointer">Voice call</button>
            </div>
          </div>

          <form onSubmit={handleSimulate} className="flex flex-col gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-[var(--color-faint)] uppercase tracking-wider font-semibold">Inbound Channel</label>
              <select
                value={simChannel}
                onChange={(e) => setSimChannel(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
              >
                <option value="Form">Website Form Lead Intake</option>
                <option value="Email">Email Channel</option>
                <option value="SMS">SMS Channel</option>
                <option value="WhatsApp">WhatsApp Channel</option>
                <option value="Webchat">Webchat Widget</option>
                <option value="Voice">Voice Call Transcript</option>
              </select>
            </div>

            {simChannel === "Form" && (
              <div className="space-y-1">
                <label className="text-[10px] text-[var(--color-faint)] uppercase tracking-wider font-semibold">Lead Name</label>
                <input
                  type="text"
                  value={simName}
                  onChange={(e) => setSimName(e.target.value)}
                  placeholder="e.g. Alice Vance"
                  className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
                  required
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] text-[var(--color-faint)] uppercase tracking-wider font-semibold">
                {simChannel === "Form" || simChannel === "Email" ? "Email Address" : "Phone Number"}
              </label>
              <input
                type="text"
                value={simIdentifier}
                onChange={(e) => setSimIdentifier(e.target.value)}
                placeholder={simChannel === "Form" || simChannel === "Email" ? "name@email.com" : "+15550199"}
                className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[var(--color-faint)] uppercase tracking-wider font-semibold">Message Content</label>
              <textarea
                value={simMessage}
                onChange={(e) => setSimMessage(e.target.value)}
                rows={4}
                className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none resize-none leading-relaxed"
                required
              />
            </div>

            <button
              type="submit"
              disabled={simulating}
              className="btn-accent rounded-full py-2.5 text-xs font-semibold flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50"
            >
              {simulating ? (
                <>Simulating...</>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Inject Interaction
                </>
              )}
            </button>
          </form>

          {/* Simulation Output Card */}
          {simResponse && (
            <div className="panel bg-[var(--color-surface)] border-green-800 p-4 rounded-xl text-xs space-y-2 animate-float">
              <div className="font-bold text-green-400 font-display flex items-center gap-1.5 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Inject Success
              </div>
              <p className="text-[var(--color-muted)] leading-relaxed">{simResponse.detail}</p>
              {simResponse.reply && (
                <div className="border-t border-[var(--color-line)] pt-2 mt-2">
                  <div className="text-[10px] text-[var(--color-faint)] uppercase tracking-wider font-bold mb-1">AI Output Response:</div>
                  <p className="italic text-[var(--color-ink)] font-sans leading-normal">"{simResponse.reply}"</p>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
