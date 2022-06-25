import {
    Flex,
    Box,
    Center,
    HStack,
    VStack,
    Text,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    PinInput,
    PinInputField,
    useColorMode,
    Textarea,
    DarkMode
} from '@chakra-ui/react'
import {
    Select
} from "chakra-react-select";

import { Input } from '../../../components/Form/Input'
import { Button } from '../../../components/Design/Button'
import { useState, useContext, useEffect } from 'react';
import { PrgIcon } from '../../../components/Design/PrgIcon'
import { api } from '../../../services/Api';
import { parseCookies } from 'nookies';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';


const typeGrimoire = [
    {
        label: "ITEM",
        value: "ITEM"
    }
    , {
        label: "SKILL",
        value: "SKILL"
    }
    , {
        label: "PROFICIENCIA",
        value: "PROFICIENCIA"
    }
]

const class_group = [
    {
        label: "Berserker",
        value: "Berserker"
    }
    , {
        label: "Mago",
        value: "Mago"
    }
    , {
        label: "Bardo",
        value: "Bardo"
    }
    , {
        label: "Necromante",
        value: "Necromante"
    }
    , {
        label: "Ladino",
        value: "Ladino"
    }
]


type SingInFormData = {
    rules: string;
    pointsNewSkill: string;
    name: string;
}
type CreateUserFormData = {
    nameNewUser: string;
    usernameNewUser: string;
    emailNewUser: string;
    passwordNewUser: string;
}

const singInFormSchema = yup.object().shape({
    rules: yup.string().required(),
    pointsNewSkill: yup.string().required(),
    name: yup.string().required(),
})

const newUserFormSchema = yup.object().shape({
    nameNewUser: yup.string().required(),
    usernameNewUser: yup.string().required(),
    emailNewUser: yup.string().required(),
    passwordNewUser: yup.string().required(),
})

export default function Master() {
    const { colorMode, toggleColorMode } = useColorMode()
    const [characterSelected, setCharacterSelected] = useState('')
    const [classSelected, setClassSelected] = useState('')
    const [typeSelected, setTypeSelected] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(singInFormSchema)
    })
    const { register:registerNewuser, handleSubmit : handleSubmitNewUser, formState :formStateNewUser} = useForm({
        resolver: yupResolver(newUserFormSchema)
    })
    const { errors } = formState;
    const { errors: errrosNewUser } = formStateNewUser;
    
    const [Allcharacters, SetAllcharacters] = useState([{
        label: null,
        value: null,
        id_character: null,
        id_user: null,
        name: null,
        class_group: null,
        sub_class_group: null,
        max_life_points: null,
        life_points: null,
        max_mana_points: null,
        mana_points: null,
        max_especial_points: null,
        especial_points: null,
        created_at: null
    }])

    useEffect(() => {
        if (!api.defaults.headers.common.Authorization) {
            const cookies = parseCookies()
            api.defaults.headers.common.Authorization = "Bearer " + cookies.jwt;
        }

        GetCharacter()
    }, [])




    function GetCharacter() {
        const PR_API_LIST_CHARACTERS = api.get('/character/all', {})
        PR_API_LIST_CHARACTERS.then(({ data }) => {

            SetAllcharacters(data.map(e => {
                return { ...e, label: e.name, value: e.id_character };
            }))
        }
        )
    }

    const handleCreateNewPageGrimoire: SubmitHandler<SingInFormData> = async (values) => {
        setIsLoading(true)
        const PR_API_CREATE = api.post(`/grimoire/skill/create`,
            {
                id_character: characterSelected,
                skill: values.name,
                class_group: classSelected,
                icon: '',
                type: typeSelected,
                points: values.pointsNewSkill,
                rules: values.rules
            }
        )

        toast.promise(
            PR_API_CREATE,
            {
                success: 'Nova página criada com sucesso!',
                error: 'Habilidade já existe!'
            }
        )

        PR_API_CREATE.then(({ data }) => {
            setIsLoading(false)
        }).catch(e => {setIsLoading(false)})
    }
    const handleCreateNewUser: SubmitHandler<CreateUserFormData> = async (values) => {
      
        setIsLoading2(true)
        const PR_API_CREATE_USER = api.post(`/users`,
            {
                name:values.nameNewUser,
                username:values.usernameNewUser,
                email:values.emailNewUser,
                password:values.passwordNewUser
            }
        )

        toast.promise(
            PR_API_CREATE_USER,
            {
                success: 'Usuario criado com sucesso!',
                error: 'Usuário já existe!'
            }
        )

        PR_API_CREATE_USER.then(({ data }) => {
            setIsLoading2(false)
        }).catch(e => {setIsLoading2(false)})
    }


    return (
        <Center >

            <Flex

                w="100%"
                maxWidth={460}
                p="8"
                borderRadius={8}
                flexDir="column"
                m={["6", "6"]}
                mb="10"
            >
                <VStack spacing="6">
                    <PrgIcon renderImage src="/images/mage@2x.png" boxSize="4.5rem" alt="IconSelector" />
                    <Box align="center">
                        <Heading as="h3" textAlign="center" size="md">Master Control</Heading>
                        <Button size='sm' text={colorMode == 'dark' ? '🌞' : '🌛'} colorScheme='blue' onClick={toggleColorMode} />
                    </Box>
                    <Accordion defaultIndex={[0]} allowMultiple w="100%">
                        <AccordionItem >
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>Adicionar novas paginas ao grimório
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel>
                                <VStack
                                    spacing="4"
                                    w="100%"
                                    as="form"
                                    onSubmit={handleSubmit(handleCreateNewPageGrimoire)}
                                >
                                    <Box w="100%">
                                        <Text as="h3" size="md">Para qual personagem?</Text>
                                        <Select
                                            placeholder="Selecione..."
                                            onChange={(event) => setCharacterSelected(event.value as string)}
                                            options={Allcharacters}
                                        />
                                    </Box>
                                    <Box w="100%">
                                        <Text as="h3" size="md" >Para qual classe?</Text>
                                        <Select
                                            placeholder="Selecione..."
                                            onChange={(event) => setClassSelected(event.value as string)}
                                            options={class_group}
                                        />
                                    </Box>
                                    <Box w="100%">
                                        <Text as="h3" size="md" >Qual o tipo?</Text>
                                        <Select
                                            placeholder="Selecione..."
                                            onChange={(event) => setTypeSelected(event.value as string)}
                                            options={typeGrimoire}
                                        />
                                    </Box>

                                    <Input name="name" type="text" error={errors.name} label="Defina o que irá nomear:" placeholder="Ex: Raios e trovões" {...register("name")} />
                                    <Input name="pointsNewSkill" type="text" error={errors.pointsNewSkill} label="Defina a pontuação em dados:" placeholder="Ex: d6+ 5*d5" {...register("pointsNewSkill")} />

                                    <Box w="100%">
                                        <Text as="h3" size="md" >Regra:</Text>
                                        <Textarea colorScheme="blue" name="rules" bgColor="blue.900" border="1" placeholder="Regras? para que regras?" {...register("rules")}></Textarea>
                                    </Box>
                                    <Button text='Add nova página' type="submit" w="100%" isLoading={isLoading} />
                                </VStack>
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem >
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>Criar novo usuario
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel>
                                <VStack
                                    spacing="4"
                                    w="100%"
                                    as="form"
                                    onSubmit={handleSubmitNewUser(handleCreateNewUser)}
                                >                              

                                    <Input 
                                        name="nameNewUser" 
                                        type="text" 
                                        error={errrosNewUser.nameNewUser} 
                                        label="Nome:" 
                                        {...registerNewuser("nameNewUser")} />
                                    <Input 
                                        name="usernameNewUser" 
                                        type="text" error={errrosNewUser.usernameNewUser} 
                                        label="Usuario:" 
                                        {...registerNewuser("usernameNewUser")} />
                                    <Input 
                                        name="emailNewUser" 
                                        type="text" error={errrosNewUser.emailNewUser} 
                                        label="E-mail:"                                        
                                        {...registerNewuser("emailNewUser")} />
                                    <Input 
                                        name="passwordNewUser" 
                                        type="password" error={errrosNewUser.passwordNewUser} 
                                        label="Senha:"
                                        {...registerNewuser("passwordNewUser")} />

                                  
                                    <Button text='Criar' type="submit" w="100%" isLoading={isLoading2} />
                                </VStack>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </VStack>
            </Flex>

        </Center>
    )
}