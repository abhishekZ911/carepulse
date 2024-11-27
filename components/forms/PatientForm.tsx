"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../ui/CustomFormField"
import SubmitButton from "../ui/submitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validations"
import { User } from "lucide-react"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { log } from "console"
import 'dotenv/config'


export enum FormFieldType{
  INPUT = 'input',
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker", 
  SELECT = 'select',
  SKELETON = "skeleton"
}

export function PatientForm() {


  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  console.log(process.env.PROJECT_ID)

  // 2. Define a submit handler.

  
  const onSubmit = async ({name, email, phone}: z.infer<typeof UserFormValidation>) => {
    console.log(isLoading)
    // setIsLoading(true);
    const userData = {
      name: name,
      email: email,
      phone: phone
    }
    try {
      
      

      console.log(userData)
    
      const newUser = await createUser(userData) 
      console.log(userData)
      
      if (!newUser) throw Error;
      

      if(newUser) {
        router.push(`/patients/${newUser.$id}`)
    setIsLoading(false);

      }
    } catch (error) {
      console.log(error);
    }
    
  }

  const onInvalid = (errors: any) => console.error(errors)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        

        <CustomFormField
        control={ form.control}
        fieldType={FormFieldType.INPUT}
        name="name"
        label="Full name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        />

        <CustomFormField
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="email"
        label="Email"
        placeholder="abc@email.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
        />

        <CustomFormField
        control={form.control}
        fieldType={FormFieldType.PHONE_INPUT}
        name="phone"
        label="Phone Number"
        placeholder="+91 912345678"
        iconSrc="/assets/icons/phone.svg"
        iconAlt="phone"
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}


export default PatientForm;