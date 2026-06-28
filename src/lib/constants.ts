import { NavLink, Feature, PricingTier, Testimonial, DashboardNavItem } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Pricing", href: "#pricing" },
];

export const FEATURES: Feature[] = [
  {
    title: "AI QR Generator",
    description: "Create stunning, branded QR codes with AI-powered designs.",
    icon: "QrCode",
  },
  {
    title: "Face Recognition",
    description: "Automatically identify and organize photos by faces.",
    icon: "ScanFace",
  },
  {
    title: "Private Gallery",
    description: "End-to-end encrypted galleries for your most precious moments.",
    icon: "Lock",
  },
  {
    title: "AI Enhancement",
    description: "One-click AI enhancement that makes every photo stunning.",
    icon: "Sparkles",
  },
  {
    title: "Smart Albums",
    description: "AI automatically organizes your photos into smart collections.",
    icon: "FolderHeart",
  },
  {
    title: "Cloud Storage",
    description: "Unlimited secure cloud storage with instant access anywhere.",
    icon: "Cloud",
  },
  {
    title: "Instant Sharing",
    description: "Share galleries and photos instantly with beautiful links.",
    icon: "Share2",
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started with AI photo management.",
    features: ["100 photos", "5 AI QR codes", "Basic AI enhancement", "1GB secure storage"],
    ctaText: "Start Free",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$12",
    description: "Everything you need for professional photo management.",
    features: ["Unlimited photos", "Unlimited AI QR codes", "Advanced AI enhancement", "100GB secure storage", "Face recognition", "Smart albums", "Priority support"],
    ctaText: "Get Pro",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "$49",
    description: "For teams and power users who need the ultimate solution.",
    features: ["Everything in Pro", "Unlimited secure storage", "API access", "Custom branding", "Dedicated support", "99.9% uptime SLA"],
    ctaText: "Contact Sales",
    isPopular: false,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    role: "Professional Photographer",
    content: "PIXLORA STUDIO completely changed my workflow. The AI enhancement is unbelievable, and my clients love the private galleries.",
    initials: "SJ",
  },
  {
    name: "Marcus Chen",
    role: "Digital Artist",
    content: "The AI QR generator is magic. I use it for all my physical exhibitions now. It bridges the gap between digital and physical seamlessly.",
    initials: "MC",
  },
  {
    name: "Elena Rodriguez",
    role: "Creative Director",
    content: "This feels like a tool from the future. The interface is stunning, and the smart albums save me hours of manual organization.",
    initials: "ER",
  },
  {
    name: "David Kim",
    role: "Content Creator",
    content: "I've tried every photo platform out there. Nothing comes close to the premium feel and performance of PIXLORA.",
    initials: "DK",
  },
  {
    name: "Olivia Thompson",
    role: "Wedding Photographer",
    content: "My clients are always blown away when I share their photos using PIXLORA. It makes my brand look so much more expensive.",
    initials: "OT",
  },
];

export const SOCIAL_LINKS = [
  { name: "Twitter", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "GitHub", href: "#" },
];

export const DASHBOARD_NAV: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "QR Generator", href: "/dashboard/qr-generator", icon: "QrCode" },
  { label: "Gallery", href: "/dashboard/gallery", icon: "Image" },
  { label: "Albums", href: "/dashboard/albums", icon: "FolderOpen" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings", isBottom: true },
  { label: "Profile", href: "/dashboard/profile", icon: "User", isBottom: true },
];
