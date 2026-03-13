# BLOG POST WORKFLOW - AUTOMATIC SOCIAL MEDIA INTEGRATION

**Created:** 2025-01-31
**Purpose:** Ensure Website Orchestrator ALWAYS coordinates with Social Media Orchestrator

---

## ✅ MANDATORY WORKFLOW FOR EVERY BLOG POST

### **Step 1: Write Blog Post**
- Research topic
- Write 1500-3000 word blog post
- Optimize for SEO
- Save to `/src/content/blog/`

### **Step 2: AUTOMATICALLY Post to Social Inbox**
**DO THIS EVERY TIME - NO EXCEPTIONS**

Update `/assistants/_shared/SOCIAL_INBOX.md`:
```markdown
## 📋 PENDING ITEMS

### New Blog Published: [TITLE]
**Date:** [YYYY-MM-DD]
**URL:** seaready.co.uk/blog/[slug]
**Title:** [Full Title]

**LinkedIn angles:**
- [Angle 1 - key insight]
- [Angle 2 - practical tip]
- [Angle 3 - common mistake]
- [Angle 4 - discussion question]
- [Angle 5 - deadline/urgency]

**Target keywords:** [list]
**Target audience:** [workboat operators / pilot orgs / merchant vessels]
```

### **Step 3: PROMPT USER**
**ALWAYS say to user:**

> ✅ **Blog post complete and published!**
>
> 📬 **I've posted this to SOCIAL_INBOX.md for the Social Media Orchestrator.**
>
> **Suggested LinkedIn angles:**
> 1. [Angle 1]
> 2. [Angle 2]
> 3. [Angle 3]
> 4. [Angle 4]
> 5. [Angle 5]
>
> **Would you like me to:**
> - A) You handle social posts manually
> - B) Switch to Social Media Orchestrator to create LinkedIn posts now
> - C) Social team can handle it later

### **Step 4: User Decides**
- **Option A:** User handles it themselves
- **Option B:** User switches to Social Media Orchestrator immediately
- **Option C:** Social team picks it up next session

---

## 🚨 CRITICAL REMINDER

**NEVER publish a blog without:**
1. ✅ Posting notification to SOCIAL_INBOX.md
2. ✅ Suggesting LinkedIn angles to user
3. ✅ Asking if they want to coordinate with Social Media Orchestrator

This ensures every blog gets maximum reach through LinkedIn.

---

## 📝 BLOG POST TEMPLATE

When writing blogs, always include in frontmatter:
```yaml
---
title: "Blog Title"
author: J. Fulton
role: Marine Pilot & Founder
date: YYYY-MM-DD
readTime: X min read
category: Maritime Insights | Compliance | Product Updates
heroImage: /images/blog/[image].jpg
cardImage: /images/blog/[image]-card.jpg
excerpt: Brief summary for cards and SEO
tags: [tag1, tag2, tag3]
relatedPosts: [slug1, slug2]
---
```

---

## 🎯 LINKEDIN ANGLE TEMPLATES

### Compliance Posts
- "WBC3 deadline is [X] months away. Here's what you need..."
- "The biggest mistake I see with [topic]..."
- "MCA inspectors always check this first..."

### Industry Insights
- "The maritime industry is changing. Here's what I'm seeing..."
- "New MCA guidance just dropped. Key takeaways..."

### Product/How-To
- "How we reduced SMS admin from 30 hours to 3..."
- "A pilot showed me this trick for [task]..."

### Discussion Starters
- "Is your SMS actually helping or just checking boxes?"
- "Should [controversial opinion]? Let me explain..."

---

**Last updated:** 2025-01-31
