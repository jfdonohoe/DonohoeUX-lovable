import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import SectionHeader from "@/components/site/SectionHeader";
import TwoColumnBlock from "@/components/site/TwoColumnBlock";
import ImageCarousel from "@/components/site/ImageCarousel";
import { BulletItem, BulletList } from "@/components/site/Bullets";
import caseHero from "@/assets/case_hero.jpg";

/**
 * Case Study Template — exhaustive layout showcasing every reusable module
 * found across the case study pages: hero image, executive summary with
 * stats-compact, section header, two-column blocks, bulleted content (1 + 2 col),
 * image carousel, full-width hero w/ caption, large impact stats, next-project link.
 */
const CaseStudyTemplate = () => {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="pt-32 pb-24">
        <div className="container-page">
          {/* Back link */}
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-text-subtle hover:text-accent-warm transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to Case Studies
          </Link>

          {/* HERO IMAGE */}
          <figure className="mt-6">
            <div className="hero-image-container aspect-[21/9]">
              <img
                src={caseHero}
                alt="Case study hero"
                className="w-full h-full object-cover"
              />
            </div>
          </figure>

          {/* EXECUTIVE SUMMARY */}
          <section className="max-w-4xl mt-16 mb-24">
            <p className="label mb-4">Executive Summary</p>
            <h1 className="mb-8">
              Turning Sales Conversations into Actionable AI Insights at Scale
            </h1>

            {/* Compact stats */}
            <div className="stats-compact mb-12">
              {[
                ["Company", "Salesforce"],
                ["Timeline", "10 months"],
                ["Platform", "Web-Based CRM"],
                ["My Role", "Creative Director"],
              ].map(([label, value]) => (
                <div key={label} className="min-w-[7.5rem]">
                  <p className="stat-label">{label}</p>
                  <p className="stat-value">{value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-accent">The Problem</h3>
                <p>
                  Salesforce lacked a scalable way to turn sales conversations
                  into actionable insight. Call recordings captured activity
                  but not understanding, leaving managers unable to consistently
                  coach, assess deal risk, or learn from customer interactions
                  at scale.
                </p>
              </div>
              <div>
                <h3 className="text-accent">My Role</h3>
                <p>
                  I led product design and experience strategy for Salesforce
                  Conversation Intelligence, guiding the team through the
                  ambiguity of defining a new AI-powered product category.
                </p>
              </div>
              <div>
                <h3 className="text-accent">Outcomes</h3>
                <p>
                  Within a year of launch, Conversation Intelligence became part
                  of Salesforce's core CRM offering, delivering up to 29%
                  productivity gains and a 2.5× increase in deal close
                  likelihood.
                </p>
              </div>
            </div>
          </section>

          <hr className="section-divider" />

          {/* SECTION 1 — Context and Challenge */}
          <section className="mb-12">
            <div className="max-w-4xl">
              <p className="label mb-4">Detailed Case Study</p>
              <SectionHeader number={1}>Context and Challenge</SectionHeader>

              <div className="space-y-6">
                <div>
                  <h3 className="text-accent">Why This Problem Mattered</h3>
                  <p>
                    Through direct conversations with customer executives,
                    Salesforce Sales Cloud leadership identified a consistent
                    gap: sales conversations contained critical signals about
                    deal health, coaching needs, and market dynamics, yet
                    remained largely inaccessible at scale.
                  </p>
                  <p>
                    As third-party tools like Gong and Chorus.ai gained
                    adoption, Salesforce needed a CRM-native solution to fully
                    connect conversation insights with account, opportunity,
                    and performance data.
                  </p>
                </div>
                <div>
                  <h3 className="text-accent">Constraints and Complexities</h3>
                  <p>
                    Conversation Intelligence was shaped by technical, legal,
                    organizational, and design constraints. Privacy and
                    disclosure requirements were foundational, and design work
                    balanced consistency with innovation.
                  </p>
                </div>
              </div>
            </div>

            {/* Two-column block (text left, image right) */}
            <div className="max-w-5xl">
              <TwoColumnBlock
                imageSide="right"
                aspect="video"
                image={
                  <div className="text-center p-6">
                    <p className="text-sm font-medium text-text-subtle">
                      Competitive Analysis
                    </p>
                    <p className="text-xs text-text-subtle/70 mt-1">
                      Image placeholder
                    </p>
                  </div>
                }
              >
                <h3 className="font-serif text-2xl text-text-display">
                  The Competitive Landscape
                </h3>
                <p>
                  New fintech entrants were capturing market share with modern,
                  frictionless experiences. User research revealed customers
                  were comparing us unfavorably to apps like Chime and Venmo.
                </p>
              </TwoColumnBlock>
            </div>

            {/* Bulleted, two-column */}
            <div className="max-w-4xl mt-12">
              <h3 className="text-accent">Constraints and Complexities</h3>
              <BulletList columns={2}>
                <BulletItem title="Legacy System Integration">
                  The existing backend architecture limited real-time data
                  capabilities, requiring creative solutions for status
                  updates and transaction feedback.
                </BulletItem>
                <BulletItem title="Regulatory Compliance">
                  Financial services regulations mandated specific disclosure
                  patterns and security flows that couldn't be compromised
                  for UX gains.
                </BulletItem>
                <BulletItem title="Diverse User Base">
                  Users ranged from digital-native millennials to seniors who
                  had used the legacy system for years — each with distinct
                  mental models.
                </BulletItem>
                <BulletItem title="Fixed Timeline">
                  A hard launch date tied to a marketing campaign meant no
                  flexibility in delivery schedule.
                </BulletItem>
              </BulletList>
            </div>

            {/* Hero image with caption */}
            <figure className="mt-12 max-w-5xl">
              <div className="hero-image-container aspect-video">
                <div className="text-center p-8">
                  <p className="text-sm font-medium text-text-subtle">
                    Problem Space Diagram
                  </p>
                  <p className="text-xs text-text-subtle/70 mt-1">
                    Featured image
                  </p>
                </div>
              </div>
              <figcaption className="text-center text-text-subtle text-sm italic mt-3">
                Mapping the problem space revealed interconnected challenges
                across technology, regulation, and user expectations.
              </figcaption>
            </figure>
          </section>

          <hr className="section-divider" />

          {/* SECTION 2 — Research and Insights */}
          <section className="mb-12">
            <div className="max-w-4xl">
              <SectionHeader number={2}>Research and Insights</SectionHeader>
              <div>
                <h3 className="text-accent">Research Methods</h3>
                <p>
                  I employed a mixed-methods approach to build a comprehensive
                  understanding of user needs and pain points.
                </p>
              </div>
            </div>

            {/* Two column — image left */}
            <div className="max-w-5xl">
              <TwoColumnBlock
                imageSide="left"
                aspect="square"
                image={
                  <div className="text-center p-6">
                    <p className="text-sm font-medium text-text-subtle">
                      User Interview Session
                    </p>
                    <p className="text-xs text-text-subtle/70 mt-1">
                      Image placeholder
                    </p>
                  </div>
                }
              >
                <h3 className="font-serif text-2xl text-text-display">
                  In-Depth User Research
                </h3>
                <p>
                  We conducted 24 in-depth interviews, 5 contextual inquiries
                  in users' homes, and diary studies with 15 participants over
                  two weeks.
                </p>
                <p>
                  This qualitative foundation was complemented by analytics
                  review and a survey of 500+ existing users to validate our
                  findings at scale.
                </p>
              </TwoColumnBlock>
            </div>

            {/* Carousel */}
            <div className="max-w-5xl mt-12">
              <h3 className="text-accent">Research Documentation</h3>
              <ImageCarousel
                slides={[
                  {
                    placeholder: "User Interview",
                    title: "User Interview",
                    caption:
                      "Conducting contextual interviews with banking customers in their homes.",
                  },
                  {
                    placeholder: "Synthesis",
                    title: "Synthesis",
                    caption:
                      "Team workshop clustering insights from 24 user interviews.",
                  },
                  {
                    placeholder: "Journey Map",
                    title: "Journey Map",
                    caption:
                      "Visualizing pain points across the end-to-end banking experience.",
                  },
                ]}
              />
            </div>

            {/* Single-column bullets */}
            <div className="max-w-4xl mt-12">
              <h3 className="text-accent">Design Principles</h3>
              <p>
                Research across our stakeholders, pilot customers, and the
                marketplace led us to a starting set of design principles.
              </p>
              <BulletList>
                <BulletItem title="Trust Before Automation">
                  Surface signals and context, not opaque conclusions.
                </BulletItem>
                <BulletItem title="CRM-Native by Default">
                  Anchor insights directly to accounts, opportunities, and
                  workflows.
                </BulletItem>
                <BulletItem title="Patterns Over Prescriptions">
                  Highlight trends and behaviors without enforcing scripts.
                </BulletItem>
                <BulletItem title="Adaptive, Not Static">
                  Allow language models to learn organization-specific
                  terminology over time.
                </BulletItem>
                <BulletItem title="Familiar, Not Foreign">
                  Extend the design system to introduce new capabilities while
                  preserving usability.
                </BulletItem>
              </BulletList>
            </div>
          </section>

          <hr className="section-divider" />

          {/* SECTION 3 — Design and Iteration */}
          <section className="mb-12">
            <div className="max-w-5xl">
              <SectionHeader number={3}>Design and Iteration</SectionHeader>

              <div>
                <h3 className="text-accent">Early Sketches Focused on Managers</h3>
                <p>
                  Early concepts focused on a manager-first experience that
                  tracked conversations across teams to surface best practices
                  and hidden insights.
                </p>
              </div>

              <ImageCarousel
                slides={[
                  { placeholder: "Sketch — Team Page" },
                  { placeholder: "Sketch — Wyatt" },
                ]}
              />
            </div>

            <div className="max-w-5xl">
              <TwoColumnBlock
                imageSide="right"
                aspect="portrait"
                image={
                  <div className="text-center p-6">
                    <p className="text-sm font-medium text-text-subtle">
                      Cold Call Concept
                    </p>
                  </div>
                }
              >
                <h3 className="font-serif text-2xl text-text-display">
                  Missteps and Course Corrections
                </h3>
                <p>
                  Conversations with frontline managers quickly revealed
                  resistance to prescriptive scripting. What they needed
                  instead were foundational, comparable signals such as
                  talk-to-listen ratios, competitor mentions, and objection
                  types.
                </p>
              </TwoColumnBlock>
            </div>

            {/* Full-width copy + image */}
            <div className="max-w-5xl mt-12">
              <h3 className="text-accent">Revised Focus on the Call</h3>
              <p className="mb-6">
                We restructured the experience around the individual call as
                the core record. AI insights were embedded directly into the
                call timeline.
              </p>
              <div className="hero-image-container aspect-video">
                <div className="text-center p-8">
                  <p className="text-sm font-medium text-text-subtle">
                    Revised Wireframe
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="section-divider" />

          {/* SECTION 4 — Impact and Reflection */}
          <section className="mb-12">
            <div className="max-w-4xl">
              <SectionHeader number={4}>Impact and Reflection</SectionHeader>
            </div>

            {/* Large stats */}
            <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-5xl">
              {[
                ["+45%", "Daily Active Users", "Increase in engaged users within 3 months of launch"],
                ["-30%", "Support Tickets", "Reduction in customer service inquiries"],
                ["67", "Net Promoter Score", "Up from 32 pre-redesign"],
              ].map(([value, label, desc]) => (
                <div key={label} className="stats-large-item">
                  <p className="stats-large-value">{value}</p>
                  <p className="text-text-display font-medium">{label}</p>
                  <p className="text-sm text-text-body mt-3 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Two-column qualitative */}
            <div className="max-w-5xl">
              <TwoColumnBlock
                imageSide="left"
                aspect="video"
                image={
                  <div className="text-center p-6">
                    <p className="text-sm font-medium text-text-subtle">
                      App Store Reviews
                    </p>
                  </div>
                }
              >
                <h3 className="font-serif text-2xl text-text-display">
                  Beyond the Numbers
                </h3>
                <p>
                  Qualitative feedback showed users felt more confident and
                  less anxious. The design system we created has been adopted
                  across the company's product suite.
                </p>
              </TwoColumnBlock>
            </div>

            {/* Key learnings bullets */}
            <div className="max-w-4xl mt-12">
              <h3 className="text-accent">Key Learnings</h3>
              <BulletList>
                <BulletItem title="Simple ≠ Less">
                  Users don't want minimalism for its own sake; they want
                  clarity and confidence.
                </BulletItem>
                <BulletItem title="Fail Fast">
                  Our early missteps were caught quickly because we tested
                  concepts before investing in polish.
                </BulletItem>
                <BulletItem title="Accessibility First">
                  Investing in accessibility testing earlier would have caught
                  post-launch issues sooner.
                </BulletItem>
              </BulletList>
            </div>
          </section>

          <hr className="section-divider mt-24" />

          {/* NEXT PROJECT */}
          <section className="py-16 max-w-4xl">
            <p className="flex items-center gap-2 mb-4 text-sm font-medium uppercase tracking-wider text-text-subtle">
              <ArrowRight size={16} />
              Next Project
            </p>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-3 group"
            >
              <h3 className="m-0 text-3xl font-serif group-hover:text-accent-warm transition-colors">
                Healthcare Dashboard
              </h3>
              <ArrowRight
                size={24}
                className="text-accent-warm transition-transform group-hover:translate-x-2"
              />
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyTemplate;
