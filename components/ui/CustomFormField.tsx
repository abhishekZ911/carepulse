"use client"


import {E164Number} from "libphonenumber-js/core"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "../forms/PatientForm"
import Image from "next/image"
import PhoneInput from "react-phone-number-input/input"
import 'react-phone-number-input/style.css'


interface CustomProps {

    control: Control<any>
    fieldType: FormFieldType
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {

    switch (props.fieldType) {

        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {props.iconSrc && (
                        <Image
                            src={props.iconSrc}
                            height={24}
                            width={24}
                            alt={props.iconAlt || "icon"}
                            className='ml-2'
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={props.placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )

        
        case FormFieldType.PHONE_INPUT: 
        return(
            <div className="flex">
            <FormControl>
                <PhoneInput
                value={field.value as E164Number | undefined}
                onChange={field.onChange}
                defaultCountry='IN'
                placeholder = {props.placeholder}
                international
                className="input-phone w-full"/>
            </FormControl>
            </div>
            
        )


        default:
            break;
    }


}

const CustomFormField = (props: CustomProps) => {


    const {label, control, name } = props
    return (
        <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label ">{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />)

}


export default CustomFormField;