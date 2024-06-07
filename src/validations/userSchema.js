import { z } from "zod";

const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  dateOfBirth: z
    .string()
    .refine((val) => val !== "", { message: "Select a valid date" })
    .refine(
      (val) => {
        const today = new Date();
        const birthDate = new Date(val);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      },
      { message: "You must be at least 18 years old" }
    ),
  address: z.string().min(3, { message: "Address is required" }),
  address2: z.string().optional(),
});

export default userSchema;
