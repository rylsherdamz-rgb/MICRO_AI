-- ============================================================
-- MICRO — Seed Data
-- Mock companies and AI solutions for development
-- ============================================================

-- Companies (publishers)
insert into public.companies (name, slug, description, long_description, website_url, tags, rating, verified, stellar_address) values
  ('NeuralOps', 'neuralops', 'Enterprise-grade AI operations platform', 'NeuralOps builds production-ready AI agents for customer service, data analysis, and workflow automation. Trusted by Fortune 500 teams.', 'https://neuralops.io', array['ai-agents', 'enterprise', 'automation'], 4.7, true, 'GBNEURALOPSXXXXXXXXXXXXXXXXXXXXXXX'),
  ('ContentForge AI', 'contentforge-ai', 'AI content generation for modern teams', 'ContentForge specializes in marketing copy, blog posts, social media content, and SEO-optimized writing powered by fine-tuned LLMs.', 'https://contentforge.ai', array['content', 'marketing', 'nlp'], 4.3, true, 'GBCONTENTFORGEXXXXXXXXXXXXXXXXXXXX'),
  ('DataMind Labs', 'datamind-labs', 'Predictive analytics and forecasting AI', 'DataMind builds custom forecasting models for inventory, sales, and business metrics. Plug into your existing data warehouse and get predictions in hours.', 'https://datamind.dev', array['analytics', 'forecasting', 'ml'], 4.1, false, 'GBDATAMINDXXXXXXXXXXXXXXXXXXXXXXXX'),
  ('TutorChain', 'tutorchain', 'Decentralized AI tutoring platform', 'TutorChain connects students with specialized AI tutors for math, science, coding, and languages. Each tutor is a fine-tuned model with verified accuracy.', 'https://tutorchain.xyz', array['education', 'tutoring', 'ai-models'], 4.5, true, 'GBTUTORCHAINXXXXXXXXXXXXXXXXXXXXXX'),
  ('Agentix', 'agentix', 'Custom AI agents for every workflow', 'Agentix lets you build, train, and deploy custom AI agents without writing code. Visual builder + marketplace of pre-built skills.', 'https://agentix.io', array['no-code', 'agents', 'automation'], 3.9, false, 'GBAGENTIXXXXXXXXXXXXXXXXXXXXXXXXXX'),
  ('StellarPay AI', 'stellarpay-ai', 'AI-powered financial tools on Stellar', 'StellarPay AI builds trading bots, portfolio optimizers, and DeFi analytics tools that run natively on the Stellar network.', 'https://stellarpay.ai', array['finance', 'defi', 'stellar'], 4.0, true, 'GBSTELLARPAYXXXXXXXXXXXXXXXXXXXXXX');

-- AI Solutions
insert into public.ai_solutions (company_id, title, slug, description, long_description, category, pricing_model, pricing_amount, asset_code, use_cases, examples, tech_stack, status, installs_count) values
  (
    (select id from public.companies where slug = 'neuralops'),
    'Customer Support Agent',
    'customer-support-agent',
    'AI agent that handles tier-1 support tickets with 90%+ resolution rate',
    'Deploy a production-ready support agent that integrates with Zendesk, Intercom, or your custom helpdesk. Handles common queries, triages complex issues, and learns from your knowledge base.',
    'Customer Support',
    'subscription',
    199.00,
    'USDC',
    array['ticket triage', 'knowledge base qa', 'refund processing', 'account inquiries'],
    '[{"title": "E-commerce Returns", "description": "Automated returns process for a Shopify store", "output": "Reduced support tickets by 62% in 30 days"}]',
    array['GPT-4o', 'RAG', 'Zendesk API', 'Slack'],
    'published',
    1240
  ),
  (
    (select id from public.companies where slug = 'contentforge-ai'),
    'Marketing Campaign Generator',
    'marketing-campaign-generator',
    'Generate full marketing campaigns — copy, visuals, and audience targeting',
    'Describe your product and target audience. The Campaign Generator produces ad copy, email sequences, social posts, and targeting suggestions across channels.',
    'Marketing',
    'subscription',
    79.00,
    'XLM',
    array['ad copy', 'email sequences', 'social media posts', 'landing page copy'],
    '[{"title": "SaaS Product Launch", "description": "Generated full campaign for B2B SaaS launch", "output": "12% conversion rate on launch week, 3400 signups"}]',
    array['Claude', 'Stable Diffusion', 'Mailchimp API', 'Meta Ads API'],
    'published',
    890
  ),
  (
    (select id from public.companies where slug = 'datamind-labs'),
    'Inventory Forecasting Assistant',
    'inventory-forecasting-assistant',
    'Predict demand, optimize stock levels, and reduce waste with ML',
    'Connects to your ERP or spreadsheet. Uses historical sales data, seasonality, and external signals to forecast demand 30/60/90 days out.',
    'Data Analysis',
    'one_time',
    499.00,
    'USDC',
    array['demand forecasting', 'inventory optimization', 'supply chain analytics', 'waste reduction'],
    '[{"title": "Retail Chain Optimization", "description": "Forecasted demand across 200 SKUs for a retail chain", "output": "18% reduction in stockouts, 22% less waste"}]',
    array['Prophet', 'XGBoost', 'PostgreSQL', 'REST API'],
    'published',
    567
  ),
  (
    (select id from public.companies where slug = 'tutorchain'),
    'AI Math Tutor',
    'ai-math-tutor',
    'Personalized math tutoring from arithmetic to calculus',
    'An adaptive AI tutor that diagnoses knowledge gaps, generates practice problems, and explains concepts step-by-step. Covers K-12 through college-level math.',
    'Education',
    'subscription',
    29.00,
    'XLM',
    array['homework help', 'test prep', 'concept mastery', 'adaptive learning'],
    '[{"title": "High School Algebra", "description": "Used by 200 students for semester-long algebra support", "output": "Average grade improvement of 1.5 letter grades"}]',
    array['Fine-tuned Llama', 'Wolfram Alpha API', 'LaTeX rendering'],
    'published',
    2100
  ),
  (
    (select id from public.companies where slug = 'agentix'),
    'Research Assistant',
    'research-assistant',
    'AI that reads papers, summarizes findings, and connects ideas',
    'Upload research papers, URLs, or topics. The Research Assistant reads everything, extracts key findings, cross-references claims, and produces structured summaries.',
    'Research',
    'usage_based',
    0.05,
    'XLM',
    array['literature review', 'paper summarization', 'claim verification', 'knowledge graphs'],
    '[{"title": "PhD Literature Review", "description": "Processed 150 papers for a computer science PhD", "output": "Reduced literature review time from 3 weeks to 2 days"}]',
    array['Claude', 'Semantic Scholar API', 'Neo4j', 'ArXiv API'],
    'published',
    734
  ),
  (
    (select id from public.companies where slug = 'stellarpay-ai'),
    'Stellar Trading Bot',
    'stellar-trading-bot',
    'Automated market-making and arbitrage bot for Stellar DEX',
    'An AI-powered trading bot that monitors Stellar DEX order books, identifies arbitrage opportunities, and executes trades with configurable risk parameters.',
    'Finance',
    'one_time',
    299.00,
    'XLM',
    array['market making', 'arbitrage', 'portfolio rebalancing', 'yield optimization'],
    '[{"title": "SDEX Market Making", "description": "Provided liquidity for XLM/USDC pair on Stellar DEX", "output": "Generated 8% monthly yield with 2% max drawdown"}]',
    array['Stellar SDK', 'Python', 'TensorFlow', 'Horizon API'],
    'published',
    445
  ),
  (
    (select id from public.companies where slug = 'neuralops'),
    'Code Review Agent',
    'code-review-agent',
    'Automated PR reviews with security scanning and best-practice checks',
    'Integrates with GitHub/GitLab. Reviews every PR for bugs, security issues, style violations, and architectural concerns. Learns your team conventions over time.',
    'Developer Tools',
    'subscription',
    149.00,
    'USDC',
    array['pr review', 'security scanning', 'style enforcement', 'architecture review'],
    '[{"title": "Startup Dev Team", "description": "Automated all PR reviews for a 12-person engineering team", "output": "Caught 47 bugs before merge in first month, 30% faster review cycle"}]',
    array['Claude', 'GitHub API', 'Semgrep', 'ESLint'],
    'published',
    980
  ),
  (
    (select id from public.companies where slug = 'contentforge-ai'),
    'SEO Content Optimizer',
    'seo-content-optimizer',
    'AI that writes and optimizes content for search rankings',
    'Research keywords, analyze SERP competitors, and generate SEO-optimized articles, meta descriptions, and title tags. Includes readability scoring and internal linking suggestions.',
    'Marketing',
    'subscription',
    49.00,
    'XLM',
    array['blog posts', 'meta descriptions', 'keyword research', 'content audits'],
    '[{"title": "SaaS Blog Growth", "description": "Generated 40 SEO-optimized articles for a B2B SaaS blog", "output": "Organic traffic grew from 2k to 25k monthly visitors in 6 months"}]',
    array['GPT-4o', 'Ahrefs API', 'Google Search Console API'],
    'published',
    1560
  );