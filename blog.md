---
layout: homepage
title: Blog
permalink: /blog/
---

<div class="blog-hero-panel">
  <div class="blog-hero-content">
    <p class="blog-eyebrow">Research Notes</p>
    <h2>Blog</h2>
    <p class="blog-hero-text">
      I share quick ideas, project updates, and notes from papers and experiments.
      This page is the long-term archive of my thinking process.
    </p>
    <a class="blog-home-link" href="{{ "/" | relative_url }}">
      <i class="fa-solid fa-arrow-left"></i> Back to Homepage
    </a>
  </div>
  <div class="blog-hero-badge">
    <i class="fa-solid fa-feather-pointed"></i>
  </div>
</div>

<div class="blog-list-wrapper">
  <div class="blog-list-header">
    <h3>Latest Posts</h3>
    <span class="blog-count">{{ site.posts | size }} posts</span>
  </div>

  {% if site.posts and site.posts.size > 0 %}
  <div class="blog-grid">
    {% for post in site.posts %}
    <article class="blog-card">
      <div class="blog-card-top">
        <span class="blog-date">{{ post.date | date: "%b %d, %Y" }}</span>
        {% if post.tags and post.tags.size > 0 %}
        <div class="blog-tags">
          {% for tag in post.tags limit: 3 %}
          <span class="blog-tag">{{ tag }}</span>
          {% endfor %}
        </div>
        {% endif %}
      </div>
      <h4 class="blog-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h4>
      <p class="blog-excerpt">{{ post.excerpt | strip_html | truncate: 170 }}</p>
      <a class="blog-read-link" href="{{ post.url | relative_url }}">Read post <i class="fa-solid fa-arrow-right"></i></a>
    </article>
    {% endfor %}
  </div>
  {% else %}
  <div class="blog-empty-state">
    <i class="fa-regular fa-pen-to-square"></i>
    <p>No posts yet. Start with your first blog in <code>_posts/</code>.</p>
  </div>
  {% endif %}
</div>

<div class="blog-writing-panel">
  <h3>How to Add a New Blog Post</h3>
  <ol>
    <li>Create a Markdown file in <code>_posts/</code>.</li>
    <li>Use file name format: <code>YYYY-MM-DD-title.md</code>.</li>
    <li>Add front matter and content in Markdown.</li>
  </ol>

```markdown
---
layout: homepage
title: "Your Post Title"
tags: [research, note]
---

Write your blog content here.
```
</div>

<style>
.blog-hero-panel {
  margin: 24px 0 28px;
  padding: 26px;
  border-radius: 20px;
  background: linear-gradient(130deg, #f6fbff 0%, #f5f7ff 50%, #fff8f2 100%);
  border: 1px solid rgba(102, 153, 204, 0.2);
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  box-shadow: 0 14px 30px rgba(68, 119, 170, 0.08);
}

.blog-eyebrow {
  margin: 0 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #4477aa;
  font-size: 0.74rem;
  font-weight: 700;
}

.blog-hero-panel h2 {
  margin: 0 0 10px;
  font-size: 2rem;
}

.blog-hero-text {
  margin: 0 0 14px;
  color: #4b5563;
  line-height: 1.65;
  max-width: 600px;
}

.blog-home-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.blog-hero-badge {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: #ffffff;
  background: linear-gradient(145deg, #4477aa, #6699cc);
  box-shadow: 0 8px 20px rgba(68, 119, 170, 0.25);
  flex-shrink: 0;
}

.blog-list-wrapper {
  margin: 0 0 28px;
  padding: 24px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
}

.blog-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}

.blog-list-header h3 {
  margin: 0;
}

.blog-count {
  font-size: 0.84rem;
  color: #667085;
  background: #f2f4f7;
  border-radius: 999px;
  padding: 4px 10px;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 14px;
}

.blog-card {
  border: 1px solid rgba(102, 153, 204, 0.2);
  border-radius: 14px;
  padding: 14px;
  background: linear-gradient(160deg, #ffffff, #f8fbff);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(68, 119, 170, 0.12);
}

.blog-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.blog-date {
  font-size: 0.8rem;
  color: #4477aa;
  font-weight: 600;
}

.blog-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.blog-tag {
  font-size: 0.72rem;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(68, 119, 170, 0.12);
  color: #355f8a;
}

.blog-title {
  margin: 10px 0 8px;
  line-height: 1.35;
  font-size: 1.05rem;
}

.blog-title a {
  color: #0b365f;
}

.blog-excerpt {
  margin: 0 0 10px;
  color: #4b5563;
  font-size: 0.92rem;
  line-height: 1.55;
}

.blog-read-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 0.9rem;
}

.blog-empty-state {
  border: 1px dashed rgba(68, 119, 170, 0.35);
  border-radius: 14px;
  padding: 20px;
  text-align: center;
  color: #4b5563;
}

.blog-empty-state i {
  font-size: 1.4rem;
  color: #4477aa;
  margin-bottom: 8px;
}

.blog-writing-panel {
  margin: 0 0 24px;
  padding: 22px;
  border-radius: 16px;
  background: linear-gradient(180deg, #ffffff, #fbfdff);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
}

.blog-writing-panel h3 {
  margin-top: 0;
}

.blog-writing-panel ol {
  margin: 0 0 12px 18px;
}

@media (max-width: 768px) {
  .blog-hero-panel {
    flex-direction: column;
    align-items: flex-start;
  }

  .blog-hero-badge {
    width: 54px;
    height: 54px;
    font-size: 1.1rem;
  }

  .blog-list-wrapper,
  .blog-writing-panel {
    padding: 16px;
  }
}

@media (prefers-color-scheme: dark) {
  .blog-hero-panel {
    background: linear-gradient(130deg, #1f2937 0%, #182538 50%, #2f1e1a 100%);
    border-color: rgba(99, 179, 237, 0.35);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
  }

  .blog-hero-text,
  .blog-count,
  .blog-excerpt,
  .blog-empty-state,
  .blog-writing-panel ol {
    color: #cbd5e1;
  }

  .blog-list-wrapper,
  .blog-writing-panel {
    background: #1f2937;
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.32);
  }

  .blog-count {
    background: #111827;
  }

  .blog-card {
    background: linear-gradient(160deg, #243447, #1f2937);
    border-color: rgba(99, 179, 237, 0.26);
  }

  .blog-title a,
  .blog-list-header h3,
  .blog-writing-panel h3 {
    color: #e2e8f0;
  }

  .blog-tag {
    background: rgba(99, 179, 237, 0.2);
    color: #bfdbfe;
  }

  .blog-empty-state {
    border-color: rgba(99, 179, 237, 0.4);
  }
}
</style>
