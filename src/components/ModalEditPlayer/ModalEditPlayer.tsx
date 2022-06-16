import { useState } from 'react'

import {
    Center,
    Grid,
    GridItem,
    Flex,
    Box,
    Text,
    UseDisclosureProps,
    Tooltip
} from '@chakra-ui/react'

import { PointsControlButton } from '../Design/PointsControlButton'
import { PlayerStatus } from '../PlayerStatus'
import { PrgIcon } from '../Design/PrgIcon'
import { Input } from '../Form/Input'
import { Modal } from '../Modal'
import { PrgItemSkillMaker } from '../../components/SkillMaker/PrgItemSkillMaker'
import { PrgContentSkillMaker } from '../../components/SkillMaker/PrgContentSkillMaker'



export function ModalEditPlayer({ isOpen, onOpen, onClose }: UseDisclosureProps) {

    const [TypeSearch, setTypeSearch] = useState('Conceder Nova Habilidade')
    const sagas = [0, 1, 2, 3]
    return (
        <Modal TextHeader="Ruan Estronossa" optionTextHeader="bardo-necromante" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>

            <Grid
                w="100%"
                templateRows='repeat(4, 1fr)'
                templateColumns='repeat(7, 1fr)'
                gap={5}>
                <GridItem rowSpan={2} colSpan={1} >
                    <Text>Especial points</Text>
                    <Center h="70%" >
                        <PrgIcon points={10} fontSize="55" boxSize='20' p='6' />
                    </Center>
                    <PointsControlButton simple />
                </GridItem>

                <GridItem colSpan={4}>
                    <PlayerStatus
                        value={480}
                        maxValue={550}
                        colorActivate="green.50"
                        colorDesactive="green.800"
                        barsCount={35}
                        h={10} w={10}
                        ml="1" />
                    <PointsControlButton />
                </GridItem>

                <GridItem rowSpan={9} colSpan={2}  >
                    <Box display="block">
                    <Tooltip hasArrow label='Refine a busca clicando no grupo desejado HAB/PERICIAS/ITEMS'>

                        <Input type="text"
                            name="searchItem"
                            label={TypeSearch}
                            placeholder="pesquisar..."
                            
                            />
                            </Tooltip>
                        <PrgContentSkillMaker spacing="8" direction="column" w="100%" minW="150" maxW="700" maxH="700">
                            <PrgItemSkillMaker isEmpty/>
                            <PrgItemSkillMaker title="Olhar Tenebroso" damage="D8 * vida" />

                        </PrgContentSkillMaker>
                    </Box>
                </GridItem>

                <GridItem colSpan={4}>
                    <PlayerStatus
                        value={12}
                        maxValue={12}
                        colorActivate="blue.300"
                        colorDesactive="blue.800"
                        barsCount={35}
                        h={10} w={10}
                        ml="1" />
                    <PointsControlButton />
                </GridItem>
                <GridItem colSpan={5} rowSpan={1} onClick={() => setTypeSearch('Conceder Nova Habilidade')}>
                    <Flex w="100%" direction="column">
                        <Text>
                            Habilidades
                        </Text>
                        <PrgContentSkillMaker spacing="8" direction="row" w="100%" minW="150" maxW="700">
                            <PrgItemSkillMaker isAdded title="Olhar Tenebroso" damage="D8 * vida" />
                            <PrgItemSkillMaker isAdded title="Degular" damage="D20 * Destreza" />
                            <PrgItemSkillMaker isAdded title="Degular" damage="D20 * Destreza" />
                        </PrgContentSkillMaker>
                    </Flex>
                </GridItem>
                <GridItem colSpan={5} rowSpan={1} onClick={() => setTypeSearch('Conceder Nova Pericia')}>
                    <Flex w="100%" direction="column">
                        <Text>
                            Pericias
                        </Text>
                        <PrgContentSkillMaker spacing="8" direction="row" w="100%" minW="150" maxW="700">
                            <PrgItemSkillMaker isAdded title="Percepção" damage="1" />
                            <PrgItemSkillMaker isAdded title="Inteligencia" damage="2" />
                            <PrgItemSkillMaker isAdded title="Destreza" damage="4" />
                        </PrgContentSkillMaker>
                    </Flex>
                </GridItem>
                <GridItem cursor="pointer" colSpan={5} rowSpan={1} onClick={() => setTypeSearch('Conceder Novo Item')}>
                    <Flex w="100%" direction="column">
                        <Text>
                            Inventário
                        </Text>
                        <PrgContentSkillMaker spacing="8" direction="row" w="100%" minW="150" maxW="700">
                            <PrgItemSkillMaker isAdded title="Olhar Tenebroso" damage="D8 * vida" />
                            <PrgItemSkillMaker isAdded title="Degular" damage="D20 * Destreza" />
                            <PrgItemSkillMaker isAdded title="Degular" damage="D20 * Destreza" />
                        </PrgContentSkillMaker>
                    </Flex>
                </GridItem>
            </Grid>
        </Modal>
    );
}