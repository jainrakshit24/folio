---
title: "I Built an Entire Blog to Avoid Posting on LinkedIn"
description: "The obligatory first post. Who I am, what I do for money, and why there is now a blog attached to a portfolio site that was doing perfectly fine without one."
slug: "why-i-started-this-blog"
category: "Software Development"
tags:
  - Rakshit Jain
  - data engineer
  - freelance web developer
  - developer blog
  - Delhi NCR
author: "Rakshit Jain"
publishedAt: "2026-11-18"
updatedAt: ""
cover: ""
published: true
featured: false
---

Somewhere a counter just ticked up by one. Another developer has started a blog.

You already know how this goes. There is a first post full of promises. There is a second post three weeks later, slightly apologetic. Then nothing, forever, and the domain quietly expires in eighteen months while its owner tells people at weddings that he writes.

So let us get the introduction over with before I lose interest.

## Who is typing this

I am Rakshit. I work as a data engineer, which means I spend most of my week on the unglamorous side of every analytics dashboard you have ever seen. Python, SQL, pipelines that move data from a place it was to a place someone wants it, and the slow forensic work of explaining why yesterday's number does not match today's.

The rest of the week I build websites for people as a freelancer. Fast ones. The kind that load before you finish blinking, because I have strong feelings about a landing page shipping four megabytes of JavaScript to display a phone number.

I am based in Delhi NCR, which is relevant mostly because it explains the quality of my coffee intake.

Those two jobs sound unrelated. They are not. Both are the same complaint in different clothing: somebody built a thing that technically works, and nobody checked what it costs the person on the other end.

## Why a blog, in 2026

Honest answer first.

Writing things down is how I find out whether I actually understand them. I can hold a vague sense of why a pipeline design is wrong for weeks. The moment I try to explain it in a paragraph, the vagueness becomes visible and usually embarrassing. That process is useful enough that I would do it even if nobody read the result, which, statistically, is the most likely outcome.

Second answer, less noble. I have opinions about data work that do not survive contact with LinkedIn. The platform has a format and the format is: a short sentence, a line break, another short sentence, a line break, "Thoughts?" and four hundred comments agreeing with a position nobody stated. I tried. I could not do it. Building a blog was genuinely the path of least resistance.

Third answer, fully transparent. This site is my portfolio. Portfolios are static objects that people visit once, if ever. A blog gives search engines a reason to come back, and it gives me somewhere to point when a client asks whether I actually know what I am talking about. That is a real motivation and pretending otherwise would be strange.

## What I actually do all day

A sample of the genre, so you know what you are signing up for.

A number on a report was wrong. Not dramatically wrong, which would be easy. Wrong by about two percent, which is the worst possible amount, because two percent looks like rounding and behaves like a bug. Finding it means reading three systems that each believe they are correct, and discovering that one of them has been quietly dropping rows at a boundary condition since before anyone currently employed there joined.

Nobody writes a case study about that. There is no dashboard screenshot. The deliverable is a sentence that says "it was the timezone," and the value of that sentence is roughly a week of someone else's confusion.

Most of data engineering is that. The interesting part is not building the pipeline. It is proving the pipeline is telling the truth, which nobody asks for until the day they very urgently do. I wrote more about that specific problem in [how to prove two systems hold the same data](/blog/prove-two-systems-hold-same-data), because it turns out I have a lot to say on the subject and my friends have stopped asking.

The freelance side is a different flavour of the same thing. A client wants a website. What they actually want is for a stranger to arrive, understand within four seconds what is on offer, and be able to contact them without filling in a form that asks for a postcode in a country that does not have postcodes.

## What will be here

Things I have actually built or actually broken. Data engineering, mostly. AI tooling, because I use it daily and have reached the stage of having specific grievances rather than general enthusiasm. Some web development, including an unreasonable amount of detail about [how this blog ships no markdown parser to your browser](/blog/blog-with-no-markdown-parser), a decision I made at midnight and have been justifying ever since.

What will not be here: listicles about the ten tools that will ten-x your productivity, predictions about what AI will do to all of us by Tuesday, and any post that opens with a dictionary definition.

I will try to be specific. Specific is harder to write and more useful to read. If I claim something is slow, there should be a number. If I say an approach failed, I should say what it cost.

## The small print

There are advertisements on this site, or there will be once a large company finishes reviewing whether I am a real person. They pay for the domain and, on a good month, the coffee. They are not why anything here is written, and if a post ever reads like it exists to hold an ad in place, you have my permission to never come back.

That is the whole introduction. If any of this was useful, there is [more where it came from](/blog), and if it was not, the back button is in its usual place and I respect the decision.

Now I have to go find out why yesterday's number does not match today's.
