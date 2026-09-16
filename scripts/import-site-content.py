#!/usr/bin/env python3
"""Import the exekova.com site content (industries, use cases, solutions, leaders,
scenarios) into typed data modules for the standalone exekova site.

Content only: every string comes from apps/site/content in the monorepo. The
page designs stay this repo's own. Prose is normalised to the lowercase brand
spelling this site uses.
"""
import json, pathlib, re, sys

import os
SRC = pathlib.Path(os.environ.get('EXEKOVA_SITE_CONTENT', '/Users/neeki/Downloads/workinzo/apps/site/content'))
OUT = pathlib.Path(__file__).resolve().parent.parent / 'src/site/data'

def load(rel): return json.loads((SRC / rel).read_text())

CATEGORY_FIXES = [
    ('What is Autonomous Work Execution?', 'What does an Autonomous Work Execution Platform do?'),
    ('Autonomous Work Execution is the coordination and execution of work across', 'An Autonomous Work Execution Platform coordinates and executes work across'),
    ('Autonomous Work Execution defined, with the terms it depends on', 'The Autonomous Work Execution Platform defined, with the terms it depends on'),
    ('Autonomous Work Execution - the category, defined', 'Autonomous Work Execution Platform - the category, defined'),
    ('How is Autonomous Work Execution different from', 'How is an Autonomous Work Execution Platform different from'),
    ('Autonomous Work Execution plans against an objective', 'An Autonomous Work Execution Platform plans against an objective'),
    ('Autonomous Work Execution is given an objective', 'an Autonomous Work Execution Platform is given an objective'),
]

def category(text):
    """The category is always named in full: an Autonomous Work Execution Platform, never the bare phrase."""
    for old, new in CATEGORY_FIXES: text = text.replace(old, new)
    text = re.sub(r'\bAutonomous Work Execution\b(?! Platform)', 'Autonomous Work Execution Platform', text)
    text = re.sub(r'\bautonomous work execution\b(?! platform)', 'autonomous work execution platform', text)
    text = re.sub(r'\bAUTONOMOUS WORK EXECUTION\b(?! PLATFORM)', 'AUTONOMOUS WORK EXECUTION PLATFORM', text)
    return text

def norm(value):
    """Lowercase the brand in prose (this site writes 'exekova') and name the category in full, recursively."""
    if isinstance(value, str): return category(re.sub(r'\bExekova\b', 'exekova', value)).replace(chr(0x2014), '-').replace(' – ', ', ').replace('–', '-')
    if isinstance(value, list):
        out = [norm(v) for v in value]
        if out and all(isinstance(v, str) for v in out):
            seen = set(); out = [v for v in out if not (v in seen or seen.add(v))]
        return out
    if isinstance(value, dict): return {k: norm(v) for k, v in value.items()}
    return value

def parts(headline):
    """[{text, accent?}, ...] or [str, str] -> [str, str]"""
    out = [p['text'] if isinstance(p, dict) else p for p in headline]
    return [out[0], ' '.join(out[1:])] if len(out) > 1 else [out[0], '']

def split_run(run):
    at = run.find(': ')
    if 1 <= at <= 24 and re.match(r'^[A-Z][A-Za-z]*( [a-z]+)?$', run[:at]):
        return {'stage': run[:at], 'text': run[at + 2:]}
    return {'stage': None, 'text': run}

TONE = {'green': 'leaf', 'blue': 'azure', 'violet': 'violet', 'teal': 'teal'}

def emit(name, header, exports):
    body = header.rstrip() + '\n\n'
    for const_name, type_name, value in exports:
        body += f'export const {const_name}: {type_name} = {json.dumps(norm(value), ensure_ascii=False, indent=2)};\n\n'
    (OUT / name).write_text(body)
    print(f'wrote {name} ({len(body)//1024} KB)')

# ---------------------------------------------------------------- industries
groups = [
    ('Financial & regulated', ['fintech', 'banking', 'insurance', 'healthcare', 'public-sector']),
    ('Digital & service businesses', ['ecommerce', 'saas', 'telecom', 'travel', 'education']),
    ('Industrial operations', ['logistics', 'energy', 'manufacturing']),
]
group_of = {slug: (name, i) for i, (name, slugs) in enumerate(groups) for slug in slugs}
index = load('pages/industries.json')
explorer = next(s for s in index['sections'] if s['type'] == 'industryExplorer')
cross_section = next(s for s in index['sections'] if s['type'] == 'industryUseCases')
hero_index = next(s for s in index['sections'] if s['type'] == 'pageHero')
items = {it['slug']: it for it in explorer['items']}

cases = []          # every case, every origin
industries = []
for slug in [s for _, slugs in groups for s in slugs]:
    it = items[slug]
    page = load(f'pages/industries/{slug}.json')
    sec = {s['type']: s for s in page['sections']}
    hero, work, uc, ctl, met, cta = sec['industryHero'], sec['industryWorkloads'], sec['industryUseCases'], sec['industryControls'], sec['industryMetrics'], sec['finalCta']
    for c in uc['cases']:
        cases.append({
            'id': c['id'], 'slug': c['detailHref'].split('/')[-1], 'name': c['name'], 'problem': c['problem'], 'why': c['why'], 'pressure': c['pressure'], 'arrives': c['arrives'],
            'runs': [split_run(r) for r in c['runs']], 'returns': c['returns'], 'keeps': c['keeps'], 'keepsLabel': c.get('keepsLabel') or uc.get('keepsLabel') or 'What stays your decision',
            'origin': {'kind': 'industry', 'key': slug, 'name': it['name'], 'icon': it['icon'], 'href': f'/industries/{slug}'},
        })
    industries.append({
        'slug': slug, 'name': it['name'], 'group': group_of[slug][0], 'groupIndex': group_of[slug][1], 'icon': it['icon'], 'accent': it['accent'],
        'tagline': it['tagline'], 'headline': parts(hero['headline']), 'lede': hero['lede'],
        'summary': it['headline'],
        'arrives': hero['arrives'], 'source': hero.get('source', 'Jira'), 'sample': hero['sample'],
        'phases': [{'label': p['label'], 'status': p['status'], 'title': p['title'], 'lines': p['lines']} for p in hero['phases']],
        'workloads': {'label': work['label'], 'headline': parts(work['headline']), 'body': work['body'], 'items': [{'title': w['title'], 'body': w['body'], 'kind': w.get('kind', 'Engineering')} for w in work['items']]},
        'cases': {'label': uc['label'], 'headline': parts(uc['headline']), 'body': uc['body'], 'ids': [c['detailHref'].split('/')[-1] for c in uc['cases']]},
        'controls': {'label': ctl['label'], 'headline': parts(ctl['headline']), 'body': ctl['body'], 'rail': [{'key': r['key'], 'title': r['title'], 'items': r['items']} for r in ctl['rail']], 'owns': ctl['owns'], 'keeps': ctl['keeps']},
        'metrics': {'label': met['label'], 'headline': parts(met['headline']), 'body': met['body'], 'items': [{'label': m['label'], 'hint': m.get('hint', m.get('note', '')), 'icon': m.get('icon', 'chart')} for m in (met.get('metrics') or [m for ph in met.get('phases', []) for m in ph.get('metrics', [])])]},
        'cta': {'headline': parts(cta['headline']), 'body': cta['body']},
    })

for c in cross_section['cases']:
    cases.append({
        'id': c['id'], 'slug': c['detailHref'].split('/')[-1], 'name': c['name'], 'problem': c['problem'], 'why': c['why'], 'pressure': c['pressure'], 'arrives': c['arrives'],
        'runs': [split_run(r) for r in c['runs']], 'returns': c['returns'], 'keeps': c['keeps'], 'keepsLabel': c.get('keepsLabel') or cross_section.get('keepsLabel') or 'What stays your decision',
        'origin': {'kind': 'cross', 'key': 'cross-industry', 'name': 'Cross-industry', 'icon': 'layers', 'href': '/industries'},
    })

industries_index = {
    'eyebrow': hero_index['eyebrow'], 'headline': parts(hero_index['headline']), 'lede': hero_index['lede'],
    'explorer': {'label': explorer['label'], 'headline': parts(explorer['headline']), 'body': explorer['body']},
    'cross': {'label': cross_section['label'], 'headline': parts(cross_section['headline']), 'body': cross_section['body'], 'ids': [c['detailHref'].split('/')[-1] for c in cross_section['cases']]},
}

# ---------------------------------------------------------------- functions (solutions by function)
fn_slugs = ['engineering', 'product', 'qa', 'research', 'operations', 'support', 'compliance']
fn_groups = [('Build & improve', ['engineering', 'product', 'qa', 'research']), ('Operate & govern', ['operations', 'support', 'compliance'])]
fn_group_of = {slug: name for name, slugs in fn_groups for slug in slugs}
site = load('site.json')
sol_nav = next(n for n in site['nav']['primary'] if n['label'] == 'Solutions')
nav_desc = {l['href']: l['desc'] for col in sol_nav['mega']['columns'] for l in col['links']}
functions = []
for slug in fn_slugs:
    page = load(f'pages/solutions/{slug}.json')
    sec = {s['type']: s for s in page['sections']}
    hero, work, uc, acc, met, cta = sec['solutionHero'], sec['solutionWork'], sec['industryUseCases'], sec['solutionAcceptance'], sec['solutionMetrics'], sec['finalCta']
    for c in uc['cases']:
        cases.append({
            'id': c['id'], 'slug': c['detailHref'].split('/')[-1], 'name': c['name'], 'problem': c['problem'], 'why': c['why'], 'pressure': c['pressure'], 'arrives': c['arrives'],
            'runs': [split_run(r) for r in c['runs']], 'returns': c['returns'], 'keeps': c['keeps'], 'keepsLabel': c.get('keepsLabel') or uc.get('keepsLabel') or 'What stays your decision',
            'origin': {'kind': 'function', 'key': slug, 'name': hero['name'], 'icon': hero.get('icon', 'layers'), 'href': f'/solutions/{slug}'},
        })
    run = hero['run']
    functions.append({
        'slug': slug, 'name': hero['name'], 'group': fn_group_of[slug], 'icon': hero.get('icon', 'layers'), 'accent': TONE.get(hero.get('tone', 'violet'), 'violet'),
        'tagline': nav_desc.get(f'/solutions/{slug}', ''), 'headline': parts(hero['headline']), 'summary': hero['summary'], 'lede': hero.get('lede', hero['summary']),
        'title': page['meta']['title'], 'description': page['meta']['description'],
        'request': hero['request'], 'id': hero['id'], 'standard': hero['standard'], 'deliverable': hero['deliverable'], 'tools': hero.get('tools', []) if hero.get('showTools', True) is not False else [],
        'workTitle': hero.get('workTitle', parts(work['headline']) if isinstance(work['headline'][0], dict) else work['headline']), 'checks': hero['checks'], 'policy': hero['policy'],
        'stages': [{'name': s['name'], 'title': s['title'], 'body': s['body'], 'file': s.get('file', ''), 'lines': s.get('lines', []), 'checks': s.get('checks', []), 'status': s.get('status', '')} for s in run['stages']],
        'recovery': {'summary': run['recovery']['summary'], 'repaired': run['recovery']['repaired'], 'lines': run['recovery'].get('lines', [])} if run.get('recovery') else None,
        'work': [{'title': w['title'], 'body': w['body']} for w in work['items']],
        'cases': {'label': uc['label'], 'headline': parts(uc['headline']), 'body': uc['body'], 'note': uc.get('stagesNote', ''), 'ids': [c['detailHref'].split('/')[-1] for c in uc['cases']]},
        'acceptance': {'standard': acc['standard'], 'checks': acc['checks'], 'policy': acc['policy'], 'deliverable': acc['deliverable'], 'sourceTool': acc.get('sourceTool', 'Jira'), 'workRequest': acc['workRequest'], 'workId': acc['workId']},
        'metrics': {'label': met['label'], 'headline': parts(met['headline']), 'body': met['body'], 'items': [{'label': m['label'], 'hint': m['hint'], 'icon': m.get('icon', 'chart')} for m in met['metrics']]},
        'cta': {'headline': parts(cta['headline']), 'body': cta['body']},
    })
sol_index = load('pages/solutions.json')
sol_cta = next(s for s in sol_index['sections'] if s['type'] == 'finalCta')
functions_index = {
    'title': sol_index['meta']['title'], 'description': sol_index['meta']['description'],
    'headline': [sol_nav['mega']['intro']['title'], ''], 'lede': sol_nav['mega']['intro']['body'],
    'groups': [{'name': name, 'slugs': slugs} for name, slugs in fn_groups],
    'cta': {'headline': parts(sol_cta['headline']), 'body': sol_cta['body']},
}

# ---------------------------------------------------------------- leaders
DROPPED_QUESTIONS = {'Does Exekova support Claude Code?', 'Does Exekova support Codex?'}
faq = {g['id']: {**g, 'items': [i for i in g['items'] if i['q'] not in DROPPED_QUESTIONS]} for g in load('faq.json')['groups']}
leader_slugs = [('ceo', 'for-ceos'), ('coo', 'for-coos'), ('cfo', 'for-cfos'), ('cio', 'for-cios'), ('cto', 'for-ctos')]
leaders = []
for key, slug in leader_slugs:
    page = load(f'pages/for/{key}.json')
    sec = {s['type']: s for s in page['sections']}
    hero, shift, meas, faq_sec, cta = sec['execHero'], sec['execShift'], sec['execMeasures'], sec['faq'], sec['finalCta']
    console = hero['console']
    leaders.append({
        'slug': slug, 'role': hero['role'], 'icon': hero['icon'], 'accent': hero['accent'], 'eyebrow': hero['eyebrow'],
        'audience': f"For {hero['role']}s", 'tagline': nav_desc.get(f'/for/{key}', ''),
        'title': page['meta']['title'], 'description': page['meta']['description'],
        'headline': parts(hero['headline']), 'lede': hero['lede'],
        'owns': hero['owns'],
        'console': {'label': console['label'], 'tag': console.get('tag', ''), 'title': console['title'], 'rows': console.get('rows', []), 'bars': console.get('bars', []), 'foot': console.get('foot', ''), 'formula': console.get('formula')},
        'shift': {'label': shift['label'], 'headline': parts(shift['headline']), 'body': shift['body'], 'before': shift['before'], 'after': shift['after']},
        'measures': {'label': meas['label'], 'headline': parts(meas['headline']), 'body': meas['body'], 'primary': meas['primary'], 'secondaryLabel': meas.get('secondaryLabel', ''), 'secondary': meas.get('secondary', []), 'note': meas.get('note', '')},
        'faqGroup': faq[faq_sec['group']]['title'],
        'faq': [{'q': i['q'], 'a': i['a']} for i in faq[faq_sec['group']]['items']],
        'cta': {'headline': parts(cta['headline']), 'body': cta['body']},
    })

# ---------------------------------------------------------------- scenarios (the two long-form walkthroughs)
featured = [
    {'slug': 'remittance', 'href': '/use-cases/remittance', 'tone': 'violet', 'icon': 'coins', 'eyebrow': 'Product launch / Remittance', 'title': 'Enter the remittance market.', 'body': 'A CEO sets the market, the ambition and the standard. Follow it through planning, implementation, verification and a launch decision that stays with the business.', 'watch': ['Work crossing four teams without a status meeting', 'A quality gate that rejects the first candidate', 'The two decisions the platform refuses to make'], 'cta': 'Follow the launch'},
    {'slug': 'stablecoin-pci-audit', 'href': '/use-cases/stablecoin-pci-audit', 'tone': 'leaf', 'icon': 'shield', 'eyebrow': 'Assessment readiness / Stablecoin rails', 'title': 'Turn an audit epic into evidence.', 'body': 'A CTO files one Jira epic for PCI readiness. Follow it through scope, a pre-report, controlled changes and independent retesting, with the evidence kept as it is produced.', 'watch': ['Parallel workstreams against one scope', 'Changes that have to earn their retest', 'Speed and quality read from the same record'], 'cta': 'Follow the assessment'},
    {'slug': None, 'href': '/use-cases/education-online-exam-integrity', 'tone': 'azure', 'icon': 'graduation', 'eyebrow': 'Assessment integrity / Education', 'title': 'Keep an online exam fair.', 'body': 'The attempt runs on the student’s device and the student’s network. Follow the paths that are rarely tested and always exercised: a dropped connection, a resume elsewhere, approved extra time, a forced submit.', 'watch': ['Attempt scenarios run at exam concurrency', 'Integrity signals kept as reviewable evidence', 'What invalidates an attempt stays an academic decision'], 'cta': 'See the use case'},
    {'slug': None, 'href': '/use-cases/education-lms-interoperability', 'tone': 'teal', 'icon': 'layers', 'eyebrow': 'Learning platform / Education', 'title': 'Make every course actually launch.', 'body': 'Course packages, tool launches, roster provisioning and grade passback each follow a standard that every vendor reads slightly differently. The defects are per course, so they surface in week one of term.', 'watch': ['Failures reproduced against the real package', 'A regression case per package and tool type', 'Vendor behaviour reported, not worked around'], 'cta': 'See the use case'},
]
rm = load('use-cases/remittance.json'); rm_page = load('pages/use-cases/remittance.json')
pci = load('use-cases/stablecoin-pci-audit.json'); pci_page = load('pages/use-cases/stablecoin-pci-audit.json')
scenarios = [
    {
        'slug': 'remittance', 'id': rm['id'], 'label': rm['label'], 'title': rm_page['meta']['title'], 'description': rm_page['meta']['description'],
        'headline': parts(rm['headline']), 'body': rm['body'], 'problem': rm['problem'], 'provenance': rm['provenance'],
        'assumptions': rm['assumptions'], 'contract': rm['contract'], 'brief': rm['brief'], 'scope': rm['scope'],
        'plan': rm['plan'], 'chapters': [{'id': c['id'], 'label': c['label'], 'eyebrow': c.get('eyebrow', ''), 'title': c['title'], 'body': c['body'], 'output': c['output'], 'owner': c['owner']} for c in rm['chapters']],
        'criteria': [{'id': c['id'], 'label': c['label'], 'detail': c['detail'], 'kind': c.get('kind', '')} for c in rm['criteria']],
        'metrics': rm['metrics'], 'approvals': [{'id': a['id'], 'title': a['title'], 'owner': a['owner'], 'status': a.get('status', ''), 'detail': a['detail']} for a in rm['approvals']],
        'workers': [{'role': w['role'], 'task': w['task'], 'tool': w['tool'], 'output': w.get('output', '')} for w in rm['workers']],
        'economics': rm['economics'], 'faq': rm['faq'], 'sources': rm['sources'],
        'lens': {'label': rm['lens']['label'], 'title': rm['lens']['title'], 'accent': rm['lens']['accent'], 'body': rm['lens'].get('body', ''), 'note': rm['lens'].get('note', ''), 'roles': [{'role': r['role'], 'icon': r['icon'], 'question': r['question'], 'answer': r['answer']} for r in rm['lens']['roles']]},
    },
    {
        'slug': 'stablecoin-pci-audit', 'id': pci['id'], 'label': f"Assessment readiness / {pci['epic']}", 'title': pci_page['meta']['title'], 'description': pci_page['meta']['description'],
        'headline': parts(pci['headline']), 'body': pci['intent'], 'problem': pci['intent'], 'provenance': pci['provenance'],
        'assumptions': [], 'contract': [], 'brief': [], 'scope': None, 'plan': [],
        'chapters': [{'id': c['id'], 'label': c['label'], 'eyebrow': '', 'title': c['title'], 'body': c['body'], 'output': c['output'], 'owner': c['owner']} for c in pci['stages']],
        'criteria': [{'id': c['id'], 'label': c['title'], 'detail': c['detail'], 'kind': f"{c['family']} · {c['before']} → {c['after']}"} for c in pci['checks']],
        'metrics': [], 'approvals': [{'id': a['id'], 'title': a['title'], 'owner': a['owner'], 'status': '', 'detail': a['detail']} for a in pci['external']],
        'workers': [{'role': w['role'], 'task': w['task'], 'tool': w['tool'], 'output': w.get('access', '')} for w in pci['workers']],
        'economics': None, 'faq': pci['faq'], 'sources': pci['sources'],
        'lens': {'label': pci['lens']['label'], 'title': pci['lens']['title'], 'accent': pci['lens']['accent'], 'body': pci['lens'].get('body', ''), 'note': pci['lens'].get('note', ''), 'roles': [{'role': r['role'], 'icon': r['icon'], 'question': r['question'], 'answer': r['answer']} for r in pci['lens']['roles']]},
        'changes': [{'id': c['id'], 'finding': c['finding'], 'title': c['title'], 'kind': c['kind'], 'before': c['before'], 'after': c['after'], 'test': c['test'], 'tool': c['tool']} for c in pci['changes']],
    },
]
scenarios[0]['changes'] = []

# ---------------------------------------------------------------- use-case metadata and featured-by-industry
uc_meta = {}
for p in (SRC / 'pages/use-cases/featured').glob('*.json'):
    d = json.loads(p.read_text())
    uc_meta[d['slug'].split('/')[-1]] = {'title': d['meta']['title'], 'description': d['meta']['description']}
for c in cases:
    m = uc_meta.get(c['slug'])
    c['title'] = m['title'] if m else f"{c['name']} - {c['origin']['name']} use case"
    c['description'] = m['description'] if m else c['problem']
uc_nav = next(n for n in site['nav']['primary'] if n['label'] == 'Use cases')
featured_by_industry = [l['href'].split('/')[-1] for col in uc_nav['mega']['columns'] for l in col['links']]
uc_index = load('pages/use-cases/index.json')
cases_index = {
    'title': uc_index['meta']['title'], 'description': uc_index['meta']['description'],
    'intro': {'title': uc_nav['mega']['intro']['title'], 'body': uc_nav['mega']['intro']['body']},
    'chairs': [
        {'role': 'CEO', 'icon': 'chart', 'question': 'Did the ambition become something releasable, and what still needs me?'},
        {'role': 'COO', 'icon': 'grid', 'question': 'Where did the work wait, and on whom?'},
        {'role': 'CFO', 'icon': 'coins', 'question': 'What did the accepted result cost, including rework?'},
        {'role': 'CIO', 'icon': 'lock', 'question': 'What reached which system, and on whose authority?'},
        {'role': 'CTO', 'icon': 'code', 'question': 'Did it pass without certifying itself?'},
    ],
    'hero': {'headline': ['One platform runs the work.', 'Start to accepted outcome.'], 'lede': '{total} problems across {industries} industries, each one timed by someone outside the team. Every one runs the same way: exekova plans the work, assembles the capability it needs, executes inside the boundaries you set, has the result independently reviewed, and only then accepts it. Not a tool your team coordinates between: one platform that owns the path from the objective to the outcome.'},
    'lens': {'title': 'One run. One record. Five chairs.', 'body': 'Because a single platform ran the whole thing, one record answers all five. Nobody reconciles four tools to find out what happened.'},
    'note': 'No figures are quoted on these pages. Each industry publishes the measurement method instead, so the numbers you judge exekova on come from your own runs.',
    'byIndustry': {'label': 'By industry', 'headline': ['Executed end to end,', 'sector by sector.'], 'body': 'These are not illustrations. Each one is engineering and QA work already queued in that industry, timed by someone outside the team, and provable when it is done. What differs between them is the domain, not how much of it you still have to coordinate. Open one to see what arrives, what exekova runs, what comes back and what stays your decision.'},
    'pipeline': {'label': 'One platform. Every case runs the same stages.', 'note': 'Whatever the sector, the work moves through the same pipeline, and the capability that executes it is never the one that reviews it.', 'stages': ['Plan', 'Assemble', 'Execute', 'Review', 'Accept']},
    'featured': featured,
    'featuredByIndustry': featured_by_industry,
}

# ---------------------------------------------------------------- write
emit('industries.ts', '''import type { CaseSlug } from './cases';

/**
 * Industries, generated from the exekova.com content layer (apps/site/content
 * in the workinzo monorepo) by scripts/import-site-content.py. Content only: the
 * page designs are this site's own. Regenerate rather than hand-edit.
 */
export type IndustryPhase = { label: string; status: string; title: string; lines: string[] };
export type Industry = {
  slug: string; name: string; group: string; groupIndex: number; icon: string; accent: string;
  tagline: string; headline: [string, string]; lede: string; summary: string;
  arrives: string[]; source: string; sample: { id: string; title: string; body: string; criterion: string };
  phases: IndustryPhase[];
  workloads: { label: string; headline: [string, string]; body: string; items: { title: string; body: string; kind: string }[] };
  cases: { label: string; headline: [string, string]; body: string; ids: CaseSlug[] };
  controls: { label: string; headline: [string, string]; body: string; rail: { key: string; title: string; items: string[] }[]; owns: string[]; keeps: string[] };
  metrics: { label: string; headline: [string, string]; body: string; items: { label: string; hint: string; icon: string }[] };
  cta: { headline: [string, string]; body: string };
};
export type IndustriesIndex = {
  eyebrow: string; headline: [string, string]; lede: string;
  explorer: { label: string; headline: [string, string]; body: string };
  cross: { label: string; headline: [string, string]; body: string; ids: CaseSlug[] };
};
''', [('industries', 'Industry[]', industries), ('industriesIndex', 'IndustriesIndex', industries_index)])
(OUT / 'industries.ts').open('a').write('''export const industryGroupsOrdered = [...new Set(industries.map(item => item.group))].map(name => ({ name, industries: industries.filter(item => item.group === name) }));

export function industryBySlug(slug: string) {
  return industries.find(item => item.slug === slug);
}
''')

emit('cases.ts', '''/**
 * Every use case on the site, generated from the exekova.com content layer by
 * scripts/import-site-content.py: the cases each industry page names, the three
 * cases each function names, and the two cross-industry problems. Content
 * only; regenerate rather than hand-edit.
 */
export type CaseSlug = string;
export type CaseOrigin = { kind: 'industry' | 'function' | 'cross'; key: string; name: string; icon: string; href: string };
export type RunStep = { stage: string | null; text: string };
export type Case = {
  id: string; slug: CaseSlug; name: string; problem: string; why: string; pressure: string; arrives: string;
  runs: RunStep[]; returns: string[]; keeps: string[]; keepsLabel: string; origin: CaseOrigin; title: string; description: string;
};
export type FeaturedScenario = { slug: string | null; href: string; tone: string; icon: string; eyebrow: string; title: string; body: string; watch: string[]; cta: string };
export type CasesIndex = {
  title: string; description: string; intro: { title: string; body: string };
  hero: { headline: [string, string]; lede: string };
  lens: { title: string; body: string };
  note: string;
  chairs: { role: string; icon: string; question: string }[];
  byIndustry: { label: string; headline: [string, string]; body: string };
  pipeline: { label: string; note: string; stages: string[] };
  featured: FeaturedScenario[];
  featuredByIndustry: CaseSlug[];
};
''', [('cases', 'Case[]', cases), ('casesIndex', 'CasesIndex', cases_index)])
(OUT / 'cases.ts').open('a').write('''export function caseBySlug(slug: string) {
  return cases.find(item => item.slug === slug);
}

export function casesFor(origin: CaseOrigin['kind'], key: string) {
  return cases.filter(item => item.origin.kind === origin && item.origin.key === key);
}
''')

emit('functions.ts', '''import type { CaseSlug } from './cases';

/**
 * Solutions by function, generated from the exekova.com content layer by
 * scripts/import-site-content.py. Content only; regenerate rather than hand-edit.
 */
export type RunStage = { name: string; title: string; body: string; file: string; lines: string[]; checks: string[]; status: string };
export type Fn = {
  slug: string; name: string; group: string; icon: string; accent: string; tagline: string;
  headline: [string, string]; summary: string; lede: string; title: string; description: string;
  request: string; id: string; standard: string; deliverable: string; tools: string[];
  workTitle: [string, string]; checks: string[]; policy: string;
  stages: RunStage[]; recovery: { summary: string; repaired: string; lines: string[] } | null;
  work: { title: string; body: string }[];
  cases: { label: string; headline: [string, string]; body: string; note: string; ids: CaseSlug[] };
  acceptance: { standard: string; checks: string[]; policy: string; deliverable: string; sourceTool: string; workRequest: string; workId: string };
  metrics: { label: string; headline: [string, string]; body: string; items: { label: string; hint: string; icon: string }[] };
  cta: { headline: [string, string]; body: string };
};
export type FunctionsIndex = { title: string; description: string; headline: [string, string]; lede: string; groups: { name: string; slugs: string[] }[]; cta: { headline: [string, string]; body: string } };
''', [('functions', 'Fn[]', functions), ('functionsIndex', 'FunctionsIndex', functions_index)])
(OUT / 'functions.ts').open('a').write('''export function functionBySlug(slug: string) {
  return functions.find(item => item.slug === slug);
}
''')

emit('leaders.ts', '''/**
 * Leader pages (CEO, COO, CFO, CIO, CTO), generated from the exekova.com
 * content layer by scripts/import-site-content.py, with each page's FAQ group.
 * Content only; regenerate rather than hand-edit.
 */
export type ShiftItem = { title: string; body: string };
export type Leader = {
  slug: string; role: string; icon: string; accent: string; eyebrow: string; audience: string; tagline: string; title: string; description: string;
  headline: [string, string]; lede: string;
  owns: { youLabel: string; you: string; wzLabel: string; wz: string };
  console: { label: string; tag: string; title: string; rows: { k: string; v: string; state?: string }[]; bars: { label: string; note?: string; value?: number; tone?: string }[]; foot: string; formula: { numerator: string; denominator: string; result: string } | null };
  shift: { label: string; headline: [string, string]; body: string; before: { label: string; title: string; items: ShiftItem[] }; after: { label: string; title: string; items: ShiftItem[] } };
  measures: { label: string; headline: [string, string]; body: string; primary: { label: string; icon: string; counts: string; why: string }[]; secondaryLabel: string; secondary: { label: string; hint: string }[]; note: string };
  faqGroup: string; faq: { q: string; a: string }[];
  cta: { headline: [string, string]; body: string };
};
''', [('leaders', 'Leader[]', leaders)])
(OUT / 'leaders.ts').open('a').write('''export function leaderBySlug(slug: string) {
  return leaders.find(item => item.slug === slug);
}
''')

emit('scenarios.ts', '''/**
 * The two long-form walkthroughs (a remittance launch, a PCI readiness epic),
 * generated from the exekova.com content layer by scripts/import-site-content.py.
 * Both are presentations built on synthetic artefacts; their `provenance`
 * line says so and every page shows it. Content only.
 */
export type Scenario = {
  slug: string; id: string; label: string; title: string; description: string;
  headline: [string, string]; body: string; problem: string; provenance: string;
  assumptions: string[]; contract: { label: string; body: string }[]; brief: { label: string; body: string }[];
  scope: { in: string[]; later: string[] } | null;
  plan: { time: string; title: string; body: string; exit: string }[];
  chapters: { id: string; label: string; eyebrow: string; title: string; body: string; output: string; owner: string }[];
  criteria: { id: string; label: string; detail: string; kind: string }[];
  metrics: { label: string; value: string; detail: string }[];
  approvals: { id: string; title: string; owner: string; status: string; detail: string }[];
  workers: { role: string; task: string; tool: string; output: string }[];
  economics: { time: string; cost: string; business: string } | null;
  faq: { q: string; a: string }[];
  sources: { label: string; url: string; detail: string }[];
  lens: { label: string; title: string; accent: string; body: string; note: string; roles: { role: string; icon: string; question: string; answer: string }[] };
  changes: { id: string; finding: string; title: string; kind: string; before: string; after: string; test: string; tool: string }[];
};
''', [('scenarios', 'Scenario[]', scenarios)])
(OUT / 'scenarios.ts').open('a').write('''export function scenarioBySlug(slug: string) {
  return scenarios.find(item => item.slug === slug);
}
''')


# ---------------------------------------------------------------- integrations
cat = load('integrations.json'); det = load('integrations-detail.json'); ipage = load('pages/integrations.json')
gallery = next(s for s in ipage['sections'] if s['type'] == 'integrationGallery')
definition = next(s for s in ipage['sections'] if s['type'] == 'definition')
icta = next(s for s in ipage['sections'] if s['type'] == 'finalCta')
integrations_index = {
    'title': ipage['meta']['title'], 'description': ipage['meta']['description'],
    'eyebrow': gallery['eyebrow'], 'headline': [gallery['headline'], gallery['emphasis']], 'lede': gallery['lede'],
    'statusLegend': cat['meta'].get('statusLegend', {}),
    'logoPolicy': cat['meta'].get('logoPolicy', ''),
    'categories': [{'id': c['id'], 'index': c['index'], 'title': c['title'], 'subhead': c['subhead'], 'accent': c['accent'], 'integrations': [{'name': i['name'], 'slug': i.get('slug', ''), 'description': i.get('description', ''), 'status': i['status'], 'logo': i.get('logo', '')} for i in c['integrations']]} for c in cat['categories']],
    'definitions': definition['items'],
    'faqGroup': faq['integrations']['title'], 'faq': [{'q': i['q'], 'a': i['a']} for i in faq['integrations']['items']],
    'cta': {'headline': parts(icta['headline']), 'body': icta['body']},
}
integration_details = [{'slug': slug, 'name': v['name'], 'status': v['status'], 'category': v['category'], 'accent': v['accent'], 'summary': v['summary'], 'receives': v['receives'], 'sends': v['sends'], 'workflows': v['workflows'], 'flow': v['flow'], 'setup': v['setup'], 'security': v['security'], 'description': v.get('metaDescription', v['summary'])} for slug, v in det.items()]
emit('integrations.ts', '''/**
 * The integrations catalogue and the four detail pages, generated from the
 * exekova.com content layer by scripts/import-site-content.py. Content only:
 * nothing here connects to anything; there are no connect actions.
 */
export type IntegrationRow = { name: string; slug: string; description: string; status: string; logo: string };
export type IntegrationCategory = { id: string; index: string; title: string; subhead: string; accent: string; integrations: IntegrationRow[] };
export type IntegrationsIndex = {
  title: string; description: string; eyebrow: string; headline: [string, string]; lede: string;
  statusLegend: Record<string, string>; logoPolicy: string; categories: IntegrationCategory[];
  definitions: { q: string; a: string }[]; faqGroup: string; faq: { q: string; a: string }[];
  cta: { headline: [string, string]; body: string };
};
export type IntegrationDetail = {
  slug: string; name: string; status: string; category: string; accent: string; summary: string;
  receives: string[]; sends: string[]; workflows: string[]; flow: string[]; setup: string[]; security: string[]; description: string;
};
''', [('integrationsIndex', 'IntegrationsIndex', integrations_index), ('integrationDetails', 'IntegrationDetail[]', integration_details)])
(OUT / 'integrations.ts').open('a').write('''export function integrationBySlug(slug: string) {
  return integrationDetails.find(item => item.slug === slug);
}
''')


# ---------------------------------------------------------------- platform pages (category, workforce, live floor, quality, recovery, performance, security)
def local_href(href):
    """Map main-site routes to this site's routes."""
    if not isinstance(href, str): return href
    if href.startswith('/contact'): return '/contact'
    if href == '/how-it-works': return '/#how-it-works'
    return href
def localise(node):
    if isinstance(node, dict): return {k: (local_href(v) if k == 'href' else localise(v)) for k, v in node.items()}
    if isinstance(node, list): return [localise(v) for v in node]
    return node
platform_slugs = ['autonomous-work-execution', 'workforce', 'live-floor', 'quality', 'recovery', 'performance', 'security']
platform_pages = []
for slug in platform_slugs:
    page = load(f'pages/{slug}.json')
    sections = localise(page['sections'])
    for s in sections:
        if s.get('type') == 'featureGrid' and s.get('label') == 'Compare':
            s['body'] = 'Each comparison is its own page.'
        if s.get('type') == 'postureClaims':
            s['body'] = 'Security pages often list badges without saying what sits behind them. Nothing below is asserted until an audit or agreement actually exists.'
    platform_pages.append({'slug': slug, 'title': page['meta']['title'], 'description': page['meta']['description'], 'keywords': page['meta'].get('keywords', []), 'sections': sections})
faq_groups = {key: {'title': g['title'], 'items': [{'q': i['q'], 'a': i['a']} for i in g['items']]} for key, g in faq.items()}
ecosystem = [{'id': g['id'], 'label': g['label'], 'items': g['items']} for g in load('ecosystem.json')['groups']]
emit('platform.ts', '''/**
 * The platform pages that live only on exekova.com (the category definition,
 * Workforce, Live Floor, Quality, Recovery, Performance, Security), imported
 * from the content layer by scripts/import-site-content.py and rendered here
 * by PlatformArticle. Sections keep the main site's shapes; the renderer maps
 * each type onto this site's components. Off-site links are localised.
 */
export type Section = { type: string } & Record<string, any>;
export type PlatformPage = { slug: string; title: string; description: string; keywords: string[]; sections: Section[] };
export type FaqGroupData = { title: string; items: { q: string; a: string }[] };
export type EcosystemGroup = { id: string; label: string; items: string[] };
''', [('platformPages', 'PlatformPage[]', platform_pages), ('faqGroupsByKey', 'Record<string, FaqGroupData>', faq_groups), ('ecosystemGroups', 'EcosystemGroup[]', ecosystem)])
(OUT / 'platform.ts').open('a').write('''export function platformPageBySlug(slug: string) {
  return platformPages.find(item => item.slug === slug);
}
''')

print(f'industries={len(industries)} cases={len(cases)} functions={len(functions)} leaders={len(leaders)} scenarios={len(scenarios)}')
missing = [s for s in featured_by_industry if s not in {c["slug"] for c in cases}]
print('featured-by-industry slugs missing from cases:', missing)
