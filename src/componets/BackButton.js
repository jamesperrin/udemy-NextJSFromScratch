'use client';

import { useRouter } from 'next/navigation';

export default function BackButton({ buttonText = 'Go Back', titleText = 'Go Back', cssClassName = '' }) {
  const router = useRouter();
  return (
    <button className={`${cssClassName}`} onClick={() => router.back()} title={`${titleText}`}>
      {buttonText}
    </button>
  );
}
