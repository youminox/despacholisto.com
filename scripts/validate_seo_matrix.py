#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Auditoría matemática de Cero Canibalización sobre las 1,514 páginas de despacholisto.com.
Verifica:
1. Exactamente 14 Hubs Pilares + 500 Artículos Transaccionales + 1,000 Artículos SEO = 1,514 JSONs.
2. 0 duplicados en slug, path, title, seoTitle, primaryKeyword.
3. Similitud léxica Jaccard intra-silo < 0.42 en primaryKeyword.
"""
import json
import pathlib
from collections import defaultdict

ROOT = pathlib.Path(__file__).resolve().parent.parent
ART_DIR = ROOT / "src/content/articles"
STOPWORDS = {
    "en", "de", "y", "a", "para", "con", "sin", "por", "el", "la", "los",
    "las", "del", "al", "vs", "como", "que", "su", "tu", "o", "un", "una",
}


def jaccard(a_tokens: set[str], b_tokens: set[str]) -> float:
    if not a_tokens or not b_tokens:
        return 0.0
    return len(a_tokens & b_tokens) / len(a_tokens | b_tokens)


def main():
    files = sorted(ART_DIR.glob("*.json"))
    assert len(files) == 1514, f"Se esperaban 1,514 archivos JSON, hay {len(files)}"

    slugs, paths, titles, seo_titles, kws = set(), set(), set(), set(), set()
    by_pillar = defaultdict(list)
    pillars = 0
    trans = 0
    seo_info = 0

    for f in files:
        a = json.loads(f.read_text(encoding="utf-8"))
        assert a["slug"] not in slugs, f"Slug duplicado: {a['slug']}"
        assert a["path"] not in paths, f"Path duplicado: {a['path']}"
        assert a["title"] not in titles, f"Title duplicado: {a['title']}"
        assert a["seoTitle"] not in seo_titles, f"seoTitle duplicado: {a['seoTitle']}"
        assert a["primaryKeyword"] not in kws, f"primaryKeyword duplicado: {a['primaryKeyword']}"

        slugs.add(a["slug"])
        paths.add(a["path"])
        titles.add(a["title"])
        seo_titles.add(a["seoTitle"])
        kws.add(a["primaryKeyword"])

        if a.get("isPillar"):
            pillars += 1
        else:
            tokens = {w for w in a["primaryKeyword"].lower().split() if w not in STOPWORDS and len(w) > 1}
            by_pillar[a["pillar"]].append((a["slug"], tokens))
            if a.get("isTransactional"):
                trans += 1
            else:
                seo_info += 1

    assert pillars == 14, f"Se esperaban 14 pilares, hay {pillars}"
    assert trans == 500, f"Se esperaban 500 transaccionales, hay {trans}"
    assert seo_info == 1000, f"Se esperaban 1,000 SEO informacionales, hay {seo_info}"

    high_pairs = []
    max_jac = 0.0
    for p_slug, items in by_pillar.items():
        for i in range(len(items)):
            for j in range(i + 1, len(items)):
                sim = jaccard(items[i][1], items[j][1])
                if sim > max_jac:
                    max_jac = sim
                if sim >= 0.42:
                    high_pairs.append((p_slug, items[i][0], items[j][0], sim))

    if high_pairs:
        for p, s1, s2, sim in high_pairs[:10]:
            print(f"HIGH ({sim:.2f}) in {p}: {s1} <-> {s2}")
        raise AssertionError(f"Found {len(high_pairs)} pairs with Jaccard >= 0.42 (max={max_jac:.2f})")

    print(
        f"✅ AUDITORÍA SEO SUPERADA AL 100%: {len(files)} páginas editoriales verificadas "
        f"({pillars} Hubs + {trans} Transaccionales + {seo_info} SEO Info) con 0 duplicados. "
        f"Similitud Jaccard máxima intra-silo: {max_jac:.2f} (< 0.42 en 100% de pares)."
    )


if __name__ == "__main__":
    main()
