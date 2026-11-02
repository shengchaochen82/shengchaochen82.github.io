---
title: "What Can Agents Do for Scientific Design?"
description: "Prediction tells us what a structure will do. Design asks for a structure that does what we want. Why agents are well suited to the second question, and what still stands in the way."
tags: [agents, AI for science, inverse design]
---

Most machine learning for science has been about prediction. Give a model a protein sequence and it predicts the folded structure. Give it a crystal and it predicts whether the crystal is stable. Give it today's atmosphere and it predicts tomorrow's. These models are now remarkably good, and [AlphaFold](https://www.nature.com/articles/s41586-021-03819-2) made that clear to everyone.

Design runs the other way. A scientist starts from a target, such as an optical fiber with low loss at 1550 nm, a molecule that binds a given pocket, or a material with a particular band gap, and has to find a structure that achieves it. Much of the real work in science and engineering happens in this inverse direction, and I think it is where agents have the most to offer.

## Why design is hard

I came to this problem through photonics. Designing a photonic crystal fiber means choosing a pattern of air holes, with their sizes, spacing and arrangement, so that the fiber guides light with the dispersion, birefringence or loss you need. The physics is well understood. The difficulty lies in everything around it.

- **The design space is large and awkward.** It mixes continuous parameters with discrete choices, and the geometry is easy to sketch but hard to search.
- **Every evaluation is expensive.** A single finite-element simulation can take minutes to hours, so trying millions of candidates is out of the question.
- **Objectives pull against each other.** Lowering loss can spoil dispersion, and the best design on paper may be impossible to fabricate.
- **Expert knowledge is rarely written down.** An experienced designer knows that the first ring of air holes does most of the work in shaping the guided mode. That kind of intuition makes experts fast, but it seldom exists in a form a program can use.

Classical inverse design deals with the first three problems through optimizers and surrogate models. It largely ignores the fourth. That is the gap agents can fill.

## What an agent adds

By an agent I mean a language or vision-language model that can plan, call tools, read the results, and decide what to do next over many steps. In design, this brings four abilities that neither a predictor nor a black-box optimizer has.

<figure class="post-loop">
  <ol>
    <li><span class="post-loop-name">Propose</span><span class="post-loop-desc">State a hypothesis in physical terms</span></li>
    <li><span class="post-loop-name">Build</span><span class="post-loop-desc">Turn it into a geometry the solver can run</span></li>
    <li><span class="post-loop-name">Simulate</span><span class="post-loop-desc">Let a trusted solver score the design</span></li>
    <li><span class="post-loop-name">Critique</span><span class="post-loop-desc">Read the numbers and write down what went wrong</span></li>
  </ol>
  <p class="post-loop-return"><i class="fa-solid fa-rotate-right" aria-hidden="true"></i> Repeat, and keep the moves that worked as reusable skills</p>
  <figcaption>The loop an agent runs in design. The physics stays in the simulator; the agent decides what to try next.</figcaption>
</figure>

**It reasons in the language of the domain.** An agent can propose a change and explain it: the mode is leaking between the holes of the first ring, so enlarge them. An explanation like this can be checked, challenged and reused. You cannot argue with a gradient step, but you can argue with a hypothesis.

> You cannot argue with a gradient step, but you can argue with a hypothesis.
{: .pull}

**It uses the tools scientists already trust.** The agent does not need to replace the simulator. It writes the geometry, runs the solver, reads the field profile and compares the result with the target. The physics stays in the tools we trust, and the model makes the decisions between runs.

**It turns feedback into improvement.** Every simulation returns numbers, and numbers can be read as a critique. In [*The Physicist, the Coder, and the Critic*](https://aclanthology.org/2026.findings-emnlp.1034.pdf), we divide the work among three roles. The physicist proposes physically motivated changes, the coder turns them into executable designs, and the critic reads the simulation results and writes back what went wrong. The critic's written feedback acts as a gradient expressed in words, which lets the system improve without differentiating through the simulator.

**It accumulates skill.** Human designers get faster because they remember what worked. Agents can too. In [*Learning Design Skills as Memory Policies*](https://arxiv.org/abs/2605.29421), we treat effective design moves as skills that the agent stores and retrieves, so experience from one design task carries over to the next instead of being discarded when the task ends.

Tool use and reasoning are general abilities. What makes design special is the evaluation signal. A simulator is a verifier: it tells you objectively how good a design is. This makes scientific design one of the most natural settings for reinforcement learning with verifiable rewards, the same post-training recipe that has made language models much better at mathematics and code. I believe this connection is still underexplored, and it is a large part of why I work on both agentic reinforcement learning and scientific design.

## What still stands in the way

The demos make it look easier than it is. Several problems remain open.

- **Fluency is not physics.** A model can write a convincing explanation and still get the direction of an effect wrong. Benchmarks need to test physical understanding, not just description. This is the motivation behind [PCFBench](https://pcfbench.github.io/), which evaluates vision-language models on physics-aware photonic inverse design.
- **Agents exploit their rewards.** If the simulator is the reward, the agent will find its blind spots: meshes that are too coarse, boundaries that leak, and designs that look optimal in simulation but cannot be built. Fabrication constraints have to be part of the objective from the start.
- **Long loops are costly.** Long agent trajectories combined with expensive simulations are slow. Surrogate models, multi-fidelity evaluation and knowing when to stop matter as much as the agent itself.
- **The final test is physical.** A simulation is not a fabricated device. Closing the loop with real experiments, as self-driving laboratories are beginning to do in chemistry and materials science, is where the hardest and most rewarding problems lie.

## What this means for scientists

I do not think agents will replace domain experts in design. They will change what experts spend their time on: less time tuning parameters and running simulations by hand, and more time defining the right objective, deciding which constraints matter and judging which results to trust. Those were always the most interesting parts of the work.

Photonics is my testbed, but the same pattern appears in antennas, metamaterials, catalysts, drug candidates and many other fields: a clear target, a trusted simulator, and expert knowledge that is hard to write down. Wherever those three meet, I expect agents to change how design is done.
