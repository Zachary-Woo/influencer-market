"use client";

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const platforms = ["Instagram", "TikTok", "YouTube", "Pinterest", "LinkedIn"];

const niches = [
  "Beauty & Wellness",
  "Food & Beverage",
  "Travel",
  "SaaS & Tech",
  "Lifestyle",
  "Parenting",
  "Fashion",
  "Creators & Education",
];

const audienceSizes = ["Nano (1k - 10k)", "Micro (10k - 50k)", "Mid-tier (50k - 250k)", "Macro (250k - 1M)"];

const partnerLogos = ["SproutLab", "Nimbus SaaS", "Wildgrain", "Urban Trails", "BrightNest"];

const stats = [
  { value: "3.4x", label: "Avg. return vs paid social" },
  { value: "48 hrs", label: "Concierge matching turnaround" },
  { value: "12 hrs", label: "Average creator response time" },
  { value: "96%", label: "Brands who renew after pilot" },
  { value: "180+", label: "Verified creators onboard" },
];

type Influencer = {
  name: string;
  handle: string;
  avatar: string;
  platform: string;
  reach: string;
  location: string;
  rate: string;
  engagement: string;
  specialties: string[];
  highlights: string;
};

const influencers: Influencer[] = [
  {
    name: "Sasha Flores",
    handle: "@sashaflores",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    platform: "Instagram",
    reach: "42k followers",
    location: "Austin, TX",
    rate: "$450 / Reel",
    engagement: "6.8%",
    specialties: ["Clean beauty", "Latina audience", "UGC"],
    highlights: "Booked campaigns with Glossier, Honest Co., and Thrive Causemetics",
  },
  {
    name: "Jay Park",
    handle: "@jaywalks",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    platform: "TikTok",
    reach: "65k followers",
    location: "Seattle, WA",
    rate: "$600 / TikTok",
    engagement: "9.2%",
    specialties: ["Outdoor gear", "Travel hacks", "PNW audience"],
    highlights: "Generated 210k views for Patagonia’s spring micro-campaign",
  },
  {
    name: "Priya Nair",
    handle: "@codedwithpriya",
    avatar:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=80",
    platform: "YouTube",
    reach: "18k subscribers",
    location: "Remote",
    rate: "$950 / Integration",
    engagement: "8.4%",
    specialties: ["SaaS reviews", "Female founder stories", "Email marketing"],
    highlights: "Recurring partner for Notion, MailerLite, and Webflow",
  },
  {
    name: "Noah Bennett",
    handle: "@shotbybennett",
    avatar:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
    platform: "Photographer",
    reach: "32 booked shoots / month",
    location: "New York, NY",
    rate: "$750 / Half-day",
    engagement: "3-day turnaround",
    specialties: ["Product lifestyle", "Cafés & hospitality", "35mm film look"],
    highlights: "Preferred photographer for Milk Bar and Chamberlain Coffee",
  },
];

export default function Home() {
  return (
    <div className="gradient-surface">
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-16 sm:px-10 lg:px-0">
        <div className="absolute inset-x-0 top-12 flex justify-center opacity-60">
          <div className="flex w-full max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs font-medium uppercase tracking-[0.3em] text-foreground/50 sm:text-sm">
            {partnerLogos.map((logo) => (
              <span key={logo}>{logo}</span>
            ))}
          </div>
        </div>
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 pt-12 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <Badge className="rounded-full bg-primary/10 text-primary">
              Beta access now open
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Match with micro influencers who speak to your exact audience.
            </h1>
            <p className="max-w-xl text-lg text-foreground/75">
              MicroMatch lets modern brands discover vetted creators, photographers,
              and storytellers without the agency overhead. Filter by platform,
              niche, audience size, budget, and location to build campaigns that convert.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg">Start your brief</Button>
              <Button variant="outline" size="lg">
                View success stories
              </Button>
              <div className="flex items-center gap-3 text-sm text-foreground/70">
        <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="Happy clients"
                  width={44}
                  height={44}
                  className="size-11 rounded-full border-2 border-background object-cover"
                />
                <div>
                  <p className="font-medium text-foreground/90">Trusted by 120+ growth teams</p>
                  <p className="text-xs text-foreground/60">Avg. 3.4x higher ROI vs. paid social</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm"
                >
                  <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wide text-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="flex-1">
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/85 p-8 shadow-xl backdrop-blur">
              <div className="absolute inset-x-8 -top-12 h-28 rounded-full bg-primary/20 blur-3xl" aria-hidden />
              <div className="relative z-10 space-y-6">
                <div className="grid gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-foreground/50">Smart brief builder</span>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Specify what you need. We surface the right creators instantly.
                  </h3>
                </div>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-foreground/80">Platform</label>
                    <Select defaultValue="Instagram">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Social</SelectLabel>
                          {platforms.map((platform) => (
                            <SelectItem key={platform} value={platform}>
                              {platform}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-foreground/80">Niche</label>
                    <Select defaultValue="Beauty & Wellness">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select niche" />
                      </SelectTrigger>
                      <SelectContent position="popper" align="start">
                        <SelectGroup>
                          <SelectLabel>Popular niches</SelectLabel>
                          {niches.map((niche) => (
                            <SelectItem key={niche} value={niche}>
                              {niche}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-foreground/80">Audience size</label>
                    <Select defaultValue="Micro (10k - 50k)">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select audience size" />
                      </SelectTrigger>
                      <SelectContent position="popper" align="start">
                        <SelectGroup>
                          <SelectLabel>Creator tiers</SelectLabel>
                          {audienceSizes.map((audience) => (
                            <SelectItem key={audience} value={audience}>
                              {audience}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-foreground/80">Budget per deliverable</label>
                    <Select defaultValue="$500 - $1,000">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent position="popper" align="start">
                        <SelectGroup>
                          <SelectLabel>Typical ranges</SelectLabel>
                          {["<$250", "$250 - $500", "$500 - $1,000", "$1,000 - $3,000", "$3,000+"]
                            .map((budget) => (
                              <SelectItem key={budget} value={budget}>
                                {budget}
                              </SelectItem>
                            ))}
                          <SelectSeparator />
                          <SelectLabel>Enterprise</SelectLabel>
                          <SelectItem value="Custom retainers">
                            Custom retainers
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="button" className="mt-2 w-full" size="lg">
                    Discover matches
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    On-demand concierge matching in under 48 hours.
                  </p>
                </form>
                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/80 p-4">
                  <div className="relative size-10 overflow-hidden rounded-full border border-border/50">
            <Image
                      src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=160&q=80"
                      alt="Strategy team"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-sm text-foreground/70">
                    <p className="font-medium text-foreground/90">Concierge strategist</p>
                    <p>&quot;We curate a shortlist that fits your goals, then handle outreach for you.&quot;</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="categories" className="bg-background/95 px-6 py-16 sm:px-10">
        <div className="mx-auto w-full max-w-6xl space-y-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Curated creators for every stage of your funnel
              </h2>
              <p className="max-w-2xl text-base text-foreground/70">
                Explore talent by platform, specialization, and creative format. Each profile is screened for brand
                alignment, creative quality, and authentic engagement.
              </p>
            </div>
            <Link href="#" className="text-sm font-medium text-primary transition hover:text-primary/80">
              Download full roster
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {influencers.map((influencer) => (
              <Card key={influencer.handle} className="group relative overflow-hidden border-border/60">
                <div className="absolute inset-x-0 top-0 z-0 h-24 bg-gradient-to-b from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardHeader className="relative z-10 grid grid-cols-[auto_1fr] gap-4">
                  <div className="relative size-16 overflow-hidden rounded-xl border border-border/70">
          <Image
                      src={influencer.avatar}
                      alt={influencer.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {influencer.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-sm">
                      <span>{influencer.handle}</span>
                      <span className="text-foreground/30">•</span>
                      <span>{influencer.location}</span>
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge variant="outline" className="border-transparent bg-primary/10 text-xs text-primary">
                        {influencer.platform}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {influencer.reach}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4">
                  <p className="text-sm text-foreground/75">{influencer.highlights}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg border border-border/60 bg-muted/40 p-3">
                      <span className="text-xs uppercase text-foreground/50">Engagement</span>
                      <p className="mt-1 text-lg font-semibold text-foreground">{influencer.engagement}</p>
                    </div>
                    <div className="rounded-lg border border-border/60 bg-muted/40 p-3">
                      <span className="text-xs uppercase text-foreground/50">Rate</span>
                      <p className="mt-1 text-lg font-semibold text-foreground">{influencer.rate}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {influencer.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant="outline"
                        className="rounded-full border-border/60 bg-background/90 px-3 py-1 text-[11px] font-medium text-foreground/70"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="relative z-10 flex items-center justify-between border-t border-border/60 pt-6">
                  <div className="text-xs text-foreground/60">
                    <p className="font-medium text-foreground/80">Quick booking available</p>
                    <p>Average response time 12 hours</p>
                  </div>
                  <Button size="sm" className="shadow-sm">
                    View profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-gradient-to-br from-background via-background/90 to-primary/10 px-6 py-16 sm:px-10">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="space-y-6">
            <Badge variant="outline" className="rounded-full border-primary/40 text-primary">
              Plans for every growth stage
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Start with our curated marketplace or upgrade for concierge partnerships.
            </h2>
            <p className="text-base text-foreground/70">
              Every plan includes brief templates, contracts, performance dashboards, and concierge talent sourcing when
              you need extra hands.
            </p>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="mt-1 size-2.5 rounded-full bg-primary" />
                Unlimited access to vetted micro influencers and creative partners.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-2.5 rounded-full bg-primary" />
                AI-powered shortlisting based on past campaign performance and audience signals.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 size-2.5 rounded-full bg-primary" />
                Collaborative workrooms with deliverable timelines, approvals, and content library.
              </li>
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-border/70 bg-background/95">
              <CardHeader>
                <CardTitle className="text-xl">Marketplace</CardTitle>
                <CardDescription>Perfect for indie brands launching new activations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-4xl font-semibold">
                  $149<span className="text-base font-normal text-foreground/50">/mo</span>
                </p>
                <ul className="space-y-3 text-sm text-foreground/70">
                  <li>30 shortlist exports / month</li>
                  <li>Creator CRM with performance notes</li>
                  <li>Campaign templates & usage rights tracking</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Start free trial
                </Button>
              </CardFooter>
            </Card>
            <Card className="border-primary/40 bg-primary/10">
              <CardHeader>
                <CardTitle className="text-xl">Concierge</CardTitle>
                <CardDescription>Hands-on support for teams scaling creator programs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-4xl font-semibold">
                  $649<span className="text-base font-normal text-foreground/60">/mo</span>
                </p>
                <ul className="space-y-3 text-sm text-foreground/75">
                  <li>Dedicated talent strategist & campaign manager</li>
                  <li>Custom influencer sourcing within 48 hours</li>
                  <li>Quarterly performance deep dives & benchmarking</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Book a strategy call</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-background px-6 py-16 sm:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          <div className="max-w-xl space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              What brands ask us before partnering
            </h2>
            <p className="text-base text-foreground/70">
              No lengthy sales calls. Get matched, briefed, and producing content in days.
            </p>
            <Button variant="ghost" className="px-0" asChild>
              <Link href="mailto:hello@micromatch.co">Still have questions? Email our team →</Link>
            </Button>
          </div>
          <div className="flex-1 space-y-6">
            <Card className="border-border/60">
              <CardHeader className="gap-3">
                <CardTitle className="text-lg">How quickly can we launch a campaign?</CardTitle>
                <CardDescription>
                  Most briefs are matched with 5-7 recommended creators within 48 hours. Once selects are approved,
                  we deliver negotiated scopes and shared workrooms the same day.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/60">
              <CardHeader className="gap-3">
                <CardTitle className="text-lg">Do you verify creators and their engagement?</CardTitle>
                <CardDescription>
                  Every profile on MicroMatch is manually reviewed for audience authenticity, brand fit, and production
                  quality. We refresh metrics every 14 days using direct platform APIs and third-party verification.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/60">
              <CardHeader className="gap-3">
                <CardTitle className="text-lg">Can you support regional or multilingual campaigns?</CardTitle>
                <CardDescription>
                  Yes. Filter by location, language, and cultural audience. Our concierge team curates bilingual
                  creators and supports local compliance from NDAs to usage rights.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/60">
              <CardHeader className="gap-3">
                <CardTitle className="text-lg">How does pricing work for mixed deliverables?</CardTitle>
                <CardDescription>
                  Use our rate benchmarking to bundle TikToks, Reels, UGC, and stills into one scope. Track content
                  rights and renewals inside the platform with friendly reminders.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
