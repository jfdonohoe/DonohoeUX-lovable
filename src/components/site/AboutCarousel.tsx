import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import historyImg from "@/assets/about_history.png";
import leadershipImg from "@/assets/about_leadership.png";
import satisfactionImg from "@/assets/about_satisfaction.png";
import cultivationImg from "@/assets/about_cultivation.png";
import makerImg from "@/assets/about_maker.png";

type Card = {
  num: number;
  tab: string;
  title: string;
  image: string;
  body: React.ReactNode;
};

const cards: Card[] = [
  {
    num: 1,
    tab: "Journey",
    title: "My Journey",
    image: historyImg,
    body: (
      <>
        <p>
          My father moved our family to California as Silicon Valley's computer
          culture was taking shape. He sold mainframe computers and passed along
          a deep enthusiasm for technology, raising a family of early adopters
          before the term existed.
        </p>
        <p>
          From a young age, I was drawn to both imaginative play and mechanical
          systems. Whether film, illustration, carpentry, or other disciplines
          that blend creativity with structure, I was fascinated by the space
          where inspiration meets execution.
        </p>
        <p>
          During the first dot-com boom, I was one of the few creatives with a
          foothold in development. That dual interest led me to User Experience,
          then often called Information Architecture. UX proved to be the ideal
          intersection of art and technology, serving as connective tissue
          across disciplines.
        </p>
        <p>
          As UX has matured, my focus has expanded beyond practice into
          leadership, helping define standards, build teams, and guide emerging
          designers as the discipline continues to take shape.
        </p>
      </>
    ),
  },
  {
    num: 2,
    tab: "Leadership",
    title: "Leadership Approach",
    image: leadershipImg,
    body: (
      <>
        <p>
          I believe the best work emerges in environments that support healthy
          tension. When navigated intentionally, opposing forces can deepen
          collaboration, fuel innovation, and drive growth.
        </p>
        <p>In UX, these tensions often include:</p>
        <ul className="list-disc ml-6 space-y-2 mb-4 text-text-body">
          <li>Balancing aspirational vision with refining what exists today</li>
          <li>Advocating for users while aligning with business and technical realities</li>
          <li>Encouraging creative exploration while maintaining a unified direction</li>
          <li>Investing in research while meeting time-to-market pressures</li>
          <li>Ensuring accessibility without compromising craft</li>
        </ul>
        <p>
          When leaders are transparent about these tensions, teams gain clarity
          and balance. The result is work that is both imaginative and
          pragmatic, and teams that are stronger, more aligned, and more
          effective.
        </p>
      </>
    ),
  },
  {
    num: 3,
    tab: "Satisfaction",
    title: "Greatest Satisfaction",
    image: satisfactionImg,
    body: (
      <>
        <p>
          Some of my most rewarding moments have come from designing
          near-future concepts and seeing them become real. While I enjoy
          pushing boundaries, my greatest satisfaction comes from bridging the
          present with what is next.
        </p>
        <p>
          These design "maps" help align teams and stakeholders around clear,
          actionable goals. At Salesforce, I led initiatives shaping the future
          of the platform, including explorations following the Slack
          acquisition and early concepts for Salesforce Foundations,
          supporting a shift toward product-led growth.
        </p>
        <p>
          Earlier in my consulting and agency work, I led emerging technology
          initiatives for brands including Logitech, OpenTable, and Warner
          Brothers. Across complex, cross-functional efforts, design and
          storytelling proved essential for aligning teams and turning ambitious
          visions into reality.
        </p>
      </>
    ),
  },
  {
    num: 4,
    tab: "Mentorship",
    title: "Mentorship",
    image: cultivationImg,
    body: (
      <>
        <p>
          Leading and mentoring designers has reinforced that growth is never
          complete. I came into the field as UX itself was still being defined,
          and my career has followed a pattern of identifying gaps and leaning
          into the work of closing them.
        </p>
        <p>
          The most effective approach I have found is helping people recognize
          both their strengths and their growth areas. I encourage designers to
          lean into what makes them exceptional while thoughtfully addressing
          where they want to improve.
        </p>
        <p>
          Accepting where we need to grow, while valuing who we are in the
          present, is one of the most powerful practices a person can develop.
        </p>
      </>
    ),
  },
  {
    num: 5,
    tab: "Maker",
    title: "Maker",
    image: makerImg,
    body: (
      <>
        <p>
          Outside of work, I stay grounded in the same tension between
          creativity and systems through hands-on home projects and
          unapologetically nerdy pursuits. DIY renovations let me design,
          build, and iterate where constraints are physical and solutions must
          endure.
        </p>
        <p>
          At the same time, imaginative worlds, technology, and storytelling
          keep my curiosity expansive. Craft, experimentation, and play are not
          separate from leadership — they sustain it.
        </p>
      </>
    ),
  },
];

const AboutCarousel = () => {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // For card width: 85% mobile, 70% sm, 55% lg, 45% xl
  const [cardPct, setCardPct] = useState(85);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCardPct(45);
      else if (w >= 1024) setCardPct(55);
      else if (w >= 640) setCardPct(70);
      else setCardPct(85);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const go = (d: number) =>
    setActive((i) => Math.max(0, Math.min(cards.length - 1, i + d)));

  return (
    <section id="about" className="py-16 lg:py-24 bg-surface-warm overflow-hidden">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl relative">
            <p className="label mb-4">About Me</p>
            <h2>
              Designing with empathy,
              <br />
              <span className="italic">building with purpose</span>
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              className="arrow-btn"
              onClick={() => go(-1)}
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="arrow-btn"
              onClick={() => go(1)}
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Card nav tabs */}
        <nav
          className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {cards.map((c, i) => {
            const isActive = i === active;
            return (
              <button
                key={c.tab}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap rounded-full border transition-all ${
                  isActive
                    ? "bg-accent-warm text-white border-accent-warm shadow-[0_4px_12px_-4px_hsl(12_76%_61%/0.3)]"
                    : "bg-surface-elevated text-text-body border-border hover:border-accent-warm hover:text-text-display"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-muted text-text-subtle"
                  }`}
                >
                  {c.num}
                </span>
                {c.tab}
              </button>
            );
          })}
        </nav>

        {/* Carousel viewport */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${active * (cardPct + 2)}%)`,
            }}
          >
            {cards.map((c) => (
              <article
                key={c.num}
                className="flex-none px-6 sm:px-10 py-8 bg-surface-elevated border border-border-light rounded-[1.5rem] transition-all hover:border-accent-warm/40 hover:shadow-[0_20px_40px_-20px_hsl(12_76%_61%/0.15)]"
                style={{ flexBasis: `${cardPct}%` }}
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="float-right w-24 h-24 lg:w-32 lg:h-32 ml-4 mb-2 object-contain"
                />
                <h3 className="font-serif text-2xl mb-6 text-text-display">
                  {c.title}
                </h3>
                <div className="space-y-4 leading-relaxed text-text-body">
                  {c.body}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCarousel;
