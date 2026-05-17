'use server';

import { z } from 'zod';

const CheckoutSchema = z.object({
  firstName: z.string().min(1, { message: "กรุณาระบุชื่อ" }),
  lastName: z.string().min(1, { message: "กรุณาระบุนามสกุล" }),
  email: z.string().email({ message: "รูปแบบอีเมลไม่ถูกต้อง" }),
  cardNumber: z.string().min(16, { message: "หมายเลขบัตรเครดิตต้องมีอย่างน้อย 16 หลัก" }),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "รูปแบบวันหมดอายุต้องเป็น MM/YY" }),
  cvc: z.string().min(3, { message: "CVC ต้องมีอย่างน้อย 3 หลัก" }),
});

export type State = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    cardNumber?: string[];
    expiry?: string[];
    cvc?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function processCheckout(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = CheckoutSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    cardNumber: formData.get('cardNumber'),
    expiry: formData.get('expiry'),
    cvc: formData.get('cvc'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'โปรดตรวจสอบข้อมูลให้ครบถ้วนและถูกต้อง',
      success: false,
    };
  }

  // Simulate processing payment (API call)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    success: true,
    message: 'ชำระเงินสำเร็จแล้ว! การจองที่พักของคุณได้รับการยืนยัน',
  };
}
