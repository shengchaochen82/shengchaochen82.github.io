---
layout: blog
title: Blog
permalink: /blog/
description: Opinions and notes by Shengchao Chen on agentic AI, post-training, and AI for scientific design.
---

<header class="blog-index-header">
  <h1>Blog</h1>
  <p>Opinions and notes on agentic AI, post-training, and AI for scientific design.</p>
</header>

{% if site.posts.size > 0 %}
<ol class="blog-list">
  {% for post in site.posts %}
  {% assign words = post.content | strip_html | number_of_words %}
  {% assign minutes = words | divided_by: 220 | plus: 1 %}
  <li class="blog-item">
    <p class="blog-item-meta"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time> · {{ minutes }} min read</p>
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    {% if post.description %}<p class="blog-item-desc">{{ post.description }}</p>{% endif %}
    {% if post.tags and post.tags.size > 0 %}<p class="blog-item-tags">{{ post.tags | join: " · " }}</p>{% endif %}
    <a class="blog-item-more" href="{{ post.url | relative_url }}">Read the essay <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
  </li>
  {% endfor %}
</ol>
{% else %}
<p class="blog-empty">No posts yet.</p>
{% endif %}
