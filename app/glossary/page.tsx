"use client";
import { useState } from "react";
import { Search, BookOpen, AlertTriangle, Scale, Shield, TrendingUp, Users, Info } from "lucide-react";
import Link from "next/link";

const GLOSSARY_TERMS = [
  // Agencies
  {
    term: "CBI",
    fullForm: "Central Bureau of Investigation",
    category: "Agency",
    icon: "🕵️",
    simple: "India's top detective agency — like the FBI in USA",
    detailed: "The CBI is India's premier investigative agency that handles high-profile corruption cases, financial crimes, and cases referred by courts or state governments. Think of it like India's FBI. When a case is too big or politically sensitive for state police, CBI takes over. However, CBI is controlled by the central government — so critics argue it's sometimes used to target opposition politicians and protect allies.",
    example: "When Lalu Prasad Yadav was convicted in the Fodder Scam, it was CBI that investigated and filed the case.",
    source: "https://cbi.gov.in",
    sourceLabel: "CBI Official Site"
  },
  {
    term: "ED",
    fullForm: "Enforcement Directorate",
    category: "Agency",
    icon: "💰",
    simple: "Agency that freezes money from corruption — like a financial police",
    detailed: "The Enforcement Directorate (ED) investigates money laundering and foreign exchange law violations. When a politician or businessman is accused of corruption, ED traces the money — wherever it went, freezes it, and files a chargesheet. ED can arrest people, attach (seize) properties, and has sweeping powers under PMLA (Prevention of Money Laundering Act). Like CBI, ED is under the central government — so it too is accused of being used politically.",
    example: "Arvind Kejriwal was arrested by ED in March 2024 in the Delhi Excise Policy money laundering case. Sanjay Raut was arrested by ED in the Patra Chawl land scam.",
    source: "https://enforcementdirectorate.gov.in",
    sourceLabel: "ED Official Site"
  },
  {
    term: "FIR",
    fullForm: "First Information Report",
    category: "Legal",
    icon: "📄",
    simple: "The first official complaint filed with police — like the start of a legal case",
    detailed: "An FIR (First Information Report) is the document that officially starts a criminal case. When someone files a complaint with the police about a crime, police are supposed to register an FIR. Once an FIR is registered, police must investigate. You cannot file an FIR against a sitting Union Minister or MP without prior permission in some cases. FIRs are public records — anyone can get a copy.",
    example: "When Anurag Thakur said 'goli maaro' at a rally, FIRs were filed against him in multiple states for hate speech under IPC Section 153A.",
    source: "https://ccrb.gov.in",
    sourceLabel: "National Crime Records Bureau"
  },
  {
    term: "CAG",
    fullForm: "Comptroller and Auditor General of India",
    category: "Agency",
    icon: "📊",
    simple: "India's official financial auditor — checks if government money was spent correctly",
    detailed: "The CAG is a constitutional body that audits all government expenditure — central, state, and public sector. Think of it as India's biggest accountant. Every year CAG releases reports exposing irregularities in government spending. The 2G scam (₹1.76 lakh crore loss), Coal scam (₹1.86 lakh crore loss), and many state-level scams were first exposed through CAG reports. CAG is independent of the government — the CAG officer cannot be removed easily.",
    example: "CAG's 2010 report on 2G spectrum allocated during UPA government revealed losses of ₹1,76,379 crore — the biggest scam in Indian history.",
    source: "https://cag.gov.in",
    sourceLabel: "CAG India"
  },
  {
    term: "IT (Income Tax) Raids",
    fullForm: "Income Tax Department Raids / Surveys",
    category: "Agency",
    icon: "🏛️",
    simple: "Government's tax police searches your home/office for hidden money",
    detailed: "When the Income Tax Department suspects someone is hiding income or has unaccounted cash ('black money'), it can conduct raids. These raids are typically early morning surprise operations on offices, homes, and businesses. During raids, IT officials can seize cash, jewellery, documents, and digital evidence. They then compare this against declared income. Any unexplained wealth becomes taxable income plus penalty. IT is under the Finance Ministry — thus also accused of political use.",
    example: "Multiple IT raids have targeted Congress leaders' offices, business premises linked to opposition politicians, and NGOs during BJP governments.",
    source: "https://incometax.gov.in",
    sourceLabel: "Income Tax India"
  },
  // Political Terms
  {
    term: "ADR",
    fullForm: "Association for Democratic Reforms",
    category: "Watchdog",
    icon: "🔍",
    simple: "An independent organisation that tracks politicians' criminal records and assets",
    detailed: "ADR (Association for Democratic Reforms) is a non-profit that has been tracking politicians since 1999. They analyse affidavits filed by candidates during elections — making criminal case data, asset information, and educational qualifications publicly accessible. All data on NagrikNazar about politicians' declared criminal cases comes from EC affidavits analysed by ADR. Their website myneta.info has profiles of millions of Indian politicians.",
    example: "ADR's analysis showed that in the 18th Lok Sabha (2024), 251 of 543 elected MPs declared pending criminal cases in their affidavits.",
    source: "https://adrindia.org",
    sourceLabel: "ADR India"
  },
  {
    term: "EC Affidavit",
    fullForm: "Election Commission Affidavit (Form 26)",
    category: "Legal",
    icon: "📋",
    simple: "A sworn statement every election candidate must file — declaring their crimes, assets and education",
    detailed: "Before contesting any election (Lok Sabha, Vidhan Sabha, local bodies), every candidate must submit a sworn affidavit (Form 26) to the Election Commission declaring: (1) All pending criminal cases, (2) Total assets and liabilities of self + spouse + dependents, (3) Educational qualifications. This is a legal document — lying on it can be a criminal offence. All affidavits are public and available on the ECI website and myneta.info.",
    example: "Tejashwi Yadav declared assets of ₹9+ crore at age 26 with no clear income source in his EC affidavit — which triggered ED investigation.",
    source: "https://affidavit.eci.gov.in",
    sourceLabel: "ECI Affidavit Portal"
  },
  {
    term: "Electoral Bonds",
    fullForm: "Electoral Bond Scheme (2018-2024)",
    category: "Political",
    icon: "💸",
    simple: "A secret way companies donated money to political parties — declared unconstitutional by Supreme Court",
    detailed: "Electoral Bonds were introduced by BJP government in 2018. Companies or individuals could buy bonds from SBI and donate to any political party — anonymously. Donors didn't have to reveal who they gave to, parties didn't have to reveal who gave them. Only SBI knew. Critics called it 'institutionalised corruption.' The Supreme Court unanimously struck it down in February 2024, saying it violated citizens' right to information. Data revealed that donors gave crores to ruling parties days before or after getting government contracts, licences, or raids dropping.",
    example: "Adani Group donated ₹2,029 crore through Electoral Bonds. Companies facing ED/CBI raids gave ₹2,180 crore to BJP after raids were dropped. BJP received ₹8,200 crore — 47% of all Electoral Bond donations.",
    source: "https://main.sci.gov.in/supremecourt/2017/30285/30285_2017_5_1501_50804_Judgement_15-Feb-2024.pdf",
    sourceLabel: "SC Judgment Feb 2024"
  },
  {
    term: "PMLA",
    fullForm: "Prevention of Money Laundering Act (2002)",
    category: "Legal",
    icon: "⚖️",
    simple: "Law that criminalises hiding money from crimes — gives ED its powers",
    detailed: "PMLA is the law that gives the ED most of its powers. Under PMLA, if you receive money that came from a crime (even if you didn't commit the crime yourself), you can be arrested. The law has very few protections — bail is difficult to get, and the accused must prove innocence (reverse burden of proof). Critics say PMLA has been misused to arrest political opponents. The Supreme Court upheld PMLA's strict provisions in 2022 in the Vijay Madanlal Choudhary case.",
    example: "When the Delhi Liquor Policy scam was alleged, ED used PMLA to arrest Manish Sisodia, Sanjay Singh, K. Kavitha, and CM Kejriwal himself.",
    source: "https://enforcementdirectorate.gov.in",
    sourceLabel: "ED Website"
  },
  {
    term: "NDA",
    fullForm: "National Democratic Alliance",
    category: "Alliance",
    icon: "🤝",
    simple: "BJP's political coalition — parties that have joined together under BJP's leadership",
    detailed: "NDA (National Democratic Alliance) is the political coalition led by BJP. It was formed in 1998 when Atal Bihari Vajpayee became PM. In 2024 Lok Sabha, BJP alone got 240 seats but needed 272 for majority. NDA partners like TDP (16 seats), JDU (12 seats) helped cross 272. Key NDA members: BJP, TDP, JDU, Shiv Sena (Shinde), NCP (Ajit), LJP-RV, RLD, Janasena. States governed by NDA: 18+ states covering 60%+ of India's population.",
    example: "In 2024, BJP won 240 seats — not enough for majority. NDA (with TDP, JDU etc.) got 293 seats, allowing Modi to form government for 3rd time.",
    source: "https://electioncommission.gov.in",
    sourceLabel: "Election Commission"
  },
  {
    term: "INDIA Alliance",
    fullForm: "Indian National Developmental Inclusive Alliance",
    category: "Alliance",
    icon: "🤝",
    simple: "26 opposition parties that joined to fight BJP in 2024 — but lost",
    detailed: "INDIA Alliance was formed in 2023 — a coalition of 26 opposition parties to jointly contest 2024 Lok Sabha against BJP-led NDA. Led by Congress, TMC, SP, AAP, DMK, JMM, NC, RJD, and others. However, the alliance had internal conflicts — AAP-Congress fought in Delhi, SP-Congress didn't fully cooperate in UP, Mamata fought independently. Despite winning 234 seats collectively, NDA won 293. The alliance has since weakened further.",
    example: "In 2024 LS, INDIA Alliance got 234 seats — Congress went from 52 to 99. But BJP's 240 seats plus NDA allies gave PM Modi a 3rd term.",
    source: "https://electioncommission.gov.in",
    sourceLabel: "Election Commission"
  },
  {
    term: "Lok Sabha",
    fullForm: "Lok Sabha — Lower House of Indian Parliament",
    category: "Governance",
    icon: "🏛️",
    simple: "India's main Parliament — 543 elected MPs make laws and choose the Prime Minister",
    detailed: "India has a bicameral Parliament with two houses. Lok Sabha (House of the People) is the lower house with 543 directly elected members. Elections happen every 5 years. Whichever party/coalition gets 272+ seats can form the government and choose the Prime Minister. Lok Sabha can pass the Union Budget, make laws, and has power to remove the government through No-Confidence Motion. The current (18th) Lok Sabha was elected in April-June 2024.",
    example: "In 2024 Lok Sabha elections, BJP won 240, Congress won 99, SP won 37, TMC won 29, and NDA total was 293 — just above 272 majority.",
    source: "https://loksabha.nic.in",
    sourceLabel: "Lok Sabha Website"
  },
  {
    term: "Rajya Sabha",
    fullForm: "Rajya Sabha — Upper House of Indian Parliament",
    category: "Governance",
    icon: "🏛️",
    simple: "India's 'Senate' — 245 members elected by state assemblies, not directly by people",
    detailed: "Rajya Sabha is India's upper house of Parliament. Unlike Lok Sabha, Rajya Sabha members are NOT directly elected — they're elected by MLAs of each state (state legislators). Each state sends members in proportion to its size. Rajya Sabha never dissolves fully — 1/3 of members retire every 2 years. A bill must pass both houses. Important: Even if BJP doesn't have majority in Rajya Sabha, they can pass most bills using Joint Sessions or other mechanisms. Many politicians enter Rajya Sabha when they can't win Lok Sabha.",
    example: "Nirmala Sitharaman (Finance Minister) is a Rajya Sabha MP from Karnataka — she has never won a directly contested election but leads India's economy.",
    source: "https://rajyasabha.nic.in",
    sourceLabel: "Rajya Sabha Website"
  },
  {
    term: "Vidhan Sabha",
    fullForm: "Vidhan Sabha — State Legislative Assembly",
    category: "Governance",
    icon: "🏛️",
    simple: "State Parliament — elected MLAs form the state government and choose the Chief Minister",
    detailed: "Each of India's 28 states (+ UT J&K) has its own legislature called Vidhan Sabha. Elected members are called MLAs (Members of Legislative Assembly). The party/coalition with majority selects the Chief Minister. State governments control police, education, health, agriculture, state roads. State elections happen every 5 years but are often staggered — so there are almost always elections in some state somewhere in India.",
    example: "In Maharashtra Vidhan Sabha (Nov 2024), BJP-led Mahayuti won 230 of 288 seats. Devendra Fadnavis became CM again.",
    source: "https://electioncommission.gov.in",
    sourceLabel: "Election Commission"
  },
  {
    term: "MLA",
    fullForm: "Member of Legislative Assembly",
    category: "Role",
    icon: "👤",
    simple: "An elected state-level politician — represents one constituency in the state parliament",
    detailed: "An MLA (Member of Legislative Assembly) is elected from a state constituency. India has ~4,000+ MLAs across all states. MLAs vote to choose the Chief Minister, pass state budget, and make state laws. An MLA can defect to another party but risks disqualification under the Anti-Defection Law (10th Schedule). Most state budgets for an MLA's constituency: ₹5-10 crore for development works. Many MPs (Lok Sabha) were once MLAs.",
    example: "Aaditya Thackeray (Uddhav's son) is MLA from Worli, Mumbai. He contested and won even as his father's Shiv Sena party lost split battle.",
    source: "https://electioncommission.gov.in",
    sourceLabel: "Election Commission"
  },
  {
    term: "MP",
    fullForm: "Member of Parliament",
    category: "Role",
    icon: "👤",
    simple: "A directly elected national-level politician — represents India in Parliament",
    detailed: "An MP (Member of Parliament) in India usually refers to Lok Sabha members (directly elected). MPs represent a constituency of typically 15-20 lakh voters. Their duties: attend Parliament sessions, ask questions to ministers, pass budgets, make laws. MPLADS fund: Each MP gets ₹5 crore per year to spend on development works in their constituency. Rajya Sabha members are technically also MPs but elected differently.",
    example: "Rahul Gandhi is MP from Rae Bareli (UP) and also Leader of Opposition in Lok Sabha — the most prominent constitutional opposition role.",
    source: "https://loksabha.nic.in",
    sourceLabel: "Lok Sabha Website"
  },
  {
    term: "Chargesheet",
    fullForm: "Chargesheet (Police/CBI/ED report to court)",
    category: "Legal",
    icon: "📋",
    simple: "The document investigators file in court listing all evidence against an accused person",
    detailed: "A chargesheet is the formal document that investigating agencies (police, CBI, ED) file in court after completing investigation. It lists: the accused persons, the crimes alleged, all evidence collected (documents, statements, forensic reports). Filing a chargesheet doesn't mean the person is guilty — courts then examine the chargesheet and decide whether to proceed with trial. When we say a politician has 'cases pending' — it usually means chargesheets have been filed against them.",
    example: "CBI filed a chargesheet against Tejashwi Yadav in the Land-for-Job scam alleging that land was registered in family members' names as bribes for railway jobs.",
    source: "https://cbi.gov.in",
    sourceLabel: "CBI India"
  },
  {
    term: "Bail vs Parole vs Conviction",
    fullForm: "Understanding stages of criminal proceedings",
    category: "Legal",
    icon: "⚖️",
    simple: "Bail = temporary freedom while case continues; Parole = conditional release after conviction; Conviction = found guilty by court",
    detailed: "Important to understand: (1) BAIL — When someone is arrested and gets bail, they are released temporarily while the case continues. They are NOT found innocent — the case is still ongoing. (2) ACQUITTAL — When a court finds the accused NOT GUILTY. (3) CONVICTION — When a court finds the accused GUILTY. (4) PENDING CASE — Chargesheet filed, trial in progress, no verdict yet. All politicians on this site with 'criminal cases' have PENDING cases — NOT convictions (unless specifically stated like Lalu's Fodder Scam).",
    example: "Arvind Kejriwal was arrested by ED in March 2024, got bail from Supreme Court in September 2024 — he is NOT convicted. Lalu Prasad was CONVICTED in 4 Fodder Scam cases — that's different.",
    source: "https://main.sci.gov.in",
    sourceLabel: "Supreme Court India"
  },
  {
    term: "Defection / Anti-Defection Law",
    fullForm: "Anti-Defection Law (10th Schedule, Indian Constitution)",
    category: "Political",
    icon: "🔄",
    simple: "Law against switching parties after election — but with loopholes politicians exploit",
    detailed: "The Anti-Defection Law (10th Schedule, added 1985) says: if you're elected as an MP/MLA on party ticket and then vote against your party's direction or voluntarily give up party membership, you can be disqualified. BUT — if 2/3 of MLAs in a faction 'merge' with another party, it's not defection. This has been exploited massively: in Maharashtra 2022, Eknath Shinde got 40+ Shiv Sena MLAs to rebel. In Goa, Karnataka, MP — parties were toppled using this 2/3 loophole.",
    example: "In Madhya Pradesh 2020, 22 Congress MLAs led by Jyotiraditya Scindia resigned — toppling Kamal Nath's government. BJP then formed government. This was enabled by the 2/3 loophole.",
    source: "https://loksabha.nic.in",
    sourceLabel: "Lok Sabha"
  },
  {
    term: "No-Confidence Motion",
    fullForm: "Vote of No Confidence",
    category: "Governance",
    icon: "🗳️",
    simple: "A vote in Parliament where MPs can remove the Prime Minister if majority votes against",
    detailed: "A No-Confidence Motion is when Lok Sabha votes to say it no longer has confidence in the government. If more than 272 MPs vote FOR the motion, the PM must resign. India has had 27 no-confidence motions. The last successful one: 1979 (Morarji Desai govt). The last attempted one: 2023 (BJP won easily with 272+ seats). No-confidence motions are powerful on paper but rarely succeed when ruling party has clear majority.",
    example: "In 2023, opposition moved no-confidence motion against Modi govt over Manipur violence. Government won easily since NDA had 303 seats.",
    source: "https://loksabha.nic.in",
    sourceLabel: "Lok Sabha"
  },
  {
    term: "MGNREGS",
    fullForm: "Mahatma Gandhi National Rural Employment Guarantee Scheme",
    category: "Scheme",
    icon: "👷",
    simple: "Law guaranteeing 100 days of paid work per year to any rural household that asks for it",
    detailed: "MGNREGS guarantees 100 days of unskilled manual work annually to any rural household. Workers get minimum wage (currently ₹220-350/day depending on state). This is an 'on-demand' scheme — if you demand work and government fails to provide it, you get unemployment allowance. Introduced in 2005 by UPA-Congress. One of India's largest anti-poverty programs — 100M+ households enrolled. Critics say wages are too low; supporters say it's a vital safety net.",
    example: "Budget for MGNREGS was ₹73,000 crore in 2024-25. During COVID, it employed 112 million households. However, wages have not kept pace with inflation.",
    source: "https://nrega.nic.in",
    sourceLabel: "MGNREGS Portal"
  },
  {
    term: "GST",
    fullForm: "Goods and Services Tax",
    category: "Economy",
    icon: "📦",
    simple: "India's national sales tax — replaced 17 different taxes in 2017",
    detailed: "GST was introduced in July 2017, replacing 17 central and state taxes. Under GST, almost everything you buy has a tax rate: 0% (basic food), 5% (common items), 12% (standard goods), 18% (most services, electronics), 28% (luxury goods, tobacco). Every business with >₹40 lakh annual revenue must register for GST and file monthly returns. India's GST collection hit record ₹2.18 lakh crore in April 2024. State governments jointly decide GST rates through the GST Council.",
    example: "When you buy a mobile phone (₹20,000), 18% GST = ₹3,600 of that goes to government. A restaurant bill includes 5% GST on food.",
    source: "https://gstcouncil.gov.in",
    sourceLabel: "GST Council"
  },
  {
    term: "Disproportionate Assets",
    fullForm: "DA Case — Assets beyond known income",
    category: "Legal",
    icon: "💰",
    simple: "When a politician owns much more than their salary allows — and can't explain why",
    detailed: "Disproportionate Assets (DA) case is filed when an investigation finds that someone's total wealth far exceeds their known income sources. For example, a politician earning ₹10 lakh/year as MLA but declaring ₹10 crore assets after 5 years — where did ₹9.5 crore come from? DA cases fall under Prevention of Corruption Act. The accused must prove their assets came from legitimate sources. India has prosecuted 100+ politicians for DA.",
    example: "Himanta Biswa Sarma's assets jumped from ₹6 crore (2016 affidavit) to ₹185 crore (2021 affidavit) in 5 years on a minister's salary — triggering DA questions.",
    source: "https://cbi.gov.in",
    sourceLabel: "CBI India"
  },
  {
    term: "Contempt of Court",
    fullForm: "Contempt of Court Act",
    category: "Legal",
    icon: "⚖️",
    simple: "Disrespecting or disobeying a court order — can result in jail or fine",
    detailed: "Contempt of Court covers two types: (1) Civil contempt — disobeying a court order (like ignoring a court directive to compensate victims). (2) Criminal contempt — scandalising the court, making false statements about court proceedings, or obstructing justice. In India, Supreme Court and High Courts can punish for contempt with up to 6 months jail or ₹2,000 fine. Politicians and lawyers have been jailed for contempt — notably Prashant Bhushan (fined ₹1 in 2020 for tweets about CJI).",
    example: "Rahul Gandhi was served with contempt notice for saying 'court said' something the court did not actually say during Rafale case — he later apologized.",
    source: "https://main.sci.gov.in",
    sourceLabel: "Supreme Court"
  },
  {
    term: "Sedition Law",
    fullForm: "Section 124A IPC (now replaced by BNS Section 152)",
    category: "Legal",
    icon: "🚨",
    simple: "Law against speaking/writing against the government — widely misused to arrest journalists and activists",
    detailed: "Sedition (old Section 124A IPC, now BNS Section 152) makes it illegal to incite 'hatred, contempt, or disaffection' against the government. Originally a British colonial law used to jail freedom fighters including Gandhi and Tilak. Post-independence, it has been used against journalists, cartoonists, students, and activists. The Supreme Court stayed all sedition cases in May 2022 saying the law is liable to misuse. The new BNS (Bharatiya Nyaya Sanhita) 2023 replaced IPC but retained similar provisions.",
    example: "Stand-up comedian Munawar Faruqui was arrested under sedition in 2021 for a joke he hadn't even made yet. He spent over a month in jail.",
    source: "https://main.sci.gov.in",
    sourceLabel: "Supreme Court"
  },
  {
    term: "Governor vs CM Conflict",
    fullForm: "Role of Governor in Indian States",
    category: "Governance",
    icon: "🏛️",
    simple: "Governor is appointed by central government — when opposition runs a state, conflicts with CM often arise",
    detailed: "Every Indian state has a Governor appointed by the President (i.e., by the central government/PM's advice). The Governor's constitutional role is ceremonial. But when a state is governed by an opposition party, the Governor often becomes a proxy for the central government — withholding Bills passed by state assemblies, refusing to give permission for prosecutions, delaying budgets, or using discretion controversially. This has happened in Maharashtra, Karnataka, Kerala, Tamil Nadu, West Bengal, Jharkhand.",
    example: "Karnataka Governor granted prosecution sanction against CM Siddaramaiah in the MUDA scam in August 2024 — a step usually seen as the central government (BJP) using the Governor against opposition CM.",
    source: "https://rajbhavans.nic.in",
    sourceLabel: "Raj Bhavans India"
  },
  {
    term: "NHRC",
    fullForm: "National Human Rights Commission",
    category: "Agency",
    icon: "🛡️",
    simple: "India's official human rights watchdog — investigates rights violations by government agencies",
    detailed: "NHRC is a statutory body that investigates violations of human rights by state actors (police, government officials, military). Citizens can file complaints directly. NHRC can summon state governments, recommend compensation, and visit jails/detention centres. However, NHRC has been criticised for being toothless — it can only recommend, not enforce. In encounters, fake encounters, custodial deaths, NHRC investigations often conclude after years with limited accountability.",
    example: "NHRC investigated Yogi Adityanath govt's 'encounter raj' — 10,000+ police encounters, 200+ killed since 2017. It issued notices but full accountability is still pending.",
    source: "https://nhrc.nic.in",
    sourceLabel: "NHRC India"
  },
  {
    term: "Lok Ayukta / Lokpal",
    fullForm: "Lokpal (National) and Lok Ayukta (State) — anti-corruption ombudsman",
    category: "Agency",
    icon: "🔍",
    simple: "India's anti-corruption watchdog for politicians and bureaucrats — Lokpal for Centre, Lok Ayukta for States",
    detailed: "Lokpal is India's national anti-corruption ombudsman, established after Anna Hazare's 2011 anti-corruption movement that brought Arvind Kejriwal to prominence. Lokpal can investigate PMs, CMs (sort of), MPs, bureaucrats for corruption. However, Lokpal was appointed only in 2019 — 6 years after the law was passed — and has been widely criticised for being understaffed and underpowered. Lok Ayukta is the state equivalent — some states (Karnataka, UP) have active Lok Ayuktas.",
    example: "Kejriwal's AAP was founded after the Lokpal movement. Ironically, Kejriwal was arrested by CBI/ED in 2024 — the agencies Lokpal was supposed to supplement.",
    source: "https://lokpal.gov.in",
    sourceLabel: "Lokpal India"
  },
  {
    term: "Manipur Ethnic Violence",
    fullForm: "Kuki-Meitei conflict in Manipur (May 2023-present)",
    category: "Crisis",
    icon: "🔥",
    simple: "Ongoing ethnic violence between two communities in Manipur — 200+ killed, 60,000+ displaced",
    detailed: "Since May 3, 2023, Manipur has seen severe ethnic conflict between Meitei (majority, Hindu, valley) and Kuki-Zo (Christian, hills) communities. Trigger: Meitei community's demand for Scheduled Tribe status was opposed by Kuki-Zo tribes. Violence escalated — 200+ killed, 60,000+ displaced, 5,000+ houses burned, churches attacked. Two women were paraded and sexually assaulted — the video went viral in July 2023. PM Modi visited only in late 2023. CM N. Biren Singh (BJP) has been accused of failing to protect minorities.",
    example: "As of mid-2025, the Manipur situation remains unresolved. Internet shutdowns, army deployment, and peace talks have not fully ended violence.",
    source: "https://manipur.gov.in",
    sourceLabel: "Manipur Government"
  },
  {
    term: "EVM",
    fullForm: "Electronic Voting Machine",
    category: "Governance",
    icon: "🗳️",
    simple: "The machine Indians vote on — opposition frequently alleges it can be tampered with",
    detailed: "EVMs are electronic voting machines used in all Indian elections since 2004. Each voter presses a button next to the candidate symbol. Results are stored electronically. Election Commission says EVMs are standalone — not connected to internet or any network, so cannot be hacked remotely. However, multiple opposition parties including AAP, Congress, SP have alleged EVM tampering when they lose. Elon Musk also questioned EVMs. EC has offered demonstrations and VVPAT (paper audit trail) verification. International experts who've tested EVMs generally found them secure.",
    example: "In Delhi 2025 elections, AAP went from 62/70 seats to 22/70. Kejriwal immediately questioned EVMs. The Election Commission rejected the allegations.",
    source: "https://eci.gov.in",
    sourceLabel: "Election Commission"
  },
];

const CATEGORIES = ["All", "Agency", "Legal", "Political", "Governance", "Role", "Alliance", "Economy", "Scheme", "Watchdog", "Crisis"];

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = GLOSSARY_TERMS.filter((t) => {
    const matchesSearch = !search ||
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.fullForm.toLowerCase().includes(search.toLowerCase()) ||
      t.simple.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || t.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Header */}
      <div style={{
        padding: "4rem 1.5rem 3rem",
        background: "linear-gradient(180deg, rgba(107,123,232,0.08) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        maxWidth: 1400, margin: "0 auto",
      }}>
        <div style={{ fontSize: 12, letterSpacing: 4, color: "#6B7BE8", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          New to Indian Politics? Start Here
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(3rem, 6vw, 5.5rem)",
          color: "#fff",
          letterSpacing: 2,
          lineHeight: 1,
          marginBottom: "1rem",
        }}>
          POLITICAL<br />
          <span style={{ background: "linear-gradient(135deg, #6B7BE8, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            GLOSSARY
          </span>
        </h1>
        <p style={{ color: "#888", fontSize: 15, maxWidth: 600, lineHeight: 1.7 }}>
          Everything explained in plain language — what is CBI, ED, CAG, FIR, Electoral Bonds, PMLA?
          If you've ever felt lost reading political news, this page is for you.
        </p>

        {/* Disclaimer */}
        <div style={{
          display: "flex", gap: 10, alignItems: "flex-start",
          background: "rgba(107,123,232,0.08)",
          border: "1px solid rgba(107,123,232,0.2)",
          borderRadius: 10,
          padding: "1rem",
          maxWidth: 700,
          marginTop: "1.5rem",
        }}>
          <BookOpen size={18} color="#6B7BE8" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ color: "#bbb", fontSize: 13, lineHeight: 1.6 }}>
            <strong style={{ color: "#6B7BE8" }}>Beginner-friendly:</strong> Each term is explained at two levels — a simple one-liner first, then detailed explanation with real examples. Click any card to expand.
          </p>
        </div>

        <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
          {[
            { val: GLOSSARY_TERMS.length.toString(), label: "Terms Explained", color: "#6B7BE8" },
            { val: GLOSSARY_TERMS.filter(t => t.category === "Agency").length.toString(), label: "Investigation Agencies", color: "#E63946" },
            { val: GLOSSARY_TERMS.filter(t => t.category === "Legal").length.toString(), label: "Legal Terms", color: "#FF6B2B" },
            { val: GLOSSARY_TERMS.filter(t => t.category === "Governance").length.toString(), label: "Governance Terms", color: "#4ade80" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: s.color }}>{s.val}</div>
              <div style={{ color: "#555", fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 280px" }}>
            <Search size={16} color="#555" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search terms... (e.g. CBI, Electoral Bonds, FIR)"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: "12px 12px 12px 40px",
                color: "#fff",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: `1px solid ${category === cat ? "#6B7BE8" : "rgba(255,255,255,0.08)"}`,
                  background: category === cat ? "rgba(107,123,232,0.15)" : "transparent",
                  color: category === cat ? "#6B7BE8" : "#666",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: category === cat ? 700 : 400,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ color: "#555", fontSize: 13, marginBottom: "1.5rem" }}>
          Showing {filtered.length} of {GLOSSARY_TERMS.length} terms
        </div>

        {/* Terms Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filtered.map((term) => {
            const isExpanded = expanded === term.term;
            const catColors: Record<string, string> = {
              Agency: "#E63946", Legal: "#FF6B2B", Political: "#FFB703",
              Governance: "#4ade80", Role: "#06b6d4", Alliance: "#8b5cf6",
              Economy: "#f59e0b", Scheme: "#10b981", Watchdog: "#6B7BE8",
              Crisis: "#ef4444",
            };
            const color = catColors[term.category] || "#888";

            return (
              <div
                key={term.term}
                style={{
                  border: `1px solid ${isExpanded ? color + "40" : "rgba(255,255,255,0.06)"}`,
                  borderLeft: `4px solid ${color}`,
                  borderRadius: 14,
                  background: isExpanded ? `${color}06` : "rgba(255,255,255,0.02)",
                  transition: "all 0.3s",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
                onClick={() => setExpanded(isExpanded ? null : term.term)}
              >
                {/* Header */}
                <div style={{ padding: "1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{term.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap", marginBottom: "0.4rem" }}>
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: "#fff", letterSpacing: 1 }}>
                        {term.term}
                      </span>
                      <span style={{
                        background: `${color}20`,
                        color: color,
                        padding: "2px 10px",
                        borderRadius: 4,
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        flexShrink: 0,
                      }}>{term.category}</span>
                    </div>
                    <div style={{ color: "#888", fontSize: 12, marginBottom: "0.5rem" }}>{term.fullForm}</div>
                    <div style={{ color: "#ccc", fontSize: 14, lineHeight: 1.5 }}>
                      <span style={{ color: color, fontWeight: 700 }}>Simple: </span>
                      {term.simple}
                    </div>
                  </div>
                  <div style={{
                    color: "#444",
                    fontSize: 20,
                    flexShrink: 0,
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.3s",
                  }}>▼</div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div style={{ padding: "0 1.5rem 1.5rem 1.5rem", paddingLeft: "calc(1.5rem + 28px + 1rem)" }}>
                    <div style={{
                      padding: "1.25rem",
                      background: "rgba(0,0,0,0.3)",
                      borderRadius: 10,
                      marginBottom: "1rem",
                    }}>
                      <div style={{ color: "#bbb", fontSize: 14, lineHeight: 1.8 }}>
                        {term.detailed}
                      </div>
                    </div>

                    {term.example && (
                      <div style={{
                        padding: "1rem",
                        background: `${color}08`,
                        border: `1px solid ${color}20`,
                        borderRadius: 8,
                        marginBottom: "1rem",
                      }}>
                        <div style={{ color: color, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: "0.4rem" }}>
                          📌 REAL EXAMPLE
                        </div>
                        <div style={{ color: "#ccc", fontSize: 13, lineHeight: 1.6 }}>
                          {term.example}
                        </div>
                      </div>
                    )}

                    {term.source && (
                      <a
                        href={term.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          color: "#6B7BE8",
                          fontSize: 12,
                          textDecoration: "none",
                          padding: "6px 12px",
                          border: "1px solid rgba(107,123,232,0.3)",
                          borderRadius: 6,
                          background: "rgba(107,123,232,0.08)",
                        }}
                      >
                        📖 {term.sourceLabel} ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: "3rem",
          padding: "2rem",
          background: "rgba(107,123,232,0.05)",
          border: "1px solid rgba(107,123,232,0.15)",
          borderRadius: 16,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 32, marginBottom: "0.75rem" }}>🎓</div>
          <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: "0.5rem" }}>Ready to explore the data?</h3>
          <p style={{ color: "#888", fontSize: 14, marginBottom: "1.5rem" }}>
            Now that you know what CBI, ED, affidavit, and pending cases mean — go check out the actual politicians.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/politicians" style={{
              background: "linear-gradient(135deg, #FF6B2B, #E63946)",
              color: "#fff", padding: "12px 24px", borderRadius: 8,
              textDecoration: "none", fontWeight: 700, fontSize: 14,
            }}>
              Explore Politicians →
            </Link>
            <Link href="/criminal-records" style={{
              border: "1px solid rgba(255,107,43,0.4)",
              color: "#FF6B2B", padding: "12px 24px", borderRadius: 8,
              textDecoration: "none", fontWeight: 700, fontSize: 14,
            }}>
              Criminal Records →
            </Link>
            <Link href="/controversies" style={{
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#888", padding: "12px 24px", borderRadius: 8,
              textDecoration: "none", fontSize: 14,
            }}>
              Verified Controversies →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
