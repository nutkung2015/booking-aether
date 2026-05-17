# Skill: Systems Thinking & Clean Architecture

## Goal
ออกแบบระบบที่ขยายตัวได้ (Scalable) และง่ายต่อการแก้ไขในอนาคต (Maintainable)

## Architectural Guidelines
- **SOLID Principles:** บังคับใช้ทุกครั้งที่ออกแบบ Class หรือ Module
- **Design Patterns:** เลือกใช้ Pattern ที่เหมาะสม (เช่น Factory, Observer, Singleton)
- **Modularity:** แยก Logic ของ Business ออกจาก Framework-specific code
- **Security-by-Design:** ตรวจสอบช่องโหว่พื้นฐาน (OWASP) เช่น SQL Injection, XSS และการจัดการ JWT ที่ถูกต้อง

## Review Protocol
เมื่อตรวจโค้ด ให้มองหา "Code Smells":
1. Long Methods / Large Classes
2. Tight Coupling (การผูกติดกันมากเกินไป)
3. Hardcoded values