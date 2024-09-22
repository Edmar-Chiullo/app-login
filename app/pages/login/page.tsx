'use client'
import { Form, FormControl, FormField, FormItem, FormMessage, FormDescription, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { createUser } from "@/lib/prisma-script";


const formSchema = z.object({
  login: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }).max(50),
  
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(50),
  
})

export default function Login() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const user = createUser(values)
    user.then((user) => {
        if (user.login) router.push('/')
    })

    form.reset({
      login: '',
      password: ''
    })
  }

  return (
    <div className="flex justify-center items-center h-svh">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-6">
          <h1 className="text-4xl text-center">Create user</h1>
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input placeholder="Login" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full text-lg">Criar user</Button>
        </form>
      </Form>
    </div>
  );
}
