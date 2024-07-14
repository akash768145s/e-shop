'use client'

import { FieldValues, useForm,SubmitHandler, set } from "react-hook-form";
import { useState } from "react";
import Input from "../components/inputs/Input";
import Heading from "../components/Heading";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const LoginForm = () => {
    const[isLoading,setIsLoading]=useState(false);
    const{
        register,
        handleSubmit,
        formState:{errors},
    }=useForm<FieldValues>({
        defaultValues:{
        email:"",
        password:"",
        },
    });

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);
        console.log(data);
    };
    
    return ( 
        <>
        <Heading title="Sign in To E-shop"/>
        <Button
        outline
        label="Continue with Google"
        icon={AiOutlineGoogle}
        onClick={()=>{}}/>
        <hr className="bg-slate-300 w-full h-px font-bold text-lg" />

        
        
        <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
        />
        <Button label={isLoading?"Loading":"Login"} onClick={handleSubmit(onSubmit)}/>
        <p className="text-sm">Don't have an account?{" "}
        <Link className="underline" href="/register">Sign Up
        </Link>
        </p>
        </>
     );
}

export default LoginForm;