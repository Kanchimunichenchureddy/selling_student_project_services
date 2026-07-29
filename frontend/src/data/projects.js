export const PROJECTS_DATA = [
  {
    id: "proj-ai-01",
    title: "Autonomous LLM Multi-Agent Code Auditor & Refactoring Suite",
    domain: "AI-ML",
    priceRange: "₹10k-₹20k",
    badge: "Bestseller",
    description: "Multi-agent LLM pipeline leveraging LangChain, FastAPI, and Qdrant vector storage to analyze repositories for security flaws, code smells, and automated PR fixes.",
    stack: ["Python", "FastAPI", "LangChain", "Qdrant", "React", "Docker"],
    features: [
      "AST & Semantic Code Graph Generation",
      "Automated Security Vulnerability Detection",
      "One-click Auto-Refactor Diff Generator",
      "Comprehensive PDF Evaluation Report Output"
    ],
    demoUrl: "https://demo.nexgenprojects.dev/ai-code-auditor"
  },
  {
    id: "proj-cloud-02",
    title: "Multi-Cloud Kubernetes GitOps CI/CD & Infrastructure Portal",
    domain: "DevOps & Cloud",
    priceRange: "₹20k+",
    badge: "Trending",
    description: "Enterprise-ready GitOps pipeline using Terraform, ArgoCD, Helm, and Prometheus/Grafana monitoring dashboard across AWS EKS & GCP GKE.",
    stack: ["Terraform", "Kubernetes", "ArgoCD", "Helm", "Prometheus", "Golang"],
    features: [
      "Declarative Multi-Cluster Provisioning",
      "Zero-Downtime Canary & Blue-Green Deployments",
      "Real-time Cluster Metrics & SLA Dashboard",
      "Automated Slack/Email Alerts Integration"
    ],
    demoUrl: "https://demo.nexgenprojects.dev/gitops-portal"
  },
  {
    id: "proj-web-03",
    title: "AI-Powered B2B Micro-SaaS Analytics Platform with Stripe & Subscriptions",
    domain: "Web Dev",
    priceRange: "₹10k-₹20k",
    badge: "Popular",
    description: "Production micro-SaaS starter with Next.js 14, Tailwind, PostgreSQL (Prisma), Redis Caching, and OpenAI customer churn analytics.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Redis", "Stripe"],
    features: [
      "Role-Based Access Control (RBAC)",
      "Stripe Metered Billing & Webhooks",
      "Real-time WebSocket Data Feeds",
      "Complete Admin & Tenant Management Portal"
    ],
    demoUrl: "https://demo.nexgenprojects.dev/microsaas-analytics"
  },
  {
    id: "proj-iot-04",
    title: "Smart Industrial Predictive Maintenance via Edge AI & IoT Gateway",
    domain: "IoT",
    priceRange: "₹10k-₹20k",
    badge: "Hardware Compatible",
    description: "IoT sensor telemetry pipeline utilizing ESP32 microcontrollers, MQTT broker, InfluxDB time-series DB, and LightGBM anomaly detection.",
    stack: ["C++ (ESP32)", "Python", "MQTT", "InfluxDB", "Grafana", "TensorFlow Lite"],
    features: [
      "Edge Machine Learning Anomaly Detection",
      "Sub-millisecond Vibration & Temp Telemetry",
      "Interactive Grafana Operational Dashboard",
      "Simulation Script included for hardware-free demo"
    ],
    demoUrl: "https://demo.nexgenprojects.dev/iot-predictive-maintenance"
  },
  {
    id: "proj-mob-05",
    title: "Cross-Platform AI Telehealth & Electronic Health Records App",
    domain: "Mobile",
    priceRange: "₹20k+",
    badge: "HIPAA Ready Architecture",
    description: "Flutter mobile app with encrypted WebRTC video consultation, medical document OCR, and automated AI symptom checker backend.",
    stack: ["Flutter", "Dart", "FastAPI", "Firebase", "WebRTC", "OpenCV"],
    features: [
      "End-to-End Encrypted Peer-to-Peer Video Call",
      "Prescription Document Scanning via Tesseract OCR",
      "Appointment Scheduling & Doctor Portal",
      "Offline-first SQLite Data Sync"
    ],
    demoUrl: "https://demo.nexgenprojects.dev/telehealth-app"
  },
  {
    id: "proj-web-06",
    title: "High-Frequency Crypto & Stock Trading Bot with Microservices Architecture",
    domain: "Web Dev",
    priceRange: "₹5k-₹10k",
    badge: "High Performance",
    description: "Event-driven backtesting and paper trading system using FastAPI microservices, Kafka event streaming, and Vue 3 frontend.",
    stack: ["Python", "FastAPI", "Apache Kafka", "Redis", "Vue 3", "Tailwind CSS"],
    features: [
      "Technical Indicator Signal Engine (RSI, MACD, EMA)",
      "Interactive Strategy Backtesting UI",
      "Risk Management & Stop-Loss Automations",
      "Full API Documentation & Postman Collection"
    ],
    demoUrl: "https://demo.nexgenprojects.dev/trading-bot"
  }
];

export const DOMAINS = [
  "All Domains",
  "AI-ML",
  "DevOps & Cloud",
  "Web Dev",
  "Mobile",
  "IoT",
  "Custom Project"
];

export const BUDGET_RANGES = [
  "₹5k-₹10k",
  "₹10k-₹20k",
  "₹20k+"
];
