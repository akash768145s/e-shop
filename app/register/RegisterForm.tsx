'use client'
import { FieldValues, useForm,SubmitHandler} from "react-hook-form";
import { useCallback, useState } from "react";
import Input from "../components/inputs/Input";
import Heading from "../components/Heading";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import {signIn} from 'next-auth/react';
import { redirect, useRouter } from "next/navigation";


const RegisterForm = () => {
    const[isLoading,setIsLoading]=useState(false);
    const{
        register,
        handleSubmit,
        formState:{errors},
    }=useForm<FieldValues>({
        defaultValues:{
        name:"",
        email:"",
        password:"",
        },
    });
    const router =useRouter();

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);

        axios
        .post("/api/register",data)
        .then(()=>{
            toast.success("Account Created");
            
            signIn("credentials",{
                email:data.email,
                password:data.password,
                redirect:false,
            }).then((callback)=>{
                if(callback?.ok){
                    router.push("/cart");
                    router.refresh();
                    toast.success("Logged In");
                }

                if(callback?.error){
                    toast.error(callback.error);
                }
            });
        })
        .catch(()=>toast.error("Something went Wrong"))
        .finally(()=>{
            setIsLoading(false);
        });
    };
    return ( 
        <>
        <Heading title="Sign Up For E-shop"/>
        <Button
        outline
        label="Sign Up with Google"
        icon={AiOutlineGoogle}
        onClick={()=>{}}/>
        <hr className="bg-slate-300 w-full h-px font-bold text-lg" />

        
        <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
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
        <Button label={isLoading?"Loading":"Sign Up"} onClick={handleSubmit(onSubmit)}/>
        <p className="text-sm">Already have an account?{" "}
        <Link className="underline" href="/login">Login In
        </Link>
        </p>
        </>);

    }
export default RegisterForm;