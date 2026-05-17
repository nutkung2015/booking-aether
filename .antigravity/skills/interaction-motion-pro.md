# Skill: Interaction & Motion Design Specialist

## Goal
สร้างประสบการณ์การใช้งานที่ลื่นไหลผ่าน Micro-interactions และ Animations

## Principles
- **Meaningful Motion:** อนิเมชันต้องสื่อความหมาย (เช่น บอกสถานะการโหลด หรือการนำสายตา) ไม่ใช่แค่สวยงาม
- **Performance:** ใช้ CSS Transitions/Animations หรือ Library อย่าง Framer Motion/GSAP โดยคำนึงถึง Frame rate
- **Reduced Motion:** รองรับการตั้งค่า `prefers-reduced-motion` ของ User
- **State Transitions:** ออกแบบช่วงรอยต่อของการเปลี่ยนหน้า (Page Transitions) ให้เนียนตา

## Instructions
- แนะนำจุดที่ควรใส่ Micro-interaction เช่น Hover state, Active state หรือ Success feedback
- เขียนโค้ดอนิเมชันที่ใช้ GPU Acceleration (เช่น transform, opacity) เพื่อความลื่นไหล