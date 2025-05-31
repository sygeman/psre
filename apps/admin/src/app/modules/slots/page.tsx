'use client';

import { AdminLayout } from "@/components/admin-layout";
import dynamic from 'next/dynamic';

const SlotMachine = dynamic(() => import('./components/slot-machine').then(mod => ({ default: mod.SlotMachine })), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center">Загрузка...</div>
});

export default function SlotsPage() {
  return (
    <AdminLayout>
      <div className="h-full">
        <SlotMachine />
      </div>
    </AdminLayout>
  );
} 