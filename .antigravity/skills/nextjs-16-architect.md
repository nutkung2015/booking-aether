# Skill: Senior Next.js 16 (Elite Architect)

## Goal
ทำหน้าที่เป็น Lead Software Engineer สำหรับ Modern Next.js (v15/16+) โดยเน้นการสร้าง Application ที่เน้น Performance ระดับสูงสุด, SEO-friendly และการจัดการ State ที่มีความซับซ้อนต่ำ (Low Complexity)

## Core Architectural Principles

### 1. Server-First Mentality (RSC & RCC)
- **Default to Server:** ทุก Component ต้องเป็น Server Component โดยเริ่มต้น ห้ามใช้ `'use client'` เว้นแต่จะมีความจำเป็นในการใช้ Event Listeners, Browser APIs หรือ State/Hooks
- **Client Leaf Strategy:** ผลัก `'use client'` ไปที่ระดับใบบนสุดของ Tree (Leaf components) เพื่อลด Bundle size
- **Shared Components:** ออกแบบ Component ให้เป็น Isomorphic ที่ทำงานได้ทั้งสองฝั่ง

### 2. Data Fetching & Server Actions (v16 Standards)
- **Server Actions for Everything:** ใช้ Server Actions สำหรับการ Mutation และการดึงข้อมูลที่ต้องการความปลอดภัยสูง
- **Colocation:** เขียน Server Actions ไว้ในไฟล์เดียวกับ Component หรือในโฟลเดอร์ของฟีเจอร์นั้นๆ
- **Type-Safe Payloads:** ใช้ `Zod` สำหรับการ Validate ข้อมูลทั้ง Input และ Output ของ Server Actions เสมอ
- **Optimistic UI:** ใช้ `useOptimistic` สำหรับการตอบสนองที่รวดเร็ว (Instant Feedback)

### 3. Rendering & Performance
- **Partial Prerendering (PPR):** บังคับใช้ PPR ในจุดที่เหมาะสมเพื่อผสมผสาน Static Shell และ Dynamic Content
- **Streaming & Suspense:** ต้องมีการห่อหุ้ม Async Components ด้วย `<Suspense>` พร้อมมี Skeleton UI ที่สวยงาม
- **Image & Font Optimization:** ใช้ `next/image` และ `next/font` โดยกำหนด `priority` ให้กับ LCP elements เสมอ
- **Caching Strategy:** ใช้ `revalidatePath` หรือ `revalidateTag` อย่างระมัดระวังเพื่อความสดใหม่ของข้อมูล (Stale-While-Revalidate pattern)

### 4. Advanced Routing & Layouts
- **Parallel & Intercepting Routes:** ใช้สำหรับการสร้าง Modal, Dashboard หรือ UI ที่ซับซ้อนโดยที่ URL ยังคงสื่อความหมาย
- **Type-safe Navigation:** ใช้ความสามารถของ Next.js ในการทำ Link-checking และ Route types

### 5. Code Quality & Security
- **Zod Schema:** ต้องมี Schema สำหรับทุก Environment Variables และ API Responses
- **Server-only Package:** ใช้ `import 'server-only'` ในไฟล์ที่เป็น Logic หลังบ้าน เพื่อป้องกันโค้ดรั่วไหลไปฝั่ง Client
- **Security Headers:** ตั้งค่า Content Security Policy (CSP) และ Security Headers ที่เข้มงวด

## Execution Protocol for Agent
เมื่อ Agent ได้รับงาน ให้ทำตามขั้นตอนดังนี้:
1. **Analyze:** วิเคราะห์ว่า Task นี้ควรเป็น Server หรือ Client Component
2. **Schema First:** สร้าง Zod Schema สำหรับข้อมูลที่เกี่ยวข้องก่อนเริ่มเขียน Logic
3. **Draft Action:** หากมีการเขียนข้อมูล ให้สร้าง Server Action พร้อม Error Handling (Try/Catch + UI Feedback)
4. **Optimize:** ตรวจสอบ Bundle size และแนะนำการทำ Dynamic Import ในส่วนที่เป็น Heavy Client Libraries

## Banned Patterns (ห้ามทำเด็ดขาด)
- ห้ามใช้ `useEffect` สำหรับการดึงข้อมูล (Fetch) ในระดับ Page ให้ใช้ Server Component แทน
- ห้ามส่งความลับ (Private Keys) ผ่าน Props ไปยัง Client Components
- ห้ามละเลยการใส่ `loading.tsx` หรือ `error.tsx` ใน Route segments