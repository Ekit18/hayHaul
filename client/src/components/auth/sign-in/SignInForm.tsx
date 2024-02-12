import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/lib/hooks/redux';
import { userApi } from '@/store/reducers/user/userApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignInFormValues, useSignInFormSchema } from './validation';

export function SignInForm() {
  const dispatch = useAppDispatch();
  const signInFormSchema = useSignInFormSchema();
  const [login, { isLoading: loginIsLoading }] = userApi.useLoginMutation();

  const form = useForm<SignInFormValues>({
    resolver: yupResolver(signInFormSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    await login(data)
      .unwrap()
      .then((data) => {
        dispatch(userSlice.setUser(data));
      })
      .catch((error) => {
        if (isErrorWithMessage(error)) {
          toast({
            variant: 'destructive',
            title: 'Щось пішло не так',
            description: error.message
          });
        } else if (isFetchBaseQueryError(error)) {
          const errMsg = 'error' in error ? error.error : (error as FetchError).data.message;
          toast({
            variant: 'destructive',
            title: 'Щось пішло не так',
            description: errMsg
          });
        }
      });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="gap-6 mt-6 flex flex-col">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter you password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full hover:bg-secondary" disabled={!form.formState.isValid}>
            Sign in
          </Button>
        </form>
      </Form>
    </>
  );
}
