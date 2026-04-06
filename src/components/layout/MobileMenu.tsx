'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { NAV_LINKS } from '@/lib/constants';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const menuVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    x: '100%',
    transition: {
      type: 'tween',
      duration: 0.25,
      ease: 'easeIn',
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'tween', duration: 0.25 },
  },
  exit: { opacity: 0, x: 40 },
};

export default function MobileMenu({ isOpen, onClose, locale }: MobileMenuProps) {
  const t = useTranslations('common');

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-primary-900/[0.97]"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between px-6 h-16">
              <span className="flex items-center gap-2 font-heading font-bold text-xl text-white">
                <Image
                  src="/images/logo-color.png"
                  alt="GEGET"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
                GEGET
              </span>
              <button
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-6">
              {NAV_LINKS.map((link) => {
                const labelKey = link.labelKey.replace('common.', '');
                const href = `/${locale}${link.href === '/' ? '' : link.href}`;

                return (
                  <motion.div key={link.href} variants={linkVariants}>
                    <Link
                      href={href}
                      onClick={onClose}
                      className="block text-2xl text-white font-heading uppercase tracking-wide hover:text-accent-300 transition-colors duration-200"
                    >
                      {t(labelKey)}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer section */}
            <motion.div
              variants={linkVariants}
              className="px-8 pb-10 flex items-center justify-center"
            >
              <LanguageSwitcher light className="text-base" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
