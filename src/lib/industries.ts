export type IndustryFaq = { question: string; answer: string };

export type Industry = {
  slug: string;
  name: string;
  category: string;
  icon: string;
  summary: string;
  overview: string;
  audience: string;
  challenges: string;
  searchIntent: string;
  paidStrategy: string;
  contentAngles: string;
  aiQuestions: string;
  conversionPath: string;
  automation: string;
  trust: string;
  localAngle: string;
  metrics: string;
  offer: string;
  faqs: [string, string][];
};

export const INDUSTRIES: Industry[] = [
  {
    "slug": "hospitals",
    "name": "Hospitals & Multi-Specialty Centres",
    "category": "Healthcare & Wellness",
    "icon": "🏥",
    "summary": "Patient acquisition and reputation marketing for hospitals, specialty centres and healthcare groups.",
    "overview": "Hospitals must communicate clinical capability, convenient access, department-level expertise and patient experience without making exaggerated treatment promises. Marketing needs to support informed choice while protecting patient privacy and the credibility of clinicians.",
    "audience": "Hospital audiences include patients comparing specialties, family members researching care for relatives, people looking for a second opinion, employers exploring health packages and referring clinicians. Their decisions are high-stakes, locally influenced and often time-sensitive.",
    "challenges": "Common challenges include low visibility for specialty departments, confusing service information, missed phone enquiries, inconsistent doctor profiles, weak review responses and difficulty distinguishing emergency information from routine appointments. Each issue can create friction before a patient reaches the right team.",
    "searchIntent": "Prioritize specialty-plus-location searches, doctor names, department pages, diagnostic availability, appointment questions, visiting hours, insurance or cashless information where verified, and clear directions. Separate emergency guidance from ordinary discovery content and keep key details consistent across platforms.",
    "paidStrategy": "Use carefully segmented search campaigns for specialties and appointment intent, with location targeting based on service reach. Use awareness campaigns only where suitable, exclude irrelevant queries, route each ad to a relevant department page and track qualified appointments rather than raw clicks.",
    "contentAngles": "Create doctor-approved explainers about services, preparation instructions, care pathways, facility access, prevention and frequently asked operational questions. Use anonymized educational examples only with proper approvals; never expose patient records or imply a typical result from an exceptional outcome.",
    "aiQuestions": "AI-readable answers should clarify which department handles a concern, what services are offered, how to request an appointment, what documents may be needed and how to verify opening hours. Medical information must be reviewed by qualified professionals and clearly distinguish education from diagnosis.",
    "conversionPath": "A useful journey moves from specialty search to an accurate service page, then to a visible call or appointment option, confirmation and a practical pre-visit checklist. Offer separate paths for routine appointments, diagnostics and urgent care so visitors are not forced into one generic form.",
    "automation": "With appropriate access controls, automate enquiry routing by department, appointment reminders, non-clinical FAQs and follow-up surveys. Keep sensitive clinical information out of general marketing workflows and use consent, role-based permissions, retention limits and human escalation for anything that could affect care.",
    "trust": "Publish verified clinician credentials, hospital registration details where applicable, department information, accessible contact points and transparent policies. Obtain consent for patient stories and images, review claims carefully and respond to feedback without confirming or disclosing an individual's patient relationship.",
    "localAngle": "Build accurate location information for every facility and specialty, including landmarks, parking or transit guidance and service-area details. For hospital groups, maintain distinct pages for each branch and department while avoiding near-identical pages that add no useful information for patients.",
    "metrics": "Measure qualified appointment requests, answered calls, appointment completion where safely attributable, service-page engagement, branded searches and cost per qualified enquiry. Report aggregate data and avoid exposing personal health information in ad platforms or shared dashboards.",
    "offer": "A practical starting offer is a specialty visibility and enquiry-path audit covering doctor pages, local listings, paid-search structure, call handling and appointment conversion friction.",
    "faqs": [
      [
        "How can hospitals improve digital visibility?",
        "Start with accurate specialty pages, verified clinician profiles, complete local listings, useful patient information and a measurable appointment journey. Improve the most important departments first, then expand based on actual enquiry quality and operational capacity."
      ],
      [
        "Can paid advertising be used for hospital services?",
        "Paid search can support appropriate service discovery when campaigns respect applicable healthcare advertising rules, platform policies, privacy requirements and professional ethics. Claims should be reviewed, targeting should be relevant, and leads should be evaluated for quality rather than volume alone."
      ]
    ]
  },
  {
    "slug": "doctors-clinics",
    "name": "Doctors & Clinics",
    "category": "Healthcare & Wellness",
    "icon": "🩺",
    "summary": "Local discoverability and appointment conversion for independent doctors and outpatient clinics.",
    "overview": "Independent clinics depend on credibility, availability and patient understanding. Their marketing should make specialities, consultation modes, clinic location and booking steps easy to verify without promising outcomes or turning sensitive medical details into advertising claims.",
    "audience": "Typical audiences are people searching for a specialist, families seeking ongoing care, patients comparing nearby clinics and returning patients who need updated timings. Some visitors want quick practical answers; others need enough professional context to feel comfortable booking.",
    "challenges": "Clinics may have incomplete listings, thin specialty pages, unanswered calls during consultation hours, outdated timings, unclear fees or confusing instructions for first visits. A marketing plan must connect visibility with the clinic's real capacity to respond and schedule appointments.",
    "searchIntent": "Use specialty, condition-information, doctor-name and neighborhood combinations naturally. Add separate pages for meaningful services and consultation types, explain when to seek professional assessment, and maintain consistent contact details, hours and booking instructions.",
    "paidStrategy": "Build narrowly relevant search campaigns around appointment intent and clinic service areas. Test landing pages with one clear next step, exclude irrelevant searches, use call extensions only when calls can be answered and measure booked consultations rather than clicks.",
    "contentAngles": "Publish clinician-reviewed explainers, visit-preparation checklists, service descriptions, common operational FAQs and preventive-care education. Avoid diagnosing readers, using fear-based copy or presenting unsupported success rates; all educational content should have a named reviewer and review date where appropriate.",
    "aiQuestions": "Structure the page to answer who the doctor treats, which services are available, where the clinic is located, how appointments work and what a first visit involves. Use plain language, descriptive headings and consistent professional details so search systems can extract context accurately.",
    "conversionPath": "A high-intent visitor should quickly find the relevant service, doctor credentials, clinic hours, phone or booking form and next steps. After a request, provide a clear confirmation and human follow-up. Do not ask visitors to share unnecessary sensitive details through general lead forms.",
    "automation": "Automate non-clinical tasks such as appointment reminders, missed-call notifications, confirmation messages and common administrative answers. Send clinical questions to trained staff, protect contact data and make opt-out and escalation paths easy to find.",
    "trust": "Keep qualifications, registration information, specialty claims, fee details and clinic hours accurate. Use genuine reviews without fabricating endorsements, disclose material terms and avoid implying guaranteed results. Obtain appropriate permissions for all photographs, patient stories and testimonials.",
    "localAngle": "Neighborhood coverage matters for clinics, but each location page should give genuine local information such as access, service hours and doctor availability. Keep business listings synchronized and create location-specific content only when that clinic actually serves the advertised area.",
    "metrics": "Track booked consultations, qualified calls, enquiry response time, missed-call recovery, new-patient source and cost per appointment. Review lead quality with the clinic team and use aggregate reporting that does not expose an individual's health condition or consultation details.",
    "offer": "Start with a clinic growth audit covering Google Business Profile completeness, local search visibility, specialty-page quality, appointment conversion and response workflows.",
    "faqs": [
      [
        "What marketing works best for a local clinic?",
        "A reliable foundation is accurate local listings, specialist service pages, strong patient information, review management and focused search advertising. The best mix depends on specialty, patient geography, appointment capacity and how quickly enquiries are answered."
      ],
      [
        "Should clinics create a separate page for every treatment?",
        "Create separate pages where the treatment is genuinely offered and visitors need distinct information. Each page should explain suitability, process and booking steps responsibly, rather than repeating a generic paragraph with only the treatment name changed."
      ]
    ]
  },
  {
    "slug": "dental-clinics",
    "name": "Dental Clinics & Dentists",
    "category": "Healthcare & Wellness",
    "icon": "🦷",
    "summary": "Local search and appointment marketing for dental practices and dental specialists.",
    "overview": "Dental patients often compare nearby clinics, treatment options, appointment access and professional trust before making contact. Marketing should reduce uncertainty with clear explanations while avoiding sensational before-and-after claims, guaranteed outcomes or unnecessary pressure around elective procedures.",
    "audience": "The audience includes families looking for regular dental care, adults researching specific procedures, parents booking children's visits and people seeking urgent dental appointments. Each group needs different information, from preventive guidance to transparent explanations of consultation steps.",
    "challenges": "Dental practices commonly face competitive local search results, unclear treatment pages, no simple way to book, inconsistent hygiene or facility information and poorly managed follow-up. A plan should make the clinic's real strengths visible without exaggerating clinical outcomes.",
    "searchIntent": "Create useful pages for preventive dentistry, orthodontics, restorative procedures and other services actually provided. Pair them with accurate location and dentist information, clear consultation details and patient-friendly answers to questions about process, timing and preparation.",
    "paidStrategy": "Use high-intent search campaigns for services offered and the clinic's practical catchment area. Build separate ad groups and relevant landing pages, monitor search terms weekly and optimize toward attended appointments and suitable enquiries instead of broad lead volume.",
    "contentAngles": "Develop dentist-reviewed articles on oral hygiene, treatment preparation, children's oral health, aftercare and common questions. If showing procedure imagery, secure consent and explain context; do not imply that every patient can expect the same result.",
    "aiQuestions": "Answer questions such as which dental services are available, how a consultation is booked, whether an initial assessment is required and what preparation is useful. Keep clinical explanations cautious, readable and reviewed by the practitioner rather than written as a diagnosis tool.",
    "conversionPath": "Visitors should be able to compare relevant services, understand how to contact the clinic and request an appointment with minimal friction. Follow-up messages should clarify time and location, not pressure patients into treatments or request private clinical details through unsecured channels.",
    "automation": "Use consent-aware reminders, appointment confirmations, missed-call alerts and post-visit feedback requests. Keep treatment recommendations and clinical triage with dental professionals, and maintain access controls around patient information.",
    "trust": "Show real dentist credentials, clinic details, service availability and transparent consultation terms. Review promotional claims and testimonials for accuracy, obtain written permission for patient imagery and ensure review responses do not disclose treatment or patient status.",
    "localAngle": "Optimize the clinic listing, categories, appointment details and service area. Mention genuine neighborhood access points and parking details, and maintain individual location pages only where separate clinics exist and visitors benefit from branch-specific details.",
    "metrics": "Track new-patient appointments, phone-call quality, request-to-booking rate, attendance rate, service-level conversion and cost per attended consultation. Compare channels over time and use privacy-conscious aggregate reports.",
    "offer": "A dental practice audit can review local rankings, procedure-page usefulness, booking friction, campaign relevance and ethical review acquisition.",
    "faqs": [
      [
        "How can dentists attract more suitable patients?",
        "Make the services actually available easy to find, publish helpful dentist-reviewed information, maintain accurate local listings and send relevant ad traffic to pages tailored to the patient's question. Track completed appointments to understand whether enquiries are genuinely useful."
      ],
      [
        "Are before-and-after images enough to convert visitors?",
        "Images can provide context but should never replace explanations of treatment, suitability, limitations or individual variation. Obtain clear consent, use authentic material and avoid implying that one person's result predicts another person's outcome."
      ]
    ]
  },
  {
    "slug": "diagnostic-labs",
    "name": "Diagnostic Labs & Imaging Centres",
    "category": "Healthcare & Wellness",
    "icon": "🧪",
    "summary": "Service-line discovery and appointment information for pathology labs and imaging providers.",
    "overview": "Diagnostic providers need accurate test information, dependable access details and straightforward booking instructions. Marketing should help people understand available services and preparation requirements while making clear that clinicians interpret results and that online content cannot replace professional advice.",
    "audience": "Visitors may be patients following a clinician's instruction, caregivers arranging a test, employers seeking approved screening packages or referring professionals looking for service availability. Their key questions often concern location, timing, preparation, report delivery and accepted payment options.",
    "challenges": "Common friction includes confusing test menus, outdated prices, unclear preparation notes, missing branch details, slow enquiry responses and weak visibility for specific services. A good marketing system gives each audience accurate practical information without overstating diagnostic capability.",
    "searchIntent": "Build clear pages for test categories, imaging modalities and genuine packages, with clinician-relevant context, preparation instructions verified by the lab and contact details. Make report delivery, sample collection and booking rules explicit where offered.",
    "paidStrategy": "Use service-specific paid search for available tests and collection services, with location controls and negative keywords. Send traffic to the matching service page and measure qualified requests, completed bookings and operational capacity rather than form submissions alone.",
    "contentAngles": "Publish approved test-preparation guides, explanations of what a service is designed to do, collection FAQs and logistics information. Avoid making diagnostic claims or suggesting readers select tests without professional guidance; medical content requires qualified review.",
    "aiQuestions": "Use question headings that answer whether a service is available, where samples are collected, what preparation the lab requires, how appointments work and how reports are accessed. Keep all details current and distinguish general information from advice that must come from a clinician.",
    "conversionPath": "A visitor should identify the right service page, verify availability and requirements, then contact the appropriate branch or request a booking. Confirmation messages can repeat logistical instructions approved by the provider, while results and clinical interpretation should stay in secure authorized systems.",
    "automation": "Automate booking acknowledgements, approved preparation reminders, branch routing and operational status updates. Never send test results through general marketing tools unless a secure, authorized process explicitly permits it; apply data-minimization and retention rules.",
    "trust": "Display laboratory accreditations or credentials only when current and verified, identify collection locations accurately and explain turnaround estimates carefully. Use transparent terms and avoid absolute claims about accuracy or outcomes that cannot be substantiated.",
    "localAngle": "For multi-branch labs, keep each branch's hours, collection facilities, directions and service availability distinct. Local landing pages need genuine branch-level usefulness, not duplicate copy that implies every location offers every test.",
    "metrics": "Measure service-page visits, completed appointments, relevant calls, test-category enquiry quality, booking conversion and response time. Assess performance in aggregate and keep identifiable medical or laboratory data out of marketing analytics.",
    "offer": "A diagnostic-centre growth audit can review test discovery, branch listings, service pages, paid search quality and booking communication.",
    "faqs": [
      [
        "How should a lab promote diagnostic services responsibly?",
        "Publish accurate service information, preparation instructions reviewed by qualified staff, genuine branch details and straightforward booking options. Avoid interpreting symptoms for readers or implying that online advertising determines which test a person needs."
      ],
      [
        "Can separate pages help individual test categories?",
        "Yes, when each category needs distinct preparation, access or service information. Make pages genuinely useful and verify that the service is actually offered at the named branch."
      ]
    ]
  },
  {
    "slug": "physiotherapy-centres",
    "name": "Physiotherapy & Rehabilitation Centres",
    "category": "Healthcare & Wellness",
    "icon": "🦿",
    "summary": "Local discovery and consultation enquiries for rehabilitation and physiotherapy practices.",
    "overview": "Rehabilitation marketing must explain the services available, practitioner qualifications, appointment format and practical journey in approachable language. Because recovery needs vary, the strongest content educates without promising a fixed recovery timeline or presenting a general exercise as suitable for everyone.",
    "audience": "Potential clients include people referred for rehabilitation, athletes seeking supervised support, older adults needing mobility assistance and families researching care options. Many compare distance, session access, practitioner expertise and whether the service matches an approved care plan.",
    "challenges": "Centres may struggle to explain specializations, show real service differentiation, keep listings accurate and convert educational-content readers into consultations. They must also prevent online content from being mistaken for individualized assessment or emergency treatment.",
    "searchIntent": "Create distinct pages for services actually offered, practitioner profiles, location details and common appointment questions. Use local intent terms naturally and frame condition-related articles as educational guides that encourage an appropriate professional assessment.",
    "paidStrategy": "Target local search demand for relevant services and consultation terms. Keep ad messages factual, point each audience to a fitting page and evaluate whether enquiries align with clinician capacity and the centre's actual scope of practice.",
    "contentAngles": "Publish practitioner-reviewed explainers about rehabilitation pathways, safe appointment preparation, clinic services and general mobility education. Use demonstrations only with appropriate supervision and do not encourage users to ignore pain, medical guidance or safety restrictions.",
    "aiQuestions": "Answer who the centre serves, which rehabilitation services are provided, how appointments are arranged and what to expect from an initial assessment. Explicitly note that care plans depend on the individual's assessment and should come from a qualified practitioner.",
    "conversionPath": "A visitor moves from a local service search to the correct specialty page, verifies practitioner details and requests an assessment. A confirmation workflow can explain arrival instructions and appointment logistics without trying to collect unnecessary medical history in a marketing form.",
    "automation": "Automate appointment reminders, schedule changes, missed-call alerts and consent-based follow-ups. Send questions about pain, treatment suitability or deterioration to a qualified team member instead of using a bot to diagnose or prescribe exercises.",
    "trust": "Show relevant qualifications, genuine service information, accessible contact details and clear policies. Ask permission before using client stories or images and present progress examples with context rather than as guaranteed outcomes.",
    "localAngle": "Local SEO should help people find the correct centre, transport access and appointment information. Create branch pages only for actual sites and explain which services are available at each one.",
    "metrics": "Track assessment bookings, attended appointments, response speed, service-specific enquiries and cost per qualified booking. Review aggregate trends with the centre rather than optimizing solely for clicks or low-cost leads.",
    "offer": "Start with a local visibility and appointment-path review covering practitioner pages, service information, enquiry handling and search campaigns.",
    "faqs": [
      [
        "Can physiotherapy centres use digital advertising?",
        "They can use carefully reviewed campaigns focused on real services and practical appointment information. Health-related claims, imagery, targeting and data collection should comply with applicable laws, professional ethics and platform rules."
      ],
      [
        "What should a physiotherapy website explain?",
        "It should clarify services offered, practitioner credentials, appointment steps, access information and what an initial assessment generally involves. It should not promise outcomes or substitute for individualized professional advice."
      ]
    ]
  },
  {
    "slug": "veterinary-clinics",
    "name": "Veterinary Clinics & Pet Care",
    "category": "Healthcare & Wellness",
    "icon": "🐾",
    "summary": "Pet-owner discovery, appointment flow and local trust for veterinary practices.",
    "overview": "Pet owners often search when worried, comparing nearby veterinary clinics or planning preventive care. Marketing should make hours, species served, services and emergency instructions clear, while avoiding automated diagnosis and keeping urgent clinical decisions with veterinary professionals.",
    "audience": "The audience includes new pet owners, families seeking routine vaccinations, owners managing ongoing care and people searching for urgent veterinary help. They value clear service availability, transparent booking steps, location access and confidence that the clinic handles their animal's needs.",
    "challenges": "Clinics can lose enquiries because emergency availability is unclear, service descriptions are vague, staff are overloaded with repetitive questions or branch listings are outdated. An effective strategy reduces avoidable confusion without replacing clinical triage.",
    "searchIntent": "Use service-specific pages for preventive visits, consultations and procedures actually offered. Keep species served, opening hours, emergency coverage and booking instructions accurate, and distinguish educational pet-care articles from clinical advice.",
    "paidStrategy": "Run location-based campaigns around available veterinary services and routine appointments. Separate emergency information from promotional messaging, use suitable campaign hours and route leads to a person who can respond responsibly.",
    "contentAngles": "Publish vet-reviewed guides on preventive care, seasonal pet safety, routine visit preparation, clinic services and adoption-related education. Avoid alarmist health content, unverified treatments or any recommendation that delays urgent veterinary care.",
    "aiQuestions": "AI-readable content should answer which animals the clinic treats, what services are available, how booking works and how the owner should confirm urgent-care availability. For symptoms or potential emergencies, direct users to professional assessment rather than a chatbot-generated diagnosis.",
    "conversionPath": "Visitors should find the right service, verify that the clinic can help their pet, contact the team and receive practical booking information. Emergency pathways must not be buried under promotional forms or routine appointment options.",
    "automation": "Use reminders for preventive visits where the owner has opted in, booking confirmations, missed-call notifications and service FAQs. Route symptom descriptions or emergency concerns to trained staff and protect owner contact details.",
    "trust": "Show accurate veterinarian credentials, species and service capabilities, honest pricing information where possible and genuine owner feedback. Do not publish pet-owner details or case images without permission.",
    "localAngle": "Accurate neighborhood and map information is especially important when owners need to travel with an animal. Maintain separate location details and emergency hours for every clinic that genuinely offers them.",
    "metrics": "Measure new appointments, routine-care bookings, call response, enquiry-to-visit conversion, missed-call recovery and relevant local searches. Avoid equating social engagement with actual booked visits.",
    "offer": "A veterinary marketing audit can evaluate local listings, service discovery, emergency information, appointment workflows and ethical review practices.",
    "faqs": [
      [
        "How can a veterinary clinic attract more local pet owners?",
        "Maintain accurate profiles and hours, create useful service pages, publish veterinarian-reviewed pet-care information and make booking simple. Local search and measured campaigns can then focus on services the clinic can actually provide."
      ],
      [
        "Should AI answer pet health questions?",
        "AI can help with general administrative information, but it should not diagnose an animal or delay urgent care. Symptom questions need clear escalation to a veterinary professional."
      ]
    ]
  },
  {
    "slug": "pharmacies-medical-stores",
    "name": "Pharmacies & Medical Stores",
    "category": "Healthcare & Wellness",
    "icon": "💊",
    "summary": "Local discovery for pharmacies, verified availability information and service-led customer communication.",
    "overview": "Pharmacies benefit from discoverability for location, hours, genuine services and lawful fulfilment options. Marketing must respect rules affecting medicine promotion and prescriptions, and must not use sensitive health inferences or present a pharmacy listing as a substitute for professional care.",
    "audience": "Customers may need nearby operating hours, refill processes, pharmacist assistance, permitted delivery options or health essentials. Their immediate questions are often practical, so accurate listings and clear service information matter more than broad promotional claims.",
    "challenges": "Typical problems include inaccurate hours, missing delivery coverage, unclear contact routes, outdated service listings and promotional content that does not account for healthcare advertising restrictions. Store teams also need a manageable response system during busy periods.",
    "searchIntent": "Prioritize accurate store name, location, hours, contact options and services actually available. Informational content can explain how to contact a pharmacist or handle general pharmacy logistics, while avoiding prohibited claims about prescription medicines.",
    "paidStrategy": "Advertising must be reviewed against applicable medicine regulations and platform policy before use. Where campaigns are permitted, focus on lawful store services and relevant local access; do not promote restricted medicines or target users based on inferred health conditions.",
    "contentAngles": "Publish service updates, pharmacist-reviewed general health education where permitted, seasonal logistics and clear explanations of lawful ordering or pickup. Ensure every claim and image is appropriate for the jurisdiction and product category.",
    "aiQuestions": "An AI-readable service section should explain store hours, location, pharmacist contact options and verified fulfilment services. It should not make prescription recommendations, suggest changing medication or infer what an individual should purchase.",
    "conversionPath": "Help users quickly verify the branch, availability and permitted purchase process, then provide a secure, compliant contact or fulfilment path. Avoid collecting medication details through ordinary marketing forms.",
    "automation": "Automate hours updates, order-status messages where permitted, customer-service routing and opt-in notifications. Restrict access to any regulated order information and keep promotional messaging separate from clinical or prescription handling.",
    "trust": "Keep licensing and pharmacist details accurate where required, represent availability honestly, protect customer data and avoid fake ratings or unsupported product claims. Have qualified staff review health content and promotional material.",
    "localAngle": "Each storefront needs its own accurate hours, map pin, phone and service availability. If delivery or collection is offered, specify the real coverage and any limitations rather than promising universal fulfilment.",
    "metrics": "Track directions, service enquiries, permitted order requests, response time and store-level discovery. Marketing reports should avoid linking identifiable customer activity to sensitive health inferences.",
    "offer": "A pharmacy visibility audit can examine local listing accuracy, compliant service messaging, customer enquiry routes and branch consistency.",
    "faqs": [
      [
        "Can a pharmacy advertise online?",
        "It depends on the product, service, jurisdiction and advertising platform. Review applicable laws and current platform policy before running campaigns, especially for prescription medicines and health-related claims."
      ],
      [
        "What should a pharmacy optimize first?",
        "Start with correct branch information, services, operating hours, permitted fulfilment details and reliable customer contact channels. These practical details answer high-intent local searches."
      ]
    ]
  },
  {
    "slug": "mental-wellness",
    "name": "Mental Wellness & Counselling",
    "category": "Healthcare & Wellness",
    "icon": "🧠",
    "summary": "Trust-led visibility for counselling, therapy and mental wellness professionals.",
    "overview": "Mental wellness marketing needs extra care around privacy, vulnerability and professional claims. Content should communicate credentials, service format and access clearly without targeting people through sensitive assumptions, promising outcomes or framing mental health as a simple advertising conversion.",
    "audience": "Visitors can include people researching counselling options, family members seeking general service information and organizations exploring wellbeing programs. Some may be cautious about privacy or stigma, so transparent processes and respectful wording are essential.",
    "challenges": "Common barriers include uncertainty about practitioner credentials, unclear session format, concerns about confidentiality, confusing fees and hesitation to initiate contact. Marketing must lower practical friction while never using distress or fear to pressure a person into booking.",
    "searchIntent": "Create accurate pages for the services and formats genuinely offered, including practitioner qualifications, session access, language availability and general booking steps. Educational pages should not diagnose readers; urgent-risk situations need clear direction to appropriate local emergency support.",
    "paidStrategy": "Review campaigns carefully for health-related policy and sensitive-personal-attribute restrictions. Use broad contextual or service-intent messaging rather than targeting inferred conditions, and avoid remarketing that could expose a person's private interest in counselling.",
    "contentAngles": "Publish professionally reviewed explainers about session expectations, how to choose a practitioner, privacy questions and general wellbeing education. Avoid sensational stories, identifiable client narratives without appropriate consent, or promises that therapy guarantees a result.",
    "aiQuestions": "Answer what services are offered, who the professionals are, how sessions work, how confidentiality is approached and how to request an appointment. For mental health crises, do not rely on an automated marketing flow; provide clear and appropriate routes to qualified or emergency support.",
    "conversionPath": "Offer discreet service information, a transparent enquiry option and a clear explanation of what happens after contact. Avoid forcing detailed disclosures on a first form and explain who can access the information submitted.",
    "automation": "Automate only administrative tasks such as session confirmations and consent-based reminders. Sensitive disclosures, crisis indicators and clinical questions should never be handled as routine marketing leads; define trained human escalation and secure data boundaries.",
    "trust": "Display verified credentials, service scope, confidentiality policies, fees and cancellation terms. Do not promise guaranteed improvements or use fabricated testimonials. Review all claims with the qualified professional responsible for care.",
    "localAngle": "Local pages should explain real availability, appointment mode, location access and languages offered. Avoid implying that a practitioner covers every city unless remote sessions are genuinely available and professionally appropriate.",
    "metrics": "Use privacy-conscious aggregate measures such as qualified service enquiries, booking completion, response time and referral source. Do not use sensitive clinical disclosures to build advertising audiences or optimize creative around vulnerability.",
    "offer": "A responsible growth audit can review discoverability, credential pages, privacy-first enquiries and ethical campaign design.",
    "faqs": [
      [
        "How should counsellors market services ethically?",
        "Explain qualifications, service scope, booking, fees and confidentiality clearly. Avoid guaranteed outcomes, fear-based messaging, sensitive audience targeting and any claim that could mislead people seeking support."
      ],
      [
        "Should counselling businesses use remarketing?",
        "Use caution because remarketing can reveal sensitive interests to other people using a device. Review current platform rules and privacy obligations, and prefer lower-risk contextual strategies where appropriate."
      ]
    ]
  },
  {
    "slug": "schools",
    "name": "Schools & K–12 Education",
    "category": "Education & Coaching",
    "icon": "🏫",
    "summary": "Admissions marketing for schools, with parent-focused trust, local discovery and enquiry handling.",
    "overview": "School choice is a family decision involving academic approach, location, safety, facilities, fees and communication. Marketing should present verified school information and the admissions journey clearly while avoiding unsupported rankings or promises about a child's future results.",
    "audience": "Families may compare schools by curriculum, grades, commute, activities, class environment and admission dates. Parents need reliable details and reassurance, while the school needs qualified enquiries that match actual grade availability and capacity.",
    "challenges": "Admissions teams often face repetitive enquiries, incomplete applications, outdated calendar details and traffic that does not match the school's service area. A thoughtful funnel helps families get answers without creating pressure or misleading urgency.",
    "searchIntent": "Create accurate pages for campuses, grades, curriculum, fee and admission processes where approved, activities and transport. Use local search terms naturally and make current application timelines easy to locate and update.",
    "paidStrategy": "Plan seasonal campaigns around real admission windows and the grades with available seats. Use geographic targeting appropriate for commute patterns, clear parent-oriented landing pages and offline enquiry tracking where lawful and consented.",
    "contentAngles": "Publish curriculum explainers, open-house announcements, campus life, student-support information, extracurricular programs and parent FAQs. Use authentic photography with permission and avoid publishing children's information without appropriate guardian consent.",
    "aiQuestions": "Make AI-readable answers clear about grades offered, curriculum, campus location, admission requirements, application deadlines and how families can visit. Do not claim guaranteed academic outcomes; distinguish published facts from school philosophy or opinion.",
    "conversionPath": "A family should move from discovery to the relevant campus or grade page, view admission steps, book an open day or submit a short enquiry and receive a helpful response. Build a clear pathway from enquiry to visit to application.",
    "automation": "Use CRM routing for grade-level enquiries, open-day reminders, application status communication and opt-in newsletters. Limit access to children's data, follow consent rules and avoid sending sensitive student records into marketing tools.",
    "trust": "Publish real campus details, policies, curriculum information, contact routes and transparent admissions terms. Display awards or accreditations only when verified and current, and use student images only with appropriate permission.",
    "localAngle": "Create real campus pages that include commute information, transport coverage and local admission events. A school with several campuses should identify which grades and programs are available at each site.",
    "metrics": "Measure qualified admissions leads, open-house bookings, visit attendance, application starts, completed applications and response time by grade or campus. Do not rely solely on impressions or social follower growth.",
    "offer": "An admissions funnel audit can assess local discovery, parent information pages, campaign timing, visit booking and enquiry follow-up.",
    "faqs": [
      [
        "How can schools generate better admission enquiries?",
        "Use clear grade-level pages, accurate admission details, local targeting and a simple open-day or enquiry workflow. Measure visits and completed applications rather than optimizing only for low-cost form fills."
      ],
      [
        "Can schools advertise to parents on social platforms?",
        "Campaigns should follow platform age-related rules, applicable privacy and education regulations, and guardian-consent requirements for student imagery or data. Use factual, respectful messaging."
      ]
    ]
  },
  {
    "slug": "colleges-universities",
    "name": "Colleges & Universities",
    "category": "Education & Coaching",
    "icon": "🎓",
    "summary": "Program discovery and admissions funnels for higher education institutions.",
    "overview": "Higher-education marketing connects prospective students with programs, eligibility, outcomes, campus experience and application deadlines. Strong pages help different audiences understand verified program details and make considered decisions instead of relying on vague placement or prestige claims.",
    "audience": "Prospective students, parents, working professionals and international applicants compare course options, eligibility, fees, accreditation, delivery mode, location and graduate pathways. Their research can span months and multiple channels, requiring helpful content at every stage.",
    "challenges": "Institutions can struggle with inconsistent program information, enquiry overload, broad campaigns that attract ineligible applicants and weak attribution from first discovery to enrollment. Each course should communicate the facts relevant to its candidate profile.",
    "searchIntent": "Build substantive program pages covering curriculum, eligibility, duration, application dates, faculty context and career pathways where verified. Separate campus and mode details, use structured headings, and keep admissions information current each intake cycle.",
    "paidStrategy": "Segment campaigns by program, applicant intent and intake cycle. Use qualified landing pages, lead scoring based on consented relevant fields and follow-up sequences appropriate to application deadlines. Keep claims about placement, salaries and rankings evidence-backed.",
    "contentAngles": "Create course comparison guides, student-life features, application explainers, faculty Q&As and career-path articles. Use real program details and current data, and clearly identify when an outcome is an example rather than a guarantee.",
    "aiQuestions": "Answer who a program is for, the prerequisites, duration, fee information published by the institution, application steps and accreditation status when verifiable. Structured program facts support accurate extraction by search engines and AI tools.",
    "conversionPath": "Route each prospective student to the exact course, then to eligibility information, a counselor session or application. A lead record should retain course interest and consent so counselors can personalize follow-up without repeatedly asking for the same details.",
    "automation": "Automate course enquiry assignment, application reminders, event registrations and consent-based email or WhatsApp updates. Protect applicant records and ensure deadline messages reflect actual published dates.",
    "trust": "Use current accreditation, approval, faculty, program and placement information. Explain placement methodology and time period if results are published, and avoid guaranteed jobs, salary outcomes or unverifiable superiority claims.",
    "localAngle": "For campus-led programs, include genuine campus access, accommodation, transport and local event information. For online programs, specify eligibility and service reach instead of pretending an online institution has physical offices in every target city.",
    "metrics": "Track program-qualified leads, counselor response, event attendance, application completion, admission conversion and cost per enrolled student where attribution is reliable. Compare by program and intake rather than treating every form as equal.",
    "offer": "An education growth audit can review program pages, admission campaign segmentation, applicant quality and inquiry-to-enrollment reporting.",
    "faqs": [
      [
        "What should a college admissions page include?",
        "Include accurate course eligibility, duration, curriculum, application process, fees where approved, deadlines and verified accreditation information. Keep each program page focused on decisions prospective applicants actually need to make."
      ],
      [
        "How can institutions measure enrollment marketing?",
        "Connect campaign source to qualified enquiries, counselor activity, application milestones and enrollments where lawful and technically reliable. Use privacy-safe reporting and avoid making unsupported claims about outcomes."
      ]
    ]
  },
  {
    "slug": "coaching-classes",
    "name": "Coaching Classes & Institutes",
    "category": "Education & Coaching",
    "icon": "📚",
    "summary": "Lead generation and admissions growth for competitive-exam, tuition, professional and specialist coaching classes.",
    "overview": "Coaching institutes sell a learning journey rather than a single class: students and parents want to understand teaching quality, batch format, syllabus coverage, schedule, fee terms and support. Marketing should answer these questions honestly and help each learner choose an appropriate program.",
    "audience": "Relevant audiences include JEE and NEET aspirants, UPSC and MPPSC candidates, SSC and banking exam learners, school tuition families, commerce and CA students, computer learners and professionals upgrading skills. Parents often influence the decision, while students compare faculty, outcomes and teaching style.",
    "challenges": "Institutes commonly face seasonal admission spikes, large numbers of low-intent leads, missed calls, batch-capacity constraints, weak follow-up and unclear differentiation. Result-focused messaging can become risky when it hides selection rates, sample sizes or the effort required from learners.",
    "searchIntent": "Create separate pages for exam tracks, subject tutoring, school grades and online/offline batches that are truly offered. Explain faculty, syllabus plan, timetable, demo class, location, fee enquiry and enrollment process; avoid using generic pages for every exam keyword.",
    "paidStrategy": "Use search ads for exam-plus-city or course-plus-intent terms and Meta campaigns for awareness, demo sessions and open-house events. Separate campaigns by course and admission period, use consented follow-up, qualify leads by course and schedule, and measure demo attendance and paid enrollment.",
    "contentAngles": "Publish faculty introductions, syllabus breakdowns, study-plan examples, exam-calendar explainers, demo-class schedules, doubt-solving formats and student-success stories with verifiable context. Distinguish individual achievements from average outcomes and never suggest a result is guaranteed.",
    "aiQuestions": "Create a dedicated AI-readable block with direct answers to which exams are covered, who can join, batch timings, online versus offline format, demo availability and how fees or enrollment work. Add clear FAQs, descriptive headings, faculty details and structured course information so AI search can extract facts without guessing.",
    "conversionPath": "A strong funnel starts with a course-specific landing page, offers a demo or counseling request, asks only useful qualification questions, sends a clear confirmation and assigns the enquiry to an admissions counselor. Follow up based on course interest and preferred time rather than sending the same message to every lead.",
    "automation": "Use CRM pipelines for new lead, contacted, demo booked, demo attended, follow-up and enrolled stages. Automate reminders, missed-call alerts, batch availability updates and opt-in WhatsApp sequences, while preserving consent and giving staff control over sensitive student or parent conversations.",
    "trust": "Publish genuine faculty credentials, course structure, fee terms and transparent policies. For exam results, explain the year, source and scope of any published statistic. Use testimonials with permission, protect minors' data and avoid false scarcity such as claiming seats are nearly full without evidence.",
    "localAngle": "Local pages should cover the actual institute address, nearby landmarks, batch modes and the neighborhoods from which students can realistically commute. Separate branch pages only where campuses genuinely differ. For online coaching, explain the real geographic reach, time zones and support model.",
    "metrics": "Track qualified leads by course, call connection rate, counselor response time, demo registrations, demo attendance, enrollment conversion, fee collection where integrated lawfully and cost per enrollment. Compare batches and campaigns while accounting for seasonality and different course fees.",
    "offer": "A coaching-growth audit can review admissions ads, exam-specific landing pages, CRM and WhatsApp follow-up, demo-class conversion, local SEO and reporting gaps. The first improvement should target the biggest measurable drop-off in the current funnel.",
    "faqs": [
      [
        "How can coaching classes get more admission leads?",
        "Align course-specific search pages with a clear demo or counseling offer, run relevant Google and Meta campaigns, respond quickly and track the enquiry through demo attendance to enrollment. More leads are not useful if they do not match the course or batch capacity."
      ],
      [
        "Should every exam have its own landing page?",
        "Create separate pages when the curriculum, audience, faculty, schedule or enrollment decision is meaningfully different. Each page should include genuine exam-specific information, current batch details and practical next steps rather than only swapping the exam name."
      ],
      [
        "How can AI readability help a coaching institute?",
        "Well-structured course facts and direct answers can make institute information easier for search engines and AI systems to understand. That includes exams covered, eligibility, batch formats, faculty, schedules and verified results; it does not guarantee AI recommendations or rankings."
      ]
    ]
  },
  {
    "slug": "online-coaching",
    "name": "Online Coaching & EdTech Courses",
    "category": "Education & Coaching",
    "icon": "💻",
    "summary": "Digital acquisition and learner onboarding for online coaching, recorded courses and cohort programs.",
    "overview": "Online education competes across geography, price and perceived learning quality. Prospective learners need clear information about outcomes, content access, teaching interaction, support, refund terms and time requirements before they buy a course or join a cohort.",
    "audience": "Learners can include school and exam candidates, working professionals, career changers and people in smaller cities seeking specialist instruction. They compare free content, creator credibility, delivery format, community support and whether the schedule fits their lives.",
    "challenges": "Common problems include low-quality webinar leads, weak trial-to-paid conversion, course abandonment, confusing access instructions and overpromising career outcomes. The marketing system should set realistic expectations and connect acquisition data with onboarding and course engagement where consent permits.",
    "searchIntent": "Create unique pages for each course or cohort with syllabus, prerequisites, teaching format, instructor background, time commitment and support details. Address comparisons and learner questions directly, and keep start dates, access duration and refund terms synchronized.",
    "paidStrategy": "Test search campaigns for high-intent course demand and social campaigns built around educational content, sample lessons or webinars. Use cohort-based landing pages, consented lead nurturing and cohort-specific measurement instead of broad campaigns with unclear learning intent.",
    "contentAngles": "Provide sample lessons, structured learning paths, instructor Q&As, project demonstrations and realistic explanations of who the course suits. Use genuine learner feedback and explain the context of job or salary outcomes instead of implying that course purchase guarantees employment.",
    "aiQuestions": "Make course facts easy to extract: syllabus, prerequisites, duration, instructor, assessment format, live-session schedule, access rules and support. Use clear FAQs and explicit dates, and distinguish verifiable course features from subjective promotional statements.",
    "conversionPath": "Move visitors from topic content to course details, preview lesson or webinar, checkout and guided onboarding. After purchase, confirm access, explain the first learning task and provide support routes. If there is a free trial, state what it includes and when it ends.",
    "automation": "Automate welcome sequences, live-session reminders, abandoned checkout messages where consent and platform rules permit, lesson-access support and cohort updates. Keep payment records secure, respect communication preferences and ensure users can obtain human help.",
    "trust": "Show instructor credentials, course curriculum, real sample materials, policies, total price and access duration. Make guarantees and refund conditions precise; avoid fabricated reviews or unsubstantiated claims about career placement.",
    "localAngle": "Online providers can market nationally, but should be specific about languages, time zones, live-session schedules and support availability. Local language or city campaigns should represent genuine learner support rather than inventing local offices.",
    "metrics": "Measure qualified registrations, preview-to-purchase conversion, refund rate, learner activation, course completion and support response. Acquisition cost should be compared with actual revenue and retention, not only webinar sign-ups.",
    "offer": "An online-course growth audit can review funnel design, trial conversion, course onboarding, compliant remarketing and lifetime-value measurement.",
    "faqs": [
      [
        "How can online courses improve conversions?",
        "Clarify the learning goal, syllabus, prerequisites, instructor background, access rules and refund terms. Use a relevant sample lesson, remove checkout friction and measure the journey from qualified visit through purchase and activation."
      ],
      [
        "Can online coaching target all of India?",
        "Potentially, if language, schedule, support and course delivery genuinely serve the audience. Campaign and landing-page claims should accurately describe time zones, access and help available to remote learners."
      ]
    ]
  },
  {
    "slug": "skill-training-institutes",
    "name": "Skill Development & Professional Training",
    "category": "Education & Coaching",
    "icon": "🛠️",
    "summary": "Enrollment funnels for vocational, computer, language and career-development institutes.",
    "overview": "Skill training decisions are driven by practical relevance, trainer credibility, learning format, project work and realistic career applicability. Marketing must show what learners will do and learn rather than relying on vague promises of guaranteed placement or effortless success.",
    "audience": "Learners may be fresh graduates, job seekers, school leavers, working professionals, employers training teams or people changing careers. They look for prerequisites, course schedule, hands-on practice, assessment, certificate details and support after the course.",
    "challenges": "Institutes can receive many enquiries from people who do not match course prerequisites, struggle to explain course differences and lose prospective learners because schedules or fees are hard to find. Better segmentation helps counselors respond to the right leads.",
    "searchIntent": "Build course-specific pages for programming, digital skills, language learning, job readiness and vocational tracks actually offered. Explain syllabus, duration, practical assignments, entry level and any certificate's issuing body.",
    "paidStrategy": "Separate campaigns by skill, learner intent and cohort date. Use demo classes, syllabus downloads or counseling calls as relevant offers, then track enrollment and attendance. Do not advertise guaranteed employment unless a properly defined and substantiated program guarantee truly exists.",
    "contentAngles": "Show project walkthroughs, class format, portfolio examples, trainer Q&As, sample lesson plans and explanations of prerequisites. Career content should describe possible paths rather than promise an outcome independent of a learner's ability or labor-market conditions.",
    "aiQuestions": "Present structured facts about skills covered, level, duration, class mode, projects, assessment and certificate provider. Direct-answer FAQs help both people and AI search understand which learner a course suits and what it does not include.",
    "conversionPath": "Guide visitors from a specific skill page to a sample lesson or counseling session, then to a transparent enrollment process. Confirm batch dates, required equipment and course access details before payment.",
    "automation": "Automate cohort reminders, counseling follow-ups, document checklists, payment confirmations and new-learner onboarding. Respect communication consent and make schedule changes or refund requests easy to route to a person.",
    "trust": "Publish real trainer backgrounds, curriculum details, sample coursework, verified affiliations and clear policies. If placement assistance exists, define it accurately and separate support offered from jobs actually secured.",
    "localAngle": "For in-person institutes, describe the actual campus, transport options and batch timings. For hybrid programs, state which sessions require attendance. Local SEO pages should represent genuine classes and support available in the area.",
    "metrics": "Track course-qualified leads, demo attendance, enrollment conversion, cohort fill rate, dropout, referral rate and cost per enrolled learner. Review results by course because fee levels and learner intent can vary widely.",
    "offer": "A training-institute audit can improve course discovery, lead qualification, demo conversion, local visibility and enrollment follow-up.",
    "faqs": [
      [
        "What makes a training institute landing page effective?",
        "It should state the skill, learner level, syllabus, duration, trainer, practical work, schedule, fee terms and next step clearly. A sample lesson can help a prospective learner evaluate fit before enrolling."
      ],
      [
        "Can training centers promote placement outcomes?",
        "They can communicate verified outcomes with clear definitions, time periods and methodology. Avoid implying every learner will receive a job or salary level when that is not guaranteed by the actual program."
      ]
    ]
  },
  {
    "slug": "real-estate",
    "name": "Real Estate & Property Consultants",
    "category": "Real Estate & Construction",
    "icon": "🏢",
    "summary": "Qualified property enquiries for developers, brokers and real estate advisory businesses.",
    "overview": "Property buyers and tenants weigh location, budget, ownership details, amenities, commute and timing before speaking with a broker or developer. Marketing needs accurate inventory, transparent project facts and fast follow-up, not just glossy imagery and broad lead forms.",
    "audience": "Audiences include first-time homebuyers, investors, tenants, commercial occupiers, land buyers and property owners looking for help selling or leasing. Each group has different intent, budget, decision horizon and documentation questions.",
    "challenges": "Real estate marketers often encounter duplicate leads, stale listings, low-intent enquiries and poor response coordination between ads and sales teams. Project information can also become inconsistent across portals, landing pages and messaging channels.",
    "searchIntent": "Build useful pages for actual projects, property types, neighborhoods and buyer questions. Keep availability, developer details, approvals and legal statements verified, and avoid claiming returns, appreciation or possession timelines without reliable support.",
    "paidStrategy": "Separate campaigns by project, location and property intent. Use appropriate platform housing-ad policies and targeting restrictions, send traffic to relevant inventory pages and feed back qualified site visits or verified sales stages when lawful.",
    "contentAngles": "Create neighborhood explainers, property-comparison checklists, walkthroughs, amenities and access guides, buying-process education and verified project updates. Clearly identify illustrative images, confirm listing accuracy and avoid implying that investment gains are certain.",
    "aiQuestions": "Provide explicit answers about property type, exact location, developer or broker details, current availability, possession status when verified, visit booking and documents to review. Keep claims factual and structure project information so AI systems can distinguish facts from marketing language.",
    "conversionPath": "Move visitors from an area or property query to a relevant listing page, then to a qualified enquiry or viewing appointment. Capture budget range, intended property type and timeframe only where needed, and make the next action clear to sales staff.",
    "automation": "Use CRM stages for new enquiry, qualification, site visit, follow-up, negotiation and closed outcome. Automate visit reminders and lead routing, but keep price and availability data synchronized with the inventory owner and respect communication opt-ins.",
    "trust": "Publish accurate developer or agent identity, project facts, RERA registration details where required and clear terms. Do not fabricate reviews, hide material limitations or present illustrative prices as guaranteed current offers.",
    "localAngle": "Neighborhood pages should add real information about transit, amenities, employment hubs, schools and access where verified. Avoid producing thin location pages with copied area descriptions; each should help a buyer evaluate a genuine property choice.",
    "metrics": "Measure qualified leads, contact rate, site visits booked and attended, inventory relevance, sales-stage progression and cost per genuine opportunity. Compare channels against the value and sales cycle of each property segment.",
    "offer": "A real-estate acquisition audit can review project pages, local SEO, compliant paid campaigns, CRM routing and site-visit conversion.",
    "faqs": [
      [
        "How can real-estate companies get better leads?",
        "Use project-specific pages, accurate inventory and clear qualification questions. Connect ad campaigns to visit bookings and sales-stage feedback so the team can distinguish genuine property interest from low-intent enquiries."
      ],
      [
        "Can marketers promise property appreciation?",
        "Avoid guaranteed investment returns unless a claim is legally permitted and properly substantiated. Property outcomes depend on many variables; marketing should use verified facts and clear risk context."
      ]
    ]
  },
  {
    "slug": "builders-construction",
    "name": "Builders & Construction Companies",
    "category": "Real Estate & Construction",
    "icon": "🏗️",
    "summary": "B2B and project enquiry generation for construction firms, builders and infrastructure contractors.",
    "overview": "Construction buyers assess delivery capability, project experience, certifications, quality processes, safety practices and commercial fit. Marketing needs to demonstrate relevant capability with evidence and make the request-for-quotation or consultation process easy to follow.",
    "audience": "Potential customers include property developers, businesses procuring fit-outs, homeowners, institutional buyers, architects and public or private procurement teams. Their decision depends on scope, timelines, budget, compliance and proof that the company can deliver the required project type.",
    "challenges": "Construction firms may have strong offline references but weak digital proof, outdated portfolios, unclear service boundaries and enquiry forms that do not collect enough project context. Long sales cycles require disciplined follow-up and a useful evidence library.",
    "searchIntent": "Create service and sector pages for real capabilities such as residential construction, commercial contracting or project management. Explain geographic coverage, project stages, documentation and procurement contact routes without overstating licenses or certifications.",
    "paidStrategy": "Use focused search campaigns for high-intent service and procurement queries, supported by remarketing only where appropriate. Segment residential and commercial work, route each to relevant portfolio proof and qualify opportunity size without making irrelevant promises.",
    "contentAngles": "Show project case studies with scope, constraints, process and documented outcomes; explain safety, quality management and project coordination. Obtain approval for client names and site imagery, and distinguish completed projects from concepts or work in progress.",
    "aiQuestions": "Make it easy to extract which project types are delivered, coverage area, procurement process, available capabilities and verified certifications. Use concise factual statements with supporting portfolio evidence and avoid ambiguous superlatives such as best or number one.",
    "conversionPath": "A prospective client should identify service fit, review comparable projects, understand the quotation process and submit a brief with timeline and location. Route the enquiry to the correct estimator or business-development owner and set realistic expectations for response.",
    "automation": "Automate enquiry assignment, tender reminders, site meeting scheduling and follow-up tasks in a CRM. Keep drawings, quotations and commercial documents access-controlled, and avoid sending confidential project data into general marketing services.",
    "trust": "Publish genuine project references, documented credentials, safety approach and clear contracting process. Ensure testimonials and project statistics are permissioned and verifiable; do not imply certification or approval that the business does not hold.",
    "localAngle": "Coverage pages should reflect the real construction service area, local compliance experience and site logistics. Describe projects accurately by locality only where the work exists and avoid broad claims that the company operates nationwide without capacity.",
    "metrics": "Measure qualified RFQs, site visits, proposal requests, proposal-to-contract rate, sales-cycle duration and acquisition cost per opportunity. Track project margin or quality separately from marketing attribution.",
    "offer": "A construction lead-generation review can audit portfolio evidence, project-specific SEO, RFQ conversion and long-cycle CRM workflows.",
    "faqs": [
      [
        "What content helps construction businesses win enquiries?",
        "Relevant case studies, clear service boundaries, verified certifications, safety and quality information, and a straightforward RFQ route help buyers assess fit. Evidence should be specific to comparable work rather than generic claims."
      ],
      [
        "Should builders advertise residential and commercial work together?",
        "Separate the journeys when buyers, project scope or proof requirements differ. Dedicated pages and campaigns usually provide clearer messaging and more useful enquiry qualification."
      ]
    ]
  },
  {
    "slug": "interior-design-architecture",
    "name": "Interior Designers & Architects",
    "category": "Real Estate & Construction",
    "icon": "🛋️",
    "summary": "Portfolio-led discovery and consultation bookings for design studios and architects.",
    "overview": "Design clients evaluate aesthetic fit, project discipline, budget guidance, communication style and the ability to work within real-world constraints. Marketing should turn portfolio browsing into a qualified conversation while setting honest expectations about scope, approvals and fees.",
    "audience": "Audiences include homeowners, commercial occupiers, property developers, hospitality operators and businesses planning renovations. They often discover visual work first and then investigate the studio's style, project process, budget approach and previous experience in similar spaces.",
    "challenges": "Studios can attract inspiration seekers who are not ready to hire, hide process information behind social profiles, or fail to clarify minimum project scope. Good marketing balances visual appeal with practical details that qualify prospects.",
    "searchIntent": "Build pages around actual services such as residential interiors, workplace design, hospitality projects or architectural planning. Use original project photography, accurate location and service coverage, clear consultation steps and helpful guides to planning a project.",
    "paidStrategy": "Use visual social campaigns to introduce the studio's approach and focused search campaigns for high-intent design services. Send each audience to a relevant portfolio or consultation page and avoid optimizing only for saves, likes or low-cost messages.",
    "contentAngles": "Publish project stories showing the brief, constraints, design decisions, materials and result, subject to client approval. Add planning checklists, design-process explanations and realistic budget factors without presenting illustrative estimates as firm quotations.",
    "aiQuestions": "Answer what project types the studio handles, what the design process includes, how consultations work, what information to prepare and which locations are served. Clear project captions and descriptive image alt text help connect visual evidence with service context.",
    "conversionPath": "A lead should move from a style or service page to a portfolio of comparable work, then to a structured discovery form or consultation booking. Ask about project type, location, timeframe and approximate scope without requiring lengthy design documents at first contact.",
    "automation": "Automate consultation reminders, lead routing, project-stage notifications and follow-up tasks. Keep client drawings, home addresses and contract information in appropriate private systems rather than public content or open marketing databases.",
    "trust": "Identify the real team, qualifications where relevant, project role and clear service inclusions. Obtain permission for client spaces and partner credits, and never present renders as completed work without labeling them.",
    "localAngle": "Use genuine neighborhood and project context to show where the studio works and understands building conditions. A location claim should match real service delivery and should not be created simply to target a keyword.",
    "metrics": "Measure qualified consultations, proposal requests, consultation attendance, project-fit rate, proposal conversion and acquisition cost. Visual engagement is useful only when considered alongside genuine business outcomes.",
    "offer": "A design-studio growth audit can review portfolio storytelling, local discovery, project qualification and consultation booking.",
    "faqs": [
      [
        "How can interior designers convert more website visits?",
        "Pair strong original project images with concise project context, service scope, process details and a clear consultation route. Qualify the lead around location, project type and timing so the studio can identify realistic opportunities."
      ],
      [
        "Does every project need its own case study?",
        "Prioritize projects that demonstrate different capabilities or client needs. A useful case study explains the brief and decisions rather than simply repeating a gallery of images."
      ]
    ]
  },
  {
    "slug": "ecommerce-d2c",
    "name": "E-commerce & D2C Brands",
    "category": "E-commerce & Retail",
    "icon": "🛒",
    "summary": "Revenue-focused acquisition, product discovery and retention for online stores and direct-to-consumer brands.",
    "overview": "Online-store growth depends on product-market fit, merchandising, acquisition economics, checkout reliability and repeat purchase. A complete plan connects ad creative and search visibility with product-page usefulness, inventory accuracy, customer service and contribution margin.",
    "audience": "Shoppers arrive through search, social discovery, creator recommendations, comparison queries and returning-customer messages. Their purchase intent varies from early research to ready-to-buy, so product pages and campaigns should answer different questions at different stages.",
    "challenges": "Stores often face rising acquisition costs, inconsistent product feeds, product-page friction, abandoned carts, delayed support and discount dependence. Growth needs a joined-up view of customer acquisition, conversion, refunds and repeat purchases, not ROAS in isolation.",
    "searchIntent": "Optimize category and product pages around real product attributes, use cases and comparison intent. Maintain unique descriptions, accurate structured product data, accessible images, fast performance and clear policies for shipping, returns, warranty and availability.",
    "paidStrategy": "Combine shopping or search campaigns with creative testing on social platforms, using accurate product feeds and conversion tracking. Segment by margin, inventory and customer stage; evaluate new-customer acquisition and profitability rather than treating all attributed revenue equally.",
    "contentAngles": "Create use-case guides, authentic demonstrations, product comparisons, buyer FAQs and care instructions. Use customer photos only with permission, avoid fake urgency and ensure claims such as materials, ingredients, performance or sustainability are substantiated.",
    "aiQuestions": "Make product facts easy for search and AI systems to interpret: who the product suits, dimensions, ingredients or materials, compatibility, price, availability, shipping, returns and warranty. Use consistent product identifiers and descriptive structured data.",
    "conversionPath": "Guide visitors from relevant category or campaign pages to a detailed product page, transparent delivery and returns information, secure checkout and post-purchase updates. Remove unnecessary form fields and keep customer support visible before and after buying.",
    "automation": "Automate abandoned-checkout messages only within consent and platform rules, order status, back-in-stock alerts, customer segmentation and replenishment reminders where suitable. Ensure promotions respect opt-outs, inventory and customer preferences.",
    "trust": "Use genuine product images, accurate descriptions, verified reviews, clear policies and reliable contact information. Correct stock, delivery and price details across ads and storefront; do not buy fake endorsements or disguise paid partnerships.",
    "localAngle": "Local delivery or store-pickup claims should reflect actual coverage, service windows and stock. For nationwide campaigns, set delivery expectations by region and do not use city landing pages unless there is a meaningful local proposition.",
    "metrics": "Track contribution margin, purchase conversion, average order value, new-customer cost, refund rate, repeat purchase, checkout completion and inventory-related cancellation. Compare paid and organic results with a consistent attribution window.",
    "offer": "An e-commerce growth audit can review feed quality, product-page conversion, paid-media structure, tracking and post-purchase automation.",
    "faqs": [
      [
        "Should e-commerce brands focus on traffic or conversions?",
        "Both matter, but traffic only creates value when product fit, page quality, delivery promise and checkout work. Diagnose the largest funnel drop-off before increasing spend."
      ],
      [
        "Is ROAS enough to judge advertising?",
        "No. Include margins, discounts, fulfilment, refunds, new-customer share and repeat purchase. A high revenue-to-ad-spend ratio can still be unprofitable when total costs are ignored."
      ]
    ]
  },
  {
    "slug": "fashion-apparel",
    "name": "Fashion & Apparel Brands",
    "category": "E-commerce & Retail",
    "icon": "👗",
    "summary": "Product discovery, creative testing and repeat purchase for fashion labels and apparel retailers.",
    "overview": "Fashion shopping is visual and trend-sensitive, but buyers still need dependable information about fit, fabric, sizing, shipping and returns. Marketing works best when creative inspiration connects to accurate product details and a service experience that reduces uncertainty.",
    "audience": "Audiences include trend-led shoppers, value-conscious families, occasion-wear buyers, niche-style communities and repeat customers. Their intent depends on season, price, fit confidence, style identity and how confidently they can judge the product online.",
    "challenges": "Frequent product drops, stock changes, size-related returns, inconsistent imagery and promotion fatigue can undermine results. Brands also need to differentiate genuine design value from broad discount messaging and keep paid creative synchronized with available inventory.",
    "searchIntent": "Build category and product pages around garment type, fit, occasion, material and design attributes. Keep size charts, care instructions, stock, shipping and return details clear, and give images descriptive alt text without keyword stuffing.",
    "paidStrategy": "Test distinct creative concepts such as outfit use cases, fit demonstrations, material details and collection stories. Use accurate feeds, exclude unavailable products and compare profitable new-customer orders with repeat-customer purchases.",
    "contentAngles": "Create styling guides, outfit combinations, fabric explainers, size-selection help and collection stories. Show products on diverse models where appropriate, label edits accurately and secure permissions for creator content.",
    "aiQuestions": "Make structured answers available for size range, fit, material, care, occasion, pricing, stock and returns. Use detailed product descriptions and consistent variant data so AI shopping interfaces can distinguish colours and sizes accurately.",
    "conversionPath": "Move shoppers from visual discovery to relevant collection filters, detailed product and size pages, a transparent checkout and order updates. Offer fit support and returns information before purchase to reduce avoidable uncertainty.",
    "automation": "Use back-in-stock notifications, consented drop announcements, order updates and replenishment or cross-sell messaging that reflects purchase context. Stop campaigns when size or variant inventory is exhausted.",
    "trust": "Publish accurate materials and sizing, authentic customer feedback and clearly labeled creator partnerships. Avoid deceptive discount comparisons, artificial countdowns and claims about ethical production that cannot be supported.",
    "localAngle": "For boutiques, use genuine store details, local pickup information and styling events. For online brands, describe actual delivery coverage and make clear when a campaign is store-specific or nationally available.",
    "metrics": "Track margin-adjusted revenue, variant conversion, size-related return rate, customer acquisition cost, repeat purchase and collection sell-through. Use these results to guide merchandising and creative tests.",
    "offer": "A fashion commerce audit can assess product-feed accuracy, size and fit content, creative testing and repeat-purchase journeys.",
    "faqs": [
      [
        "What creative works for apparel ads?",
        "Test product demonstrations, outfit context, fit guidance and customer use cases against actual conversion and return data. Creative should accurately represent the item, fit and styling rather than relying only on aesthetic engagement."
      ],
      [
        "How can fashion brands reduce returns?",
        "Make sizing, fabric, fit, care and shipping information easy to find; keep images representative and analyze return reasons by product. Marketing and merchandising should work together on the issue."
      ]
    ]
  },
  {
    "slug": "jewellery",
    "name": "Jewellery Brands & Jewellers",
    "category": "E-commerce & Retail",
    "icon": "💎",
    "summary": "Trust-led discovery for fine jewellery, fashion jewellery, custom design and jewellery retail.",
    "overview": "Jewellery purchases can be high-consideration, emotional and tied to occasions or investment perceptions. Customers need accurate details about material, purity, certification, pricing conditions, design, care and store experience before they enquire or visit.",
    "audience": "Audiences include wedding shoppers, gift buyers, families comparing precious jewellery, fashion accessory shoppers and customers looking for custom pieces. Different product categories require different levels of certification, price transparency and after-sales information.",
    "challenges": "Jewellers face high competition, trust barriers, seasonal demand and incomplete online product details. Unclear purity or certification information, slow custom-order responses and generic creative can prevent interested customers from taking the next step.",
    "searchIntent": "Create pages by jewellery category, occasion, material and genuine service such as custom design or repair. State which product details are verified, explain store visit or consultation steps and keep current availability and pricing conditions clear.",
    "paidStrategy": "Use seasonal campaigns for genuine occasions and product-level campaigns for stocked items or collections. Test craftsmanship, design, gifting and service messages while complying with platform rules and avoiding misleading investment or price claims.",
    "contentAngles": "Publish care guides, design stories, craftsmanship demonstrations, occasion checklists and explanations of certification or material information. Label plated, imitation and precious materials accurately and obtain permission for customer photographs.",
    "aiQuestions": "Structure product information around material, purity where applicable, weight when verified, certification, dimensions, care, warranty, making charges or price terms when relevant, and store location. Do not let AI-generated summaries invent investment value or authenticity.",
    "conversionPath": "Move a shopper from collection discovery to a detail-rich product page, consultation or store visit. For custom work, ask about style, occasion and timing, then provide clear next steps and a human contact rather than a generic checkout-only journey.",
    "automation": "Automate appointment confirmations, collection alerts, order-status updates and consent-based occasion reminders. Protect purchase history and avoid overly intrusive messages based on personal events unless the customer has explicitly shared that preference.",
    "trust": "Use authentic photography, accurate certificates and policies, clear material descriptions and genuine reviews. Never fabricate certificates, origin claims or investment assurances. Explain warranty, exchange and buyback terms precisely where offered.",
    "localAngle": "Store-based jewellers should maintain exact hours, directions, appointment options and service information. Multi-branch pages can describe real stock or services differences, not duplicate generic claims.",
    "metrics": "Measure qualified appointments, store visits, product enquiries, high-value conversion, custom-design consultations, average order value and repeat purchase. Separate product types so performance comparisons remain meaningful.",
    "offer": "A jeweller visibility audit can review trust signals, product data, seasonal campaign setup and appointment conversion.",
    "faqs": [
      [
        "How can jewellery businesses build online trust?",
        "Publish accurate material details, clear policy information, genuine product photos and verifiable certification where applicable. High-value products require precise facts and an easy path to a knowledgeable human representative."
      ],
      [
        "Should every jewellery item have a separate page?",
        "Give stocked or distinctive items individual pages when shoppers need unique specifications, availability or design information. Group similar variants carefully and keep material and pricing details accurate."
      ]
    ]
  },
  {
    "slug": "electronics-retail",
    "name": "Electronics & Appliance Retailers",
    "category": "E-commerce & Retail",
    "icon": "📱",
    "summary": "Search, comparison and store conversion for electronics sellers and appliance brands.",
    "overview": "Electronics buyers compare specification, compatibility, warranty, price and availability across multiple sellers. Retail marketing should provide dependable product data, comparison help and service information that helps customers choose suitable equipment without exaggerated performance claims.",
    "audience": "Customers include home users, students, gaming buyers, businesses procuring devices and households replacing appliances. They arrive with model-specific searches, comparison intent, budget constraints and questions about installation, warranty or after-sales support.",
    "challenges": "Product specifications can change quickly, variants are easy to confuse and price competition can compress margins. Stock inaccuracies, unclear warranty terms, missing compatibility information and broad ads can generate expensive low-quality traffic.",
    "searchIntent": "Use accurate model and category pages, compare meaningful features, include compatibility details and explain genuine service options. Maintain product identifiers, availability, delivery, installation and warranty terms across the storefront and advertising feeds.",
    "paidStrategy": "Structure search and shopping campaigns by category, margin and inventory. Use accurate feeds, exclude discontinued products and test comparison-led creative. Evaluate profitable purchases and assisted conversions rather than assuming the cheapest click is best.",
    "contentAngles": "Create product comparisons, setup guides, compatibility explainers, buying checklists and troubleshooting content based on verified manuals. Keep technical claims aligned with manufacturer specifications and identify sponsored or affiliate relationships where applicable.",
    "aiQuestions": "Expose exact model number, specifications, compatibility, dimensions, warranty, availability, price and service terms in clean structured fields. This makes products more understandable to shoppers, search systems and AI answer tools.",
    "conversionPath": "Help shoppers narrow the category, compare products, confirm compatibility and warranty, then purchase or locate a store. Place installation and support terms before checkout and provide clear order updates afterward.",
    "automation": "Automate stock alerts, order status, service appointment routing and consent-based replenishment or accessory suggestions. Stop ads when inventory changes and keep support escalation clear for technical or warranty issues.",
    "trust": "Use original or authorized images, accurate specifications, clear seller identity and transparent return and warranty terms. Do not imply official authorization or manufacturer endorsement unless verified.",
    "localAngle": "For physical retailers, keep branch inventory or click-and-collect information current and separate from general online availability. Store pages should list genuine service coverage and contact details.",
    "metrics": "Track model-level conversion, gross margin, returns, warranty contacts, stock-related cancellation and acquisition cost. Compare categories by contribution and do not overvalue revenue from low-margin products.",
    "offer": "An electronics retail audit can review product feeds, comparison content, campaign structure and inventory-to-ad consistency.",
    "faqs": [
      [
        "How can electronics stores improve product SEO?",
        "Use accurate model names, unique specification tables, compatibility guidance, clear warranty terms and helpful comparisons. Keep the data synchronized when stock or product models change."
      ],
      [
        "Should retailers advertise every model?",
        "Prioritize models with dependable stock, healthy unit economics and clear demand. Automate feed exclusions and keep campaign destinations aligned with available variants."
      ]
    ]
  },
  {
    "slug": "furniture-home-decor",
    "name": "Furniture & Home Décor",
    "category": "E-commerce & Retail",
    "icon": "🪑",
    "summary": "Visual discovery and purchase confidence for furniture stores, décor brands and home furnishing retailers.",
    "overview": "Furniture and décor purchases depend on style, dimensions, material, delivery logistics and confidence that an item will suit a space. Digital marketing must bridge visual inspiration and practical decision-making, with accurate product information and realistic delivery promises.",
    "audience": "Buyers include homeowners furnishing a new property, renters updating a room, interior designers, offices and gift shoppers. They may browse for inspiration long before purchase, then need measurements, materials, installation and return details at decision time.",
    "challenges": "High consideration periods, bulky shipping costs, colour differences across screens and difficult returns can reduce conversion. Stores must help shoppers assess fit and coordinate inventory and delivery information across marketing channels.",
    "searchIntent": "Create pages around furniture type, room, style, material and actual dimensions. Include assembly, care, delivery coverage and returns information. Keep product imagery representative and help shoppers compare alternatives without keyword-heavy duplicate copy.",
    "paidStrategy": "Test room-based lifestyle creative, product-detail formats and search campaigns aligned with product intent. Use accurate inventory and shipping data, separate high-margin categories and avoid driving broad traffic to products that cannot be delivered in the target region.",
    "contentAngles": "Publish room-planning guides, measurement checklists, material and care explainers, style combinations and product use cases. Show genuine scale and context, label edited room images appropriately and obtain consent for customer-home photography.",
    "aiQuestions": "Present product dimensions, materials, colour names, assembly requirements, delivery, warranty and care as clear facts. AI-readable Q&As should help shoppers decide whether the item fits their room and logistics, not invent unavailable specifications.",
    "conversionPath": "Move visitors from inspiration to a relevant category, detailed dimensions, delivery estimate and a clear purchase or store consultation step. Make shipping cost and bulky-item handling visible before checkout.",
    "automation": "Automate delivery updates, appointment coordination, stock alerts and consented post-purchase care instructions. Use inventory and courier integrations carefully because delivery availability can vary by postcode and item size.",
    "trust": "Use accurate scale photography, verified material descriptions, transparent delivery and return terms and genuine reviews. Explain made-to-order lead times precisely and do not claim sustainable sourcing without evidence.",
    "localAngle": "Show actual showroom location, opening hours, parking and available display items where possible. For online sales, reflect real delivery postcodes and timelines rather than using a broad location claim as a substitute for coverage detail.",
    "metrics": "Measure product-page conversion, quote requests, average order value, delivery-related cancellations, returns, cost per sale and repeat purchase. Track performance by product dimensions and shipping class when logistics materially affect results.",
    "offer": "A home-furnishing commerce audit can review dimensions content, product creative, delivery transparency and profitable campaign structure.",
    "faqs": [
      [
        "How can furniture stores improve online conversion?",
        "Make dimensions, material, delivery, assembly, return policy and scale imagery easy to review. Clear logistics information often helps resolve uncertainty that visual design alone cannot address."
      ],
      [
        "Are lifestyle images enough for furniture listings?",
        "Lifestyle photography helps show style, but include accurate product views and measurements as well. Shoppers need a reliable understanding of scale, materials and what is included."
      ]
    ]
  },
  {
    "slug": "restaurants-cafes",
    "name": "Restaurants, Cafés & Dining",
    "category": "Food, Hospitality & Travel",
    "icon": "🍽️",
    "summary": "Local discovery, reservation and repeat-visit marketing for restaurants and cafés.",
    "overview": "Dining decisions are local and often quick, shaped by cuisine, menu, price, atmosphere, hours, location and reviews. The marketing system should make current practical information easy to find and translate discovery into calls, directions, reservations or orders.",
    "audience": "Guests may search for a meal nearby, a family dinner, business meeting, celebration, dietary options or a particular cuisine. Different visitors need menu information, seating availability, reservation rules, group options or takeaway details.",
    "challenges": "Restaurants lose business when menus, hours and photos are outdated, calls go unanswered or promotions are poorly timed. Third-party platforms may generate visibility without helping the business understand repeat visits or direct demand.",
    "searchIntent": "Keep menus, opening hours, contact details, location, service options and booking instructions accurate. Create specific pages for meaningful dining experiences or private events where appropriate, and ensure dietary claims reflect the kitchen's real practices.",
    "paidStrategy": "Use local search ads around relevant dining intent and social creative around actual dishes, seasonal menus or events. Align campaign schedules with operating hours and kitchen capacity; track reservations or direct orders rather than likes alone.",
    "contentAngles": "Share menu highlights, chef stories, behind-the-scenes preparation, event details and practical dining FAQs. Use authentic photography, respect guest privacy and clearly state availability or limited-time terms.",
    "aiQuestions": "AI-friendly answers should explain cuisine, menu access, location, hours, price range, dietary information that can be verified, reservation options and private dining availability. Keep data consistent across the website and listings.",
    "conversionPath": "Give visitors a choice between directions, a call, a reservation or takeaway ordering based on the restaurant's actual services. Confirm group size and timing where relevant, and make cancellation or late-arrival rules clear.",
    "automation": "Automate reservation confirmations, opt-in event updates, feedback requests and repeat-visit offers with sensible frequency. Connect order or booking systems reliably and avoid messaging people who have not consented to promotions.",
    "trust": "Use genuine menu images and honest prices, explain service charges where applicable and respond professionally to reviews. Never invent ratings, reviews or food claims; keep allergen and dietary statements carefully verified.",
    "localAngle": "Local SEO is foundational: maintain correct location pins, hours, menu links and holiday schedules. If multiple outlets exist, each branch needs accurate, unique details and clear ordering routes.",
    "metrics": "Track directions, calls, reservations, reservation attendance, direct orders, event enquiries and repeat-customer rate. Interpret platform attribution cautiously and reconcile website data with actual operational systems.",
    "offer": "A restaurant visibility audit can review local listings, menu discovery, reservation paths, content and direct-order opportunities.",
    "faqs": [
      [
        "How do restaurants attract more local customers?",
        "Maintain accurate hours and menus, publish real food and venue imagery, optimize local listings and create campaigns aligned with the restaurant's actual service area and opening times."
      ],
      [
        "Should restaurants focus on social media or Google?",
        "Use both for different roles: social content can create demand while search and map discovery often serve immediate local intent. Measure reservations, calls and orders to decide where to invest."
      ]
    ]
  },
  {
    "slug": "cloud-kitchens",
    "name": "Cloud Kitchens & Food Delivery Brands",
    "category": "Food, Hospitality & Travel",
    "icon": "🥡",
    "summary": "Delivery-led discovery and repeat-order marketing for cloud kitchens and virtual food brands.",
    "overview": "Cloud kitchens rely on menu appeal, delivery reliability, ratings, platform economics and repeat order behavior rather than walk-in traffic. Marketing needs to align product availability, delivery radius, packaging and kitchen capacity with demand generation.",
    "audience": "Customers typically search for a cuisine, craving, price point, dietary preference or meal occasion within a limited delivery radius. Their choices are strongly affected by menu images, expected delivery time, ratings and ease of reordering.",
    "challenges": "Common constraints include high marketplace commissions, order inconsistency, capacity peaks, fragmented customer data and limited brand recognition outside delivery apps. Marketing should grow profitable demand rather than simply increase order count.",
    "searchIntent": "Use accurate menu and brand pages, clear cuisine descriptions, service radius and order links. Distinguish virtual brands honestly and keep menus, timings, allergen information and prices synchronized across channels.",
    "paidStrategy": "Align search and social activity to delivery zones, operating windows and profitable menu categories. Use product bundles or meal occasions where the unit economics work, and evaluate repeat order and contribution margin alongside platform-reported revenue.",
    "contentAngles": "Create authentic dish videos, menu explainers, meal combinations, kitchen standards and packaging or delivery FAQs. Avoid stock food images that misrepresent portions and ensure claims about ingredients and dietary suitability are correct.",
    "aiQuestions": "Make brand name, cuisine type, menu, prices, ordering links, delivery radius, availability and timing unambiguous. AI-friendly menu information should reflect current inventory and avoid promising availability beyond the kitchen's operating capacity.",
    "conversionPath": "Take a visitor from cuisine discovery to a current menu, a clear delivery-platform or direct-order destination and an order confirmation. Keep delivery fee, minimum order and coverage information visible before the user leaves the site.",
    "automation": "Automate order confirmations, status messages through approved systems, opt-in repeat-order offers and feedback capture. Do not duplicate or contradict marketplace status messages; synchronize sold-out items and kitchen pause states where supported.",
    "trust": "Show real food, clear portion context, transparent charges and accurate ingredient disclosures. Treat customer feedback as operational insight, and never manipulate ratings or publish fabricated customer content.",
    "localAngle": "Target only delivery areas the kitchen can reliably serve. Local pages should explain menu availability and actual delivery options, not imply dine-in service or physical storefront access when none exists.",
    "metrics": "Track profitable completed orders, repeat order rate, average basket, cancellation and refund rates, delivery complaints and contribution after platform fees. Separate new-customer acquisition from repeat demand.",
    "offer": "A cloud-kitchen growth audit can review menu content, delivery-zone campaigns, repeat-order workflows and channel-level profitability.",
    "faqs": [
      [
        "How can a cloud kitchen increase repeat orders?",
        "Improve order consistency, menu discovery, delivery communication and post-purchase experience. Use consented reminders or offers, but judge success on profitable repeat orders rather than message volume."
      ],
      [
        "Should a cloud kitchen advertise beyond its delivery radius?",
        "Only when it can reliably fulfil those orders. Campaign geography should reflect actual service coverage and current kitchen capacity."
      ]
    ]
  },
  {
    "slug": "hotels-resorts",
    "name": "Hotels, Resorts & Accommodation",
    "category": "Food, Hospitality & Travel",
    "icon": "🏨",
    "summary": "Direct booking discovery and stay enquiries for hotels, resorts and boutique accommodation.",
    "overview": "Accommodation shoppers compare location, room type, amenities, cancellation terms, dates and reviews before booking. Direct marketing should present factual availability and a reliable booking experience while clarifying which offers or facilities apply to each property and season.",
    "audience": "Guests include leisure travelers, families, business travelers, wedding groups, event attendees and people looking for short stays. Their decisions depend on dates, travel purpose, room capacity, accessibility, facilities and confidence in the property's real presentation.",
    "challenges": "Hotels can lose direct bookings to third-party platforms, suffer from inconsistent room information and face seasonal demand swings. Unclear cancellation rules, slow group enquiry response and poor mobile booking experience can erase interest created by ads.",
    "searchIntent": "Create useful pages for rooms, facilities, meeting spaces, weddings and local experiences actually offered. Ensure rates, taxes, inclusions, property location and cancellation terms are clear and synchronized with booking systems.",
    "paidStrategy": "Use location- and date-relevant search campaigns, brand protection where appropriate and seasonal social creative. Track direct bookings and qualified group enquiries, and do not advertise unavailable rooms or omit material rate conditions.",
    "contentAngles": "Produce original room tours, amenity guides, destination information, event packages and guest FAQs. Use authentic photography and disclose any major renovation, seasonal closure or limitation that could affect a stay.",
    "aiQuestions": "Provide clear answers about room types, facilities, location, check-in rules, booking policies, accessibility and transport options. AI-readable amenity lists should reflect real services and distinguish property facts from promotional language.",
    "conversionPath": "Help users explore the correct property or room, enter dates, compare inclusions and complete a secure booking or group enquiry. For event leads, collect event type, date range and approximate size, then route to the appropriate coordinator.",
    "automation": "Automate booking confirmations, pre-arrival information, approved upsell offers and post-stay feedback. Synchronize rate and availability data, protect guest details and comply with communication preferences.",
    "trust": "Use authentic current images, accurate amenity lists, transparent fees and genuine guest reviews. Avoid fake ratings, hidden restrictions or misleading claims about distance to attractions.",
    "localAngle": "Destination pages should provide practical, verified guidance for nearby attractions and transport, and explain actual travel distances carefully. Each property page should stand on its own rather than reuse identical copy for every nearby city.",
    "metrics": "Track direct booking conversion, booking value, cancellation rate, occupancy-linked campaign efficiency, group enquiries and revenue after channel costs. Account for seasonality before comparing campaign performance.",
    "offer": "A hospitality direct-booking audit can review property search visibility, room detail accuracy, booking friction and seasonal campaign performance.",
    "faqs": [
      [
        "How can hotels increase direct bookings?",
        "Provide a mobile-friendly booking path, accurate room and amenity details, transparent policies and relevant search campaigns. Compare net revenue after channel costs rather than only counting website visits."
      ],
      [
        "What information should a resort page include?",
        "Show room types, amenities, location, access, current policies, inclusions, booking options and authentic photos. Make any seasonal restrictions or facility limits easy to see before booking."
      ]
    ]
  },
  {
    "slug": "travel-tourism",
    "name": "Travel Agencies & Tourism Operators",
    "category": "Food, Hospitality & Travel",
    "icon": "✈️",
    "summary": "Enquiry and booking marketing for travel planners, tour operators and tourism experiences.",
    "overview": "Travel buyers compare itinerary fit, dates, inclusions, safety, cancellation terms and provider credibility. A useful digital presence makes package details and planning steps easy to understand while separating verified logistical facts from inspiration and future possibilities.",
    "audience": "Customers may be families planning holidays, groups arranging experiences, corporate travelers, pilgrims, adventure travelers or people seeking customized itineraries. Their decision horizon and information needs vary significantly by trip complexity and price.",
    "challenges": "Travel firms can attract enquiries for unavailable dates, struggle to explain package inclusions and rely on manual follow-up. Outdated itineraries, vague exclusions and response delays reduce trust during a high-consideration purchase.",
    "searchIntent": "Create pages by real destination, trip style and package type with current dates, inclusions, exclusions, physical requirements and enquiry steps. Explain whether travel is fixed-departure, customized or informational, and keep logistics up to date.",
    "paidStrategy": "Use search campaigns for clear itinerary demand and social creative for destination inspiration. Segment by trip type and season, qualify travel dates and group size and measure booking progress rather than treating every brochure download as a sale.",
    "contentAngles": "Publish original destination guides, packing lists, seasonal information, itinerary comparisons and practical travel FAQs. Verify visas, transport and safety-related facts before publication and mark information that may change or require official confirmation.",
    "aiQuestions": "AI-readable travel pages should clarify destination, trip duration, departures, inclusions, exclusions, transport, eligibility, cancellation terms and the provider's role. Do not let an AI summary invent visa eligibility, safety guarantees or availability.",
    "conversionPath": "Move visitors from destination research to a detailed itinerary, then to a short enquiry or booking step with transparent terms. Give sales staff the dates, group size and trip interests needed for useful follow-up.",
    "automation": "Automate enquiry assignment, quote reminders, itinerary delivery and opt-in pre-trip checklists. Confirm facts from current supplier systems and avoid sending sensitive passport or payment details through ordinary marketing channels.",
    "trust": "Identify the operator, explain supplier relationships, publish clear terms and use genuine trip imagery. Distinguish illustrative itineraries from confirmed departures and never promise conditions outside the operator's control.",
    "localAngle": "For local tour operators, clarify departure points, service area and pickup rules. Destination content should offer practical value beyond place-name repetition and must be maintained when schedules or official advisories change.",
    "metrics": "Track qualified trip enquiries, quote response time, itinerary-to-booking conversion, cancellations, acquisition cost and repeat/referral bookings. Compare packages by margin and seasonality.",
    "offer": "A travel marketing audit can review itinerary pages, lead qualification, booking follow-up and seasonal destination campaigns.",
    "faqs": [
      [
        "What helps a travel agency generate better leads?",
        "Specific itinerary pages, clear inclusions and a simple request form help qualify real travel intent. Ask for dates and group size only when useful, then follow up with current, accurate package information."
      ],
      [
        "Can travel businesses automate itinerary enquiries?",
        "They can automate confirmations and routine logistics, but quotes, availability and current travel rules should be verified against reliable, up-to-date sources before being presented as facts."
      ]
    ]
  },
  {
    "slug": "wedding-event-services",
    "name": "Wedding Planners & Event Services",
    "category": "Food, Hospitality & Travel",
    "icon": "💐",
    "summary": "Date-qualified enquiries for wedding planners, venues, decorators and event providers.",
    "overview": "Wedding and event bookings are time-bound, budget-sensitive and influenced by portfolio fit, availability and trust. Marketing should help clients compare real capabilities, understand packages and schedule a discussion without creating false scarcity or disguising material exclusions.",
    "audience": "Clients include couples, families, corporate event teams, venue coordinators and brands planning launches or celebrations. Their decisions involve date, guest count, venue constraints, cultural preferences, budget and the number of services they want from one provider.",
    "challenges": "Providers may receive enquiries for unavailable dates, struggle to qualify budget or event size and rely on social media galleries without a clear booking process. Slow response can mean the client has already committed elsewhere.",
    "searchIntent": "Build separate pages for planning, décor, photography, venues and corporate events where offered. Show portfolio examples, service boundaries, planning timeline, geography and package enquiry steps with accurate information.",
    "paidStrategy": "Use visual campaigns for inspiration and high-intent search for services and venues. Qualify leads by event date, city and approximate size, then track consultations and signed bookings rather than image engagement alone.",
    "contentAngles": "Share original event galleries, behind-the-scenes planning, timeline checklists, vendor coordination and venue considerations. Obtain permission from clients and photographers, and label styled shoots so they are not mistaken for commissioned events.",
    "aiQuestions": "Give direct answers about service packages, covered locations, lead times, availability checks, consultation process and what the client should prepare. Use captions and image alt text to describe the real service shown.",
    "conversionPath": "Help visitors explore a matching portfolio, submit event date and city, book a consultation and receive a transparent next-step checklist. Set expectations for proposal timing and explain what information is needed to estimate cost.",
    "automation": "Automate consultation reminders, quote follow-ups, event milestone checklists and task assignments. Keep contracts, guest lists, budgets and private client details in controlled systems rather than public marketing tools.",
    "trust": "Publish authentic portfolio work, clear deliverables and honest package terms. Do not claim a date is available without checking, and get permission for personal event images and testimonials.",
    "localAngle": "Venue and planner pages should reflect real service geography and logistics. City-specific pages need local portfolio evidence, venue knowledge or delivery details that help clients choose, not generic repeated location text.",
    "metrics": "Measure qualified enquiries, consultation attendance, quote turnaround, signed-booking rate, booked event value and referral share. Evaluate campaigns against event dates and service capacity.",
    "offer": "An event-provider audit can improve portfolio-to-enquiry conversion, seasonal campaigns, date qualification and consultation follow-up.",
    "faqs": [
      [
        "How can wedding planners attract serious enquiries?",
        "Show relevant real work, explain the services included, make the consultation path clear and qualify around date, city and event size. Track signed bookings and avoid relying on likes or generic messages."
      ],
      [
        "Should event businesses advertise every service on one page?",
        "Separate services where buyer needs, process or evidence differ. Dedicated useful pages can help clients find the right portfolio and understand exactly what is offered."
      ]
    ]
  },
  {
    "slug": "financial-services",
    "name": "Financial Services & Investment Firms",
    "category": "Finance & Professional Services",
    "icon": "📊",
    "summary": "Credibility-led discovery for financial advisors and financial service providers.",
    "overview": "Financial decisions carry material consequences, so marketing must be precise about services, fees, qualifications, risk and regulatory status. The goal is to help prospective clients understand fit and begin a responsible conversation, not promise returns or use urgency to drive decisions.",
    "audience": "Potential clients include individuals seeking financial planning, business owners exploring finance operations, families comparing advisory help and organizations looking for treasury or financial services. Their needs vary in complexity, assets and willingness to share sensitive information.",
    "challenges": "Firms may find it difficult to differentiate expertise, earn trust online and qualify leads without collecting sensitive information too early. Unsupported performance claims and unclear regulatory disclosures can create reputational and compliance risk.",
    "searchIntent": "Build pages around services actually offered, advisor credentials, consultation process, fee structure where applicable and educational questions. Separate general financial education from individualized advice and ensure regulatory statements are current.",
    "paidStrategy": "Review each campaign against financial-services advertising rules and platform restrictions before launch. Use factual service-intent messaging, transparent disclosures and careful lead forms; avoid guaranteed-return language and sensitive financial targeting.",
    "contentAngles": "Publish expert-reviewed explainers, decision checklists, terminology guides and transparent service comparisons. Date market commentary, disclose conflicts where required and clearly separate educational information from recommendations tailored to an individual's situation.",
    "aiQuestions": "Structure answers about services, qualifications, jurisdictions served, fees, risks and consultation steps. Make disclaimers readable and avoid statements that an AI system could interpret as a guarantee or individualized investment recommendation.",
    "conversionPath": "Offer a clear introduction call or secure enquiry form, collect only basic qualification information initially and move sensitive document exchange to approved secure processes. Explain what a consultation includes and what it does not.",
    "automation": "Automate appointment booking, consent-aware follow-ups and document-request reminders through controlled systems. Do not place account balances, investment holdings or identity documents in general marketing automation logs.",
    "trust": "Verify registrations and credentials, explain fees and material conflicts, use approved disclaimers and present performance data only with required methodology and context. Avoid testimonials or endorsements where restricted.",
    "localAngle": "Local targeting should align with the firm's real service model, advisory permissions and client coverage. If remote service is available nationally, explain the actual process and eligibility instead of implying a local office in every city.",
    "metrics": "Measure qualified consultations, attended meetings, relevant service fit, proposal progression and client retention where appropriate. Use privacy-preserving reporting and do not optimize around sensitive financial attributes.",
    "offer": "A financial-services marketing audit can review positioning, compliant content, credential visibility, secure enquiries and conversion measurement.",
    "faqs": [
      [
        "Can financial firms use Google or Meta advertising?",
        "Eligibility depends on the service, jurisdiction, credentials, disclosures and current platform verification requirements. Review applicable regulations and platform policies before publishing campaigns."
      ],
      [
        "Can financial advisers promise investment returns?",
        "Avoid guarantees unless specifically lawful and substantiated under applicable rules. Investment outcomes involve risk; any performance presentation needs proper context and review."
      ]
    ]
  },
  {
    "slug": "insurance-agencies",
    "name": "Insurance Agencies & Brokers",
    "category": "Finance & Professional Services",
    "icon": "🛡️",
    "summary": "Policy education and consultation enquiries for insurance intermediaries and agencies.",
    "overview": "Insurance buyers often need help understanding coverage, exclusions, premiums and claims processes before choosing a policy. Marketing should explain the service and consultation process accurately without implying universal coverage or hiding important conditions.",
    "audience": "Audiences may include families comparing life or health insurance, vehicle owners, employers exploring group cover and businesses reviewing liability or property protection. Their decision depends on needs, eligibility, price, risk and trust in the advisor.",
    "challenges": "Agencies may receive unqualified leads, face price-only competition and have difficulty explaining exclusions through short ad copy. Follow-up can be inconsistent, while sensitive personal details need careful handling and limited access.",
    "searchIntent": "Create educational pages for policy types, adviser services, claim support and policy review where offered. Explain exclusions and eligibility in plain language, direct users to current policy documents and avoid implying that a generic page determines personal coverage.",
    "paidStrategy": "Follow current financial-services advertising and platform verification requirements. Use factual service messaging, transparent adviser identity and clear consent. Do not target people through sensitive assumptions or promise claim approval or universal protection.",
    "contentAngles": "Publish policy-comparison checklists, claims-process explainers, renewal reminders and terminology guides reviewed for accuracy. Identify the insurer and intermediary role clearly and make dates and policy terms current.",
    "aiQuestions": "Answer which policy categories the agency helps with, how consultations work, which documents may be needed and where official policy terms can be checked. Clearly distinguish general explanation from personalized coverage advice.",
    "conversionPath": "Start with a policy review or consultation request, gather only basic relevant context and transfer sensitive details through controlled channels. Provide a clear expectation for follow-up and avoid forcing users to disclose personal health or financial information in ad forms.",
    "automation": "Automate renewal reminders with appropriate consent, appointment scheduling and follow-up tasks. Store policy documents and identity information securely and ensure the automation doesn't imply a claim outcome or provide unsuitable recommendations.",
    "trust": "Verify licensing and insurer relationships, show clear service fees where relevant and use accurate product information. Never invent claim statistics, imply guaranteed approval or conceal policy exclusions in promotional content.",
    "localAngle": "Location pages should explain genuine branch access, service availability and whether the agency can advise in a target jurisdiction. Digital reach should never imply a legal authority to sell products everywhere.",
    "metrics": "Measure qualified policy-review enquiries, consultation attendance, suitable-policy progression, renewal engagement and retention. Track lead quality and compliance separately from campaign cost.",
    "offer": "An insurance marketing audit can assess educational pages, adviser trust signals, lead qualification and consent-aware renewal workflows.",
    "faqs": [
      [
        "How should insurance agencies generate leads?",
        "Use clear service pages, policy education, verified advisor information and straightforward consultation booking. Qualify enquiries responsibly and avoid making a policy recommendation before reviewing the person's circumstances."
      ],
      [
        "Can an agency advertise claim assistance?",
        "It can describe genuine services accurately, but must not promise claim approval or misstate policy terms. Campaigns should be reviewed against applicable insurance regulations and platform rules."
      ]
    ]
  },
  {
    "slug": "chartered-accountants",
    "name": "Chartered Accountants & Tax Consultants",
    "category": "Finance & Professional Services",
    "icon": "🧾",
    "summary": "Lead generation for accounting, tax, audit and compliance practices.",
    "overview": "Clients seek professional advisers when they need reliable accounting, tax, audit or compliance support. Marketing should define the services, client types, deadlines and engagement process accurately while protecting confidential financial records and avoiding guarantees about tax outcomes.",
    "audience": "Potential clients include individuals, startups, SMEs, nonprofits and growing businesses with different reporting and compliance needs. Their search often begins around a deadline or a specific service and then moves to credentials, experience and fee clarity.",
    "challenges": "Practices may rely heavily on referrals, receive enquiries too close to deadlines and struggle to explain specializations. Generic firm pages do not help businesses determine whether the practice supports their scale, industry or required service.",
    "searchIntent": "Develop clear pages for genuine services such as bookkeeping, tax filing, audit, GST compliance, company setup or management reporting. Keep deadlines and legal references reviewed and date-sensitive, and distinguish information from personalized professional advice.",
    "paidStrategy": "Use carefully controlled campaigns around eligible service-intent terms and relevant business geography. Avoid promising tax savings or outcomes, qualify business type and deadline, and ensure staff can meet the demand generated.",
    "contentAngles": "Publish expert-reviewed deadline explainers, document checklists, compliance calendars, business finance guides and answers to common client questions. Date legal content, link to official sources and update or retire outdated guidance promptly.",
    "aiQuestions": "Structure clear answers about services, eligible client types, documents to prepare, consultation steps and when official deadlines must be verified. Avoid letting AI summaries turn general information into definitive advice for a specific tax case.",
    "conversionPath": "Route visitors to the service that matches their need, explain the basic engagement process and invite a consultation. Keep financial documents out of initial marketing forms and provide a secure method after a professional confirms the requirement.",
    "automation": "Automate appointment reminders, document checklists and deadline nudges using current calendars and client preferences. Access to financial records should remain controlled, and messages should not substitute for professional confirmation of an obligation.",
    "trust": "Show genuine qualifications, registration details, service scope and engagement terms. Do not guarantee refunds or tax outcomes; present case examples only with permission and appropriate anonymization.",
    "localAngle": "Local pages should explain real offices, business sectors served and consultation modes. City coverage claims need to match practical ability to serve clients and applicable professional requirements.",
    "metrics": "Track qualified consultations, response time, service-specific leads, proposal acceptance, repeat work and referral contribution. Avoid optimizing solely for raw enquiries during peak filing seasons.",
    "offer": "A CA practice audit can review service positioning, deadline content, secure enquiry design and consultation conversion.",
    "faqs": [
      [
        "Can accountants advertise professional services online?",
        "Marketing should follow applicable professional rules, advertising restrictions and platform policies. Keep claims factual, credentials accurate and educational content reviewed by a qualified professional."
      ],
      [
        "What content helps a tax practice build trust?",
        "Clear service scope, up-to-date explanatory articles, document checklists, credentials and transparent engagement steps help prospects understand whether the practice can assist. Avoid blanket guarantees about savings or outcomes."
      ]
    ]
  },
  {
    "slug": "fintech-lending",
    "name": "Fintech, Lending & Credit Services",
    "category": "Finance & Professional Services",
    "icon": "💳",
    "summary": "Compliant customer acquisition for lending platforms and financial technology providers.",
    "overview": "Credit and fintech customer journeys involve eligibility, costs, permissions and sensitive financial information. Marketing must explain the provider's role, product terms, privacy approach and responsible application process without promising approval or encouraging unsuitable borrowing.",
    "audience": "Users may be comparing payment tools, eligible credit products, business financing or financial software. Their research includes rate and fee transparency, eligibility, repayment obligations, provider credibility and how personal data will be handled.",
    "challenges": "Providers can attract users who do not meet eligibility, struggle with trust in a crowded category and face high drop-off during application. Opaque fees, overly broad targeting and unclear lender relationships can damage confidence.",
    "searchIntent": "Create pages describing product features, eligibility requirements, actual lender relationships, fees and repayment information as verified. Include clear disclaimers and direct users to current official terms and disclosures.",
    "paidStrategy": "Financial product advertising may require platform certification and strict regulatory checks. Use compliant, factual creative, avoid guaranteed approval or hidden rate claims, and measure eligible completed applications rather than all form fills.",
    "contentAngles": "Publish responsible borrowing education, fee explainers, application checklists, security information and product walkthroughs. Clearly date and verify financial facts, and avoid language that pressures people in vulnerable financial situations.",
    "aiQuestions": "Present provider identity, product role, eligibility, rate or fee terms, repayment features, data usage and support routes in structured form. AI answers must not invent approval criteria or describe a partner as the lender unless that is accurate.",
    "conversionPath": "Provide a clear product explanation, transparent eligibility checklist and secure application start. State what information is required and why, then show the next steps, expected response process and support channel.",
    "automation": "Automate application status alerts and basic support only through approved secure systems. Never transmit identity data or financial documents into generic marketing logs; route disputes, hardship requests and sensitive cases to trained teams.",
    "trust": "Disclose the actual lender or regulated entity, material fees, terms and complaint process. Maintain proof for all claims and avoid implying guaranteed approval, instant payout or universal eligibility when exceptions exist.",
    "localAngle": "Target only jurisdictions and customer segments the product is legally available to serve. Local messaging should not suggest regulatory approval or a physical office where neither exists.",
    "metrics": "Measure eligible applications, application completion, approval quality where permitted, customer support issues, compliant acquisition cost and retention. Balance conversion goals with fair treatment and responsible product outcomes.",
    "offer": "A fintech growth audit can review compliant messaging, product education, secure application flow and eligibility-qualified acquisition.",
    "faqs": [
      [
        "Can lending platforms guarantee approval in ads?",
        "Do not claim guaranteed approval unless it is genuinely unconditional and lawful, which is uncommon. Eligibility depends on product terms and underwriting; advertising should reflect that reality."
      ],
      [
        "What should a fintech website explain?",
        "Clarify the legal provider, product role, eligibility, costs, repayment, privacy and complaint process. Keep official terms readily accessible and avoid collecting more data than the application requires."
      ]
    ]
  },
  {
    "slug": "saas-it-companies",
    "name": "SaaS & IT Companies",
    "category": "B2B, Industrial & Logistics",
    "icon": "☁️",
    "summary": "Demand generation and product-led conversion for software, IT firms and SaaS vendors.",
    "overview": "Software buyers evaluate a product against workflow, security, integration, adoption effort and measurable operational value. Marketing must communicate the intended user, use case and proof clearly, then connect content and campaigns with product evaluation and sales follow-up.",
    "audience": "Audiences may include founders, IT leaders, operations managers, marketing teams, procurement stakeholders and end users. Different roles care about problem fit, deployment time, integrations, compliance, commercial terms and internal adoption.",
    "challenges": "SaaS firms can attract curiosity without purchase intent, rely on feature-heavy copy and lose prospects between demo, trial and procurement. Long buying groups need different evidence at discovery, technical evaluation and approval stages.",
    "searchIntent": "Create pages by use case, industry, integration and buyer question, supported by clear feature definitions and product screenshots. Explain availability, limitations and security claims accurately; keep documentation and pricing or demo steps accessible.",
    "paidStrategy": "Use high-intent search, comparison pages, retargeting only where appropriate, and role-specific creative. Measure qualified demos, activated trials and pipeline progression rather than sign-ups without product engagement.",
    "contentAngles": "Publish implementation guides, workflow examples, comparison explainers, product walkthroughs and customer stories with verified context. Explain limitations and deployment requirements honestly, and distinguish roadmap ideas from features that are currently available.",
    "aiQuestions": "Present product purpose, target users, integrations, prerequisites, security information, deployment model, pricing approach and support. Clear technical headings and docs make capabilities easier for search and AI tools to interpret accurately.",
    "conversionPath": "Move users from a problem-oriented page to proof, technical detail and a trial or demo. Ask only relevant qualifying questions, provide a fast confirmation and hand off high-fit accounts with the context already collected.",
    "automation": "Use CRM and product events for trial onboarding, sales alerts, feature education and renewal tasks where consent and contracts allow. Keep secrets and customer data out of public content and control access to product telemetry.",
    "trust": "Publish accurate security and compliance statements, uptime definitions, data-processing terms and real customer references. Avoid invented logos or inflated ROI claims; describe methodology and context for performance figures.",
    "localAngle": "For region-focused B2B SaaS, explain local implementation, language support and service coverage where real. For globally delivered software, clearly state the actual supported markets and support hours rather than creating fictitious local offices.",
    "metrics": "Track qualified pipeline, demo attendance, trial activation, product-qualified accounts, sales-cycle duration, churn and expansion revenue. Separate visitor acquisition from usage and revenue outcomes.",
    "offer": "A SaaS growth audit can review use-case SEO, demo funnels, activation measurement, CRM automation and proof-point quality.",
    "faqs": [
      [
        "What marketing channels suit SaaS companies?",
        "The mix depends on deal size and sales motion. Search, useful technical content, product demos, targeted professional campaigns and partner channels can work when linked to qualified pipeline and activation data."
      ],
      [
        "How can SaaS brands improve AI search visibility?",
        "Publish accurate use-case pages, clear documentation, named integrations, comparison context and expert answers. Make feature and limitation details unambiguous; visibility in AI answers cannot be guaranteed."
      ]
    ]
  },
  {
    "slug": "b2b-services",
    "name": "B2B Services & Business Consultants",
    "category": "B2B, Industrial & Logistics",
    "icon": "🤝",
    "summary": "Pipeline development for agencies, consultants and service firms selling to other businesses.",
    "overview": "B2B service buyers need proof of expertise, relevant outcomes, clear scope and confidence in delivery. Marketing should explain who the service is for, what the engagement includes, how success is evaluated and what happens after a conversation.",
    "audience": "Buyers may include founders, functional heads, procurement teams and managers accountable for a defined business problem. Several stakeholders may contribute to the decision, so useful material must support discovery, evaluation, internal justification and implementation planning.",
    "challenges": "Firms often depend on referrals, position themselves too broadly and receive enquiries outside their ideal client profile. Weak qualification and inconsistent follow-up can leave good prospects unnoticed while sales teams chase low-fit leads.",
    "searchIntent": "Create focused service and industry pages with a clear ideal-client profile, scope, deliverables, process, evidence and FAQs. Address buyer questions directly and show how the service differs from a generic package.",
    "paidStrategy": "Use high-intent search and targeted professional campaigns with a defined business audience. Offer relevant assessments or consultations, exclude low-fit search terms and judge performance by qualified meetings and pipeline contribution.",
    "contentAngles": "Publish practical frameworks, implementation guides, case studies, buyer checklists and expert commentary rooted in the firm's actual expertise. Show baseline, process, constraints and results when substantiated; do not promise identical outcomes for every client.",
    "aiQuestions": "Make service scope, ideal client, delivery steps, required inputs, limitations, timeline ranges and proof clear. Answer common procurement questions directly so readers and AI systems can understand whether the offering fits a specific problem.",
    "conversionPath": "Guide a prospect from a problem-specific page to evidence and then a discovery call or brief. Ask about business context, goals and timing, and route the information to the correct service owner.",
    "automation": "Automate lead assignment, meeting reminders, CRM task creation, proposal follow-up and client onboarding checklists. Keep client confidential material in approved systems and ensure automation reflects the real status of a sales conversation.",
    "trust": "Show named expertise, actual service deliverables, permissioned client examples and transparent engagement terms. If a case study is anonymized, state that clearly and do not invent metrics or client identities.",
    "localAngle": "Local targeting is useful when buyers value in-person delivery or regional expertise. National services should say how remote delivery works and avoid claiming local teams where they do not exist.",
    "metrics": "Track qualified meeting rate, opportunity acceptance, proposal progression, win rate, sales-cycle duration and revenue by service. Include lead quality and delivery capacity in marketing reviews.",
    "offer": "A B2B pipeline audit can review positioning, service-page clarity, demand capture, qualification and sales follow-up.",
    "faqs": [
      [
        "How can B2B service firms generate qualified leads?",
        "Define an ideal client, create pages for real problem areas, publish credible evidence and connect campaigns to a disciplined qualification and follow-up process. Measure qualified meetings and opportunities rather than form volume."
      ],
      [
        "Do B2B firms need separate industry pages?",
        "Yes, when buyer problems, terminology, proof requirements or delivery differ materially by sector. Each page needs genuine sector knowledge, not a generic service description with an industry name substituted."
      ]
    ]
  },
  {
    "slug": "manufacturing",
    "name": "Manufacturing & Industrial Companies",
    "category": "B2B, Industrial & Logistics",
    "icon": "🏭",
    "summary": "Enquiry generation for manufacturers, component makers and industrial production businesses.",
    "overview": "Industrial buyers assess specifications, capacity, quality controls, certifications, lead times and supplier reliability. Digital marketing should make these capabilities discoverable and help a buyer reach the right technical or commercial contact with useful request-for-quotation context.",
    "audience": "Potential customers include OEMs, purchasing teams, distributors, engineers, project contractors and export buyers. They often search by part, material, process, tolerance or application and require detailed technical documents before considering a supplier.",
    "challenges": "Manufacturers may be invisible for product-specific searches, rely on outdated catalogs, lack technical content and receive unqualified quote requests. Confidentiality and long procurement cycles require careful separation between public proof and private documentation.",
    "searchIntent": "Create detailed product and process pages with relevant specifications, industries served, tolerances or capacities where verified, and downloadable documents. Use original descriptions and maintain clear distinctions between stock products, custom production and capabilities under review.",
    "paidStrategy": "Use focused search campaigns around commercial product intent and suitable export or regional markets. Qualify inquiries by part, volume, application and timeframe while following platform policies and export or trade restrictions applicable to the product.",
    "contentAngles": "Publish technical guides, materials comparisons, process explanations, quality-control details and case studies authorized for public use. Use diagrams and data carefully, and do not expose customer drawings or claim certifications not currently held.",
    "aiQuestions": "Organize product specs, materials, tolerances, certifications, capacity, minimum order information and RFQ steps into explicit fields. This helps engineers and AI search tools understand technical fit without guessing missing parameters.",
    "conversionPath": "Move a buyer from product or capability discovery to relevant specifications, then to an RFQ with technical attachments submitted securely. Route requests by product family and provide a clear expectation for quotation response.",
    "automation": "Automate RFQ assignment, follow-up reminders, sample requests and CRM hand-offs. Technical drawings and proprietary documents require access controls and should not be copied into broad marketing automation tools.",
    "trust": "Show actual certifications, production capabilities, quality systems, industry experience and permissioned client references. Keep claims current and do not equate a planned capacity expansion with existing production ability.",
    "localAngle": "Regional pages should reflect actual plants, delivery regions, service staff or export capability. Explain freight considerations where relevant and avoid creating pages implying a local facility that does not exist.",
    "metrics": "Track qualified RFQs, quote turnaround, sales conversion, sample-to-order progression, repeat account growth and cost per industrial opportunity. Evaluate by product category and deal size.",
    "offer": "A manufacturing visibility audit can assess technical SEO, catalog completeness, RFQ conversion and long-cycle lead management.",
    "faqs": [
      [
        "What should a manufacturer include on product pages?",
        "Give buyers accurate specifications, application context, materials, relevant quality information, order constraints and a direct RFQ path. Secure technical documents where they contain proprietary information."
      ],
      [
        "Can industrial SEO generate international leads?",
        "It can help eligible buyers discover the business through technical product and capability searches. Coverage, language, shipping and export requirements must accurately reflect what the company can deliver."
      ]
    ]
  },
  {
    "slug": "wholesalers-distributors",
    "name": "Wholesalers & Distributors",
    "category": "B2B, Industrial & Logistics",
    "icon": "📦",
    "summary": "Trade enquiries and account acquisition for wholesalers, distributors and B2B suppliers.",
    "overview": "Wholesale buyers evaluate assortment, stock, minimum order, pricing terms, delivery reliability and account support. Digital marketing must make the supplier's trade proposition clear while keeping confidential account pricing and stock commitments accurate.",
    "audience": "Buyers include retailers, resellers, institutions, contractors and procurement teams comparing suppliers. They need category-level availability, commercial terms, delivery areas, payment conditions and a reliable route to request a quote or trade account.",
    "challenges": "Distributors often operate through relationships, fragmented catalogs and manual sales processes. Incomplete product data, unclear geographic coverage and broad consumer traffic can distract teams from the trade enquiries most likely to become durable accounts.",
    "searchIntent": "Create category and brand pages with clear trade positioning, pack sizes or specifications, minimum order rules where applicable and account-enquiry options. Keep stock and product claims current, and distinguish wholesale supply from retail availability.",
    "paidStrategy": "Use search campaigns for trade-supply intent and industry-specific terms. Route users to quote or account pages, qualify business type and expected volume, and track approved accounts and repeat orders rather than one-time clicks.",
    "contentAngles": "Publish product-line explainers, buying guides, inventory or logistics FAQs, sector-specific assortments and account onboarding information. Protect supplier pricing agreements and avoid advertising brands or exclusivity claims without permission.",
    "aiQuestions": "Make clear what product categories are stocked, who can open an account, service geography, minimum order requirements and enquiry steps. AI-readable catalogs should not imply real-time inventory unless connected data supports it.",
    "conversionPath": "A trade visitor should verify supplier fit, explore the catalog, request wholesale terms and receive account follow-up. Separate quote requests from general consumer support to reduce delays and route data to the correct salesperson.",
    "automation": "Automate quote assignment, restock notifications, account onboarding, order-status messages and re-order reminders with buyer consent. Ensure inventory and price changes propagate correctly before promotional messages are sent.",
    "trust": "Show accurate company details, genuine brand relationships, realistic fulfilment terms and trade policies. Use client logos only with permission and protect confidential wholesale pricing.",
    "localAngle": "For regional distribution, list real service areas, delivery days and warehouse pickup options. Avoid broad regional claims that don't account for product restrictions, freight cost or supply capacity.",
    "metrics": "Track qualified trade accounts, RFQ volume, approved-account rate, repeat orders, order value, fulfilment issues and lead-to-first-order time. Compare channels by downstream account value.",
    "offer": "A distributor marketing audit can review catalog structure, trade enquiry qualification, account onboarding and B2B retention campaigns.",
    "faqs": [
      [
        "How do wholesalers attract more business buyers?",
        "Make the trade offer clear, build useful category pages, explain account requirements and create a reliable quote path. Optimize campaigns for approved accounts and repeat orders rather than general traffic."
      ],
      [
        "Should wholesale pricing be public?",
        "That depends on the commercial model. Public price ranges or account-specific pricing can both work, but the rules must be clear and the site should not reveal confidential negotiated terms."
      ]
    ]
  },
  {
    "slug": "logistics-transport",
    "name": "Logistics, Transport & Courier Companies",
    "category": "B2B, Industrial & Logistics",
    "icon": "🚚",
    "summary": "B2B shipment enquiries and service discovery for logistics, fleet and courier providers.",
    "overview": "Shipping customers compare route coverage, delivery speed, reliability, tracking visibility, service constraints and claims handling. Marketing needs to clearly distinguish the services actually provided and make it easy for a business to request a suitable quote.",
    "audience": "Audiences include e-commerce operators, manufacturers, distributors, importers, retailers and people needing courier services. Commercial buyers care about volume, origin-destination routes, shipment type, service levels and support quality.",
    "challenges": "Companies can struggle to communicate coverage clearly, differentiate between service levels and process quote requests efficiently. Inaccurate delivery claims or unclear shipment restrictions can produce avoidable disputes and poor lead quality.",
    "searchIntent": "Create pages for real service types, routes, industries and shipment categories. State coverage, size or commodity restrictions, operating hours, tracking features and quote requirements accurately.",
    "paidStrategy": "Focus paid campaigns on commercial logistics intent and services with available capacity. Separate parcel, freight, last-mile and specialized handling offers, then measure qualified shipment enquiries and contracted accounts.",
    "contentAngles": "Publish packaging guides, freight terminology, route planning tips, industry logistics explainers and tracking FAQs. Verify operational details and explain exceptions rather than claiming every shipment has identical delivery timing.",
    "aiQuestions": "Make service types, covered routes, package constraints, tracking steps, quote requirements and support contacts explicit. Do not let AI summaries imply coverage or delivery time beyond the provider's actual network.",
    "conversionPath": "Guide a prospect from the relevant service or route page to a quote form asking for essential shipment details, then to a confirmed sales follow-up. Keep customer tracking access separate from marketing lead capture.",
    "automation": "Automate quote routing, pickup reminders, shipment status from verified systems and claims hand-off. Do not create tracking messages from stale data; synchronize status with the operational source and protect shipment contact details.",
    "trust": "Publish genuine certifications, service limitations, insurance or claims terms where applicable and accurate customer-support routes. Explain delivery-time estimates as estimates unless contractual terms make them guarantees.",
    "localAngle": "Regional pages should describe actual depots, pickup points, routes or service coverage. Include local logistics details that help buyers decide and avoid city pages with no real service difference.",
    "metrics": "Track qualified quote requests, pickup or freight bookings, contracted-account growth, delivery issue rates, response time and repeat volume. Marketing should be evaluated alongside operational service quality.",
    "offer": "A logistics growth audit can review route SEO, quote forms, commercial lead qualification and status-communication workflows.",
    "faqs": [
      [
        "What information should a logistics quote form collect?",
        "Ask for only the details needed to estimate the shipment, such as origin, destination, weight or volume, shipment type and timing. Provide a secure route for any confidential business information."
      ],
      [
        "Can logistics marketing promise delivery times?",
        "Only make firm claims when supported by the actual service terms. Otherwise label timelines as estimates and explain factors that may affect delivery."
      ]
    ]
  },
  {
    "slug": "automotive-dealerships",
    "name": "Automotive Dealerships & Service Centres",
    "category": "Automotive & Agriculture",
    "icon": "🚘",
    "summary": "Vehicle enquiries, test drives and service bookings for automotive dealers.",
    "overview": "Vehicle shoppers compare models, price, features, financing options, availability and ownership support. Dealership marketing should use current inventory data and clear next steps, connecting high-intent search with a reliable test-drive or service booking process.",
    "audience": "Audiences include new and used vehicle buyers, families, fleet managers, owners seeking maintenance and people comparing trade-in options. They need accurate variant details, genuine offers, dealership location and a responsive sales team.",
    "challenges": "Inventory changes, inconsistent dealer offer pages, slow lead response and low-quality test-drive requests can waste campaign budgets. Buyers may be misled when advertised pricing, availability or finance terms are not current.",
    "searchIntent": "Create pages for actual brands, models, variants, dealership services and maintenance offers. Keep on-road price details, stock status, specifications and eligibility terms current, and clearly identify whether a listed vehicle is new, used or a display unit.",
    "paidStrategy": "Use model- and intent-specific search campaigns, supported by local social creative for launches or dealership events. Sync campaigns to real inventory, verify financing disclosures and optimize for completed test drives or service appointments.",
    "contentAngles": "Publish model comparisons, feature explainers, maintenance checklists, ownership guides and genuine walkarounds. Disclose sponsored or promotional content and do not claim safety, mileage or performance figures beyond approved specifications.",
    "aiQuestions": "Expose exact model, variant, fuel type, transmission, price terms, current stock, warranty, service options and test-drive availability. Clear factual fields make it less likely that AI systems confuse variants or repeat outdated offers.",
    "conversionPath": "Lead visitors from model discovery to the precise variant, verified availability and a test-drive or quote request. Confirm branch, date and contact preference, then assign the enquiry to a salesperson with a response-time target.",
    "automation": "Automate test-drive confirmations, service reminders where consented, lead routing and inventory alerts. Use accurate stock feeds and keep personal or finance application data in authorized systems.",
    "trust": "State dealership identity, official affiliation where verified, warranty terms and offer conditions clearly. Don't disguise fees or guarantee finance approval. Use genuine reviews and actual vehicle photographs.",
    "localAngle": "Each dealership branch should have accurate hours, directions, brands and services. Campaign geography should match practical sales and service catchments, and branch landing pages should not imply stock that is held elsewhere.",
    "metrics": "Measure qualified model enquiries, completed test drives, sales-stage progression, service bookings, show rate and cost per sold vehicle where attribution is sound. Compare models and branches separately.",
    "offer": "A dealership audit can review inventory-driven campaigns, model-page accuracy, local discovery and test-drive conversion.",
    "faqs": [
      [
        "How can car dealerships improve online leads?",
        "Keep model and variant details current, route ads to precise landing pages and follow up quickly. Track completed test drives and sales progress instead of judging campaigns only by form count."
      ],
      [
        "Can car ads promote financing offers?",
        "Only with accurate eligibility and cost disclosures that meet applicable regulations and platform rules. Never imply approval is guaranteed when it depends on underwriting."
      ]
    ]
  },
  {
    "slug": "ev-automotive",
    "name": "Electric Vehicle Brands & EV Services",
    "category": "Automotive & Agriculture",
    "icon": "🔋",
    "summary": "Product education and qualified leads for EV dealers, charging networks and mobility providers.",
    "overview": "EV customers compare range, charging access, battery warranty, ownership costs and practical fit for their routes. Marketing should separate tested or official specifications from real-world estimates and explain charging or service access accurately.",
    "audience": "Potential buyers include commuters, families, fleet operators, delivery businesses and commercial property owners considering charging infrastructure. Their needs differ by vehicle type, daily distance, charging access and total cost of ownership.",
    "challenges": "EV buyers often have technical questions that broad advertising cannot resolve. Inconsistent range claims, vague charging access, unclear battery warranty and unverified savings calculators can undermine trust.",
    "searchIntent": "Create pages for actual vehicle models, chargers, installation services, fleet use cases and ownership questions. Explain official range figures, battery terms, charging compatibility and available service networks with clear context.",
    "paidStrategy": "Segment campaigns by vehicle, charging solution and fleet use case. Use comparison and lead-gen creative responsibly, verify incentives and savings claims, and measure test drives, site surveys or qualified fleet meetings.",
    "contentAngles": "Publish charging guides, vehicle-use comparisons, route-planning considerations, battery-care information and verified total-cost-of-ownership models. State assumptions and date-sensitive incentives rather than presenting a savings estimate as universal.",
    "aiQuestions": "Answer exact range specifications and test conditions, charging connector compatibility, charging time assumptions, warranty, service coverage and installation requirements. Keep model variants separate and avoid allowing AI summaries to blend unrelated specifications.",
    "conversionPath": "Guide users from use-case education to vehicle or charger details, then to a test drive, site survey or consultation. Ask about daily usage or site needs only when useful and provide a clear next step.",
    "automation": "Automate test-drive bookings, site survey scheduling, installation updates and post-sale service reminders with proper consent. Keep technical safety issues routed to qualified technicians and synchronize availability with operations.",
    "trust": "Use official specifications, clear test-condition notes, verified incentives and accurate battery warranty terms. Do not claim carbon impact or savings without stating methodology and relevant assumptions.",
    "localAngle": "Charging coverage is inherently location-specific. Show real stations, service centers or installation areas and verify availability before publication; do not imply a charger is operational based only on a planned network map.",
    "metrics": "Track qualified test drives, fleet consultations, site surveys, charger installations, conversion by vehicle or charger type and sales-cycle length. Report savings claims with assumptions and actual customer usage where available.",
    "offer": "An EV growth audit can review technical product information, charging-location accuracy, lead qualification and test-drive conversion.",
    "faqs": [
      [
        "What information helps EV buyers convert?",
        "Clear model specifications, realistic range context, battery warranty, charging compatibility, service coverage and test-drive options help buyers evaluate fit. Avoid blanket savings claims without transparent assumptions."
      ],
      [
        "Can EV businesses advertise charging availability?",
        "Yes, but availability and operating status should come from reliable current data. Clearly distinguish existing charging sites from planned locations."
      ]
    ]
  },
  {
    "slug": "agriculture-agritech",
    "name": "Agriculture, Farm Equipment & Agritech",
    "category": "Automotive & Agriculture",
    "icon": "🌾",
    "summary": "Rural and sector-specific demand generation for agri businesses and agricultural technology.",
    "overview": "Agriculture marketing must account for crop cycles, regional language, seasonal demand, dealer access and practical field conditions. Products and services need clear eligibility, availability and support details rather than generic digital messaging designed for unrelated urban audiences.",
    "audience": "Audiences include farmers, input retailers, cooperatives, farm-equipment dealers, agronomists, agribusiness owners and institutions. Their decision depends on crop or livestock relevance, season, price, availability, trusted local guidance and after-sales support.",
    "challenges": "Businesses may face fragmented dealer networks, variable connectivity, seasonal lead volumes and product claims that are difficult to verify. Marketing must align its message with regional realities and operational stock or service capacity.",
    "searchIntent": "Create product and service pages with accurate specifications, crop or use-case relevance, availability and dealer information. Explain what a product does and does not do, and link technical or safety instructions to authoritative documentation.",
    "paidStrategy": "Use regional search and social campaigns around relevant seasonal windows and genuine dealer territories. Adapt language and formats to the audience, qualify inquiries by location and product need, and measure dealer visits or verified enquiries.",
    "contentAngles": "Publish field demonstrations, usage explainers, seasonal checklists, equipment maintenance and practical agritech guides. Verify agronomic claims with qualified sources and do not promise yield increases without evidence and conditions.",
    "aiQuestions": "Make the product purpose, crop or equipment compatibility, usage prerequisites, dealer availability, service support and warranty clear. Provide plain-language answers in the languages customers actually use, while preserving the exact technical facts.",
    "conversionPath": "Move a prospect from a product or crop-use page to a nearby dealer, demonstration, field visit or quote request. Make offline follow-up and local language support part of the measurement plan where feasible.",
    "automation": "Automate dealer routing, demonstration reminders, order status and seasonal updates with consent. Support low-bandwidth messaging and ensure stock or agronomic recommendations are verified before sending.",
    "trust": "Show genuine dealer relationships, approved specifications, warranty terms and evidence for product claims. Explain appropriate safety practices and avoid suggesting that a product replaces professional agronomic or veterinary judgment.",
    "localAngle": "Region-specific information should reflect real dealer coverage, crops, languages and seasonal availability. Do not create location pages that claim local stock or field support where none exists.",
    "metrics": "Measure qualified farmer or dealer enquiries, demonstrations, distributor conversion, regional response time, repeat orders and season-adjusted cost per opportunity. Interpret engagement in context with offline activity.",
    "offer": "An agribusiness growth audit can review dealer discovery, seasonal campaigns, language accessibility and lead hand-off to local teams.",
    "faqs": [
      [
        "How should agri businesses target regional audiences?",
        "Use relevant language, season-aware content, verified local dealer details and campaigns that reflect actual product availability. Coordinate digital campaigns with field sales and distribution."
      ],
      [
        "Can agricultural marketing use yield claims?",
        "Claims should be supported by credible evidence and describe the conditions under which results were measured. Avoid guarantees that ignore weather, soil, crop management and other factors."
      ]
    ]
  },
  {
    "slug": "gyms-fitness",
    "name": "Gyms, Fitness Studios & Yoga Centres",
    "category": "Lifestyle & Local Services",
    "icon": "🏋️",
    "summary": "Membership enquiries and trial-session bookings for fitness and wellness businesses.",
    "overview": "Fitness customers compare location, coaching style, facilities, schedule, price and how comfortably they can begin. Marketing should invite a realistic first step and communicate program fit without body shaming, miracle transformations or unsupported health claims.",
    "audience": "Audiences include beginners, busy professionals, athletes, families, yoga learners and people seeking group classes or specialized coaching. They may need trial sessions, class timings, trainer information, membership conditions and practical access details.",
    "challenges": "Gyms often receive discount-driven leads that do not attend, lose prospects during follow-up and overuse transformation imagery. Seasonality and capacity vary by class, making it important to track attendance and retention as well as new sign-ups.",
    "searchIntent": "Create pages for actual programs, trainers, class schedules, membership options and locations. Explain whether facilities are appointment-based, women-only, group or specialized, and keep class and access details updated.",
    "paidStrategy": "Use local search for membership and class intent and social campaigns for trial sessions or program launches. Test the offer by audience and schedule, and optimize toward attended trials and retained members rather than lead cost alone.",
    "contentAngles": "Publish trainer introductions, class previews, beginner guides, exercise demonstrations and member stories with consent. Provide safe general information and avoid presenting dramatic transformations as typical or guaranteeing weight-loss outcomes.",
    "aiQuestions": "Answer which classes are available, who they suit, schedule, location, trial policy, trainer credentials and membership basics. Use clear headings and current timetables so search and AI systems don't mix past and present schedules.",
    "conversionPath": "Move a visitor from a suitable class page to a trial booking or membership discussion, then send schedule details and a welcome message. Make cancellation, freeze and membership terms accessible before payment.",
    "automation": "Automate trial reminders, class schedule notices, opt-in renewal reminders and attendance follow-up. Do not send excessive messages or use sensitive body or health information to pressure a member.",
    "trust": "Show real facilities, accurate trainer qualifications, transparent membership terms and authentic member stories. Avoid fake testimonials, shaming language and medical promises beyond the provider's qualification.",
    "localAngle": "Each gym needs accurate map details, parking or transit access, opening hours and classes at that exact location. Multi-branch schedules should remain branch-specific.",
    "metrics": "Track trial bookings, attendance, membership conversion, 30- and 90-day retention, class capacity and referral contribution. Compare discount campaigns with retained membership, not sign-up volume.",
    "offer": "A fitness growth audit can examine local listings, trial-booking flow, class discovery and member retention messaging.",
    "faqs": [
      [
        "How can gyms get more members?",
        "Promote clear program benefits, accurate schedules, genuine facilities and a simple trial offer. Follow up helpfully and assess success by attended trials and retained members, not just low-cost leads."
      ],
      [
        "Are transformation ads a good idea?",
        "Authentic stories may help when used with consent and context, but avoid unrealistic comparisons, body shaming or guaranteed outcomes. Show a representative understanding of the actual service."
      ]
    ]
  },
  {
    "slug": "salons-spas",
    "name": "Salons, Spas & Beauty Services",
    "category": "Lifestyle & Local Services",
    "icon": "💆",
    "summary": "Appointment-led local marketing for salons, spas, barbers and personal-care studios.",
    "overview": "Beauty and personal-care clients compare service style, hygiene, price, location, availability and visual examples before booking. Marketing should make service details and appointment options clear and use authentic imagery without promising identical results for every person.",
    "audience": "Customers may seek routine grooming, occasion styling, hair treatments, spa sessions, bridal services or specialized care. Their decision depends on service fit, stylist or therapist skill, appointment timing and whether the price and duration are clear.",
    "challenges": "Common issues include missed booking enquiries, inconsistent service menus, outdated photo galleries and promotions that fill low-margin slots. Brands need to balance new-client acquisition with repeat bookings and staff capacity.",
    "searchIntent": "Create pages for genuine service categories, price ranges where approved, duration, availability and practitioner profiles. Keep booking routes, location details and preparation information accurate, especially for occasion-led services.",
    "paidStrategy": "Use local search for high-intent service terms and visual social campaigns for styles, seasonal packages or real availability. Route ads to matching services, state offer conditions and measure booked and attended appointments.",
    "contentAngles": "Share style inspiration, service explainers, maintenance guidance, seasonal looks and behind-the-scenes work. Obtain permission for client images and avoid editing examples in a way that materially misrepresents service results.",
    "aiQuestions": "Answer which services are available, how long they take, expected price range where published, location, booking process and preparation requirements. Make cancellation terms and actual practitioner availability clear.",
    "conversionPath": "A visitor should find the exact service, see a representative result and price or consultation requirement, choose an appointment and receive a confirmation. Reduce repeated questions by gathering only the information needed for scheduling.",
    "automation": "Automate booking confirmations, reminders, waitlist notices and opt-in rebooking messages. Respect preferred communication channels and ensure staff can handle complex requests or allergy-related concerns.",
    "trust": "Show real work, accurate service details, trained staff information where relevant and clear cancellation terms. Do not use client photos without permission or claim a treatment is medically effective without appropriate evidence and authorization.",
    "localAngle": "Keep hours, maps, phone numbers and appointment links consistent for each branch. Local pages can feature genuine stylists, services or offers available at that particular salon.",
    "metrics": "Track booked appointments, attendance, rebooking rate, average service value, cancellation rate and cost per first appointment. Measure retention alongside promotional acquisition.",
    "offer": "A salon growth audit can review service-page clarity, local discovery, booking conversion and repeat-visit automation.",
    "faqs": [
      [
        "How can salons increase bookings?",
        "Make service menus, examples, duration, location and appointment availability easy to understand. Use local search and relevant visual content, then measure attended appointments and rebooking."
      ],
      [
        "Can salons use customer photos in ads?",
        "Obtain appropriate permission and use the images accurately. Avoid editing results in ways that mislead prospective clients about what the service typically delivers."
      ]
    ]
  },
  {
    "slug": "legal-professional-services",
    "name": "Law Firms & Legal Professionals",
    "category": "Finance & Professional Services",
    "icon": "⚖️",
    "summary": "Professional visibility and suitable consultation enquiries for lawyers and legal practices.",
    "overview": "Legal clients seek expertise in a specific issue, jurisdiction, practice area and communication style. Marketing should present credentials and service scope accurately, avoid promising case outcomes and protect the confidentiality of enquiries from the first interaction.",
    "audience": "Audiences include individuals, families, startups, employers, property owners and businesses seeking legal guidance. Their needs vary by practice area and urgency, and prospective clients may be sensitive about sharing information before a conflict check.",
    "challenges": "Firms can struggle with broad messaging, low-fit enquiries and unclear consultation expectations. Overstated success claims, confidential case details and automated responses that sound like legal advice can create significant trust and professional risks.",
    "searchIntent": "Develop factual pages for practice areas, attorney credentials, jurisdictions served, consultation process and general legal information. Clearly distinguish general education from advice based on the facts of a person's case.",
    "paidStrategy": "Review local bar or professional rules, applicable regulations and platform restrictions before advertising. Where permitted, use factual service queries and transparent consultation messaging; avoid guarantees, misleading comparisons or sensitive retargeting.",
    "contentAngles": "Publish reviewed explainers, process checklists, document-preparation guides and general FAQs with appropriate dates and jurisdiction context. Do not disclose client stories without authorization or present a general article as a definitive answer for every case.",
    "aiQuestions": "Answer which practice areas are handled, where the professional is authorized to work, how consultations begin and what information a prospective client should prepare. Make clear that website content does not establish a lawyer-client relationship.",
    "conversionPath": "Use a discreet enquiry form that collects only basic contact and practice-area context, then move confidential information through the firm's approved process. Explain how conflicts are checked and when the firm will respond.",
    "automation": "Automate scheduling and internal routing but avoid automated legal opinions, sensitive case summaries in general marketing tools or promises about deadlines and outcomes. Let qualified staff review substantive legal questions.",
    "trust": "Publish real qualifications, bar or registration details where appropriate, accurate office information and transparent consultation terms. Avoid fabricated awards, client reviews or claims of certain success.",
    "localAngle": "Jurisdiction-specific content should reflect actual professional authorization and experience. A location page must not suggest the firm can practice in a jurisdiction where its professionals are not permitted to do so.",
    "metrics": "Measure suitable consultations, response time, conflict-check completion, appointment attendance and service-fit rate. Handle conversion reporting confidentially and avoid using case details in advertising analytics.",
    "offer": "A legal-practice audit can review accurate practice-area positioning, compliant lead capture, local visibility and confidential intake workflows.",
    "faqs": [
      [
        "Can law firms create SEO pages for practice areas?",
        "Yes, when the firm genuinely offers the service and content is accurate, jurisdiction-aware and reviewed appropriately. Pages should inform prospective clients without guaranteeing outcomes."
      ],
      [
        "Should legal forms request case details?",
        "The initial marketing form should collect only what is needed to route the enquiry. Sensitive facts should move to the firm's controlled intake process after suitable checks and guidance."
      ]
    ]
  },
  {
    "slug": "consultants-agencies",
    "name": "Consultants, Creative Agencies & Professional Firms",
    "category": "Finance & Professional Services",
    "icon": "💼",
    "summary": "Service positioning and lead generation for consultants, creative studios and specialist agencies.",
    "overview": "Service buyers are purchasing expertise, problem-solving and delivery reliability. A convincing marketing system makes the ideal client, scope, approach and evidence clear so prospects can decide whether a conversation is worth their time.",
    "audience": "Buyers include startup founders, SME owners, marketing leaders, operations teams and larger organizations needing specialist capacity. Their evaluation often includes examples of similar work, team experience, strategic fit, speed and how success will be measured.",
    "challenges": "Agencies can blend into the market through generic claims, over-rely on social portfolios and fail to qualify budget or delivery needs. Marketing must connect a clear niche with proof and a sales process that avoids wasting team capacity.",
    "searchIntent": "Create service pages around specific problems, deliverables and client types. Use case studies, FAQs, process details and relevant expertise to address buyer intent rather than describing every capability in one broad page.",
    "paidStrategy": "Use focused search terms and professional audience targeting appropriate to the offer. Test consultation or audit CTAs, qualify by business problem and track sales-qualified opportunities and proposal outcomes.",
    "contentAngles": "Share original frameworks, project breakdowns, lessons learned, expert commentary and client work with permission. Explain the brief and approach, include constraints and avoid presenting every engagement as a guaranteed success.",
    "aiQuestions": "Make service scope, ideal fit, deliverables, timeline dependencies, team expertise, pricing approach and next steps explicit. Clear factual sections support discovery by people and AI systems without exaggerated positioning.",
    "conversionPath": "Help visitors identify their problem, inspect a relevant case study, understand the approach and request a discovery conversation. Ask about scope, goals and timing, then assign the lead to the appropriate specialist.",
    "automation": "Automate meeting booking, CRM notes, proposal reminders and onboarding tasks. Keep client assets and confidential strategy in controlled project tools, not broad marketing logs.",
    "trust": "Show actual team skills, attributable client work, transparent scope and references when permitted. Don't display client logos without approval or use unsupported growth claims as universal guarantees.",
    "localAngle": "Local positioning can help when in-person workshops or market knowledge matter. Remote agencies should explain delivery methods and coverage honestly rather than suggesting a team is based in every target city.",
    "metrics": "Track qualified meetings, opportunity acceptance, proposal-to-win rate, utilization, sales cycle and repeat engagements. Include delivery capacity so marketing does not sell work the team cannot fulfill.",
    "offer": "A consulting growth audit can improve positioning, case-study evidence, lead qualification and consultation conversion.",
    "faqs": [
      [
        "How can a small agency stand out online?",
        "Focus on a clear client profile, a specific problem, useful proof and transparent delivery steps. Broad claims are less persuasive than detailed examples of how the team approaches real work."
      ],
      [
        "Is a consultation CTA enough?",
        "It works best when the page first explains who the service fits, what the conversation covers and what information helps prepare. Clear expectations improve lead quality."
      ]
    ]
  },
  {
    "slug": "packers-movers",
    "name": "Packers & Movers",
    "category": "Lifestyle & Local Services",
    "icon": "📦",
    "summary": "Local quote requests and booking conversion for relocation and moving companies.",
    "overview": "Moving customers compare date availability, distance, packing scope, insurance, handling and price transparency. Marketing should explain how estimates are prepared and what is included, helping people request an accurate quote without hidden fees or misleading fixed-price promises.",
    "audience": "Customers include families relocating homes, tenants shifting apartments, offices moving equipment, students and businesses requiring storage. Their needs differ by distance, inventory, building access, schedule and packing or dismantling requirements.",
    "challenges": "Providers often receive incomplete quote requests, face seasonal spikes, struggle with trust and get disputes over estimates that omit important details. Reliable communication and clear scope can improve both conversion and service quality.",
    "searchIntent": "Create service pages for home moves, office relocation, intercity transport and storage where offered. Explain survey options, quote inputs, packing scope, coverage and insurance terms without promising a final price before the required information is known.",
    "paidStrategy": "Use city-to-city and local service-intent campaigns that match actual routes. Make quote forms easy on mobile, ask for the move date and broad inventory context and measure attended surveys or completed moves.",
    "contentAngles": "Publish packing checklists, relocation timelines, building-access preparation, storage FAQs and transparent explanations of the moving process. Avoid unrealistic cost claims that ignore stairs, volume, distance or special handling.",
    "aiQuestions": "Answer service coverage, quote steps, packing materials, transit arrangements, insurance terms, storage availability and what customers should prepare. Clear route and service data helps AI systems distinguish local moves from intercity services.",
    "conversionPath": "A customer should confirm coverage, understand what information is needed for an estimate, submit the request and receive a survey or quote appointment. Confirm move date and scope before promising availability or cost.",
    "automation": "Automate survey scheduling, quote follow-ups, packing reminders and move-day confirmations. Keep customer addresses and inventories access-controlled and don't expose personal relocation details in advertising tools.",
    "trust": "Show the real business identity, accurate coverage, clear terms and genuine customer feedback. Explain insurance limits and exclusions and avoid displaying unverified licenses or guarantees.",
    "localAngle": "Pages should map to routes and service areas the company genuinely covers. A city-to-city page needs route-specific information and a real operational basis, not just two city names and duplicate text.",
    "metrics": "Track qualified quote requests, survey completion, quote acceptance, move completion, complaints and cost per booked move. Separate residential and commercial operations where conversion differs.",
    "offer": "A moving-company audit can review local search, route pages, mobile quote capture and estimate follow-up.",
    "faqs": [
      [
        "How can packers and movers get more bookings?",
        "Use accurate route coverage, transparent quote steps and responsive follow-up. The form should collect enough to arrange an estimate without asking for unnecessary personal details."
      ],
      [
        "Can a moving company advertise fixed prices?",
        "Only when the scope and conditions genuinely support that price. Explain what is included and what may affect the quote, such as inventory, access or distance."
      ]
    ]
  },
  {
    "slug": "home-services",
    "name": "Home Services, Repairs & Maintenance",
    "category": "Lifestyle & Local Services",
    "icon": "🧰",
    "summary": "Local service calls for plumbing, electrical, cleaning, repair and property maintenance businesses.",
    "overview": "Home-service customers need to know whether a provider covers their address, can handle the requested job and will respond reliably. Marketing should make service scope, availability, credentials and pricing approach clear while avoiding unsupported emergency or safety claims.",
    "audience": "Audiences include homeowners, tenants, landlords, housing societies and property managers seeking maintenance, installation, cleaning or repairs. Their decisions depend on job urgency, trust, service area, transparent estimates and dependable appointment windows.",
    "challenges": "Providers may receive requests outside coverage, miss calls while on jobs and struggle to explain the difference between a quick visit and a larger project. Poor routing wastes time and can leave customers waiting without confirmation.",
    "searchIntent": "Create genuine pages for each trade and service area served. Explain common job types, visit process, emergency availability when real, credential requirements and the information needed to arrange an estimate.",
    "paidStrategy": "Run local search campaigns for high-intent repair and maintenance queries. Use call handling schedules, relevant destination pages and negative keywords, and distinguish emergency services from routine bookings if response capacity differs.",
    "contentAngles": "Publish maintenance checklists, signs that a professional inspection may be needed, service process guides and practical home-care education. Safety content should encourage qualified help and not teach risky procedures beyond appropriate scope.",
    "aiQuestions": "Clearly answer service coverage, opening hours, job types, qualification details, estimate process and emergency availability. Keep phone numbers and time claims accurate so AI systems do not recommend an unavailable service.",
    "conversionPath": "Route a customer from the requested service to a short enquiry or call, confirm location and job type and provide a realistic visit window. Explain whether estimates are free or charged and what can change the final price.",
    "automation": "Automate dispatch alerts, appointment windows, missed-call callbacks and follow-up feedback. Do not send a technician to an unverified address or automatically promise arrival times without live scheduling information.",
    "trust": "Display genuine business details, relevant credentials, transparent estimate terms and clear complaint handling. Never invent emergency coverage, insurance or guaranteed repair outcomes.",
    "localAngle": "Service areas must be based on actual team coverage and travel capacity. Distinct city or neighborhood pages should answer real questions about availability, typical job scope and how customers book.",
    "metrics": "Measure answered calls, qualified job requests, booked visits, technician attendance, quote-to-job conversion and repeat service. Track response time because it strongly affects local lead outcomes.",
    "offer": "A home-services audit can review local visibility, call routing, job-specific pages and dispatch-aware conversion tracking.",
    "faqs": [
      [
        "What matters most for local repair leads?",
        "Accurate coverage, answered calls, clear service descriptions and reliable booking windows. Campaigns should match actual staff capacity and job types."
      ],
      [
        "Should every repair service have a separate page?",
        "Create pages where the task, qualifications, customer questions or booking route differ materially. Each should explain the actual service rather than repeat a generic description."
      ]
    ]
  },
  {
    "slug": "photographers-creative-studios",
    "name": "Photographers & Creative Studios",
    "category": "Lifestyle & Local Services",
    "icon": "📷",
    "summary": "Portfolio discovery and date-qualified enquiries for photographers, videographers and creative production teams.",
    "overview": "Creative clients choose a provider through style, portfolio quality, availability, process and confidence that the team understands their brief. Digital marketing should pair visual work with useful details about deliverables, schedule, licensing and booking.",
    "audience": "Customers include couples, families, brands, product teams, event organizers and businesses needing commercial photography or video. Their requirements vary by date, location, number of deliverables, usage rights and production scale.",
    "challenges": "Studios can attract low-budget requests, fail to explain licensing or delivery times and use portfolios without a clear enquiry path. Image-heavy pages also need careful performance and accessibility optimization.",
    "searchIntent": "Build service pages for real specialties such as weddings, product photography, corporate video or events, supported by original portfolios and package information. Include service area, turnaround guidance and the steps to confirm availability.",
    "paidStrategy": "Use visual social campaigns for style discovery and search ads for high-intent service or event dates. Qualify enquiries around date, location and project type and evaluate confirmed bookings rather than likes or gallery views.",
    "contentAngles": "Share full project stories, sample galleries, lighting or production process explainers and planning checklists. Obtain model and client permissions, clarify commercial usage rights and avoid presenting styled shoots as client commissions.",
    "aiQuestions": "Explain specialties, deliverables, dates, travel coverage, editing or licensing scope and consultation process in text alongside imagery. Descriptive alt text should identify relevant subjects without stuffing keywords.",
    "conversionPath": "Guide visitors to a matching portfolio, show a simple availability or brief form and explain how package proposals work. Capture enough context for a helpful reply without making the initial form burdensome.",
    "automation": "Automate enquiry acknowledgement, date reminders, quote follow-up and delivery notifications through suitable project systems. Keep unedited assets, private event details and client contracts in access-controlled storage.",
    "trust": "Display genuine work and credits, define deliverables and usage rights and use testimonials with permission. Never reuse another photographer's imagery or claim awards that have not been earned.",
    "localAngle": "Show realistic travel coverage and any additional travel costs. Local pages should highlight actual portfolio work or venue experience rather than pretending the studio has a physical branch in every city.",
    "metrics": "Track qualified enquiries, date availability, consultation rate, signed bookings, average project value and referral contribution. Consider capacity and project margin in campaign decisions.",
    "offer": "A creative-studio audit can review portfolio-led SEO, project qualification, mobile performance and booking follow-up.",
    "faqs": [
      [
        "How do photographers turn portfolio visits into enquiries?",
        "Organize work by service, explain deliverables and process, show genuine examples and make availability checks easy. Measure qualified briefs and confirmed bookings rather than gallery engagement alone."
      ],
      [
        "Can creative studios reuse client work in marketing?",
        "Only with appropriate rights and permissions. Clearly label personal projects and styled shoots and credit collaborators accurately."
      ]
    ]
  },
  {
    "slug": "ngos-nonprofits",
    "name": "NGOs & Nonprofit Organizations",
    "category": "Community & Specialist Services",
    "icon": "❤️",
    "summary": "Awareness, volunteer and donor engagement for nonprofit organizations.",
    "overview": "Nonprofits need to communicate mission, evidence of activity, responsible funding and the practical ways people can help. Digital marketing should build understanding and participation without exploiting beneficiaries, exaggerating impact or obscuring how donations are used.",
    "audience": "Audiences include potential donors, volunteers, institutional partners, community members, grant makers and people seeking program information. They need to understand the mission, target communities, evidence of progress and whether the organization is credible.",
    "challenges": "Organizations may have limited staff, uneven reporting capacity and a difficult time translating complex impact into clear messages. Weak consent practices or vague fundraising claims can damage trust and community relationships.",
    "searchIntent": "Build program pages, service-area information, impact reporting, volunteering routes and verified donation options. Explain eligibility and participation clearly, and keep registration or compliance information accurate where applicable.",
    "paidStrategy": "Plan awareness and participation campaigns with appropriate nonprofit and political-adjacent policy checks where relevant. Segment donor, volunteer and beneficiary journeys carefully and measure meaningful action rather than impressions alone.",
    "contentAngles": "Share mission explainers, program updates, anonymized stories with informed consent, volunteer guides and transparent impact reports. Give community members agency in stories and avoid imagery or language that reduces people to their hardship.",
    "aiQuestions": "Answer what the organization does, who its programs serve, how to volunteer or donate, where work takes place and how impact is reported. Include verifiable facts and date the latest reports.",
    "conversionPath": "Let visitors choose a meaningful action such as donating, volunteering, attending an event or requesting program information. Explain how contact data will be used and provide a respectful confirmation and next step.",
    "automation": "Automate volunteer onboarding, event reminders, consented donor receipts and program updates with appropriate data controls. Keep beneficiary records and sensitive case information separate from public engagement systems.",
    "trust": "Publish genuine governance, leadership, funding explanations and impact evidence. Be transparent about how donations are used and obtain informed consent before publishing personal stories or photographs.",
    "localAngle": "Local pages should describe real programs, partner locations and volunteer opportunities. Do not imply that a nonprofit serves every community if its current operations are more limited.",
    "metrics": "Track completed donations, recurring donor retention, qualified volunteers, event attendance, program enquiries and engagement with impact reports. Interpret performance in relation to mission outcomes rather than only reach.",
    "offer": "A nonprofit communications audit can strengthen mission clarity, donor journeys, volunteer conversion and impact storytelling.",
    "faqs": [
      [
        "How can nonprofits build trust online?",
        "Publish clear governance details, accurate program information, understandable funding use and regular evidence of activity. Share stories ethically and obtain informed permission."
      ],
      [
        "Should donations be the only call to action?",
        "No. Different visitors may be ready to volunteer, attend an event, partner or learn first. Offer suitable pathways and report mission-relevant outcomes."
      ]
    ]
  },
  {
    "slug": "political-campaigns",
    "name": "Political Campaigns & Public Representatives",
    "category": "Community & Specialist Services",
    "icon": "🗳️",
    "summary": "Compliant public communication and constituency engagement for political organizations.",
    "overview": "Political communication is sensitive, jurisdiction-specific and subject to advertising, disclosure, privacy and election rules. A website should make verified positions, public events and constituent contact options accessible without manipulating voters through false claims or misleading attribution.",
    "audience": "Visitors may be constituents looking for public information, supporters seeking events, volunteers, journalists or voters comparing policy positions. Each needs clear sourcing, current dates and a reliable contact or participation route.",
    "challenges": "Campaigns face misinformation, rapidly changing schedules, impersonation risk, high message volume and strict rules on advertising and spending. Incorrect information or unclear sponsorship can quickly undermine trust.",
    "searchIntent": "Publish verified biography, official platform documents, public meeting schedules, policy explanations and constituency service routes. Clearly label dated statements and link to primary sources for claims that require context.",
    "paidStrategy": "Before political ads run, verify election laws, platform authorization and disclaimer requirements in the relevant jurisdiction. Keep sponsor identity transparent and do not use deceptive targeting, manipulated media or unsubstantiated allegations.",
    "contentAngles": "Create plain-language policy explainers, event announcements, public statements and fact-checked responses tied to source documents. Clearly distinguish opinion from fact and correct errors visibly when new evidence changes the record.",
    "aiQuestions": "Answer who the representative or candidate is, which constituency is served, where official policies can be read and how public events or constituent requests work. Include dates and authoritative sources to reduce confusion between old and current positions.",
    "conversionPath": "Provide clear actions for event registration, volunteering, official contact or accessing policy information. Do not collect sensitive political data unnecessarily, and explain how contact details are used and protected.",
    "automation": "Automate event reminders and constituent-message routing, but provide human review for public statements and urgent concerns. Protect supporter lists, use consent-aware communications and guard against unauthorized access or impersonation.",
    "trust": "Verify official identity, disclose sponsorship where required, maintain an accurate archive of positions and provide corrections for factual errors. Never fabricate endorsements, volunteer counts or public support.",
    "localAngle": "Constituency pages should clearly identify official boundaries and genuine service access. Avoid implying endorsement by local institutions or communities without permission.",
    "metrics": "Measure engagement with policy information, verified event registrations, volunteer follow-through and resolved constituent enquiries. Follow legal requirements for records, reporting and data retention.",
    "offer": "A political communication audit can review information architecture, transparency, consent and compliant public engagement workflows.",
    "faqs": [
      [
        "Can political campaigns advertise on major platforms?",
        "Eligibility and requirements vary by jurisdiction and platform, including authorization and disclaimers. Check current rules before launching and keep sponsor identity transparent."
      ],
      [
        "How should campaign content handle disputed claims?",
        "Use reliable sources, distinguish opinion from fact and update or correct inaccurate statements promptly. Do not publish unsupported allegations as established facts."
      ]
    ]
  },
  {
    "slug": "astrologers-spiritual-services",
    "name": "Astrologers & Spiritual Service Providers",
    "category": "Community & Specialist Services",
    "icon": "✨",
    "summary": "Trust-led discovery for astrology, spiritual guidance and related consultation services.",
    "overview": "People seeking spiritual or astrology services want to understand the provider's approach, consultation format, price and cultural context. Marketing should describe the service respectfully without exploiting fear, promising guaranteed life outcomes or making unsupported medical or financial claims.",
    "audience": "Visitors may be exploring a chart reading, spiritual counseling, ritual information or a gift consultation. They need clear service boundaries, what details are required, appointment format and confidence that pricing and privacy will be respected.",
    "challenges": "The sector can suffer from exaggerated guarantees, fear-based selling, unclear service descriptions and privacy concerns around personal birth or relationship details. Sustainable marketing depends on honest expectations and transparent consultation practices.",
    "searchIntent": "Create pages explaining real consultation types, format, duration, languages, fees and booking. Use informational articles that describe traditions and concepts respectfully, and clearly label personal interpretation rather than presenting it as scientifically proven fact.",
    "paidStrategy": "Check advertising policies carefully, especially for personalized attributes, sensitive life situations and prohibited claims. Use respectful service information, transparent pricing and no messages implying that a user is cursed, doomed or guaranteed a specific future.",
    "contentAngles": "Publish explanations of consultation formats, cultural background, common terminology and what clients can expect. Avoid claiming guaranteed marriage, wealth, health or legal outcomes, and do not use fear or fabricated testimonials to pressure payment.",
    "aiQuestions": "Answer which services are offered, how a session works, what information is needed, how long it lasts and how privacy is handled. Distinguish tradition-based interpretation from verifiable facts or professional advice.",
    "conversionPath": "Help visitors compare consultations, understand price and format, select an appointment and receive confirmation. Collect only the details needed for the agreed service and explain privacy before requesting personal information.",
    "automation": "Automate booking confirmation, reminders and opt-in follow-up, but avoid sending sensitive personal predictions in marketing messages. Provide a clear way to request deletion or stop communications where applicable.",
    "trust": "Use genuine practitioner biographies, transparent fees, clear boundaries and real reviews. Avoid guaranteed outcomes, hidden recurring charges, coercive upselling or claims that discourage people from seeking qualified medical, legal or financial help.",
    "localAngle": "Local pages can describe genuine in-person consultation locations and languages offered. Online providers should explain virtual session formats without implying a storefront or local presence where none exists.",
    "metrics": "Track qualified bookings, attendance, repeat requests, cancellation rate and complaint patterns. Avoid interpreting engagement with sensitive spiritual topics as evidence of guaranteed commercial success.",
    "offer": "A spiritual-service visibility audit can improve service clarity, respectful content, booking conversion and privacy-conscious communication.",
    "faqs": [
      [
        "How can astrologers market services responsibly?",
        "Describe the consultation process, format, qualifications or tradition and fee terms honestly. Avoid fear-based messaging or promises of guaranteed personal outcomes."
      ],
      [
        "What information should a booking form request?",
        "Collect only what is necessary for the chosen session and explain how it will be used. Protect sensitive personal details and offer a way to contact a human."
      ]
    ]
  },
  {
    "slug": "franchises",
    "name": "Franchise Brands & Multi-Location Businesses",
    "category": "Community & Specialist Services",
    "icon": "🏬",
    "summary": "Local demand and brand consistency for franchisors and franchise operators.",
    "overview": "Franchise growth combines national brand positioning with local execution. Marketing must clarify which offers, locations and services are genuinely available while giving franchisees consistent resources and preserving accurate branch-level information.",
    "audience": "Audiences include prospective franchise buyers, local customers, franchise operators and business partners. Each group has different intent: investment evaluation needs transparent documents, while customer discovery needs the correct local branch, hours and service information.",
    "challenges": "Common difficulties include inconsistent location data, duplicate local content, competing ad ownership and varying lead response between operators. A scalable system needs clear governance for brand assets, local approvals and lead routing.",
    "searchIntent": "Build brand, franchise opportunity and branch pages with distinct purposes. Keep investment terms and eligibility current, and make each local page useful through actual services, offers, contacts and locally verified details.",
    "paidStrategy": "Separate consumer campaigns from franchise recruitment campaigns and follow applicable franchise, finance and platform rules. Allocate local budgets clearly, prevent overlapping geographies where possible and measure branch-level conversions.",
    "contentAngles": "Create operator stories with permission, brand standards, local event pages, service explainers and franchise process guides. Disclose what support the franchisor provides and avoid presenting one location's performance as typical for all operators.",
    "aiQuestions": "Make the legal brand identity, operating locations, franchise opportunity requirements, services, territory information and official enquiry routes explicit. Ensure AI systems can distinguish a franchisor from an independently owned local operator.",
    "conversionPath": "For customers, route location searches to the right branch. For franchise prospects, explain the process, qualification steps, investment terms and official disclosures before inviting a conversation.",
    "automation": "Automate lead distribution by territory, local review alerts, campaign approvals and branch reporting. Keep permissions clear for location data and avoid sending the same prospect to multiple operators without a defined policy.",
    "trust": "Publish accurate franchise information and required legal disclosures, keep local reviews authentic and explain ownership relationships transparently. Do not guarantee franchise profitability or hide fees and obligations.",
    "localAngle": "Each branch page should represent a real operating location with correct hours, services and contact details. Use central standards with local facts rather than copy-paste pages differing only by city name.",
    "metrics": "Track local branch enquiries, response time, booked actions, franchise applications, lead routing accuracy and performance variance. Report network-wide and location-specific results separately.",
    "offer": "A multi-location audit can assess brand consistency, local SEO governance, territory campaigns and lead routing.",
    "faqs": [
      [
        "How should franchise brands balance national and local marketing?",
        "Centralize brand standards and core assets while allowing verified local information, availability and events. Measure branch outcomes and maintain clear approval and ownership rules."
      ],
      [
        "Can a franchise page promise earnings?",
        "Earnings claims require careful legal review and appropriate substantiation. Do not present one operator's result as typical or guarantee profitability."
      ]
    ]
  },
  {
    "slug": "sports-academies",
    "name": "Sports Academies & Coaching",
    "category": "Community & Specialist Services",
    "icon": "🏅",
    "summary": "Trial-session and enrollment marketing for sports academies, clubs and specialized coaching.",
    "overview": "Parents and athletes evaluate coaching quality, training schedule, age group, venue, safety, equipment and progression pathways. Marketing should make real program details clear and avoid guaranteeing selection, scholarships or elite performance outcomes.",
    "audience": "Audiences include children and teens with parents, adult learners, competitive athletes, schools and organizations looking for coaching or venue hire. Their choices depend on sport, skill level, age, location, schedule and training goals.",
    "challenges": "Academies can struggle with season-based enrollment, incomplete schedules, uncertain trial attendance and unclear differentiation between recreational and competitive programs. Protecting minors' data and imagery is a core part of responsible marketing.",
    "searchIntent": "Create pages for actual sports, age groups, training levels, coaches, schedules and venue access. Explain equipment needs, trial arrangements and whether competitive selection or recreational participation is the goal.",
    "paidStrategy": "Use local search and social campaigns for trials, admissions and seasonal camps. Segment by sport and age group within platform rules, obtain appropriate guardian consent and measure attended trials and enrollments rather than clicks.",
    "contentAngles": "Publish coach introductions, skill-development explainers, training schedules, event results with context and practical preparation checklists. Use approved photos and never present selection or performance as guaranteed.",
    "aiQuestions": "Answer which sports and age groups are supported, coach qualifications, training frequency, trial policy, schedule and location. Keep current timetables and progression information explicit and distinguish published results from promised outcomes.",
    "conversionPath": "Guide families or athletes to the right program, show schedule and fees where approved, and make trial registration simple. Provide guardian-facing confirmation and clear information about equipment and arrival.",
    "automation": "Automate trial reminders, schedule changes and opt-in seasonal updates. Keep child contact data restricted, use parent or guardian contact routes where appropriate and provide a human point of contact.",
    "trust": "Publish genuine coach backgrounds, facility and safety information, transparent terms and verified achievement details. Obtain permission before posting identifiable images of minors.",
    "localAngle": "Location details should cover the actual training venue, transport, schedule and facility access. If sessions move seasonally, explain dates and venue changes clearly.",
    "metrics": "Track trial registrations, attendance, enrollment conversion, retention, class capacity and referral rates. Compare acquisition by sport and age group without exposing children’s personal data.",
    "offer": "A sports academy audit can review local discovery, trial funnels, program pages and guardian-friendly communication.",
    "faqs": [
      [
        "How can sports academies increase enrollment?",
        "Explain the program level, coach, schedule, location and trial process clearly. Use local campaigns aligned to available class capacity and track attended trials through enrollment."
      ],
      [
        "Can academies use athlete photos?",
        "Get appropriate permission, particularly for minors, and represent achievements accurately. Do not imply that a program guarantees selection or a professional career."
      ]
    ]
  },
  {
    "slug": "childcare-eldercare",
    "name": "Childcare, Daycare & Elder Care",
    "category": "Community & Specialist Services",
    "icon": "🧸",
    "summary": "Trust-centered enquiries for childcare centres, daycare and elder-care providers.",
    "overview": "Care decisions involve safety, staff, routines, accessibility, communication and family trust. Marketing should describe the real service model and policies accurately, never exaggerate qualifications or use private stories and images without appropriate permission.",
    "audience": "Audiences include parents evaluating daycare, families seeking elder support, employers exploring care options and people comparing in-home or facility-based services. They need service hours, staff credentials, care scope, accessibility and clear communication expectations.",
    "challenges": "Providers may struggle to explain daily routines, respond quickly to family questions and maintain consistent details about capacity or services. Safety claims and privacy-sensitive imagery require special review.",
    "searchIntent": "Create distinct pages for childcare, daycare, home support and residential care where these services genuinely exist. Explain eligibility, schedule, staff background, visit process and contact routes without promising outcomes or overstating supervision.",
    "paidStrategy": "Use careful local campaigns and clear service-specific messaging. Avoid exploiting vulnerable family circumstances; use respectful creative and lead forms that collect only essential initial contact information.",
    "contentAngles": "Publish general care-process guides, facility information, staff introductions with consent, family FAQs and practical visit checklists. Obtain permissions for any identifiable person, especially children or clients who may need additional protection.",
    "aiQuestions": "Answer the service type, ages or needs served, hours, location, staffing model, visit process and how families can ask questions. Keep statements about safety, qualifications and policies factual and current.",
    "conversionPath": "Help families understand the service, review policies, request a visit or consultation and receive a clear follow-up. Avoid collecting detailed medical or child information in general marketing forms.",
    "automation": "Automate visit reminders and routine communications only with appropriate consent. Keep care records separate from marketing systems and route safeguarding, medical or urgent-care concerns to responsible staff immediately.",
    "trust": "Publish transparent policies, verified qualifications, real service details and accessible complaint or escalation routes. Never claim certification or staffing ratios that cannot be verified.",
    "localAngle": "Local pages should describe actual facility location, service radius, opening hours and visit arrangements. Distinguish home-care coverage from facility locations and keep availability current.",
    "metrics": "Track qualified family enquiries, visit bookings, attendance, conversion, response time and retention. Use privacy-preserving reports and avoid detailed sensitive care information in marketing analytics.",
    "offer": "A care-provider audit can improve accurate local discovery, family enquiry handling and consent-aware communication.",
    "faqs": [
      [
        "What should a care-provider website include?",
        "Explain service type, eligibility, hours, staffing information, policies, location, visit process and how families can ask questions. Keep safety and credential claims accurate and current."
      ],
      [
        "Can testimonials be used for care services?",
        "Only with appropriate informed permission and honest context. Protect personal and health information, particularly for children and people who may be vulnerable."
      ]
    ]
  },
  {
    "slug": "coworking-shared-offices",
    "name": "Coworking Spaces & Shared Offices",
    "category": "B2B, Industrial & Logistics",
    "icon": "🏢",
    "summary": "Membership enquiries and tour bookings for coworking and flexible office providers.",
    "overview": "Flexible workspace buyers compare location, commute, desk or office type, amenities, price, access hours and contract flexibility. Marketing should make availability and membership terms clear so a tour request matches the space and service the prospect needs.",
    "audience": "Potential customers include freelancers, startups, remote teams, satellite offices, consultants and businesses seeking meeting or event space. Their priorities vary by team size, privacy, location, duration and visitor access.",
    "challenges": "Workspaces can receive tour requests with mismatched budget or size, maintain outdated photos and amenities, or fail to capture longer-term business demand from casual visitors. Clear product tiers and follow-up improve lead quality.",
    "searchIntent": "Create pages for hot desks, dedicated desks, private offices, meeting rooms and event space actually available. Include access hours, amenities, connectivity details, pricing approach and tour-booking options.",
    "paidStrategy": "Use local search for office and meeting room intent and professional social campaigns for team-based offers. Segment by workspace type and company size, and optimize around tours attended and memberships signed.",
    "contentAngles": "Show original space tours, room configurations, amenities, event options and practical guides to choosing a workspace. Represent current layouts accurately and disclose whether desks or rooms shown are shared, illustrative or currently available.",
    "aiQuestions": "Make location, workspace types, capacity, opening hours, included amenities, access conditions and booking steps explicit. Keep pricing and availability statements current so AI summaries do not confuse membership tiers.",
    "conversionPath": "Move visitors from the right workspace page to a tour or availability enquiry, then follow up with the correct plan and terms. Ask for team size, preferred start date and work type only when useful.",
    "automation": "Automate tour reminders, follow-ups, access onboarding and membership renewal notices. Use approved systems for member identity and building access and do not expose security or private member information in marketing content.",
    "trust": "Publish real space imagery, transparent membership inclusions, clear cancellation terms and accurate accessibility or connectivity claims. Don't imply 24-hour access or private offices where plans do not include them.",
    "localAngle": "Workspace pages should explain real transit access, parking, nearby conveniences and the exact building entry process. Each location needs distinct amenities and availability information.",
    "metrics": "Track tours booked and attended, tour-to-membership conversion, occupancy by product type, meeting-room usage and retention. Evaluate acquisition by membership duration and contribution.",
    "offer": "A coworking growth audit can review local search, workspace comparison pages, tour booking and membership follow-up.",
    "faqs": [
      [
        "How can coworking spaces generate more tours?",
        "Make location, available workspace types, included amenities and membership terms clear, then use local campaigns matched to each offering. Track tours attended and memberships signed."
      ],
      [
        "Should meeting rooms have their own pages?",
        "Create separate pages when capacity, equipment, rates or booking requirements differ enough to help people decide. Keep availability and access terms accurate."
      ]
    ]
  },
  {
    "slug": "beauty-cosmetics",
    "name": "Beauty, Skincare & Cosmetics Brands",
    "category": "E-commerce & Retail",
    "icon": "🧴",
    "summary": "Product discovery and compliant acquisition for beauty, skincare and personal-care brands.",
    "overview": "Beauty shoppers compare ingredients, use cases, skin or hair compatibility, price and brand credibility. Marketing should describe product characteristics responsibly, avoid unsupported medical claims and help customers understand how to use products safely according to approved instructions.",
    "audience": "Customers include routine builders, makeup shoppers, gift buyers, salon professionals and people researching ingredients. Their questions differ across shade matching, ingredients, sensitivity, application, results and return rules.",
    "challenges": "Brands face high creative competition, ingredient misinformation, inconsistent shade or variant data and exaggerated efficacy claims. Retention also depends on real product experience rather than only discount-led acquisition.",
    "searchIntent": "Create detailed category and product pages with accurate ingredients, size, usage instructions, warnings and variant data. Review claims against applicable cosmetic rules and keep any product testing or certification information substantiated.",
    "paidStrategy": "Test demonstrations, shade and texture content, routine education and product-focused campaigns while complying with cosmetics and health-related ad policies. Track profitable purchases, refunds and repeat order rather than clicks alone.",
    "contentAngles": "Publish ingredient explainers, application guides, routine suggestions and product comparisons reviewed by knowledgeable staff. Avoid presenting cosmetics as treatments for medical conditions without the necessary authorization and evidence.",
    "aiQuestions": "Clearly state ingredients, product format, size, intended use, directions, warnings and available shades. Use precise structured data and answer common compatibility questions without inventing clinical benefits.",
    "conversionPath": "Help shoppers identify the right product or shade, understand ingredients and instructions, confirm price and delivery terms, then complete checkout. Provide accessible customer support for product questions and clear returns policies.",
    "automation": "Automate order updates, consent-based replenishment reminders and product education sequences that reflect what the customer purchased. Respect opt-outs and avoid inferring sensitive health conditions from browsing behavior.",
    "trust": "Use authentic images, accurate ingredient lists, transparent claims and genuine reviews. Disclose creator partnerships and do not fake clinical approval, dermatologist endorsement or before-and-after results.",
    "localAngle": "For salon or retail distribution, list real stockists and service locations. Online-only brands should show verified delivery coverage and not invent physical retail presence to target cities.",
    "metrics": "Measure purchase conversion, margin, refund and complaint rates, repeat order, product review quality and customer acquisition cost. Segment by product type and shade to understand fit.",
    "offer": "A beauty brand audit can review product claims, feed quality, creative testing and repeat-purchase journeys.",
    "faqs": [
      [
        "How can skincare brands build trust?",
        "Provide accurate ingredients, use instructions, warnings and evidence for every claim. Use genuine content, explain limitations and avoid portraying cosmetic products as medical treatment without authorization."
      ],
      [
        "Can AI descriptions help beauty products?",
        "Structured product facts can make products easier to understand, but all ingredient, safety and efficacy statements must be verified. AI should not invent a product benefit or compatibility guarantee."
      ]
    ]
  },
  {
    "slug": "food-packaged-brands",
    "name": "Packaged Food, Snacks & FMCG Brands",
    "category": "E-commerce & Retail",
    "icon": "🥨",
    "summary": "Retail discovery and repeat purchase for packaged food, snacks and fast-moving consumer brands.",
    "overview": "Packaged-food customers care about taste, pack size, ingredients, freshness, availability, price and delivery. Marketing should make product identity and buying options clear while ensuring food, nutrition, origin and quality claims match verified product information and regulations.",
    "audience": "Audiences include household shoppers, gift buyers, retailers, distributors, corporate gifting teams and online snack customers. Their intent varies between immediate consumption, gifting, bulk purchase and business distribution.",
    "challenges": "Brands may have inconsistent package images, unclear pack-size options, weak marketplace listings, low repeat ordering and claims that are not synchronized across packaging and ads. Stock and fulfilment can change across sellers.",
    "searchIntent": "Create accurate product and collection pages with pack weight, ingredients, allergen statements, storage instructions, shelf life where verified, price, availability and retail or wholesale enquiries. Ensure online information matches the actual package.",
    "paidStrategy": "Use product-focused social creative, search campaigns and permitted shopping ads aligned to stock and margins. Test consumption moments, gifting and variety packs, and measure profitable repeat purchases instead of discount-driven volume alone.",
    "contentAngles": "Show serving ideas, authentic product photography, ingredient or preparation explainers, gifting use cases and brand provenance supported by evidence. Avoid unverified health benefits, misleading portion imagery or unsupported claims about being natural or chemical-free.",
    "aiQuestions": "Make product name, pack size, ingredients, allergens, nutrition information, storage guidance, seller, price and fulfilment terms explicit. Structured product data should help AI tools distinguish variants accurately.",
    "conversionPath": "Move shoppers from discovery to the correct pack or bundle, show delivery and returns or freshness terms, then complete checkout. For distributors, offer a separate trade enquiry path with volume and territory information.",
    "automation": "Automate order confirmation, dispatch and tracking updates, consented replenishment reminders and stock alerts. Ensure batch or expiry information is handled correctly and customer support can resolve quality issues promptly.",
    "trust": "Use authentic current packaging images, verifiable ingredient and quality statements, accurate weights and genuine reviews. Follow applicable food-label and advertising rules and never imply medical effects without valid authorization.",
    "localAngle": "For regional products, explain real origin and distribution facts and identify genuine stockists. Target cities based on actual fulfilment or retail availability rather than assuming nationwide delivery.",
    "metrics": "Track product conversion, average basket, repeat purchase, refund and damage rate, stockouts, distributor leads and contribution margin. Compare channels after shipping and marketplace costs.",
    "offer": "A packaged-food growth audit can review product data, retail visibility, compliant claims and repeat-order flows.",
    "faqs": [
      [
        "What information belongs on a packaged-food page?",
        "Include accurate pack weight, ingredients, allergen details, storage guidance, price and availability, aligned with the actual label and legal requirements."
      ],
      [
        "Can food brands claim health benefits?",
        "Claims must follow applicable regulations and be supported by appropriate evidence. Avoid implying medical effects or using terms such as healthy or natural in ways that mislead."
      ]
    ]
  },
  {
    "slug": "local-retail",
    "name": "Local Retail Stores & Shopping Businesses",
    "category": "E-commerce & Retail",
    "icon": "🛍️",
    "summary": "Store visits, calls and local purchase intent for independent shops and retail chains.",
    "overview": "Local shoppers want to know whether a store stocks what they need, when it is open, how to get there and what makes it worth visiting. Digital marketing should connect local discovery with accurate inventory or service information and real store operations.",
    "audience": "Customers may be comparing nearby shops, searching for a specific product, checking offers or planning a visit. Their priority can be immediate availability, price, convenience, local expertise or an opportunity to inspect products in person.",
    "challenges": "Retailers often have incomplete local listings, little product information online, inconsistent offers and limited ability to connect online discovery with store sales. Marketing can generate visits that disappoint when advertised inventory is not available.",
    "searchIntent": "Keep business profiles accurate and create pages for major categories, brands or services actually stocked. Clarify store hours, contact routes, pickup or delivery, returns and how customers can confirm availability.",
    "paidStrategy": "Use local search and social campaigns tied to real offers, nearby audiences and store capacity. Sync promoted products to stock and measure calls, directions, redemptions or store visits when reliable measurement exists.",
    "contentAngles": "Show real products, staff expertise, shopping guides, seasonal ranges, store events and practical FAQs. Clearly state offer dates and terms; do not use false discounts or unverified claims about being the cheapest.",
    "aiQuestions": "Make store location, hours, categories, brands, services, contact information and pickup options explicit. Maintain accurate data so AI answers do not recommend outdated hours or products the store does not carry.",
    "conversionPath": "Offer a quick path from product or category discovery to directions, a call, stock confirmation or online purchase. Provide a clear expectation for response and avoid collecting excess personal details.",
    "automation": "Automate offer publishing, inventory alerts, customer-service routing and consent-based event announcements. Coordinate data with the point-of-sale or inventory source and stop campaigns when a promoted product sells out.",
    "trust": "Display real prices and offer conditions, authentic store photos, clear returns policy and correct contact details. Request genuine reviews ethically and do not create fake local profiles.",
    "localAngle": "Store-level profiles and pages should represent a real address, unique opening hours and genuine local services. For multi-branch retailers, allow customers to identify which store has the product or service.",
    "metrics": "Track calls, directions, store enquiries, offer redemptions, online sales, inventory-related cancellations and repeat visits. Use simple offline attribution carefully and avoid overclaiming based on clicks alone.",
    "offer": "A local retail audit can review profile accuracy, category discovery, inventory messaging and online-to-store conversion.",
    "faqs": [
      [
        "How can local shops compete with large marketplaces?",
        "Show the advantages the store genuinely offers, such as local availability, product knowledge, service, pickup or community events. Keep hours and inventory details accurate and measure visits or sales."
      ],
      [
        "Do local retailers need a full e-commerce website?",
        "Not always. A helpful site with store information, popular categories, availability checks and contact options may be a practical first step, depending on the product and customer expectations."
      ]
    ]
  }
];

export type IndustrySection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug.toLowerCase());
}

export function getIndustrySections(industry: Industry): IndustrySection[] {
  const brand = "AdsVerse";
  const serviceMix = "Search engine optimization, local discovery, paid advertising, useful content, conversion-focused web design and consent-aware automation should operate as one system. Each activity should have a clear role, a responsible owner and a measurable next step. For " + industry.name + ", the right mix depends on " + industry.challenges.toLowerCase() + " Campaigns should reflect the actual service, team capacity and customer journey rather than copy a competitor's package.";
  const buyerIntent = "People rarely move from first awareness to purchase in one step. They may compare options, ask colleagues or family, check reviews, return after several days and then contact a provider. A helpful page for " + industry.name + " anticipates those stages with practical facts, examples and a direct next action. It should explain who the service is for, what a first conversation covers, which details are still subject to confirmation and how the visitor can make an informed choice.";
  const seoParagraph = "Build the information architecture around the words customers actually use. Use a clear H1, descriptive H2 headings, relevant supporting terms, short direct answers and links to deeper service pages. Add original examples and explicit facts rather than repeating the same keyword in every paragraph. Page titles and descriptions should match the content, canonical URLs should be self-referencing, and internal links should help users continue their research. For " + industry.name + ", the primary search intent is: " + industry.searchIntent;
  const aiParagraph = "AI readability is not a hidden trick or a promise of placement. It means publishing information that a human, search crawler or answer engine can interpret without guessing: clear entity names, accurate service descriptions, descriptive headings, concise answers, consistent contact details, accessible text and citations for factual claims. Keep facts in visible page content; structured data should represent the same content and must not introduce claims that users cannot see. Review content after service, price, schedule or policy changes.";
  const paidParagraph = "Paid campaigns should match the exact promise on the landing page. Separate high-intent searches from exploratory audiences, make geographic reach realistic, use exclusions to reduce irrelevant clicks and ensure the team can respond to the leads produced. Test one meaningful variable at a time, such as the offer, message, page or audience. Evaluate the full funnel from enquiry through qualification and sale rather than optimizing only for cheap leads. " + industry.paidStrategy;
  const contentParagraph = "Content should help a potential customer make a decision, not simply fill a publishing calendar. Prioritize questions sales and service teams hear every week, practical comparison criteria, process explanations, realistic timelines, maintenance guidance and examples from genuine work. Add original images or diagrams when they explain something, and provide descriptive alt text. Review facts before publication and update material that depends on dates, regulations, availability or platform changes. " + industry.contentAngles;
  const conversionParagraph = "A landing page works best when the next step is visible and consistent with the visitor's intent. For some visitors that is a call; for others it may be a consultation, demo, quote, appointment or product detail. Ask for the minimum information needed to route the request, explain what happens after submission, make privacy expectations clear and show alternative contact options. Test on mobile devices, keep forms usable with a keyboard, and make confirmation messages specific rather than generic. " + industry.conversionPath;
  const localParagraph = "Local visibility depends on factual consistency across the website, business profile, directories and customer-facing channels. Use the real business name, correct address and phone, honest hours, relevant categories and an accurate service area. Request genuine feedback after real interactions and answer reviews without exposing private information. Create a location page only when it offers useful details about an actual site or service area. " + industry.localAngle;
  const automationParagraph = "Automation should reduce response delays and repetitive administration without pretending to replace professional judgment. Map each hand-off: what starts the workflow, which system is the source of truth, who owns exceptions and how the customer can reach a person. Use access controls, collect only necessary data, honor consent and opt-out requests, and test failed or duplicate events. Keep critical commercial facts synchronized so an automated message does not repeat an expired offer or promise unavailable capacity. " + industry.automation;
  const trustParagraph = "Trust is earned through specific, verifiable information: real people, accurate credentials, clear terms, genuine examples and realistic limits. Identify the source of a statistic, the period it covers and how it was measured. Obtain permission for client names, logos, images and testimonials. Never invent reviews, certifications, case studies, scarcity or performance results. " + industry.trust;
  const measurementParagraph = "A useful measurement framework distinguishes attention from business results. Define the stages from visitor to enquiry, qualified lead, booked next step and completed commercial outcome. Agree on what counts as qualified before a campaign begins; otherwise, teams can report very different numbers as success. Review performance by service, audience, location and campaign while taking seasonality, sales-cycle length and operating capacity into account. " + industry.metrics;
  const faqTail = "The best answer depends on the actual service scope, location, timing and capacity. Use the published information as a starting point and confirm any variable detail with the team before a customer makes a decision.";
  const faqs: IndustryFaq[] = industry.faqs.map((item) => ({ question: item[0], answer: item[1] }));
  faqs.push({
    question: "How does AdsVerse approach marketing for " + industry.name.toLowerCase() + "?",
    answer: industry.offer + " The first step is to understand the current funnel, customer questions, service capacity and available measurement. The proposed plan prioritizes improvements that can be tested, measured and adjusted rather than promising a predetermined ranking or sales result."
  });
  faqs.push({
    question: "How is AI-readability different from traditional SEO?",
    answer: "Traditional SEO helps pages be discovered and understood in search. AI-readability adds emphasis on clear entities, factual direct answers, consistent terminology and well-structured supporting information that answer systems can interpret. Both depend on useful, accurate content, sound technical access and consistency; neither can guarantee a specific recommendation or citation."
  });
  faqs.push({
    question: "How soon can a digital marketing campaign produce results?",
    answer: "Timing depends on the starting website, competition, offer, budget, season and speed of follow-up. Paid campaigns can generate early learning once tracking and landing pages work, while organic visibility generally needs consistent improvements and time. AdsVerse should establish a baseline, agree on leading and lagging indicators and report progress without promising a fixed outcome. " + faqTail
  });

  return [
    {
      heading: "Understanding the " + industry.name + " market",
      paragraphs: [
        industry.overview,
        "For " + industry.name + ", effective marketing starts with a clear explanation of the value delivered, the people served and the limits of the service. Website visitors need enough useful detail to decide whether the business is relevant to them. " + industry.summary + " This page is designed to connect discovery, evaluation and a realistic next step rather than treat traffic as the final objective.",
        "Digital channels work together, but they do not all have the same job. Search captures existing demand, educational content helps people compare options, paid campaigns can test messages or reach specific audiences, and well-designed follow-up helps interested people continue. The right sequence for this industry should be based on how its customers actually decide, not on a universal marketing checklist."
      ]
    },
    {
      heading: "Who the strategy should reach",
      paragraphs: [
        industry.audience,
        "Start by defining the most useful customer groups rather than targeting everyone. Identify the decision-maker, the person who uses the service, any other person who influences the decision, and the information each needs. For " + industry.name + ", this can change the page structure, the proof shown first, the language used in ads and the questions a form should ask.",
        buyerIntent
      ]
    },
    {
      heading: "The problems a focused marketing system must solve",
      paragraphs: [
        industry.challenges,
        "A diagnostic review should separate visibility problems from conversion and operations problems. More impressions will not resolve a slow response process; a redesigned page will not fix inaccurate availability; and more automation will not compensate for an unclear offer. Record the current baseline, identify where relevant prospects are dropping out and fix the highest-impact friction before scaling spend.",
        "For this industry, turn recurring objections into useful website information. Explain service boundaries, timing, pricing approach, eligibility, what is included and what happens after an enquiry. If information can change, assign an owner to review it. Accurate detail reduces mismatched leads and helps the team have more productive conversations."
      ]
    },
    {
      heading: "The integrated digital growth plan",
      paragraphs: [
        serviceMix,
        "A sensible order of work is to establish accurate service information, repair tracking gaps, build the highest-value landing pages, connect conversion events to the right systems and then scale the channels that attract suitable demand. Make one team responsible for the hand-off from campaign to sales or service. This avoids a gap in which marketing reports leads while the business cannot say whether they were reached or served.",
        "Use the channel mix according to buyer behavior. A high-intent service may benefit from search demand capture; a visual or aspirational purchase may need demonstration-led creative; and a complex B2B sale may require expert material and several conversations. " + industry.offer + " This should be treated as a starting hypothesis, then validated against real enquiry quality and commercial results."
      ]
    },
    {
      heading: "SEO and search intent",
      paragraphs: [
        seoParagraph,
        "Group keywords by the question behind them: learn, compare, evaluate, find a provider or take an action. One page should have a coherent purpose; avoid forcing unrelated terms into a single page. Build supporting pages only where customers need meaningfully different information, and link them using clear anchor text. Search engines should be able to crawl the main content, understand page hierarchy and discover the canonical route without relying on a visual effect or script-generated text.",
        "The strongest on-page improvements are often practical: a specific title, clear opening answer, complete service details, current contact information, descriptive images, fast-loading mobile layout and links to the next relevant step. Measure impressions and clicks, but also inspect whether the search query attracts the kind of customer the business can serve. " + industry.searchIntent
      ]
    },
    {
      heading: "AI readability, GEO and AEO",
      paragraphs: [
        "AI-readable content for " + industry.name + " should directly answer questions customers ask before choosing a provider. Examples include: " + industry.aiQuestions,
        aiParagraph,
        "Use a visible section with question-style headings and concise answers, then expand with detail where decisions require nuance. Explain industry terms, define abbreviations and make important facts explicit instead of hiding them in an image. Use structured data only when it accurately describes visible content, such as the organization, service, breadcrumb trail or genuinely published FAQs. Keep dates and service facts current, and review generated summaries for errors before sharing them.",
        "For AI search, build authority by being specific and useful. Attribute claims to named experts or reliable sources, explain methods behind numbers, show relevant experience and correct outdated information. Clear content can improve the chance that search and answer systems interpret the business accurately, but AdsVerse cannot guarantee that a model will cite, rank or recommend a particular page."
      ]
    },
    {
      heading: "Paid acquisition and audience targeting",
      paragraphs: [
        paidParagraph,
        "Every campaign needs a defined audience, a specific offer, a landing page that matches the ad, a conversion event and a follow-up owner. Use separate campaigns when the audience or customer journey differs substantially. Build negative keyword lists, monitor search terms and pause promotions that no longer match the offer or available capacity. Use privacy and consent controls appropriate to the platform, particularly where personal, financial, educational or health-related information may be involved.",
        "Creative testing should compare understandable hypotheses: problem-led versus outcome-led messaging, a demonstration versus a static visual, or a consultation offer versus a downloadable guide. Avoid changing too many variables at once. Evaluate qualified actions and downstream outcomes, and make sure ad claims remain consistent with the page and actual service delivery."
      ]
    },
    {
      heading: "Content that helps people make a decision",
      paragraphs: [
        contentParagraph,
        "A sustainable content plan mixes evergreen education with genuinely useful updates. Evergreen pages explain services, processes, comparisons and frequently asked questions; timely posts address changes that materially affect customers and must be reviewed when facts shift. A publishing calendar should be based on real questions, business priorities and subject-matter review, not an arbitrary number of posts.",
        "Use case studies only when the work and outcome are real and permission is documented. Describe the challenge, approach, constraints and result with enough context for the reader to judge its relevance. Do not present one exceptional case as an average outcome. Images should be original or properly licensed, captions should add information, and alt text should describe the image for users who cannot see it."
      ]
    },
    {
      heading: "Website conversion and enquiry quality",
      paragraphs: [
        conversionParagraph,
        "Review the page on a phone before increasing traffic. The first screen should explain the offer and show the next action without requiring a visitor to hunt through a long navigation menu. Use readable font sizes, descriptive button labels, sufficient contrast, clear error messages and confirmation states. Avoid making essential information hover-only or burying fees, eligibility or limitations below a promotional claim.",
        "Qualification should make the conversation better, not create a barrier. Ask for information that helps route the enquiry, such as service required, location, timing or broad project scope where applicable. Explain what happens next and give people a way to ask a question before committing. Track form starts, completions, contact attempts and qualified outcomes to identify the actual friction."
      ]
    },
    {
      heading: "CRM, WhatsApp and process automation",
      paragraphs: [
        automationParagraph,
        "Define a small number of useful lead stages, for example new, contacted, qualified, meeting or visit booked, proposal or next step, and completed or closed. Use consistent definitions across the marketing and sales teams. Every stage needs an owner, a timestamp and a next action; otherwise, automated reminders may simply repeat information without moving the opportunity forward.",
        "For WhatsApp, send useful transactional messages and promotional messages only in line with customer consent, applicable messaging rules and the chosen provider's requirements. Identify the business, keep messages relevant, respect opt-outs and ensure a human can take over. Reconcile workflow events with the source system and test failure, retry and duplicate cases before relying on automation in production."
      ]
    },
    {
      heading: "Trust, proof and responsible claims",
      paragraphs: [
        trustParagraph,
        "Publish a clear business identity, contact method, service scope and relevant policy information. Where credentials, registration, licensing or product standards matter, state what is verified and keep supporting records current. Use real customer reviews and respond professionally; never reward only positive reviews or suppress legitimate criticism through deceptive practices.",
        "The level of review required depends on the sector. Health, finance, law, education, children's services and political communication can have additional professional, legal, privacy or platform requirements. Review claims, images, consent and lead forms before publishing, and consult a qualified professional when the business is unsure about a regulated claim."
      ]
    },
    {
      heading: "Local and regional targeting",
      paragraphs: [
        localParagraph,
        "A local page should contain more than a city name. Add actual details about access, operating hours, availability, location or service boundaries and common local customer questions. If the business has multiple locations, distinguish each branch's services, staff, hours and inventory where these truly differ. If it works remotely, explain the actual delivery model instead of implying it has a physical office everywhere.",
        "For Indore and other Indian markets, consider the languages customers use, how they contact businesses, seasonal demand and the relationship between digital discovery and offline follow-up. Use location-specific content when it improves the decision for that audience. Do not mass-create near-identical city pages or fabricate testimonials, branch addresses or local case studies."
      ]
    },
    {
      heading: "Measurement and reporting",
      paragraphs: [
        measurementParagraph,
        "Before launching, record the baseline and decide which conversion events are trustworthy. Test that calls, forms, bookings and purchase events are recorded once, attributed sensibly and visible to the correct people. Use consistent definitions and include the reporting period, changes made, known limitations and next actions in each report.",
        "For " + industry.name + ", the core performance indicators include " + industry.metrics + " Review lead quality, cancellations, missed opportunities and customer feedback alongside channel numbers. An honest report explains what changed and what remains uncertain; it does not present correlation as proof that one campaign caused every sale."
      ]
    },
    {
      heading: "A practical 90-day implementation roadmap",
      paragraphs: [
        "Days 1–30: audit analytics, search visibility, landing pages, local profiles, competitors and enquiry handling. Speak with the team about frequent objections and the difference between a useful lead and a poor fit. Fix inaccurate content and tracking first, then prioritize the two or three opportunities most likely to improve customer understanding or follow-up.",
        "Days 31–60: publish or improve the most important pages, launch tightly scoped campaigns where appropriate, introduce a clear qualification process and test the main call to action. Create an AI-readable FAQ section with real answers, validate the structured data and monitor page usability on mobile. Review early enquiry samples with the sales or service team and adjust the message if expectations do not match delivery.",
        "Days 61–90: compare lead quality and conversion by service, geography and channel. Expand what is working only when capacity and economics support it. Improve weak stages, refresh the content that users still find confusing and establish a regular review rhythm for prices, hours, claims, policies and service availability. " + industry.localAngle
      ]
    },
    {
      heading: "Common mistakes to avoid",
      paragraphs: [
        "Avoid relying on one channel, publishing unreviewed claims, copying competitor wording, sending every visitor to the home page or judging success by follower count. Do not buy reviews, fabricate awards, create false urgency or publish case studies without permission. Do not assume a form submission is automatically a sales-qualified lead.",
        "Another common mistake is to automate a broken process. Before connecting tools, make sure the source data is accurate, the team knows who owns each lead and the workflow handles failure. Protect personal data, document consent and keep an accessible human escalation route. These safeguards protect customers and help the marketing operation remain reliable as enquiry volume increases."
      ]
    },
    {
      heading: "Frequently asked questions",
      paragraphs: [
        "The answers below address recurring planning questions for " + industry.name + ". They should be read together with the actual services, terms and coverage published by the business. If a detail can change, confirm it with the team before acting."
      ],
      bullets: []
    }
  ].map((section) => section);
}

export function getIndustryFaqs(industry: Industry): IndustryFaq[] {
  const sections = getIndustrySections(industry);
  const all = industry.faqs.map((item) => ({ question: item[0], answer: item[1] }));
  all.push({
    question: "How does AdsVerse approach marketing for " + industry.name.toLowerCase() + "?",
    answer: industry.offer + " The first step is to understand the current funnel, customer questions, service capacity and available measurement. The plan prioritizes improvements that can be tested and adjusted rather than promising a predetermined ranking or sales result."
  });
  all.push({
    question: "How is AI-readability different from traditional SEO?",
    answer: "Traditional SEO helps pages be discovered and understood in search. AI-readability adds emphasis on clear entities, factual direct answers, consistent terminology and well-structured supporting information that answer systems can interpret. Both depend on useful, accurate content, and neither can guarantee a specific recommendation or citation."
  });
  all.push({
    question: "How soon can marketing produce results?",
    answer: "Timing depends on the starting website, competition, offer, budget, season and response speed. Paid campaigns can generate early learning after tracking and landing pages work, while organic visibility typically takes sustained work. Establish a baseline and review progress without promising a fixed result."
  });
  return all;
}

export function countIndustryWords(industry: Industry): number {
  const sections = getIndustrySections(industry);
  const text = sections.flatMap((section) => [
    section.heading,
    ...section.paragraphs,
    ...(section.bullets || [])
  ]).join(" ") + " " + getIndustryFaqs(industry).map((faq) => faq.question + " " + faq.answer).join(" ");
  return text.trim().split(/\s+/).filter(Boolean).length;
}
