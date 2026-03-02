'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'validation.nameMin')
    .max(255, 'validation.nameMax'),
  email: z
    .string()
    .email('validation.emailInvalid'),
  subject: z
    .string()
    .min(2, 'validation.subjectMin')
    .max(500, 'validation.subjectMax'),
  message: z
    .string()
    .min(10, 'validation.messageMin')
    .max(5000, 'validation.messageMax'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const t = useTranslations('contact');
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setSubmitStatus('success');
      reset();

      // Auto-dismiss success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch {
      setSubmitStatus('error');
      setErrorMessage(t('form.errorMessage'));
    }
  };

  const inputBaseStyles =
    'w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-body';

  const getValidationMessage = (errorMsg: string | undefined): string => {
    if (!errorMsg) return '';
    // If it starts with 'validation.', it's a translation key
    if (errorMsg.startsWith('validation.')) {
      return t(errorMsg);
    }
    return errorMsg;
  };

  return (
    <div>
      {/* Success alert */}
      {submitStatus === 'success' && (
        <div className="mb-6 flex items-start gap-3 rounded-lg bg-green-50 border border-green-200 p-4">
          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-green-800">
              {t('form.successTitle')}
            </p>
            <p className="text-green-700 text-sm mt-1">
              {t('form.successMessage')}
            </p>
          </div>
        </div>
      )}

      {/* Error alert */}
      {submitStatus === 'error' && (
        <div className="mb-6 flex items-start gap-3 rounded-lg bg-red-50 border border-red-200 p-4">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-800">
              {t('form.errorTitle')}
            </p>
            <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Name field */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-semibold text-neutral-700 mb-1.5"
          >
            {t('form.nameLabel')}
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder={t('form.namePlaceholder')}
            className={cn(
              inputBaseStyles,
              errors.name && 'border-red-400 focus:ring-red-500 focus:border-red-500'
            )}
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-600">
              {getValidationMessage(errors.name.message)}
            </p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-semibold text-neutral-700 mb-1.5"
          >
            {t('form.emailLabel')}
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder={t('form.emailPlaceholder')}
            className={cn(
              inputBaseStyles,
              errors.email && 'border-red-400 focus:ring-red-500 focus:border-red-500'
            )}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600">
              {getValidationMessage(errors.email.message)}
            </p>
          )}
        </div>

        {/* Subject field */}
        <div>
          <label
            htmlFor="contact-subject"
            className="block text-sm font-semibold text-neutral-700 mb-1.5"
          >
            {t('form.subjectLabel')}
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder={t('form.subjectPlaceholder')}
            className={cn(
              inputBaseStyles,
              errors.subject && 'border-red-400 focus:ring-red-500 focus:border-red-500'
            )}
            {...register('subject')}
          />
          {errors.subject && (
            <p className="mt-1.5 text-sm text-red-600">
              {getValidationMessage(errors.subject.message)}
            </p>
          )}
        </div>

        {/* Message field */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-semibold text-neutral-700 mb-1.5"
          >
            {t('form.messageLabel')}
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder={t('form.messagePlaceholder')}
            className={cn(
              inputBaseStyles,
              'resize-y min-h-[120px]',
              errors.message && 'border-red-400 focus:ring-red-500 focus:border-red-500'
            )}
            {...register('message')}
          />
          {errors.message && (
            <p className="mt-1.5 text-sm text-red-600">
              {getValidationMessage(errors.message.message)}
            </p>
          )}
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? t('form.submitting') : t('form.submit')}
        </Button>
      </form>
    </div>
  );
}
