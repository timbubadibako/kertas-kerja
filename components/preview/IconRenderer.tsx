'use client';

import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Link as LinkIcon 
} from 'lucide-react';

interface IconRendererProps {
  platform: string;
  className?: string;
  size?: number;
}

export const getPlatformIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('mail') || p.includes('@')) return Mail;
  if (p.includes('phone') || p.includes('tel')) return Phone;
  if (p.includes('address') || p.includes('map') || p.includes('location')) return MapPin;
  if (p.includes('web') || p.includes('portfolio') || p.includes('site')) return Globe;
  return LinkIcon;
};

const IconRenderer: React.FC<IconRendererProps> = ({ platform, className, size = 16 }) => {
  const Icon = getPlatformIcon(platform);
  return <Icon className={className} size={size} />;
};

export default IconRenderer;
