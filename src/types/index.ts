export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  initials: string;
}

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: string;
  isBottom?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: 'free' | 'pro' | 'enterprise';
}
