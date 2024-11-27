import { Phone } from "lucide-react"
import { z } from "zod"



export const UserFormValidation = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    phone: z.string().refine((phone)=> /^(?:\+91)?[6789]\d{9}$/.test(phone), "Invalid phone number")
  })
  