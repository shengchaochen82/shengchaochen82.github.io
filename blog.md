---
layout: blog
title: Blog
permalink: /blog/
description: Reflections by Shengchao Chen on agents, post-training, AI for science, and where the field is heading.
---

<section class="index-head">
  <p class="index-kicker">Since 2026 · Sydney</p>
  <h1 class="index-title">Blog</h1>
  <p class="index-dek">Reflections on the road so far, and on where agents, post-training and AI for science are heading.</p>
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
<p class="index-empty">The first post is on its way.</p>
{% endif %}
