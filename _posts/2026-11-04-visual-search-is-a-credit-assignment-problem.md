---
title: "Visual Search Is a Credit Assignment Problem"
description: "Once a vision-language model can zoom, crop and look again, the hard part stops being perception. It becomes deciding where to look, whether to look again, and which of many looks deserves the credit."
tags: [agents, visual search, reinforcement learning]
---

Show a vision-language model a 6000-pixel street scene and ask what the small sign on the far building says. It cannot answer from the first glance. By the time the image is resized to fit the model, the sign is a handful of blurred pixels. The only way to answer is to search: pick a region, zoom in, read what is there, decide whether that was enough, and if not, look somewhere else.

Models can now do this. They crop, zoom and call tools in the middle of their reasoning, and the answer arrives only after a sequence of observations. That changes what visual reasoning is. A single forward pass has become a trajectory, and the difficulty has moved with it. I have come to believe that the hard part of long-horizon visual search is not seeing. It is assigning credit.

## Seeing becomes a sequence of decisions

Every step of a visual search is a decision with consequences. Where should I look next? How far should I zoom? Is what I just saw enough, or should I look again? Is the target even in this image?

<figure class="post-loop">
  <ol>
    <li><span class="post-loop-name">Glance</span><span class="post-loop-desc">See the whole image at low resolution</span></li>
    <li><span class="post-loop-name">Choose</span><span class="post-loop-desc">Pick a region worth a closer look</span></li>
    <li><span class="post-loop-name">Inspect</span><span class="post-loop-desc">Crop or zoom, and read the detail</span></li>
    <li><span class="post-loop-name">Decide</span><span class="post-loop-desc">Commit to an answer, or look again</span></li>
  </ol>
  <p class="post-loop-return"><i class="fa-solid fa-rotate-right" aria-hidden="true"></i> Repeat until one more look is no longer worth its cost</p>
  <figcaption>The loop behind every visual search. Each pass ends in the same question: commit, or look again?</figcaption>
</figure>

On an easy image the loop runs once. On a hard one it may run twenty times, and most of those passes find nothing. A search that eventually succeeds is usually a few useful observations buried among many unremarkable ones. Errors also compound: a model that zooms into the wrong quadrant early can spend the rest of its budget searching carefully in a place where the answer never was.

This is the classic shape of a long-horizon problem, and it brings the classic difficulty. When the search finally succeeds or fails, which of the twenty steps was responsible?

## Outcome rewards are too blunt

The standard recipe for training these models is reinforcement learning on the final answer: one reward for a correct answer, none for a wrong one. It works well for short reasoning. For long visual search it is a blunt instrument.

- **It cannot tell useful looks from wasted ones.** A trajectory with three decisive crops and seventeen idle ones receives the same reward as a clean three-step search.
- **It rewards luck.** A model that wanders and stumbles on the answer is reinforced as much as one that searched with purpose.
- **It punishes good search.** A model that found exactly the right region but misread a digit gets nothing, and every sensible step it took is pushed down along with the mistake.

Models trained this way tend to settle into one of two bad habits: they look too little and guess, or they look at everything to be safe. Neither is what we want. We want a model that looks more when the state is uncertain and less when it already knows.

> A good searcher is not the one that looks the most. It is the one that knows when one more look is worth it.
{: .pull}

## Putting the credit where it belongs

If the problem is credit assignment, the solutions are about locating credit more precisely: at the right step, at the right decision, at the right stage of reasoning. My recent work has come at this from three directions.

**Make progress verifiable at every step.** Visual search has an advantage that many reasoning tasks lack: much of it is geometry, and geometry can be checked. Whether a crop overlaps the target region can be computed rather than judged. In [*Hider–Seeker Self-Play*](/#publications) (NeurIPS 2026), we build on this by letting one policy hide targets and another search for them. Because the hider knows where it hid, progress along a long search can be scored with geometry-verifiable process rewards instead of a single verdict at the end, and the game generates its own curriculum.

**Assign credit to the decision, not the whole trajectory.** The most consequential choice in a search is often the smallest one: commit now, or look again? In [*Toward Counterfactual Learning for Selective Re-Examination*](https://arxiv.org/abs/2611.00848), we isolate exactly this choice. From the same search state, we roll out one continuation that commits and one that re-examines, and use the cost-aware difference in their returns as the value of one more observation. That credit goes only to the tokens that made the verdict. To measure whether models make this choice well, we built ReSee, a benchmark of 8,827 explicit commit-or-re-examine decisions drawn from 3,227 search trajectories. Existing models turn out to be poorly selective about when to look again, and training on counterfactual credit improves both accuracy and selectivity over GRPO, with fewer visual requests on unseen benchmarks.

**Let the weighting follow the bottleneck.** Spatial reasoning over images moves through perception, decomposition and inference, and the stage that limits accuracy changes as training goes on. A fixed process reward cannot follow that shift. In [*Policy-Adaptive Credit Assignment for Spatial Reasoning*](https://arxiv.org/abs/2610.26410), we estimate how much each stage is currently tied to getting the answer right and update the reward weights as the policy improves. The process reward also gives a signal to groups of rollouts that all fail, which outcome rewards leave silent.

The three methods look different, but they share a premise: a long trajectory needs feedback at its natural joints, whether those are geometric steps, binary decisions or reasoning stages.

## Looking has a price

There is a second lesson hiding in the re-examination problem. Every observation costs something. In a benchmark it costs tokens and latency. In remote sensing or pathology it costs compute over gigapixel images. For a robot or a drone it costs real time, and sometimes energy that cannot be recovered.

I think the field still treats this cost as an afterthought. We report accuracy and occasionally mention how many tool calls were used. But a searcher that reaches 80 percent with four looks and one that reaches 81 percent with forty are not close competitors. They are different systems for different worlds. Cost should sit inside the objective during training, and benchmarks should report accuracy against the number of observations, not accuracy alone.

## What comes next

A few problems seem to me both important and open.

- **Memory of where you have been.** Long searches need a record of the regions already ruled out. Without it, models revisit the same patch and call it diligence.
- **Knowing when the answer is not there.** A good searcher can stop and say the target is absent. Most current models will keep looking, or invent an answer, rather than abstain.
- **Longer horizons in the real world.** Video, 3D scenes and embodied agents stretch the horizon from tens of steps to hundreds, and each observation becomes physically expensive. The credit assignment problem grows with them.
- **Evaluation that rewards judgement.** We need benchmarks that score when a model chose to look, not only what it answered.

The past few years of visual reasoning were about giving models better eyes: higher resolution, larger encoders, more pixels per token. I expect the next gains to come from better judgement about where to look, and whether to look at all.
