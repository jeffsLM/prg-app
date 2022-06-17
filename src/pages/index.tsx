import { Flex, Stack, Box, Heading, Center } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext'

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '../services/Api'

import { Input } from '../components/Form/Input'
import { Logo } from '../components/Design/Logo'
import { Button } from '../components/Design/Button'
import { useState, useContext } from 'react';
import { useRouter } from 'next/router'


type SingInFormData = {
  email: string;
  password: string;
}

const singInFormSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
})

export default function SingIn() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(singInFormSchema)
  })
  const { errors } = formState;


  const { saveCredentials } = useContext(AuthContext)


  const handleSingIn: SubmitHandler<SingInFormData> = async (values) => {

    setIsLoading(true);
    const PR_API_SESSION = api.post('/sessions', {
      email: values.email,
      password: values.password
    })

    toast.promise(
      PR_API_SESSION,
      {
        success: 'Loggin efetuado com sucesso!',
        error: 'Email or password incorrect!'
      }
    )
    PR_API_SESSION.then(({ data }) => {
      saveCredentials({ jwt: data.token, name: data.user.name, email: data.user.email }); 
      setIsLoading(false);
      api.defaults.headers.common.Authorization = "Bearer " + data.token; 
      router.push('/play')
    })
    PR_API_SESSION.catch((e) => setIsLoading(false))
  }

  return (
    <Center pt="10">
      <Flex
        flex="1"
        maxWidth={1440}
        align="center"
        flexDir={["column", "row"]}
        justify="space-around">


        <Flex
          as="form"
          w="100%"
          maxWidth={360}
          bg="blue.700"
          p="8"
          borderRadius={8}
          flexDir="column"
          m={["6", "6"]}
          onSubmit={handleSubmit(handleSingIn)}
        >
          <Stack spacing="4">
            <Logo flexDir="column" fontSize="20" boxSize="100" direction="column" />
            <Input type="text"
              name="email"
              error={errors.email}
              label="Email"
              {...register("email")} />

            <Input type="password"
              name="password"
              error={errors.password}
              label="Password"
              {...register("password")} />
          </Stack>
          <Button type="submit" text="Play" isLoading={isLoading} />
        </Flex>
      </Flex>


    </Center>
  )
}
