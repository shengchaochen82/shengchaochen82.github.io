---
layout: blog
title: Blog
permalink: /blog/
---

<section class="blog-hero">
  <div class="blog-mast">
    <p class="blog-eyebrow">Inspired by modern blog showcases</p>
    <h1>Ideas, Experiments, and Research Notes</h1>
    <p>
      This space is independent from my academic homepage and designed as a dedicated writing interface.
      I use it to record paper insights, engineering lessons, and practical AI experiments.
    </p>
  </div>
  <aside class="blog-spotlight">
    <p class="spotlight-title">Design Direction</p>
    <span class="spotlight-chip"><i class="fa-solid fa-layer-group"></i> Card-based feed</span>
    <span class="spotlight-chip"><i class="fa-solid fa-newspaper"></i> Readability-first typography</span>
    <span class="spotlight-chip"><i class="fa-solid fa-swatchbook"></i> Bento-inspired hero</span>
    <p class="spotlight-text">The layout blends clean SaaS blog structures with editorial reading comfort.</p>
  </aside>
</section>

<section class="blog-feed">
  <div class="section-heading">
    <h2>Latest Posts</h2>
    <span class="post-count">{{ site.posts | size }} posts</span>
  </div>

  {% if site.posts and site.posts.size > 0 %}
  <div class="post-grid">
    {% for post in site.posts %}
    <article class="post-card">
      <p class="post-meta">{{ post.date | date: "%b %d, %Y" }}</p>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      {% if post.tags and post.tags.size > 0 %}
      <div class="tag-row">
        {% for tag in post.tags limit: 3 %}
        <span class="tag-pill">{{ tag }}</span>
        {% endfor %}
      </div>
      {% endif %}
      <p>{{ post.excerpt | strip_html | truncate: 160 }}</p>
      <a class="read-link" href="{{ post.url | relative_url }}">Read post <i class="fa-solid fa-arrow-right"></i></a>
    </article>
    {% endfor %}
  </div>
  {% else %}
  <div class="empty-card">
    <p>No posts yet. Add your first article in <code>_posts/</code>.</p>
  </div>
  {% endif %}
</section>

<section class="writing-note">
  <h3>How to publish a new post</h3>
  <ol>
    <li>Create a file in <code>_posts/</code> with format <code>YYYY-MM-DD-title.md</code>.</li>
    <li>Set <code>layout: blog</code>, title, and optional tags in front matter.</li>
    <li>Push to GitHub; the post will appear automatically here.</li>
  </ol>
  <pre><code>---
layout: blog
title: "Your Post Title"
tags: [research, note]
---

Write your content in Markdown.
</code></pre>
</section>
