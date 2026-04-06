'use client';

import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { WEB3FORMS_ACCESS_KEY } from '@/lib/constants';
import { cn } from '@/lib/utils';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<FormStatus>('idle');

  const schema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(1, t('form.validation.nameRequired'))
          .min(2, t('form.validation.nameMin')),
        email: z
          .string()
          .min(1, t('form.validation.emailRequired'))
          .email(t('form.validation.emailInvalid')),
        subject: z
          .string()
          .min(1, t('form.validation.subjectRequired'))
          .min(3, t('form.validation.subjectMin')),
        message: z
          .string()
          .min(1, t('form.validation.messageRequired'))
          .min(10, t('form.validation.messageMin')),
      }),
    [t]
  );

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[GEGET İletişim] ${data.subject}`,
          from_name: data.name,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClasses =
    'w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition font-body';

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <p className="text-neutral-700 text-lg font-medium max-w-sm">
            {t('form.success')}
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-6 text-primary-500 hover:text-primary-600 text-sm font-medium underline underline-offset-2 transition"
          >
            {t('form.title')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
      <h3 className="font-heading font-semibold text-xl mb-6 text-neutral-900">
        {t('form.title')}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            {t('form.name')}
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder={t('form.namePlaceholder')}
            className={cn(inputClasses, errors.name && 'border-red-400 focus:border-red-500 focus:ring-red-500/20')}
            {...register('name')}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 animate-in fade-in duration-200">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            {t('form.email')}
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder={t('form.emailPlaceholder')}
            className={cn(inputClasses, errors.email && 'border-red-400 focus:border-red-500 focus:ring-red-500/20')}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 animate-in fade-in duration-200">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="contact-subject"
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            {t('form.subject')}
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder={t('form.subjectPlaceholder')}
            className={cn(inputClasses, errors.subject && 'border-red-400 focus:border-red-500 focus:ring-red-500/20')}
            {...register('subject')}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1 animate-in fade-in duration-200">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            {t('form.message')}
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder={t('form.messagePlaceholder')}
            className={cn(inputClasses, 'resize-none', errors.message && 'border-red-400 focus:border-red-500 focus:ring-red-500/20')}
            {...register('message')}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1 animate-in fade-in duration-200">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Error banner */}
        {status === 'error' && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-600 text-sm">{t('form.error')}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className={cn(
            'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition',
            status === 'loading'
              ? 'bg-primary-400 cursor-not-allowed'
              : 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700'
          )}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t('form.sending')}
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              {t('form.submit')}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
