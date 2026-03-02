import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('common');

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="section-container text-center">
        <h1
          className="text-[8rem] font-extrabold leading-none sm:text-[10rem]"
          style={{ color: 'var(--color-primary-200)' }}
        >
          404
        </h1>

        <h2
          className="mt-4 text-2xl font-bold sm:text-3xl"
          style={{ color: 'var(--color-primary-900)' }}
        >
          {t('notFound')}
        </h2>

        <p
          className="mx-auto mt-4 max-w-md text-lg"
          style={{ color: 'var(--color-neutral-500)' }}
        >
          {t('notFoundDescription')}
        </p>

        <Link
          href="/"
          className="btn-primary mt-8 inline-flex"
        >
          {t('cta.backToHome')}
        </Link>
      </div>
    </section>
  );
}
