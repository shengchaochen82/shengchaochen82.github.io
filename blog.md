---
layout: blog
title: Essays
permalink: /blog/
description: Essays by Shengchao Chen on agents, post-training, and the craft of scientific design.
---

<section class="index-head">
  <p class="index-kicker">Since 2026 · Sydney</p>
  <h1 class="index-title">Essays</h1>
  <p class="index-dek">Arguments and working notes on agents, post-training, and the craft of scientific design.</p>
</section>

{% if site.posts.size > 0 %}
<ol class="essay-list" reversed>
  {% for post in site.posts %}
  {% assign n = site.posts.size | minus: forloop.index0 %}
  {% assign words = post.content | strip_html | number_of_words %}
  {% assign minutes = words | divided_by: 220 | plus: 1 %}
  <li>
    <a class="entry" href="{{ post.url | relative_url }}">
      <span class="entry-no" aria-hidden="true">{% if n < 10 %}0{% endif %}{{ n }}</span>
      <span class="entry-body">
        <span class="entry-meta"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time> · {{ minutes }} min read</span>
        <span class="entry-title"><span>{{ post.title }}</span></span>
        {% if post.description %}<span class="entry-dek">{{ post.description }}</span>{% endif %}
      </span>
    </a>
  </li>
  {% endfor %}
</ol>
{% else %}
<p class="index-empty">The first essay is on its way.</p>
{% endif %}
