'use client';

import { useActionState } from 'react';
import { processCheckout, State } from '@/app/actions/checkout';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Loader2, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const initialState: State = { message: null, errors: {} };

export default function CheckoutForm() {
  const [state, formAction, isPending] = useActionState(processCheckout, initialState);

  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="glass-panel p-8 md:p-12 w-full max-w-2xl flex flex-col gap-8 text-center items-center justify-center rounded-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle size={64} className="text-acid-lime" />
        </motion.div>
        <h2 className="text-headline-lg-mobile text-primary">จองสำเร็จ!</h2>
        <p className="text-body-md text-on-surface-variant">
          {state.message}
        </p>
        <Link
          href="/"
          className="mt-6 bg-acid-lime text-ink-black text-label-sm py-4 px-8 border border-acid-lime hover:bg-transparent hover:text-acid-lime transition-all duration-300 rounded-sm inline-flex items-center gap-2 font-semibold uppercase tracking-wider"
        >
          <Home size={16} />
          กลับสู่หน้าหลัก
        </Link>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="glass-panel p-8 md:p-12 w-full max-w-2xl flex flex-col gap-10 rounded-lg">
      {state.message && !state.success && (
        <div className="bg-error-container text-on-error p-4 border border-error rounded-md text-sm">
          {state.message}
        </div>
      )}

      {/* Step 1: Identity */}
      <div className="flex flex-col gap-6">
        <h2 className="text-headline-lg-mobile text-primary border-b border-outline-variant/30 pb-4">
          01. ข้อมูลผู้เข้าพัก
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 relative">
            <label className="text-label-sm text-acid-lime" htmlFor="firstName">ชื่อ</label>
            <input
              className={`bg-transparent border-0 border-b ${state.errors?.firstName ? 'border-error' : 'border-outline-variant'} rounded-none px-0 py-3 text-body-md text-primary placeholder:text-on-surface-variant/30 focus:ring-0`}
              id="firstName"
              name="firstName"
              placeholder="JANE"
              type="text"
            />
            {state.errors?.firstName && <span className="text-error text-xs">{state.errors.firstName[0]}</span>}
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="text-label-sm text-acid-lime" htmlFor="lastName">นามสกุล</label>
            <input
              className={`bg-transparent border-0 border-b ${state.errors?.lastName ? 'border-error' : 'border-outline-variant'} rounded-none px-0 py-3 text-body-md text-primary placeholder:text-on-surface-variant/30 focus:ring-0`}
              id="lastName"
              name="lastName"
              placeholder="DOE"
              type="text"
            />
            {state.errors?.lastName && <span className="text-error text-xs">{state.errors.lastName[0]}</span>}
          </div>
        </div>
        <div className="flex flex-col gap-2 relative">
          <label className="text-label-sm text-acid-lime" htmlFor="email">อีเมล</label>
          <input
            className={`bg-transparent border-0 border-b ${state.errors?.email ? 'border-error' : 'border-outline-variant'} rounded-none px-0 py-3 text-body-md text-primary placeholder:text-on-surface-variant/30 focus:ring-0`}
            id="email"
            name="email"
            placeholder="jane.doe@network.net"
            type="email"
          />
          {state.errors?.email && <span className="text-error text-xs">{state.errors.email[0]}</span>}
        </div>
      </div>

      {/* Step 2: Payment */}
      <div className="flex flex-col gap-6">
        <h2 className="text-headline-lg-mobile text-primary border-b border-outline-variant/30 pb-4">
          02. ข้อมูลการชำระเงิน
        </h2>
        <div className="flex flex-col gap-2 relative">
          <label className="text-label-sm text-acid-lime" htmlFor="cardNumber">ข้อมูลบัตรเครดิต</label>
          <div className="relative w-full">
            <input
              className={`w-full bg-transparent border-0 border-b ${state.errors?.cardNumber ? 'border-error' : 'border-outline-variant'} rounded-none px-0 py-3 text-body-md text-primary placeholder:text-on-surface-variant/30 focus:ring-0 tracking-[0.2em]`}
              id="cardNumber"
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              type="text"
            />
          </div>
          {state.errors?.cardNumber && <span className="text-error text-xs">{state.errors.cardNumber[0]}</span>}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 relative">
            <label className="text-label-sm text-acid-lime" htmlFor="expiry">วันหมดอายุ</label>
            <input
              className={`bg-transparent border-0 border-b ${state.errors?.expiry ? 'border-error' : 'border-outline-variant'} rounded-none px-0 py-3 text-body-md text-primary placeholder:text-on-surface-variant/30 focus:ring-0 tracking-[0.1em]`}
              id="expiry"
              name="expiry"
              placeholder="MM/YY"
              type="text"
            />
            {state.errors?.expiry && <span className="text-error text-xs">{state.errors.expiry[0]}</span>}
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="text-label-sm text-acid-lime" htmlFor="cvc">CVC</label>
            <input
              className={`bg-transparent border-0 border-b ${state.errors?.cvc ? 'border-error' : 'border-outline-variant'} rounded-none px-0 py-3 text-body-md text-primary placeholder:text-on-surface-variant/30 focus:ring-0 tracking-[0.1em]`}
              id="cvc"
              name="cvc"
              placeholder="123"
              type="password"
            />
            {state.errors?.cvc && <span className="text-error text-xs">{state.errors.cvc[0]}</span>}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="pt-8">
        <button
          disabled={isPending}
          className="w-full bg-acid-lime text-ink-black py-6 px-8 border border-acid-lime hover:bg-transparent hover:text-acid-lime transition-all duration-300 flex items-center justify-between group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
          type="submit"
        >
          <span className="text-headline-lg-mobile font-bold uppercase">
            {isPending ? 'กำลังประมวลผล...' : 'ดำเนินการชำระเงิน'}
          </span>
          {isPending ? (
            <Loader2 size={28} className="animate-spin" />
          ) : (
            <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
          )}
        </button>
      </div>
    </form>
  );
}
