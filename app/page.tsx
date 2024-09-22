'use client'
import { Form, FormControl, FormField, FormItem, FormMessage, FormDescription, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { getUser } from "@/lib/prisma-script";


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
    const user = getUser()

    user.then((users) => {
      users.map(user => {
        if (user.login === values.login) router.push('/pages')
      })
    })

    form.reset({
      login: '',
      password: ''
    })
  }

  return (
    <div className="flex justify-center items-center h-svh">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-8">
          <h1 className="text-4xl text-center">Login</h1>
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
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full text-lg">Entrar</Button>
          <p className="text-center cursor-pointer" onClick={() => {router.push('/pages/login')}}>Create user</p>
        </form>
      </Form>
    </div>
  );
}
