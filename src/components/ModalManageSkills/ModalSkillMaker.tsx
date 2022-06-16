import { useState } from 'react'
import { Flex, Stack,UseDisclosureProps, SimpleGrid, Select, Text } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { Modal } from '../../components/Modal'
import { Input } from '../../components/Form/Input'
import { Button } from '../../components/Design/Button'
import { PrgTextarea } from '../../components/Selector/PrgTextarea/PrgTextarea'


type SkillMakerFormData = {
    skill: string;
    power: string;
    description: string;
}

const skillMakerFormSquema = yup.object().shape({
    skill: yup.string().required(),
    power: yup.string().required(),
    description: yup.string().required(),

})

interface ModalSkillMakerProps extends UseDisclosureProps{
    typeCreate:string;
}


export function ModalSkillMaker({isOpen,onOpen,onClose,typeCreate ="player"} :ModalSkillMakerProps ){

    const [type, SetType] = useState(typeCreate);


    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(skillMakerFormSquema)
    })
    const { errors } = formState;

    const handleCreteNewItem: SubmitHandler<SkillMakerFormData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        onClose()
        //add validations
    }
    return (
        <Modal TextHeader="" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <Stack as="form" spacing="8" p="2" onSubmit={handleSubmit(handleCreteNewItem)}>
            <Input
                name="skill"
                placeholder="Algo poderoso... talvez?"
                size="lg"
                label="Nome"
                error={errors.skill}
                {...register("skill")} />
            <SimpleGrid columns={2} spacing={10}>
                <Flex
                    w="100%"
                    h="20"
                    bg={type == 'player' ? 'blue.900' : 'gray.700'}
                    color={type == 'player' ? 'whiteAlpha.900' : 'gray.500'}
                    borderRadius="20"
                    justify="center"
                    align="center"
                    _hover={{
                        cursor: 'pointer'
                    }}
                    onClick={() => SetType('player')}>
                    Disponivel para Player
                </Flex>

                <Flex
                    w="100%"
                    h="20"
                    bg={type == 'npc' ? 'blue.900' : 'gray.700'}
                    color={type == 'npc' ? 'whiteAlpha.900' : 'gray.500'}
                    borderRadius="20"
                    justify="center"
                    align="center"
                    _hover={{
                        cursor: 'pointer'
                    }}
                    onClick={() => SetType('npc')}>
                    Disponivel para NPC
                </Flex>

                <Input
                    name="power"
                    placeholder="D20 * Destreza"
                    size="lg"
                    label="Dados/Pontuação"
                    error={errors.power}
                    {...register("power")} />

                <Flex direction="column" flex="1" justify="space-between">
                    <Text >Classe</Text>
                    <Select
                        name="class"
                        bg="blue.900"
                        borderColor="blue.900"
                        disabled={type == 'npc'}
                        _hover={{ borderColor: 'blue.900' }}
                    >
                        <option style={{ background: "#051828" }} value="option1">Option 1</option>
                        <option style={{ background: "#051828" }} value="option2">Option 2</option>
                        <option style={{ background: "#051828" }} value="option3">Option 3</option>
                    </Select>
                </Flex>
            </SimpleGrid >

            <Flex direction="column" justify="space-between" flex="1">
                <Text>
                    Regras/Descrição
                </Text>
                <PrgTextarea h="150" placeholder="Regras? pra quê regras?" name="description" error={errors.description}   {...register("description")} />
            </Flex>
            <Button type="submit" text="Salvar" w="100%" isLoading={formState.isSubmitting} />
        </Stack>
    </Modal>
    )
}