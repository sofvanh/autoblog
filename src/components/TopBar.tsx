'use client';

import Link from 'next/link';
import PersonalizeButton from './PersonalizeButton';

export default function TopBar() {
  return (
    <div className="py-4 bg-gradient-to-r from-green-100 to-teal-200 shadow-sm">
      <div className="px-4 flex flex-row items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-xl bg-clip-text text-emerald-800">
            Sofi's Working Notes
          </Link>
        </div>

        <div className="ml-auto">
          <PersonalizeButton />
        </div>
      </div>
    </div>
  );
}