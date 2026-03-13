# BUSINESS INTEGRATION INSTRUCTIONS
## For SeaReady Website Orchestrator

**Created:** 2025-12-12
**Purpose:** Instructions for integrating with the central Business folder system

---

## OVERVIEW

The SeaReady Website Orchestrator now integrates with the **Business Orchestrator** system.

You handle:
- Marketing website development
- Content creation
- SEO optimization
- Landing pages
- Website hosting

Business Orchestrator handles:
- Marketing strategy
- Domain management
- Hosting expenses
- Marketing budget
- Business decisions

---

## YOUR INBOX FILE

**Location:** `/Users/jonathanfulton/Business/_shared/WEBSITE_INBOX.md`

**Check this file:** EVERY session startup

**What it contains:** Tasks and instructions FROM the Business Orchestrator TO you

---

## STARTUP ROUTINE (ADD THIS)

Add to your existing `load_project_context()` function:

```python
def load_project_context() -> dict:
    """Load all project context files."""

    # Your existing context loading...
    context = {
        "brand": load_file_content(f"{CONTEXT_PATH}/BRAND_PALETTE.md"),
        #... other context...
    }

    # ADD THIS - Business inbox integration
    business_inbox_path = "/Users/jonathanfulton/Business/_shared/WEBSITE_INBOX.md"
    try:
        with open(business_inbox_path, 'r') as f:
            business_inbox = f.read()
        context["business_inbox"] = business_inbox

        # Check for pending tasks
        if "⏳ PENDING" in business_inbox:
            print("[yellow]⚠️  You have pending tasks from Business Orchestrator[/yellow]")
    except:
        context["business_inbox"] = "[Business inbox not found]"

    return context
```

Then update your system prompt:

```python
def build_system_prompt(context: dict) -> str:
    prompt = f"""
    {your_existing_prompt}

    ## BUSINESS FOLDER INTEGRATION

    Your inbox: {context['business_inbox']}

    If there are ⏳ PENDING tasks, process them first.
    """
    return prompt
```

---

## WHEN TO FILE TO BUSINESS FOLDER

### 1. HOSTING & DOMAIN EXPENSES

**When:** ANY website cost (domains, hosting upgrades, CDN, email)
**Examples:** Domain renewals, Vercel Pro upgrade, Google Workspace

**Action:**
```markdown
# In Business inbox, create entry:

### [YYYY-MM-DD] - Website Expense Needs Logging
**From:** Website Orchestrator
**Status:** ⏳ PENDING
**Action:** Log expense to `/Business/02-FINANCE/accounting/expenses/`
**Details:**
- Supplier: [GoDaddy/Vercel/Google/etc]
- Amount: £X.XX + £Y.YY VAT
- Category: [Domains/Hosting/Email]
- Recurring: [YES/NO]
- Receipt: [Location]
**For:** [What this is for - domain renewal, hosting upgrade, etc]
```

**IMPORTANT:** Recurring costs must also go to subscriptions register:
```markdown
**Also add to:** /Business/02-FINANCE/subscriptions/SUBSCRIPTIONS_REGISTER.md
```

### 2. MARKETING DECISIONS

**When:** Major content/strategy/hosting decisions
**Examples:** Hosting platform choice, domain strategy, email provider

**Action:**
```markdown
# In Business inbox:

### [YYYY-MM-DD] - Marketing Decision Needs Filing
**From:** Website Orchestrator
**Status:** ⏳ PENDING
**Action:** File to `/Business/04-MARKETING/website/decisions/`
**Decision:** [Brief title]
**Summary:** [What was decided and why]
**Cost Impact:** [Any budget implications]
**File Name:** [suggested-filename.md]
```

### 3. REPORTS & STRATEGIES

**When:** You create reports, strategies, or plans
**Examples:** Hosting strategy report, SEO plan, content calendar

**Action:**
```markdown
# In Business inbox:

### [YYYY-MM-DD] - Report Needs Filing
**From:** Website Orchestrator
**Status:** ⏳ PENDING
**Action:** Copy report to Business folder
**Report:** [Title]
**Current Location:** [Your local path]
**File To:** /Business/04-MARKETING/website/[subdirectory]/
**Summary:** [One paragraph of what the report contains]
```

---

## COMMUNICATION WITH BUSINESS ORCHESTRATOR

### For Questions/Requests

**Use:** `/Users/jonathanfulton/Business/_SHARED/NOTICEBOARD.md`

**Format:**
```markdown
### Q-[YYYY-MM-DD]-[NNN]
**From:** Website Orchestrator
**To:** Business Orchestrator
**Date:** [Date]
**Status:** PENDING

**Question:**
[Your question here]

**Answer:**
[Business Orchestrator will fill this in]
```

**Example Questions:**
- "Should we buy seaready.com domain (£7,000)? Or stick with .co.uk/.app?"
- "Website traffic growing - upgrade Vercel to Pro (£20/month)?"
- "Need blog content - should we budget for copywriter?"

---

## COMPLETING INBOX TASKS

When you complete a task from your inbox:

1. **Update the status:**
```markdown
**Status:** ✅ COMPLETE
```

2. **Add result:**
```markdown
**Result:** [What you did - file copied, decision logged, etc]
```

3. **Optionally mark as completed** (Business Orchestrator will archive it)

---

## FILE PATHS YOU NEED TO KNOW

| Path | What's There | When to Use |
|------|--------------|-------------|
| `/Business/_shared/WEBSITE_INBOX.md` | Tasks FOR you | Read every startup (READ ONLY) |
| `/Business/_shared/NOTICEBOARD.md` | Questions between orchestrators | Ask Business Orchestrator (READ ONLY) |
| `/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/docs/` | **YOUR writing location** | Write all reports/strategies here |

**IMPORTANT - WRITE PERMISSIONS:**
- ✅ **CAN WRITE:** `/Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/` (your workspace)
- ❌ **CANNOT WRITE:** `/Users/jonathanfulton/Business/` (permission denied)

**Workflow:**
1. You write files to your `docs/` folder
2. You update inbox task to ✅ COMPLETE with file location
3. Business Orchestrator files it to proper Business folder

---

## CURRENT PENDING TASK (AS OF 2025-12-12)

You already have ONE pending task in your inbox:

```markdown
### 2025-12-12 - File Hosting Strategy Report
**From:** Business Orchestrator
**Status:** ⏳ PENDING
**Action:** Copy HOSTING_STRATEGY_REPORT.md to Business folder
**Details:** The hosting strategy report needs to be filed for permanent record
**From:** /Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/docs/HOSTING_STRATEGY_REPORT.md
**To:** /Business/04-MARKETING/website/hosting-strategy/reports/HOSTING_STRATEGY_REPORT.md
```

**TODO:** Process this task in your next session!

---

## EXAMPLES

### Example 1: Domain Renewal

GoDaddy charges for seaready.co.uk annual renewal.

**DO THIS:**
```markdown
# Write to /Business/_shared/WEBSITE_INBOX.md:

### 2025-08-08 - Domain Renewal Expense
**From:** Website Orchestrator
**Status:** ⏳ PENDING
**Action:** Log domain renewal expense
**Details:**
- Supplier: GoDaddy
- Domain: seaready.co.uk (1 year renewal)
- Amount: £4.99 + £1.00 VAT = £5.99 total
- Receipt: [Receipt #XXXXX - in Jonathan's email]
- Next Renewal: August 2026
**Also:** Update SUBSCRIPTIONS_REGISTER renewal date
```

### Example 2: Hosting Upgrade Decision

Traffic is growing, considering Vercel Pro.

**DO THIS:**
```markdown
# Write to /Business/_shared/NOTICEBOARD.md:

### Q-2025-12-15-002
**From:** Website Orchestrator
**To:** Business Orchestrator
**Date:** 2025-12-15
**Status:** PENDING

**Question:**
Website traffic is at 80% of Vercel free tier bandwidth (100GB/month).

Options:
1. Optimize to stay on free tier (no cost, requires work)
2. Upgrade to Pro tier (£20/month, immediate)

Current traffic trend: +20% per month
Estimated cost if we upgrade: £240/year

Should we upgrade now or optimize first?

**Answer:**
[Waiting for Business Orchestrator response]
```

### Example 3: Content Strategy Report

You created a comprehensive SEO strategy.

**DO THIS:**
```markdown
# Write to /Business/_shared/WEBSITE_INBOX.md:

### 2025-12-16 - SEO Strategy Report Ready
**From:** Website Orchestrator
**Status:** ⏳ PENDING
**Action:** File report to Business marketing folder
**Report:** SEO_STRATEGY_2026.md
**Location:** /Users/jonathanfulton/REGULATION APP/SeaReady/assistants/website/docs/SEO_STRATEGY_2026.md
**File To:** /Business/04-MARKETING/website/seo/SEO_STRATEGY_2026.md
**Summary:** Complete SEO plan for 2026 including keyword research, content calendar, link building strategy. Estimated 6-month implementation.
```

---

## RULES

1. **DON'T modify Business folder files directly** - notify Business Orchestrator via inbox
2. **DO check your inbox every session** - Business may have tasks for you
3. **DO report ALL website costs** - domains, hosting, email, everything
4. **DO file major reports/strategies** - Business needs these for records
5. **DO ask budget questions** - don't assume what's affordable

---

## INTEGRATION CHECKLIST

Before going live with this integration, ensure:

- [ ] Your `load_project_context()` reads WEBSITE_INBOX.md
- [ ] Your system prompt mentions Business integration
- [ ] You know how to post to NOTICEBOARD.md
- [ ] You know how to update inbox task status
- [ ] You process that pending hosting report task!

---

*This file should be READ at startup by the Website Orchestrator to understand Business integration.*
