"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type MatchRecommendation = {
  name: string;
  handle: string;
  platform: string;
  reach: string;
  engagement: string;
  location: string;
  whyItWorks: string;
  deliverables: string;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  author: string;
  timestamp: string;
  content: string;
  matches?: MatchRecommendation[];
};

type TourStep = {
  messageId: string;
  title: string;
  description: string;
};

type ActiveTour = TourStepWithPosition & { key: number };

const conversation: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    author: "You",
    timestamp: "10:12 AM",
    content: "@Connexa Help me find verified local influencers to promote my new steakhouse in Orlando. Looking for authentic engagement and real ROI.",
  },
  {
    id: "m2",
    role: "assistant",
    author: "Connexa",
    timestamp: "10:12 AM",
    content:
      "I use agent based deep learning to match you with influencers who naturally fit your message and audience. I'll focus on verified local creators with authentic engagement to reduce fraud risk and maximize ROI.",
  },
  {
    id: "m3",
    role: "user",
    author: "You",
    timestamp: "10:13 AM",
    content:
      "Perfect. We want to reach local foodies who actually make reservations. Mid priced dining, chef driven stories. Budget around $500 per creator.",
  },
  {
    id: "m4",
    role: "assistant",
    author: "Connexa",
    timestamp: "10:14 AM",
    content:
      "Here are verified micro influencers with authentic local reach. Each has fraud detection screening, audience alignment with your brand, and proven ROI from similar campaigns.",
    matches: [
      {
        name: "Maya Ortiz",
        handle: "@tasteoforlando",
        platform: "Instagram",
        reach: "34k followers",
        engagement: "7.6%",
        location: "Winter Park, FL",
        whyItWorks:
          "Verified authentic audience of local foodies within 10 miles. Weekly Chef's Counter series drives strong reservation CTAs with documented conversion.",
        deliverables: "1 Reel + 3 stories with reservations link | $425",
      },
      {
        name: "Chris Devine",
        handle: "@thedevinedish",
        platform: "TikTok",
        reach: "52k followers",
        engagement: "8.9%",
        location: "Orlando, FL",
        whyItWorks:
          "AI verified engagement from 25 to 44 professionals. Past steakhouse campaigns show 63% audience books weekday dinners within 2 weeks.",
        deliverables: "1 TikTok + raw clips for ads | $540",
      },
      {
        name: "Avery Lin",
        handle: "@localplates",
        platform: "YouTube Shorts",
        reach: "18k subscribers",
        engagement: "9.1%",
        location: "Orlando, FL",
        whyItWorks:
          "Narrative driven chef interviews with tracked Google Maps conversion. Viewers save for business dinners with measurable attribution.",
        deliverables: "1 Short + newsletter placement | $490",
      },
    ],
  },
  {
    id: "m5",
    role: "user",
    author: "You",
    timestamp: "10:15 AM",
    content: "This is exactly what I need. Can you alert me when new verified Orlando food creators join?",
  },
  {
    id: "m6",
    role: "assistant",
    author: "Connexa",
    timestamp: "10:15 AM",
    content:
      "Done. I continuously monitor your campaign performance and influencer acquisition. You'll get alerts when verified creators match your audience profile or when performance signals spike.",
  },
];

type TourStepWithPosition = TourStep & { position: "left" | "right" };

const tourSteps: TourStepWithPosition[] = [
  {
    messageId: "m2",
    title: "AI fraud detection & matching",
    description: "Agent based deep learning matches brands with verified influencers to reduce fraud risk and misalignment.",
    position: "left",
  },
  {
    messageId: "m4",
    title: "Verified local reach & ROI",
    description: "Every creator is screened for authentic audiences with measurable conversion potential.",
    position: "right",
  },
  {
    messageId: "m6",
    title: "AI powered concierge service",
    description: "Continuous influencer acquisition and retention with automated performance monitoring.",
    position: "right",
  },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const renderWithMentions = (text: string) => {
  const parts = text.split(/(@Connexa)/gi);
  return parts.map((part, index) =>
    part.toLowerCase() === "@connexa" ? (
      <span key={`mention-${index}`} className="font-bold text-[#6b7aeb]">
        {part}
      </span>
    ) : (
      <span key={`text-${index}`}>{part}</span>
    )
  );
};

export default function Home() {
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);
  const [typingState, setTypingState] = useState<{ message: ChatMessage; content: string } | null>(null);
  const [visibleMatches, setVisibleMatches] = useState<string[]>([]);
  const [activeTour, setActiveTour] = useState<ActiveTour | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const tourCounter = useRef(0);

  const tourLookup = useMemo(() => new Map(tourSteps.map((step) => [step.messageId, step])), []);
  const visibleMatchesSet = useMemo(() => new Set(visibleMatches), [visibleMatches]);

  useEffect(() => {
    const node = scrollContainerRef.current;
    if (!node) {
      return;
    }
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [displayedMessages, typingState]);

  useEffect(() => {
    if (!activeTour) {
      return;
    }
    const timeout: ReturnType<typeof setTimeout> = setTimeout(() => setActiveTour(null), 5000);
    return () => clearTimeout(timeout);
  }, [activeTour]);

  useEffect(() => {
    let cancelled = false;

    const playConversation = async () => {
      while (!cancelled) {
        setDisplayedMessages([]);
        setVisibleMatches([]);
        setTypingState(null);
        setActiveTour(null);
        tourCounter.current = 0;

        for (let i = 0; i < conversation.length; i++) {
          const message = conversation[i];
          const isLastMessage = i === conversation.length - 1;

          if (cancelled) {
            return;
          }

          if (message.role === "assistant") {
            setTypingState({ message, content: "" });

            let partial = "";
            for (let j = 0; j < message.content.length; j += 1) {
              if (cancelled) {
                return;
              }
              partial += message.content[j];
              setTypingState({ message, content: partial });

              const char = message.content[j];
              const punctuationDelay = char === "." || char === "!" || char === "?" ? 120 : char === "," ? 70 : 0;
              await wait(22 + punctuationDelay);
              if (cancelled) {
                return;
              }
            }

            await wait(120);
            if (cancelled) {
              return;
            }

            setDisplayedMessages((prev) => [...prev, message]);
            setTypingState(null);

            if (message.matches) {
              await wait(200);
              if (cancelled) {
                return;
              }
              setVisibleMatches((prev) => (prev.includes(message.id) ? prev : [...prev, message.id]));
              
              setTimeout(() => {
                const node = scrollContainerRef.current;
                if (node) {
                  node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
                }
              }, 50);
              
              await wait(220);
              if (cancelled) {
                return;
              }
            }
          } else {
            setDisplayedMessages((prev) => [...prev, message]);
          }

          const tour = tourLookup.get(message.id);
          if (tour) {
            tourCounter.current += 1;
            setActiveTour({ ...tour, key: tourCounter.current });
          }

          const pause = message.role === "assistant" ? (message.matches ? 2300 : 1700) : 900;
          const finalPause = isLastMessage ? pause + 2500 : pause;
          await wait(finalPause);
          if (cancelled) {
            return;
          }
        }

        await wait(3200);
        if (cancelled) {
          return;
        }
      }
    };

    playConversation();

    return () => {
      cancelled = true;
    };
  }, [tourLookup]);

  return (
    <div className="min-h-screen bg-white text-[#0c0e10]">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-4 py-10 sm:px-8">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/connexa_logo.png" alt="Connexa" width={176} height={52} priority />
            <Badge className="rounded-full bg-[#e2e4f3] text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#474b63]">
              ChatGPT mock demo
            </Badge>
          </div>
          <p className="max-w-sm text-sm text-[#636a82]">
            Watch Connexa pair brands with micro influencers - this loop mirrors how the ChatGPT app listing will feel.
          </p>
        </header>

        <section className="relative flex flex-col overflow-hidden rounded-[2.5rem] border border-[#dfe2f0] bg-white shadow-[0_30px_90px_-40px_rgba(16,22,34,0.55)]" style={{ height: "calc(100vh - 180px)", minHeight: "500px" }}>
          <div className="flex shrink-0 items-center justify-between border-b border-[#ebecf2] px-6 py-4">
            <div className="space-y-1">
              <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[#82869a]">ChatGPT App Mock</p>
              <h1 className="text-xl font-semibold text-[#121625]">Connexa Micro Match</h1>
            </div>
            <Badge className="rounded-full border border-[#d3d6e6] bg-[#f4f5fb] text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#454a62]">
              Powered by Connexa
            </Badge>
          </div>

          <div className="relative flex-1 overflow-hidden bg-[#f3f4f8]">
            <div ref={scrollContainerRef} className="h-full overflow-y-scroll px-4 py-8 sm:px-6 sm:py-10">
              <div className="mx-auto flex w-full flex-col gap-6">
                {displayedMessages.map((message) => {
                  const isUser = message.role === "user";
                  const showMatches = Boolean(message.matches && visibleMatchesSet.has(message.id));

                  return (
                    <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-full space-y-2 sm:max-w-[540px] ${isUser ? "text-right" : "text-left"}`}>
                        <div className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#7a7f92]">
                          <span>{message.author}</span>
                          <span className="ml-2 font-normal tracking-normal text-[#a0a4b6]">{message.timestamp}</span>
                        </div>
                        <div
                          className={`rounded-[1.75rem] px-5 py-4 text-[0.95rem] leading-relaxed shadow-sm ${
                            isUser
                              ? "bg-[#0c0e10] text-white"
                              : "border border-[#e1e2ec] bg-white text-[#1c2030]"
                          }`}
                        >
                          <p className="whitespace-pre-line">{renderWithMentions(message.content)}</p>
                          {showMatches && message.matches && (
                            <div className="mt-4 space-y-3">
                              {message.matches.map((match) => (
                                <div
                                  key={match.handle}
                                  className="rounded-2xl border border-[#d6d9e7] bg-[#fafbff] px-4 py-3 text-left text-sm text-[#252a3b]"
                                >
                                  <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                      <p className="text-base font-semibold text-[#1a1e2e]">{match.name}</p>
                                      <p className="text-xs uppercase tracking-[0.2em] text-[#7c8095]">
                                        {match.platform} | {match.location}
                                      </p>
                                    </div>
                                    <Badge className="rounded-full border border-[#ccd0e3] bg-white text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#474b63]">
                                      {match.reach}
                                    </Badge>
                                  </div>
                                  <div className="mt-3 grid gap-2 text-xs text-[#4a5065]">
                                    <p>
                                      <span className="font-semibold text-[#272c3e]">Why it works:</span> {match.whyItWorks}
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                      <Badge className="rounded-full bg-[#0c0e10] px-3 py-1 text-[0.7rem] font-medium text-white">
                                        Engagement {match.engagement}
                                      </Badge>
                                      <Badge
                                        variant="outline"
                                        className="rounded-full border-[#cbd0e7] bg-white px-3 py-1 text-[0.7rem] font-medium text-[#3f455d]"
                                      >
                                        {match.deliverables}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {typingState && (
                  <div className="flex justify-start">
                    <div className="max-w-full space-y-2 sm:max-w-[540px]">
                      <div className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#7a7f92]">
                        <span>{typingState.message.author}</span>
                        <span className="ml-2 font-normal tracking-normal text-[#a0a4b6]">
                          {typingState.message.timestamp}
                        </span>
                      </div>
                      <div className="rounded-[1.75rem] border border-[#e1e2ec] bg-white px-5 py-4 text-[0.95rem] leading-relaxed text-[#1c2030] shadow-sm">
                        <p className="whitespace-pre-line">
                          {renderWithMentions(typingState.content)}
                          <span className="ml-1 align-baseline text-[#c1c4d3]">|</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {activeTour && (
              <div className={`pointer-events-none absolute top-6 hidden max-w-xs sm:block ${activeTour.position === "left" ? "left-4 md:left-8" : "right-4 md:right-8"}`}>
                <div className="rounded-2xl border border-[#d7d9e6] bg-white p-4 shadow-lg transition-all duration-500">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#7a7f92]">Guided moment</p>
                  <h3 className="mt-2 text-base font-semibold text-[#121625]">{activeTour.title}</h3>
                  <p className="mt-1 text-sm text-[#575c70]">{activeTour.description}</p>
                </div>
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-[#ebecf2] bg-white px-4 py-5 sm:px-6">
            <div className="flex items-center gap-3 rounded-[1.75rem] border border-[#d9dce7] bg-[#f8f9ff] px-4 py-3 text-sm text-[#7a8096]">
              <span className="font-medium text-[#4e5370]">@Connexa</span>
              <span className="hidden text-[#b1b5c6] sm:block">Describe your campaign goals while the demo loops in the background...</span>
              <Button
                size="icon"
                className="ml-auto hidden rounded-full bg-[#0c0e10] text-white hover:bg-[#1c202c] sm:flex"
              >
                <span className="sr-only">Send message</span>
                ↑
              </Button>
            </div>
            <p className="mt-3 text-[0.7rem] uppercase tracking-[0.3em] text-[#a6a9b9]">
              Looping demo - apps expected to open publicly in about 6 months.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

