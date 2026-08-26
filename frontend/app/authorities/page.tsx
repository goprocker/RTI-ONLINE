"use client";

import { useMemo, useState } from "react";
import { PortalPage } from "../../components/portal-shell";

const authorities = ["Department of Personnel & Training", "Ministry of Home Affairs", "Ministry of Finance", "Ministry of Health and Family Welfare", "Ministry of Education", "Ministry of Railways", "Central Board of Direct Taxes", "National Informatics Centre"];

export default function AuthoritiesPage() {
  const [query, setQuery] = useState(""); const matches = useMemo(() => authorities.filter((authority) => authority.toLowerCase().includes(query.toLowerCase())), [query]);
  return <PortalPage><main className="authority-page"><section className="flow-hero"><div className="wrap"><p className="eyebrow"><span className="eyebrow-line" />CENTRAL PUBLIC AUTHORITIES</p><p className="bread"><span>Home</span><span>›</span><span>Authorities</span></p><h1>Find the right<br /><em>public authority.</em></h1><p>Search for the Central Government authority that holds the information you need.</p></div></section><section className="wrap authority-search"><label htmlFor="authority-search">Search Central public authorities</label><input id="authority-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by ministry, department, or organisation" /><p>{matches.length} authority{matches.length === 1 ? "" : "ies"} shown</p><div className="authority-list">{matches.map((authority) => <article key={authority}><span>⌁</span><div><h2>{authority}</h2><p>Central Government public authority</p></div><button type="button">Select <span>→</span></button></article>)}{matches.length === 0 && <p className="empty-state">No matching authority in this frontend demo. Try a broader search.</p>}</div></section></main></PortalPage>;
}
