---
title: "Learning Where to Look"
description: "Years of weather radar, satellite imagery and medical scans taught me that the important pixels are usually the fewest. Now that models can choose where to look, that old problem has turned into a question about decisions, rewards and credit. Reflections on long-horizon visual search, and what it says about agentic AI."
tags: [agents, visual search, reinforcement learning, reflections]
cover: learning-where-to-look.svg
---

The most important pixels in an image are usually the fewest. I learned this long before I worked on agents. In weather radar, the storm cell that matters is a small bright patch in a large, mostly quiet field. In satellite imagery, the target you are asked to classify may occupy a fraction of a percent of the scene. In a chest X-ray, the sign of disease can be a faint shadow that a resized thumbnail erases completely. Across very different domains, the same pattern kept appearing: the answer was in the image, but in a part of it that was easy to miss.

{% include figure.html src="/assets/img/blog/radar-quad-state-supercell.jpg" width="1100" height="970" alt="Weather radar reflectivity map of a large supercell storm over western Kentucky, with a tiny magenta debris signature just south of the town of Mayfield" caption="Radar reflectivity of the December 2021 Quad-State supercell over western Kentucky. The tornado's debris signature is the small magenta patch just below the Mayfield label, a few pixels in an image dominated by rain. This is what most hard visual problems look like." credit='Image: U.S. National Weather Service, NEXRAD KPAH · Public domain · via <a href="https://commons.wikimedia.org/wiki/File:Radar_of_the_Quad-State_Supercell_prior_to_impacting_Mayfield,_Kentucky.png">Wikimedia Commons</a>' %}

For most of that time, the model never had to deal with this problem. We did. Someone decided how to tile the image, what resolution to use, which region to crop and what to throw away. The model saw whatever window we chose for it.

That has changed. Vision-language models can now decide for themselves where to look. They crop, zoom, call tools, look again and only then answer. I have spent the last stretch of my research trying to understand what this change really means, and I have come to a conclusion. The hard part of visual search is no longer seeing. It is deciding, and above all, learning which decisions deserve the credit.

## Before agents, we did the looking

My early work in vision was all about building better eyes. For weather, that meant models for radar echo extrapolation and multi-label weather recognition. For remote sensing, it meant fine-grained classification of targets in large scenes. For medicine, it meant recognizing pneumonia in chest X-rays and retinal disease in fundus images. In each case, the progress came from architecture: attention here, a multiscale fusion there, a transformer where a CNN used to be.

What I did not appreciate at the time was how much reasoning happened *before* the model ever ran. Choosing the field of view, the resolution and the crop was itself a judgement about where the answer was likely to be. A radiologist does this naturally: a quick look at the whole film, then a long look at the region that seems wrong. Our pipelines did it with fixed rules, and the model inherited whatever those rules got right or wrong.

Psychologists have known for a long time how much of seeing is choosing. In the 1960s, Alfred Yarbus recorded people's eye movements while they looked at a painting, and found that the path their eyes took depended on the question they had been asked. Same person, same picture, different question, completely different search.

{% include figure.html src="/assets/img/blog/yarbus-unexpected-visitor.jpg" width="808" height="690" alt="Ilya Repin's painting Unexpected Visitor beside seven tangled eye-movement traces recorded from one viewer, each for a different question such as giving the ages of the people or remembering their clothes" caption="Yarbus (1967): one viewer, one painting, seven questions. Asked to judge the family's wealth, the eyes roam over furniture and clothing; asked for the people's ages, they jump from face to face. Where we look is part of how we think." credit='Image: after A. L. Yarbus (1967), Eye Movements and Vision · Public domain · via <a href="https://commons.wikimedia.org/wiki/File:Yarbus_The_Visitor.jpg">Wikimedia Commons</a>' %}

**Whoever chooses the view does half of the reasoning.**

For years, that half belonged to us.

## When the model holds the camera

The shift happened quietly. Once vision-language models could call tools in the middle of their reasoning, cropping and zooming became actions like any other. What some labs call "thinking with images" is, structurally, an agent: it observes, decides on an action, observes again and eventually commits to an answer.

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

This sounds like a small change in interface. It is a large change in the problem.

When perception is a single forward pass, every input gets the same amount of computation, and a mistake is a mistake. When perception becomes a policy, the amount of looking varies from one image to the next, and mistakes compound. A model that zooms into the wrong quadrant early can spend the rest of its budget searching carefully in a place where the answer never was. A search that eventually succeeds usually contains a few decisive observations buried among many unremarkable ones.

In other words, visual search became a long-horizon problem. And long-horizon problems bring a familiar difficulty: when the episode finally ends, which step was responsible?

## The first instinct: reward the answer

The default way to train such models is the recipe that worked so well for mathematical reasoning: reinforcement learning on the final answer. Correct answer, reward. Wrong answer, nothing. It is simple, it scales, and it needs no labels beyond the answer itself.

For long visual search, I found it a blunt instrument, and the reasons are worth spelling out.

- **It cannot tell useful looks from wasted ones.** A trajectory with three decisive crops and seventeen idle ones receives the same reward as a clean three-step search.
- **It rewards luck.** A model that wanders around the image and stumbles onto the answer is reinforced as strongly as one that searched with purpose.
- **It punishes good search.** A model that found exactly the right region and then misread a single digit gets nothing, and every sensible step it took is pushed down along with the mistake.

The result is not just slower learning. It is the wrong habits. Models trained this way tend to drift towards one of two extremes: they look too little and guess, or they look at everything to be safe. Neither is what we want. What we want is a model that looks more when it is uncertain and less when it already knows.

**Sparse rewards do not only slow learning down. They teach the wrong lessons.**

> A good searcher is not the one that looks the most. It is the one that knows when one more look is worth it.
{: .pull}

## Putting credit at the joints

If the problem is credit assignment, then the work is to put credit where it belongs. Over the past year my group has approached this from several angles, each starting from a realization about where the credit was hiding.

The first realization was that **visual search is unusually checkable**. Much of it is geometry, and geometry can be computed rather than judged. Whether a crop overlaps the target, whether the search is getting closer, whether a region has already been covered: these can be scored at every step without asking another model for its opinion. That observation led to our hider–seeker self-play work, where one policy hides targets and another searches for them, and progress along a long search is rewarded with geometry-verifiable signals instead of a single verdict at the end.

The second was that **the most important decision is often the smallest**. Commit now, or look again? That choice decides both accuracy and cost, and it is exactly the choice that outcome rewards supervise least. So we isolated it: from the same search state, roll out one continuation that commits and one that looks again, and use the cost-aware difference in their returns as the value of one more observation. That credit goes only to the tokens that made the decision. When we measured existing models on this decision, they turned out to be poorly selective about when to look again, which says something about how much of their apparent search ability is habit rather than judgement.

The third was that **the bottleneck moves during training**. Spatial reasoning over images passes through perception, decomposition and inference, and which stage limits accuracy changes as the model improves. A fixed process reward is tuned for a bottleneck that may no longer exist. Letting the reward weights follow the policy, increasing the weight on whichever stage currently matters most, turned out to be more important than I expected.

These look like different techniques. To me they share a single idea: a long trajectory has natural joints, whether geometric steps, binary decisions or reasoning stages, and feedback should arrive at those joints rather than only at the end.

## Lessons beyond visual search

Visual search started as a specific problem for me. It has become the place where I think most clearly about agents in general. Several lessons from it seem broader than the domain.

### The environment is the research

When people talk about progress in reinforcement learning, they usually talk about algorithms. My experience is that the algorithm is rarely where the leverage is. The leverage is in the environment: what counts as an action, what can be observed, what can be verified and when. Change what a step means, or what is scored, and the same algorithm learns something completely different.

Shunyu Yao made a related argument in [*The Second Half*](https://ysymyth.github.io/The-Second-Half/): as methods converge, defining the problem and the evaluation becomes the main work. I would put it more bluntly for agent research. **The design of the environment is the design of the agent.** Most of what our models learn to do, they learn because of what we decided to reward.

### Verifiability decides what gets solved

Jason Wei has [written](https://www.jasonwei.net/blog) about the asymmetry between solving and verifying: tasks that are easy to check tend to be the ones AI masters first. Visual search is a good illustration. It is hard to do and, thanks to geometry, relatively easy to check. That combination is exactly why it is a productive training ground, and why I expect ideas from it to transfer to web agents, GUI agents and embodied agents, which share the same structure of long searches through large spaces with checkable progress.

The flip side is a warning. Where progress is hard to verify, as it is in much of open-ended reasoning, the same methods will struggle, and benchmarks will quietly reward whatever is easiest to measure. When I design a new task now, the first question I ask is not "is this hard?" but "can I check every step of it?"

### When data are scarce, let the problem generate itself

Long-horizon search data is expensive to label. Someone has to decide not only the answer but which steps were good. Self-play offers a way around this. If one agent creates tasks and another solves them, the task generator can be rewarded for staying at the edge of what the solver can do, neither trivial nor impossible. In our work on pursuit-evasion self-play for language reasoning, the task-setter's reward peaks when the solver succeeds about half the time. That turns "barely solvable" from a hand-tuned filter into something the system learns.

I find this one of the more hopeful ideas in the field. It suggests that for many agentic skills, the bottleneck is not data at all, but a well-designed game.

### Looking has a price

Every observation costs something. In a benchmark it costs tokens and latency. In pathology or remote sensing it costs computation over gigapixel images. For a drone or a robot it costs real time and energy that cannot be recovered. And for a clinician working alongside a model, it costs attention.

The field still treats this cost as an afterthought. We report accuracy and perhaps mention how many tool calls were used. But suppose one system reaches 80 percent accuracy with four looks and another reaches 81 percent with forty. Those are not close competitors. They are different systems, suited to different worlds. **Cost belongs inside the objective during training, and evaluation should report accuracy against the number of observations, not accuracy alone.**

### Knowing when to stop is part of intelligence

Watch an expert radiologist and you will notice that much of their skill is in what they do not look at. They recognize quickly when an image is normal, and spend their attention where it is needed. The same is true of an experienced field geologist, or a forecaster scanning a radar loop. Expertise is not exhaustive search. It is selective search.

Our models are not yet like this. They rarely say "the target is not in this image" and stop. They keep looking, or they invent an answer. Teaching an agent to stop, and to abstain when the evidence is not there, seems to me as important as teaching it to search well, and much less studied.

### Bigger eyes versus better judgement

For a decade, progress in visual understanding mostly came from better eyes: higher resolution, larger encoders, more pixels per token. That progress was real, and the bitter lesson suggests we should not bet against more scale. But I have come to think that scale and judgement are not in competition. More capable perception makes good search policies *more* valuable, not less, because each look yields more information. The open question is how to spend that capability wisely, and that is a question about decisions, not about pixels.

## What comes next

A few problems seem to me both important and wide open.

**Memory of where you have been.** Long searches need a record of what has already been ruled out. Without it, models revisit the same region and mistake repetition for diligence. I suspect the right representation is something like a map: spatial, persistent and cheap to update.

**Longer horizons in the physical world.** Video, 3D scenes and embodied agents stretch the horizon from tens of steps to hundreds, and each observation becomes physically expensive. Everything I have described about credit and cost becomes more severe.

**Evaluation that scores judgement.** We need benchmarks that ask not only whether the final answer was right, but whether the model looked in the right places, looked enough and stopped at the right time.

**A shared science of search.** Visual search, web browsing, code navigation and scientific exploration are all, at heart, searches through large spaces under a budget. I would like to see these communities borrow more from each other, because I think they are solving the same problem with different vocabularies.

When I was building models for radar and X-rays, I thought the goal was to see more clearly. I now think the goal was always to look more wisely. The past few years gave our models better eyes. The next few will have to teach them where to look, and when to stop.
