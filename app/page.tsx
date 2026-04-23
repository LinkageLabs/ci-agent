const PAYMENT_LINK_SINGLE =
  'https://buy.stripe.com/5kQdR28Yl3LX4vY4AOcQU01'
const PAYMENT_LINK_MONTHLY =
  'https://buy.stripe.com/28EcMY6Qdcit7Ia8R4cQU02'
const PAYMENT_LINK_ANNUAL =
  'https://buy.stripe.com/aFaeV60rPeqB1jMffscQU03'

export default function LandingPage() {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-brand">
            Linkage <span>Labs</span>
          </div>
          <div className="nav-links">
            <a href="#what">What It Does</a>
            <a href="#how">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#pricing" className="nav-cta">
              Access the Agent
            </a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">Competitive Intelligence Agent</div>
            <h1>A full competitive intelligence report. In hours, not weeks.</h1>
            <p className="hero-sub">
              Run the same analysis that used to cost $25K and eight weeks with
              a consulting firm &mdash; on your own schedule, on any competitor
              set, with evidence-based scoring you can track over time. Built by
              Linkage Labs on the methodology we use with Fortune 500 brands.
            </p>
            <div className="hero-ctas">
              <a href="#pricing" className="btn btn-primary">
                Access the Agent &rarr;
              </a>
              <a href="#what" className="btn btn-ghost">
                See what&rsquo;s inside
              </a>
            </div>
          </div>
          <div className="hero-demo">
            <div className="hero-demo-header">
              Sample Output &mdash; Scorecard Summary
            </div>
            <div className="hero-demo-title">Comparative Tier Assessment</div>
            <table className="demo-table">
              <thead>
                <tr>
                  <th>Dimension</th>
                  <th>You</th>
                  <th>Comp A</th>
                  <th>Comp B</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Market Presence</td>
                  <td>
                    <span className="tier-pill tier-c">Parity</span>
                  </td>
                  <td>
                    <span className="tier-pill tier-s">Strength</span>
                  </td>
                  <td>
                    <span className="tier-pill tier-o">Opp.</span>
                  </td>
                </tr>
                <tr>
                  <td>Service Breadth</td>
                  <td>
                    <span className="tier-pill tier-s">Strength</span>
                  </td>
                  <td>
                    <span className="tier-pill tier-s">Strength</span>
                  </td>
                  <td>
                    <span className="tier-pill tier-c">Parity</span>
                  </td>
                </tr>
                <tr>
                  <td>Innovation</td>
                  <td>
                    <span className="tier-pill tier-s">Strength</span>
                  </td>
                  <td>
                    <span className="tier-pill tier-c">Parity</span>
                  </td>
                  <td>
                    <span className="tier-pill tier-o">Opp.</span>
                  </td>
                </tr>
                <tr>
                  <td>Momentum</td>
                  <td>
                    <span className="tier-pill tier-c">Parity</span>
                  </td>
                  <td>
                    <span className="tier-pill tier-s">Strength</span>
                  </td>
                  <td>
                    <span className="tier-pill tier-c">Parity</span>
                  </td>
                </tr>
                <tr>
                  <td>Vulnerability</td>
                  <td>
                    <span className="tier-pill tier-s">Strength</span>
                  </td>
                  <td>
                    <span className="tier-pill tier-o">Opp.</span>
                  </td>
                  <td>
                    <span className="tier-pill tier-c">Parity</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats-inner">
          <div className="stat">
            <div className="stat-number">
              6<span className="unit">wks</span> &rarr; 6
              <span className="unit">hrs</span>
            </div>
            <div className="stat-label">
              Traditional CI engagement timelines compressed into a single
              workday
            </div>
          </div>
          <div className="stat">
            <div className="stat-number">
              $<span className="unit">500</span>
            </div>
            <div className="stat-label">
              Starting price for a full competitive intelligence report
            </div>
          </div>
          <div className="stat">
            <div className="stat-number">
              6<span className="unit">+</span>
            </div>
            <div className="stat-label">
              Scoring dimensions applied consistently across every competitor
              and every reporting period
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="what">
        <div className="section-inner">
          <div className="section-label">What It Does</div>
          <h2>
            A full competitive analysis, structured the way a consultant would
            deliver it.
          </h2>
          <div className="section-rule"></div>
          <p className="section-lede">
            This isn&rsquo;t a dashboard or a news feed. It&rsquo;s an analyst
            that researches your competitors, scores them on a locked rubric,
            maps positioning, runs SWOTs, and synthesizes strategic implications
            &mdash; then hands you a client-ready, branded HTML report.
          </p>

          <div className="cap-grid">
            <div className="cap-card">
              <div className="cap-num">01</div>
              <h3>Competitor profiles</h3>
              <p>
                Full profile per direct competitor &mdash; positioning,
                leadership, recent moves, scale, and trajectory. Every claim
                sourced.
              </p>
            </div>
            <div className="cap-card">
              <div className="cap-num">02</div>
              <h3>Positioning matrix</h3>
              <p>
                A visual 2D map of where you and every competitor sit on the two
                dimensions that matter most in your category. White space
                identified.
              </p>
            </div>
            <div className="cap-card">
              <div className="cap-num">03</div>
              <h3>Scoring rubric</h3>
              <p>
                Six dimensions, 1&ndash;10 scale, evidence-cited. Translated
                into client-facing Strength / Competitive / Growth Opportunity
                tiers.
              </p>
            </div>
            <div className="cap-card">
              <div className="cap-num">04</div>
              <h3>SWOT per competitor</h3>
              <p>
                Structured SWOT for each direct competitor plus threat
                assessments for indirect / disruptive players outside the
                traditional set.
              </p>
            </div>
            <div className="cap-card">
              <div className="cap-num">05</div>
              <h3>Strategic moves timeline</h3>
              <p>
                Expansions, exits, partnerships, leadership shifts, hiring
                signals &mdash; with pattern analysis on where the category is
                heading.
              </p>
            </div>
            <div className="cap-card">
              <div className="cap-num">06</div>
              <h3>Executive synthesis</h3>
              <p>
                5&ndash;7 key findings and 3&ndash;5 actionable recommendations.
                What to protect, what to pursue, what to monitor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section how-section" id="how">
        <div className="section-inner">
          <div className="section-label">How It Works</div>
          <h2>Configure once. Run as often as you want.</h2>
          <div className="section-rule"></div>
          <p className="section-lede">
            Access is simple. You configure your engagement, log into your
            Linkage Labs workspace, and run the agent. The methodology, scoring
            rubric, and positioning axes stay locked so every report is
            comparable to the last.
          </p>

          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <h3>Configure your brief</h3>
              <p>
                Industry, client profile, direct and indirect competitors,
                priority areas, positioning axes. Fifteen minutes of setup
                drives every report.
              </p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3>Access the workspace</h3>
              <p>
                After purchase you receive access to the CI Agent workspace
                &mdash; no technical setup, no API wrangling. You log in and
                you&rsquo;re in.
              </p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3>Run the analysis</h3>
              <p>
                The agent researches, scores, and synthesizes. Runs are
                independent &mdash; refresh whenever a market moves or a
                competitor makes news.
              </p>
            </div>
            <div className="step">
              <div className="step-num">4</div>
              <h3>Receive the report</h3>
              <p>
                Branded, self-contained HTML report &mdash; executive summary,
                profiles, scorecard, positioning matrix, SWOT, recommendations,
                sources.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-label">Why This Is Different</div>
          <h2>
            Methodology that holds up over time &mdash; not a one-off snapshot.
          </h2>
          <div className="section-rule"></div>

          <div className="diff-grid">
            <ul className="diff-list">
              <li>
                <strong>Industry-agnostic.</strong>
                Works across CPG, healthcare, professional services, financial
                services &mdash; anywhere competitive analysis matters. The
                rubric flexes to your category.
              </li>
              <li>
                <strong>Evidence-based scoring.</strong>
                Every score cites a verifiable source. Ambiguous evidence
                defaults to market parity &mdash; no inflated claims, no
                guessing high.
              </li>
              <li>
                <strong>Locked axes for trend tracking.</strong>
                Positioning axes and scoring rubric stay constant across
                reports. You can see how competitors move over time &mdash; not
                start over every quarter.
              </li>
              <li>
                <strong>Client-ready deliverable.</strong>
                The output isn&rsquo;t raw data. It&rsquo;s a designed, branded
                HTML report you can hand to leadership or adapt into your own
                board materials.
              </li>
              <li>
                <strong>Built by practitioners.</strong>
                Designed by Michele DeKinder-Smith after 28 years running
                competitive and strategic work for Fortune 500 consumer brands.
                This is the method, not a prompt.
              </li>
            </ul>

            <div className="diff-visual">
              <div className="matrix">
                <div className="matrix-q q-tl"></div>
                <div className="matrix-q q-tr"></div>
                <div className="matrix-q q-bl"></div>
                <div className="matrix-q q-br"></div>
                <div className="matrix-xline"></div>
                <div className="matrix-yline"></div>
                <div className="dot dot-a">A</div>
                <div className="dot dot-b">B</div>
                <div className="dot dot-c">C</div>
                <div className="dot dot-d">D</div>
                <div className="dot dot-you">YOU</div>
              </div>
              <div className="matrix-labels">
                <span>&larr; Commodity</span>
                <span>Premium &rarr;</span>
              </div>
              <div className="matrix-caption">
                Positioning matrix &mdash; locked axes, white space identified
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section deliv-section">
        <div className="section-inner">
          <div className="section-label">Inside The Report</div>
          <h2>Every section a strategy team actually uses.</h2>
          <div className="section-rule"></div>
          <p className="section-lede">
            Eight sections, all in one self-contained HTML file with sidebar
            navigation. Drop it into your browser, share it with your team, or
            lift sections into your next board deck.
          </p>

          <div className="deliv-grid">
            <div className="deliv-card">
              <h4>Executive summary</h4>
              <p>
                Side-by-side scorecard, 5&ndash;7 findings, 3&ndash;5
                recommendations, positioning matrix.
              </p>
            </div>
            <div className="deliv-card">
              <h4>Competitor profiles</h4>
              <p>
                One page per direct competitor, half-page per indirect.
                Positioning, moves, trajectory.
              </p>
            </div>
            <div className="deliv-card">
              <h4>Capabilities comparison</h4>
              <p>
                Comparative table organized by your priority service lines or
                product categories.
              </p>
            </div>
            <div className="deliv-card">
              <h4>SWOT analysis</h4>
              <p>
                Structured SWOT per direct competitor, plus threat assessment
                per indirect competitor.
              </p>
            </div>
            <div className="deliv-card">
              <h4>Strategic landscape</h4>
              <p>
                Where the category is heading over the next 12&ndash;24 months
                &mdash; and what it means for you.
              </p>
            </div>
            <div className="deliv-card">
              <h4>Positioning matrix</h4>
              <p>
                Visual 2D map with locked axes and movement overlay for
                recurring reports.
              </p>
            </div>
            <div className="deliv-card">
              <h4>Sources appendix</h4>
              <p>
                Every factual claim linked to its source. Collection date and
                methodology notes included.
              </p>
            </div>
            <div className="deliv-card">
              <h4>Scoring methodology</h4>
              <p>
                Full rubric reproduced in the report so your team can evaluate
                and defend every score.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section pricing-section" id="pricing">
        <div className="section-inner">
          <div className="section-label">Pricing</div>
          <h2>Simple pricing. No consulting retainer required.</h2>
          <div className="section-rule"></div>
          <p className="section-lede">
            Start with a single report. Upgrade when you want ongoing coverage.
            Prepay annually and save.
          </p>

          <div className="pricing-grid">
            <div className="price-card">
              <div className="price-name">Single Report</div>
              <div className="price-tagline">
                Perfect for a one-time strategic question or a board prep
                sprint.
              </div>
              <div className="price-amount">
                $500<span className="period">one-time</span>
              </div>
              <div className="price-note">&nbsp;</div>
              <div className="price-divider"></div>
              <ul className="price-features">
                <li>One complete CI report</li>
                <li>Full methodology &amp; scoring rubric</li>
                <li>Branded HTML deliverable</li>
                <li>Sources appendix</li>
                <li>Workspace access for 7 days</li>
              </ul>
              <a href={PAYMENT_LINK_SINGLE} className="price-cta">
                Get access
              </a>
            </div>

            <div className="price-card featured">
              <div className="price-badge">Most Popular</div>
              <div className="price-name">Monthly</div>
              <div className="price-tagline">
                For teams who want ongoing coverage and trend tracking across
                periods.
              </div>
              <div className="price-amount">
                $500<span className="period">/ month</span>
              </div>
              <div className="price-note">Cancel anytime</div>
              <div className="price-divider"></div>
              <ul className="price-features">
                <li>Unlimited reports per month</li>
                <li>Trend tracking across periods</li>
                <li>Locked axes &amp; rubric for comparability</li>
                <li>Movement overlay on positioning matrix</li>
                <li>Priority workspace support</li>
              </ul>
              <a href={PAYMENT_LINK_MONTHLY} className="price-cta">
                Start monthly access
              </a>
            </div>

            <div className="price-card">
              <div className="price-name">Annual</div>
              <div className="price-tagline">
                Best value for teams committing to a full year of competitive
                coverage.
              </div>
              <div className="price-amount">
                $5,000<span className="period">/ year</span>
              </div>
              <div className="price-note">Save $1,000 vs. monthly</div>
              <div className="price-divider"></div>
              <ul className="price-features">
                <li>Everything in Monthly</li>
                <li>Prepaid annual access</li>
                <li>Methodology updates included</li>
                <li>Quarterly strategy check-in call</li>
                <li>Priority onboarding</li>
              </ul>
              <a href={PAYMENT_LINK_ANNUAL} className="price-cta">
                Get annual access
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="section-inner">
          <div className="section-label">Frequently Asked</div>
          <h2>Answers before you ask.</h2>
          <div className="section-rule"></div>

          <div className="faq-grid">
            <div className="faq-item">
              <h4>How long does a report take to run?</h4>
              <p>
                A typical report completes in a few hours. Complex competitive
                sets with many indirect players or specialized sources can take
                longer, but always inside a workday.
              </p>
            </div>
            <div className="faq-item">
              <h4>What industries does this work for?</h4>
              <p>
                Any industry where publicly available data exists on competitors
                &mdash; CPG, healthcare, professional services, financial
                services, B2B SaaS, nonprofits. The rubric adapts to your
                category.
              </p>
            </div>
            <div className="faq-item">
              <h4>Do I need technical skills to use it?</h4>
              <p>
                No. You log into your Linkage Labs workspace, fill in a brief,
                and run the agent. There&rsquo;s no API wrangling, no prompt
                engineering, no code. We&rsquo;ve built the hard part.
              </p>
            </div>
            <div className="faq-item">
              <h4>What sources does the agent use?</h4>
              <p>
                Publicly available data only: competitor websites, business
                press, trade publications, public filings, press releases, job
                postings, CMS or regulatory data where relevant. Every claim is
                sourced.
              </p>
            </div>
            <div className="faq-item">
              <h4>Can I white-label the output?</h4>
              <p>
                The default deliverable carries Linkage Labs branding. Annual
                subscribers can request a white-label configuration to remove
                our branding on reports shared with clients.
              </p>
            </div>
            <div className="faq-item">
              <h4>What if my positioning axes change over time?</h4>
              <p>
                Axes stay locked to preserve trend comparability. If your market
                fundamentally restructures, you can re-baseline &mdash; the
                report will document the rationale and re-score all competitors
                on the new axes.
              </p>
            </div>
            <div className="faq-item">
              <h4>How is this different from social listening?</h4>
              <p>
                Social listening covers sentiment and public perception. The CI
                Agent covers structure: positioning, capabilities, strategic
                moves, and scoring. We have a separate Social Listening Agent
                for the sentiment side.
              </p>
            </div>
            <div className="faq-item">
              <h4>Who built this and why should I trust it?</h4>
              <p>
                Built by Michele DeKinder-Smith and the Linkage Labs team.
                Michele has spent 28 years running competitive and strategic
                work for consumer brands from mid-market to Fortune 500. This is
                the methodology we use with paying clients &mdash; productized.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-inner">
          <h2>Stop renting intelligence. Start owning it.</h2>
          <p>
            A single report costs less than a consulting kickoff call. Unlimited
            reports cost less than one hour of a strategy firm&rsquo;s partner
            rate. The methodology is the same &mdash; the delivery is what
            changed.
          </p>
          <a href="#pricing" className="btn btn-primary">
            Access the Agent &rarr;
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">Linkage Labs</div>
          <div className="footer-meta">
            &copy; {new Date().getFullYear()} Linkage Labs &middot; A practice
            of{' '}
            <a href="https://linkageresearch.com">
              Linkage Research &amp; Consulting
            </a>{' '}
            &middot;{' '}
            <a href="mailto:michele@linkagelabs.ai">michele@linkagelabs.ai</a>
          </div>
        </div>
      </footer>
    </>
  )
}
