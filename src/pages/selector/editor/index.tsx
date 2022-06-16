import { Flex, Box, Stack, VStack, Center, useDisclosure, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { BsPlus } from 'react-icons/bs'
import { FaAngleDoubleRight } from 'react-icons/fa'

import { Modal } from '../../../components/Modal'
import { BarsStatus } from '../../../components/BarsStatus/BarsStatus'
import { Header } from '../../../components/Header'
import { Button } from '../../../components/Design/Button'
import { Input } from '../../../components/Form/Input'
import { PrgItemMeeting } from '../../../components/Selector/Meeting/PrgItemMeeting'
import { PrgContentItemMeeting } from '../../../components/Selector/Meeting/PrgContentItemMeeting'
import { PrgItemController } from '../../../components/Selector/Controller/PrgItemController'
import { PrgTextarea } from '../../../components/Selector/PrgTextarea/PrgTextarea'
import { PrgItemSkillMaker } from '../../../components/SkillMaker/PrgItemSkillMaker'
import { PrgContentSkillMaker } from '../../../components/SkillMaker/PrgContentSkillMaker'


export default function SagaEditor() {

    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isJoinOpen, onOpen: onJoinOpen, onClose: onJoinClose } = useDisclosure()

    return (
        <>
            <Center>
                <Box h="100%" maxW={1440} w="100%" >
                    <Header nameModule="Elysium Saga's" />
                    <Flex w="100%" direction={["column", "row"]} mt="10">
                        <PrgContentItemMeeting>
                            <PrgItemMeeting>
                                Início campanha
                            </PrgItemMeeting>
                            <PrgItemMeeting icon={BsPlus}>
                                Add novo encontro
                            </PrgItemMeeting>
                        </PrgContentItemMeeting>

                        <VStack flex="1" p="4" justify="center"  ml={["0","190"]}>
                            <Flex
                                h="200"
                                w="100%"
                                bg="blue.900"
                                align="center"
                                justify="center"
                                onClick={onEditOpen}
                                _hover={{ cursor: 'pointer' }}
                            >
                                Clique para vincular a história
                            </Flex>
                            <Flex
                                h="20"
                                w="60%"
                                bg="blue.900"
                                align="center"
                                justify="center"
                                onClick={onJoinOpen}
                                _hover={{ cursor: 'pointer' }}
                            >
                                Vincular Encontro
                            </Flex>

                        </VStack>

                        <Stack
                            spacing="8"
                            minHeight="200"
                            overflow="auto">
                            <PrgItemController iconRight={FaAngleDoubleRight} href="./editor/skillMaker">
                                Habilidades e Pericias
                            </PrgItemController>
                            <PrgItemController iconRight={FaAngleDoubleRight} href="./editor/player">
                                Players Config
                            </PrgItemController>
                        </Stack>
                    </Flex>
                </Box>
            </Center>

            <Modal TextHeader="Editor Saga's" isOpen={isEditOpen} onOpen={onEditOpen} onClose={onEditClose}>
                <VStack flex="1" p="4" justify="center">
                    <PrgTextarea
                        h="20"
                        placeholder="Titulo do encontro"
                        fontSize="30" />
                    <PrgTextarea
                        h="300"
                        placeholder="Humm algo interresante está saindo..." />
                    <Button text="Salvar" w="70%" />
                </VStack>
            </Modal>

            <Modal TextHeader="Meet Link" isOpen={isJoinOpen} onOpen={onJoinOpen} onClose={onJoinClose}>
                <Flex direction="row">
                    <VStack w="100%" p="5" spacing="4" >
                        <BarsStatus w="100%" Label="Vida" />

                        <Flex w="100%" direction="column">
                            <Text>
                                Habilidades
                            </Text>
                            <PrgContentSkillMaker spacing="8" direction="row" w="100%" minW="150" maxW="700">
                                <PrgItemSkillMaker title="Olhar Tenebroso" damage="D8 * vida" />
                                <PrgItemSkillMaker title="Degular" damage="D20 * Destreza" />
                                <PrgItemSkillMaker title="Degular" damage="D20 * Destreza" />
                            </PrgContentSkillMaker>
                        </Flex>

                        <PrgTextarea
                            h="200"
                            placeholder="Descrição sobre o inimigo" />
                        <PrgTextarea
                            h="20"
                            placeholder="Drops..." />
                            
                    </VStack>

                    <VStack minW="30%" p="4" spacing="6">
                        <Input name="search" label="Itens" type="text" placeholder="pesquisar" />
                        <PrgContentSkillMaker spacing="4" direction="column" w="100%" minW="150" maxW="700">
                            <PrgItemSkillMaker title="Olhar Tenebroso" damage="D8 * vida" />
                            <PrgItemSkillMaker title="Degular" damage="D20 * Destreza" />
                            <PrgItemSkillMaker title="Degular" damage="D20 * Destreza" />
                        </PrgContentSkillMaker>
                    </VStack>
                </Flex>
            </Modal>

        </>
    )
}