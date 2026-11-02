---
layout: blog
title: Blog
permalink: /blog/
description: Notes by Shengchao Chen on agentic AI, post-training, and AI for scientific design.
---

<h1 class="blog-index-title">Blog</h1>
<p class="blog-index-intro">Notes on agentic AI, post-training, and AI for scientific design.</p>

{% if site.posts.size > 0 %}
<ol class="blog-list">
  {% for post in site.posts %}
  <li class="blog-item">
    <time class="blog-item-date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time>
    <div class="blog-item-body">
      <a class="blog-item-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
      {% if post.description %}<p class="blog-item-desc">{{ post.description }}</p>{% endif %}
    </div>
  </li>
  {% endfor %}
</ol>
{% else %}
<p class="blog-index-intro">No posts yet.</p>
{% endif %}
