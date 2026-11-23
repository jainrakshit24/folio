/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 *
 * Privacy policy. AdSense will not approve a site without one, and it has to
 * name the third parties that set cookies - so this page is kept truthful
 * against what the site actually loads rather than filled with boilerplate.
 */
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { ADSENSE_CLIENT } from "@/components/blog/AdSlot";
import "@/styles/blog.css";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    ...seo({
      path: "/privacy",
      title: "Privacy Policy | Rakshit Jain",
      description:
        "What this site collects, what it does not, and which third parties are involved. Analytics are cookie-free.",
      ogTitle: "Privacy Policy",
      ogDescription: "What this site collects and what it does not.",
    }),
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main id="main" className="relative min-h-screen bg-cream pb-24 pt-32">
      <div className="mx-auto w-full max-w-[52rem] px-5 sm:px-8">
        <span className="label-pill bg-paper">LEGAL</span>
        <h1 className="mt-5 font-display text-[2.5rem] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] sm:text-[3.25rem]">
          Privacy Policy
        </h1>
        <p className="num mt-4 text-[11px] uppercase tracking-[0.18em] text-ink/55">
          Last updated 21 November 2026
        </p>
        <div className="toy-card mt-8 px-5 py-9 sm:px-10 sm:py-14">
          <div className="blog-prose">
            <h2>The short version</h2>
            <p>
              This is a personal portfolio and blog run by Rakshit Jain. There is no account to
              create, no login, and no database storing anything about you. I do not sell data,
              because I do not collect anything that could be sold.
            </p>

            <h2>Analytics</h2>
            <p>
              Page views are counted with GoatCounter, which is cookie-free and does not build a
              profile of you across sites. It records the page visited, the referring site, the
              country, and a coarse browser and screen-size category. It does not store IP
              addresses, and nothing it collects identifies an individual.
            </p>

            <h2>The contact form</h2>
            <p>
              The contact form has no backend. It validates what you type in your browser and then
              opens your own email application with the message pre-filled. Nothing is submitted to
              this site, and nothing is stored here. The message only leaves your device when you
              choose to send it from your own email account.
            </p>

            <h2>Advertising</h2>
            {ADSENSE_CLIENT ? (
              <>
                <p>
                  Articles on this site carry advertising served by Google AdSense. Google and its
                  partners may use cookies or similar identifiers to serve ads based on your prior
                  visits to this and other websites.
                </p>
                <p>
                  You can opt out of personalised advertising in{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Ads Settings
                  </a>
                  , and opt out of third-party vendors at{" "}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    aboutads.info
                  </a>
                  . Google&rsquo;s own handling of data is described in its{" "}
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    partner sites policy
                  </a>
                  .
                </p>
              </>
            ) : (
              <p>
                This site currently serves no advertising and sets no advertising cookies. If that
                changes, this section will name the ad network and explain how to opt out, before
                any ad is served.
              </p>
            )}

            <h2>Fonts and other third parties</h2>
            <p>
              Typefaces are loaded from Google Fonts, which means your browser makes a request to
              Google&rsquo;s servers and Google receives your IP address as part of that request.
              Everything else on the site is served from its own domain.
            </p>

            <h2>Embedded content</h2>
            <p>
              Some project pages embed architecture diagrams. These are served from this site and
              load nothing from elsewhere. Links out to GitHub, LinkedIn and similar sites are
              ordinary links; those sites apply their own policies once you arrive.
            </p>

            <h2>Your choices</h2>
            <p>
              You can block cookies and scripts in your browser and this site will keep working. The
              blog in particular is plain HTML and CSS once loaded, so blocking JavaScript costs you
              a copy-to-clipboard button and nothing else.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy can go to{" "}
              <a href="mailto:itsrakshitjain@gmail.com">itsrakshitjain@gmail.com</a>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
