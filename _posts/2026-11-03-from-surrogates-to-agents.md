---
title: "From Surrogates to Agents: What Photonics Taught Me About AI for Science"
description: "I started by training small networks to stand in for an optical solver. A few years later I am training agents to argue with it. What changed along the way, what did not, and the lessons I think AI for science keeps having to relearn."
tags: [AI for science, agents, reflections]
---

For most of my research life, I have been trying to teach a computer to design an optical fiber.

It sounds like a narrow ambition, and in one sense it is. But the same problem has followed me through three different eras of machine learning, and each time the tools changed, the problem looked different. Looking back, the fiber has been less a research topic than a lens: a small, well-understood corner of physics in which I could watch what AI for science actually gets right, and what it keeps getting wrong.

This post is an attempt to write that down. It is not a survey and it is not a summary of my papers. It is closer to a field journal: what I believed at each stage, what turned out to be wrong, and the lessons that I think apply well beyond photonics.

## The problem that would not go away

A photonic crystal fiber guides light through a pattern of tiny air holes running along its length. Change the size of the holes, their spacing, or how they are arranged, and you change how the fiber behaves: how much light leaks out, how different colors spread apart, how sensitive the fiber is to temperature or strain. These properties decide whether the fiber is useful for a sensor, a laser, or a communication link.

The physics is not mysterious. Maxwell's equations describe it completely, and a finite-element solver can tell you, for any given geometry, what the fiber will do. The difficulty is that the solver is slow, the space of geometries is enormous, and the question an engineer actually asks runs the other way. Nobody wants to know what an arbitrary pattern of holes does. They want a pattern of holes that does something specific.

That gap, between a world we can simulate and a design we need to find, is the shape of most problems in science and engineering. Proteins, catalysts, antennas, metamaterials and batteries all have it. Photonics is just a particularly clean version: the physics is trusted, the simulator is good, and the targets are numbers you can write down.

So the question that has run through all my work is simple to state. **How do we get from a simulator we trust to a design we want?**

## The first era: make the simulator faster

My first instinct, and the field's, was to make the forward direction cheap.

If a finite-element simulation takes minutes, train a neural network on thousands of simulated examples and let it predict the answer in milliseconds. That is what my early papers did. We trained networks to estimate the optical properties of suspended-core and photonic crystal fibers from their geometry, and to read out sensor signals, turning raw spectra from fiber gratings and interferometers into the temperature or strain that produced them. The surrogate models worked. They were fast, they were accurate inside the range they were trained on, and they made a nice figure: the solver on one side, the network on the other, nearly identical curves.

And yet they did not change how fibers were designed.

It took me a while to understand why. A faster forward model is a better tool for answering "what does this design do?" But that was never the bottleneck. A designer with a fast surrogate still has to decide which design to evaluate next, still has to trade one property against another, and still has to explain to a colleague, or to a fabrication facility, why this particular pattern of holes is worth building. The surrogate made each step cheaper without making the process any smarter.

There was a second, quieter problem. Surrogates are only as good as the simulated data they learn from, and that data covers a small, hand-chosen slice of the design space. Step outside it, which is exactly what a designer looking for something new wants to do, and the predictions degrade without telling you.

The lesson I took from this era is one I now repeat to students:

**A faster answer to the wrong question is still the wrong question.**

Prediction is the forward direction. Science and engineering mostly need the inverse.

## The second era: let an optimizer search

The natural next step was to put an optimizer on top of the surrogate. If the network can score a design in milliseconds, let an evolutionary algorithm or a gradient-based method search through thousands of candidates and return the best one. My work on collaborative property optimization for fiber reverse design lived in this world.

This was more satisfying. The optimizer did find designs that scored well, sometimes better than the starting points a human would have chosen. But it also taught me two uncomfortable things.

The first is that optimizers are ruthless about the flaws in whatever they optimize. Give one a surrogate model and it will find the regions where the surrogate is wrong in its favor: geometries that look excellent to the network and turn out to be mediocre, or physically implausible, when you run the real solver. Today we would call this reward hacking. At the time it just felt like the method was cheating, and in a sense it was. The optimizer was doing exactly what we asked, and we were asking the wrong thing.

The second lesson took longer to sink in. Even when the optimized design was genuinely good, it was hard to use. It arrived as a list of numbers with no reason attached. An experienced engineer looking at it would ask: why is the third ring of holes slightly smaller? Is that important, or an accident of the search? Will it survive fabrication tolerances? The optimizer had no answer, because it had no notion of "why". And a design you cannot reason about is a design you cannot trust, adapt, or learn from.

**In science, an answer without a reason is very hard to use.**

That is not a statement about interpretability as a nice-to-have. It is practical. Scientists build on each other's designs, and you can only build on what you understand.

## The third era: language enters the loop

The arrival of large language models changed the shape of the problem in a way I did not anticipate.

My first serious encounter was through a question that seemed almost sideways: can a language model understand structured scientific data? Fiber sensing produces spectra, geometry tables and parameter sweeps, data that is neither natural language nor a typical image. Building a model that could read and reason over that kind of data, the work that became PCF-LLM, convinced me of something I had underestimated.

Much of the expertise that makes a human designer fast is linguistic. It lives in heuristics that people say to each other: the first ring of holes does most of the work in shaping the mode; if the dispersion is too steep, try a smaller pitch; larger air-filling fractions confine light better but are harder to draw. None of this is written as an equation. It is passed between people in conversation, in lab meetings, in the margins of theses. The surrogate models could not use it. The optimizers could not use it. A language model, in principle, can.

That reframed the whole problem for me. For years, I had been trying to replace the parts of design that were slow. The parts that were hard, the judgement and the intuition and the reasons, had been left out entirely, because there was no way to represent them. Language turned out to be that representation.

**The knowledge that was hardest to encode was the knowledge that lived in words.**

## The fourth era: agents around the simulator

Once a model can hold domain knowledge in words, the next step is to let it act. That is where my work is now.

<figure class="post-loop">
  <ol>
    <li><span class="post-loop-name">Surrogates</span><span class="post-loop-desc">Learn to predict what the solver would say</span></li>
    <li><span class="post-loop-name">Optimizers</span><span class="post-loop-desc">Search the surrogate for designs that score well</span></li>
    <li><span class="post-loop-name">Language</span><span class="post-loop-desc">Read scientific data and the heuristics behind it</span></li>
    <li><span class="post-loop-name">Agents</span><span class="post-loop-desc">Propose, simulate, critique and remember</span></li>
  </ol>
  <p class="post-loop-return"><i class="fa-solid fa-rotate-right" aria-hidden="true"></i> Each era kept the simulator, and changed what sat around it</p>
  <figcaption>Four ways I have tried to get from a trusted simulator to a useful design.</figcaption>
</figure>

An agent in this setting does something none of the earlier approaches could. It proposes a change and states why: the mode is leaking between the holes of the first ring, so enlarge them. It writes that change as an executable geometry, runs the real solver, reads the result, and decides what went wrong. Over many rounds it accumulates moves that worked, so the next design problem starts from experience instead of from scratch. In our recent work we split this into roles, one that reasons about physics, one that writes the design, one that criticizes the result, and we treat the critic's written feedback as a kind of gradient expressed in words. We have also been teaching agents to keep successful design moves as reusable skills.

The details matter less here than the change in architecture. In the first two eras, the learned model tried to *replace* the simulator, either by imitating it or by searching a copy of it. In the agent era, the model sits *around* the simulator. The physics stays in the tool we already trust. The model takes over the part that used to need a person: deciding what to try next, and why.

I now think this was the real mistake of the surrogate era. We spent enormous effort trying to learn something we already had, a correct physical model, and very little effort on what we did not have, a good policy for using it.

## Lessons I keep relearning

Several things have become clear to me over these four eras. None of them is specific to fibers.

### The bitter lesson has a twist in science

Rich Sutton's [*The Bitter Lesson*](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) argues that, over the history of AI, general methods that scale with computation have repeatedly beaten methods that build in human knowledge. Search and learning win; hand-crafted expertise loses, eventually and painfully.

I believe this, and my own trajectory is a small instance of it. Every hand-designed pipeline I built was eventually overtaken by something more general. But science adds a twist that is easy to miss. In science, a great deal of human knowledge is not a heuristic that a better learner will make obsolete. It is a *verifier*: a simulator, a conservation law, a measurement. That kind of knowledge does not get swept away by scale. It becomes more valuable as the learners become more capable, because it is what tells them whether they are right.

So the version of the lesson I would teach is this:

> Don't hand-craft the search. Hand-craft the check.
{: .pull}

Let general learners propose, explore and reason. Put the domain knowledge where it cannot be argued with, in the thing that scores the result.

### Verification sets the pace

If the check matters this much, then the fields where checking is cheap and reliable will move first. Jason Wei has [written](https://www.jasonwei.net/blog) about this asymmetry in general terms: how quickly AI solves a task tracks how easy that task is to verify. Science makes the point vivid. Photonics, where a solver can score a design in minutes, is a far easier target than drug discovery, where the real verdict comes from a clinical trial years later.

This has an uncomfortable implication for how we choose problems. The most important scientific questions are often the hardest to verify. If we only work where verification is easy, we will build impressive systems for the problems that mattered least. Part of the job, then, is building better verifiers: faster simulators, better proxies, cheaper experiments. That work is less glamorous than training models, and I think it is at least as important.

### Benchmarks measure the era we just left

Most benchmarks in AI for science still measure prediction: how close is the predicted property to the simulated one? That was the right question in the surrogate era. It is the wrong one now. What we need to know is whether a system can design something that works, and whether it understands the physics well enough to be trusted outside the cases it has seen.

This is part of why we built PCFBench, to test whether vision-language models understand the physics behind a design rather than only describing it fluently. But the broader point is one that Shunyu Yao made forcefully in [*The Second Half*](https://ysymyth.github.io/The-Second-Half/): as methods mature, defining the right problem and the right evaluation becomes more important than improving the method. AI for science is reaching that point. The bottleneck is shifting from "can we train a better model?" to "do we know what better means?"

### Small fields are underrated testbeds

For a long time I worried that working on fibers was too narrow. I now think the opposite. A small field with a trusted simulator, clear numerical targets and a community of experts who can judge the results is an almost ideal place to study general questions about agents: how they use tools, how they learn from feedback, how they fail. The lessons transfer, and the experiments are honest, because the physics does not care how good the demo looks.

If I could give one piece of advice to a student entering AI for science, it would be this: find a domain with a verifier, and learn it deeply enough to know when the model is wrong.

### The scientist moves upstream

I do not think agents will replace domain experts in design. But they are changing what experts spend their time on. Less time running simulations and tuning parameters by hand. More time deciding what the objective should be, which constraints are real, and which results to believe. Those were always the parts of the work that required a scientist. The rest was labor we tolerated because there was no alternative.

There is a risk here too. If the expert only ever sees the agent's final design, they lose the slow, hands-on contact with the problem that built their intuition in the first place. I do not have a good answer to this yet. I suspect the best systems will be ones that show their reasoning in a form a person can learn from, so that working with the agent makes the scientist better, not just faster.

## What I am betting on

Here is where I think the next few years go, and where I am placing my own effort.

**Agents trained against simulators.** Most scientific agents today are prompted, not trained. But a simulator is a verifier, and a verifier is exactly what reinforcement learning with verifiable rewards needs. The same post-training recipe that made language models much better at mathematics and code should work for design, with the simulator as the reward. I think this is underexplored, and it is a large part of why my work now spans both agentic reinforcement learning and scientific design.

**Experience that compounds.** A human designer's tenth fiber is easier than their first. An agent's tenth design problem should be too. Skill libraries, memory and transfer across tasks are, to me, the difference between a clever tool and a system that actually gets better at science.

**Knowing the edge of the map.** The most dangerous failure in scientific design is a confident answer outside the region where the simulator, or the agent, can be trusted. Systems that know when they are out of their depth, and say so, will be worth more than systems that are slightly more accurate on average.

**Closing the loop with the physical world.** Simulation is not fabrication. Self-driving laboratories in chemistry and materials science are starting to connect agents to real experiments, and I expect photonics to follow. That is where the hardest problems are, because the real world is the one verifier no model can hack.

When I trained my first surrogate model, I thought the goal was to make the simulator faster. It took me years to see that the simulator was never the problem. The problem was everything a scientist does around it, and that is finally something we can begin to learn.
