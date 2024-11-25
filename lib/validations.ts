import { Phone } from "lucide-react"
import { z } from "zod"



export const UserFormValidation = z.object({
    username: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, "Name must be atmost 50 characters."),
    email: z.string().email("Invalid email address."),
    phone: z.string().refine((phone)=> /^(?:\+91)?[6789]\d{9}$/.test(phone), "Invalid phone number")
  })
  