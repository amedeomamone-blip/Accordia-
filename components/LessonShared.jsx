import React, { useEffect, useState } from "https://esm.sh/react@18";

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function scrollToId(id) {
  const node = document.getElementById(id);
  if (node) {
    node.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (!("matchMedia" in window)) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mediaQuery.matches);
    sync();

    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", sync);
      return () => mediaQuery.removeEventListener("change", sync);
    }

    mediaQuery.addListener(sync);
    return () => mediaQuery.removeListener(sync);
  }, []);

  return reducedMotion;
}

export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!nodes.length || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0.18, 0.32, 0.52, 0.72],
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

export function LessonBreadcrumb({ items }) {
  return (
    <nav className="lesson-breadcrumb" aria-label="Percorso della pagina">
      {items.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
          {index < items.length - 1 ? <span className="lesson-breadcrumb__separator">/</span> : null}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function LessonHero({ title, question, breadcrumbs, heroGuide }) {
  return (
    <header className="lesson-hero">
      <LessonBreadcrumb items={breadcrumbs} />
      <div className="lesson-shell lesson-hero__copy">
        <h1 className="lesson-hero__title">{title}</h1>
        <p className="lesson-hero__question">{question}</p>
        {heroGuide ? <p className="lesson-hero__guide">{heroGuide}</p> : null}
      </div>
    </header>
  );
}

export function ImageFigure({ image }) {
  if (!image?.src) {
    return null;
  }

  return (
    <figure className="lesson-figure">
      <div className="lesson-figure__media">
        <img src={image.src} alt={image.alt || image.title || ""} />
      </div>
      {(image.label || image.title || image.caption || image.credit) ? (
        <figcaption className="lesson-figure__body">
          {image.label ? <p className="lesson-mini-title">{image.label}</p> : null}
          {image.title ? <strong>{image.title}</strong> : null}
          {image.caption ? <p>{image.caption}</p> : null}
          {image.credit ? <span className="lesson-figure__credit">{image.credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function MetaStrip({ items }) {
  return (
    <section className="lesson-meta-bar" aria-label="Dati tecnici">
      <div className="lesson-shell">
        <dl className="lesson-meta-bar__list">
          {items.map((item) => (
            <div key={`${item.label}-${item.value}`} className="lesson-meta-bar__item">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function FactStrip({ items }) {
  return (
    <dl className="lesson-fact-strip">
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className="lesson-fact-strip__item">
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function LessonProgress({ items, activeId, selectedFollowup, onSelectFollowup }) {
  const currentId = activeId === "rielaborazione" ? selectedFollowup || activeId : activeId;

  return (
    <nav className="lesson-progress" aria-label="Fasi della lezione">
      <div className="lesson-shell lesson-progress__track">
        {items.map((item, index) => {
          const isActive = currentId === item.id;

          if (item.type === "anchor") {
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn("lesson-progress__item", isActive && "is-active")}
                aria-current={isActive ? "step" : undefined}
              >
                <span className="lesson-progress__index">{index + 1}</span>
                <span className="lesson-progress__label">{item.label}</span>
              </a>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              className={cn("lesson-progress__item", "lesson-progress__item--button", isActive && "is-active")}
              aria-current={isActive ? "step" : undefined}
              onClick={() => {
                onSelectFollowup(item.id);
                scrollToId("rielaborazione");
              }}
            >
              <span className="lesson-progress__index">{index + 1}</span>
              <span className="lesson-progress__label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function LessonSection({ id, label, title, intro, tone = "plain", children }) {
  return (
    <section id={id} className={cn("lesson-section", tone === "soft" && "lesson-section--soft")}>
      <div className="lesson-shell">
        {(label || title || intro) ? (
          <header className="lesson-section__header">
            {label ? <p className="lesson-section__label">{label}</p> : null}
            {title ? <h2 className="lesson-section__title">{title}</h2> : null}
            {intro ? <p className="lesson-section__intro">{intro}</p> : null}
          </header>
        ) : null}
        <div className="lesson-section__body">{children}</div>
      </div>
    </section>
  );
}

export function Panel({ kicker, title, meta, children, tone = "plain" }) {
  return (
    <section className={cn("lesson-panel", tone === "soft" && "lesson-panel--soft")}>
      {(kicker || title || meta?.length) ? (
        <div className="lesson-panel__header">
          <div className="lesson-panel__heading">
            {kicker ? <p className="lesson-panel__kicker">{kicker}</p> : null}
            {title ? <h3 className="lesson-panel__title">{title}</h3> : null}
          </div>
          {meta?.length ? <FactStrip items={meta} /> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function StepList({ title, items }) {
  return (
    <div className="lesson-stack">
      {title ? <h3 className="lesson-mini-title">{title}</h3> : null}
      <ol className="lesson-step-list">
        {items.map((item, index) => (
          <li key={`${title}-${index}-${item}`} className="lesson-step-list__item">
            <span className="lesson-step-list__index">{index + 1}</span>
            <p>{item}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PromptList({ title, items }) {
  return (
    <div className="lesson-stack">
      {title ? <h3 className="lesson-mini-title">{title}</h3> : null}
      <ul className="lesson-prompt-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function ResultCallout({ label = "Alla fine", text, className }) {
  return (
    <div className={cn("lesson-result", className)}>
      <span>{label}</span>
      <strong>{text}</strong>
    </div>
  );
}

export function ActivityLayout({ steps, observe, result, right, stepsTitle = "Fai cosi", observeTitle = "Osserva" }) {
  return (
    <div className="lesson-activity">
      <div className="lesson-activity__text">
        <StepList title={stepsTitle} items={steps} />
        <PromptList title={observeTitle} items={observe} />
      </div>
      <div className="lesson-activity__side">{right}</div>
      <ResultCallout className="lesson-activity__result" text={result} />
    </div>
  );
}

export function PhaseTabs({ items, selected, onSelect, ariaLabel }) {
  return (
    <div className="lesson-tab-row" role="tablist" aria-label={ariaLabel}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={selected === item.id}
          className={cn("lesson-tab", selected === item.id && "is-active")}
          onClick={() => onSelect(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function SimpleTimer({ total = 30, startLabel = "Avvia", resetLabel = "Reimposta" }) {
  const [seconds, setSeconds] = useState(total);
  const [running, setRunning] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!running) {
      return undefined;
    }

    if (seconds === 0) {
      setRunning(false);
      return undefined;
    }

    const timer = window.setTimeout(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [running, seconds]);

  const progress = reducedMotion ? 0 : 100 - (seconds / total) * 100;

  return (
    <div className="lesson-timer">
      <div className="lesson-timer__dial" aria-live="polite">
        <svg viewBox="0 0 160 160" className="lesson-timer__ring" aria-hidden="true">
          <circle cx="80" cy="80" r="68" pathLength="100" />
          <circle cx="80" cy="80" r="68" pathLength="100" style={{ strokeDasharray: "100", strokeDashoffset: progress }} />
        </svg>
        <div className="lesson-timer__value">
          <span className="lesson-visually-hidden">Secondi rimasti</span>
          <strong>{seconds}</strong>
        </div>
      </div>

      <div className="lesson-timer__controls">
        <button
          type="button"
          className="lesson-text-button"
          onClick={() => {
            setSeconds(total);
            setRunning(true);
          }}
        >
          {startLabel}
        </button>
        <button
          type="button"
          className="lesson-text-button lesson-text-button--muted"
          onClick={() => {
            setRunning(false);
            setSeconds(total);
          }}
        >
          {resetLabel}
        </button>
      </div>
    </div>
  );
}

export function QuizList({ questions }) {
  const [answers, setAnswers] = useState({});

  return (
    <div className="lesson-quiz">
      {questions.map((question) => {
        const selected = answers[question.id];
        const selectedOption = question.options.find((option) => option.id === selected);

        return (
          <article key={question.id} className="lesson-question">
            <h4>{question.prompt}</h4>
            <div className="lesson-option-list">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={cn(
                    "lesson-option",
                    selected === option.id && option.correct && "is-correct",
                    selected === option.id && !option.correct && "is-wrong"
                  )}
                  onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {selectedOption ? <p className="lesson-feedback">{selectedOption.feedback}</p> : null}
          </article>
        );
      })}
    </div>
  );
}

export function SelfCheckList({ items }) {
  return (
    <div className="lesson-self-check">
      <h4>Autovalutazione</h4>
      <div className="lesson-self-check__rows">
        {items.map((item) => (
          <article key={item} className="lesson-self-check__row">
            <p>{item}</p>
            <div className="lesson-self-check__scale" aria-hidden="true">
              <span>non ancora</span>
              <span>quasi</span>
              <span>si</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function LessonBottomBar({ mapHref, previousHref, homeHref }) {
  return (
    <nav className="lesson-bottom-bar" aria-label="Navigazione finale">
      <div className="lesson-shell lesson-bottom-bar__track">
        <a href={mapHref} className="lesson-bottom-bar__item">
          Torna alla mappa
        </a>
        {previousHref ? (
          <a href={previousHref} className="lesson-bottom-bar__item">
            Argomento precedente
          </a>
        ) : (
          <span className="lesson-bottom-bar__item lesson-bottom-bar__item--disabled" aria-disabled="true">
            Argomento precedente
          </span>
        )}
        <a href={homeHref} className="lesson-bottom-bar__item">
          Home
        </a>
      </div>
    </nav>
  );
}
