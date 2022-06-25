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
    useColorMode 
} from '@chakra-ui/react'
import {
    Select
} from "chakra-react-select";
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

import { api } from '../../services/Api'

import { Input } from '../../components/Form/Input'
import { Button } from '../../components/Design/Button'
import { useState, useContext, useEffect } from 'react';
import { PrgIcon } from '../../components/Design/PrgIcon'


import "./styles.module.css";
import infoClass from "./info.json";
import { Footer } from '../../components/Footer';

type SingInFormData = {
    nameCharacter: string;
    forca: number;
    destreza: number;
    inteligencia: number;
    defesa: number;
    mana_points: number;
    life_points: number;
}

type PrgSkillData = {
    id_character: string;
    skill: string;
    class_group: string;
    icon: string;
    type: string;
    points: string;
    rules: string;
}


const singInFormSchema = yup.object().shape({
    forca: yup.number().integer().required(),
    destreza: yup.number().integer().required(),
    inteligencia: yup.number().integer().required(),
    defesa: yup.number().integer().required(),
    nameCharacter: yup.string().required(),
    mana_points: yup.string().required(),
    life_points: yup.string().required(),
})


export default function Character() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [idCharacter, setIdCharacter] = useState('')
    const [classSelected, setClassSelected] = useState('')
    const [subClassSelected, setSubClassSelected] = useState('')

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(singInFormSchema)
    })
    const { errors } = formState;
    const { colorMode, toggleColorMode } = useColorMode(); 



    const handleCreateChararcter: SubmitHandler<SingInFormData> = async (values) => {

        if (((classSelected || subClassSelected) == '') || (values.destreza + values.forca + values.defesa + values.inteligencia > 6)) {
            toast.error(values.destreza + values.forca + values.defesa + values.inteligencia > 6 ? "Verifique a distribuição de pontos de perícia - limite extrapolado! " :"Selecione uma classe e sub-classe!")
        } else {
            setIsLoading(true);
            const PR_API_CREATE_CHARACTER = api.post('/character/create', {
                name: values.nameCharacter,
                class_group: classSelected.split('/')[0],
                sub_class_group: subClassSelected.split('/')[0],
                max_life_points: values.life_points,
                life_points: values.life_points,
                max_mana_points: values.mana_points,
                mana_points: values.mana_points,
                max_especial_points: classSelected.split('/')[1],
                especial_points: classSelected.split('/')[1]
            })

            toast.promise(
                PR_API_CREATE_CHARACTER,
                {
                    success: 'Personagem criado com sucesso!',
                    error: 'Erro ao criar personagem!'
                }
            )
            PR_API_CREATE_CHARACTER.then(({ data }) => {

                setIsLoading(false);
                handleCreatePointsCharacter(values)
                router.push('/character')
            })
            PR_API_CREATE_CHARACTER.catch((e) => setIsLoading(false))
        }

    }

    async function handleCreatePointsCharacter(values: SingInFormData) {
        let id_character: string;

        const PR_GET_ID_CHARARCTER = api.get('/character', {});
        PR_GET_ID_CHARARCTER.then(({ data }) => {
            id_character = data.id_character


            const PR_CREATE_SKILL_DEFESA = api.post('/grimoire/skill/create', {
                id_character: id_character,
                skill: 'DEFESA',
                class_group: classSelected.split('/')[0],
                icon: '',
                type: 'PROFICIENCIA',
                points: values.defesa,
                rules: '-'
            });
            const PR_CREATE_SKILL_FORCA = api.post('/grimoire/skill/create', {
                id_character: id_character,
                skill: 'FORCA',
                class_group: classSelected.split('/')[0],
                icon: '',
                type: 'PROFICIENCIA',
                points: values.forca,
                rules: '-'
            });

            const PR_CREATE_SKILL_INTELIGENCIA = api.post('/grimoire/skill/create', {
                id_character: id_character,
                skill: 'INTELIGÊNCIA',
                class_group: classSelected.split('/')[0],
                icon: '',
                type: 'PROFICIENCIA',
                points: values.inteligencia,
                rules: '-'
            });

            const PR_CREATE_SKILL_DESTREZA = api.post('/grimoire/skill/create', {
                id_character: id_character,
                skill: 'DESTREZA',
                class_group: classSelected.split('/')[0],
                icon: '',
                type: 'PROFICIENCIA',
                points: values.destreza,
                rules: '-'
            });
            PR_CREATE_SKILL_DESTREZA.then((e) => router.push('/playing'))
        })

    }

    return (
        <>
        <Center >
            <Flex
                as="form"
                w="100%"
                maxWidth={460}
                p="8"
                borderRadius={8}
                flexDir="column"
                m={["6", "6"]}
                mb="10"
                onSubmit={handleSubmit(handleCreateChararcter)}>
                <VStack spacing="6">
                    <Center> <Button size='sm' text={colorMode == 'dark' ? '☀' : '🌛'} colorScheme='blue' onClick={toggleColorMode}/> </Center>
                    <PrgIcon renderImage src="/images/mage@2x.png" boxSize="4.5rem" alt="IconSelector" />
                    <Box>
                        <Heading as="h3" textAlign="center" size="md">Elysium te aguarda,</Heading>
                        <Text textAlign="center" size="md">mas antes...</Text>
                    </Box>
                    <Input name="nameCharacter" type="text" label="Todo aventureiro precisa de uma nome:" error={errors.nameCharacter} placeholder="Qual o seu?" {...register("nameCharacter")} />
                    <Accordion defaultIndex={[0]} allowMultiple w="100%">
                        <AccordionItem >
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>Estilo de Luta
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel>
                                <Text as="h3" size="md" mb="2">Qual sua classe?</Text>
                                <Select
                                    placeholder="Selecione..."
                                    onChange={(event) => setClassSelected(event.value as string)}
                                    options={infoClass}

                                />
                                <Text as="h3" size="md" mb="2" mt="4">Aqui somos mais fortes!<br /> Defina também sua sub-classe:</Text>
                                <Select
                                    placeholder="Selecione..."
                                    onChange={(event) => setSubClassSelected(event.value as string)}
                                    options={infoClass}

                                />
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        Todos tem alguma perícia, quais são as suas?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <VStack>
                                    <Text color="red.200">
                                        Distribua 6 pontos em suas perícias
                                    </Text>
                                    <Flex align="center" justify="space-between" w="100%">
                                        <Text>
                                            Força
                                        </Text>
                                        <PinInput type='alphanumeric' errorBorderColor="red.500" isInvalid={errors.forca} >
                                            <PinInputField  {...register("forca")} />
                                        </PinInput>
                                    </Flex>
                                    <Flex align="center" justify="space-between" w="100%">
                                        <Text>
                                            Destreza
                                        </Text>
                                        <PinInput type='alphanumeric' errorBorderColor="red.500" isInvalid={errors.destreza}>
                                            <PinInputField   {...register("destreza")} />
                                        </PinInput>
                                    </Flex>
                                    <Flex align="center" justify="space-between" w="100%">
                                        <Text>
                                            Defesa
                                        </Text>
                                        <PinInput type='alphanumeric' errorBorderColor="red.500" isInvalid={errors.defesa}>
                                            <PinInputField    {...register("defesa")} />
                                        </PinInput>
                                    </Flex>
                                    <Flex align="center" justify="space-between" w="100%">
                                        <Text>
                                            Inteligência
                                        </Text>
                                        <PinInput type='alphanumeric' errorBorderColor="red.500" isInvalid={errors.defesa}>
                                            <PinInputField   {...register("inteligencia")} />
                                        </PinInput>
                                    </Flex>
                                </VStack>
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem >
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>Status Gerais
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel>
                                <Text as="h3" align="center" color="red.200" size="md" mb="6">Que a sorte esteja lançada!</Text>
                                <Input name="life_points" type="text" label="Jogue 2 dados de D100 e defina sua vida:" error={errors.life_points} placeholder="Qual foi o resultado?" {...register("life_points")} />
                                <Input name="mana_points" type="text" label="Jogue 3 dados de D20 e defina sua mana:" error={errors.mana_points} placeholder="Qual o seu?" {...register("mana_points")} />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                 
                </VStack>          
                <Button type="submit" text="Play" isLoading={isLoading} />
            </Flex>
        </Center >
        <Footer/>
        </>
    )
}