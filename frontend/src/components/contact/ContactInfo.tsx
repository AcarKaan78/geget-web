import React from 'react';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Mail, MapPin, Clock, Instagram, Twitter } from 'lucide-react';

export default function ContactInfo() {
  const t = useTranslations('contact.info');

  return (
    <ScrollReveal direction="right" delay={0.2}>
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-8 lg:p-10 text-white h-full">
        <h3 className="font-heading font-bold text-2xl mb-8">
          {t('title')}
        </h3>

        <div className="space-y-6">
          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-accent-400" />
            </div>
            <div>
              <p className="text-sm text-white/60 font-medium mb-0.5">
                {t('emailLabel')}
              </p>
              <a
                href="mailto:info@geget.org"
                className="text-white hover:text-accent-400 transition-colors font-medium"
              >
                info@geget.org
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-accent-400" />
            </div>
            <div>
              <p className="text-sm text-white/60 font-medium mb-0.5">
                {t('locationLabel')}
              </p>
              <p className="text-white font-medium">
                {t('locationValue')}
              </p>
            </div>
          </div>

          {/* Office hours */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent-400" />
            </div>
            <div>
              <p className="text-sm text-white/60 font-medium mb-0.5">
                {t('hoursLabel')}
              </p>
              <p className="text-white font-medium">
                {t('hoursValue')}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/10" />

        {/* Social media links */}
        <div>
          <h4 className="font-heading font-semibold text-lg mb-4">
            {t('socialTitle')}
          </h4>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/geget"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/geget"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="mailto:info@geget.org"
              aria-label="E-posta"
              className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Decorative element */}
        <div className="mt-8 p-5 bg-white/5 rounded-xl border border-white/10">
          <p className="text-sm text-white/70 leading-relaxed font-body">
            {t('cta')}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
