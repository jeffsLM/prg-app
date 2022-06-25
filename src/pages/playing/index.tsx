import { Center, Flex, Text, Box, Image, SimpleGrid, Button, useDisclosure } from '@chakra-ui/react'
import { ContentNumberPRG } from '../../components/Design/ContentNumberPRG';
import { ContentTextPRG } from '../../components/Design/ContentTextPRG';
import { api } from '../../services/Api';
import { useEffect, useState, useContext } from 'react'
import { PlayerStatus } from '../../components/PlayerStatus';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import { PrgContentSkillMaker } from '../../components/SkillMaker/PrgContentSkillMaker';
import { ModalTemplate } from '../../components/Design/ModalTemplate';
import { Footer } from '../../components/Footer';


const modelOperation = [
    {
        id: 1,
        value: -10,
        text: "-10"
    },
    {
        id: 2,
        value: -1,
        text: "-1"
    },
    {
        id: 3,
        value: 1,
        text: "+1"
    },
    {
        id: 4,
        value: +10,
        text: "+10"
    },
]

export default function Playing() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [proficiency, SetProficiency] = useState([])
    const [skills, SetSkills] = useState([{
        id_character: null,
        skill: null,
        class_group: null,
        icon: null,
        type: null,
        points: null,
        rules: null,
    }])
    const [dataSelected, SetDataSelected] = useState({
        id_character: null,
        skill: null,
        class_group: null,
        icon: null,
        type: null,
        points: null,
        rules: null,
        id: null,
    })
    const [itens, SetItens] = useState([{
        id_character: null,
        skill: null,
        class_group: null,
        icon: null,
        type: null,
        points: null,
        rules: null,
    }])
    const [character, SetCharacter] = useState({
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
    })


    useEffect(() => {
        controller()
    }, [character])

    useEffect(() => {
        if (!api.defaults.headers.common.Authorization) {
            const cookies = parseCookies()
            api.defaults.headers.common.Authorization = "Bearer " + cookies.jwt;
        }
        GetCharacter()
    }, [])

    function controller() {
        GetProficiency()
        GetItens()
        GetSkills()
    }

    function GetCharacter() {
        const PR_API_LIST_CHARACTER = api.get('/character', {})
        PR_API_LIST_CHARACTER.then(({ data }) => {
            SetCharacter(data)
        }
        )
    }

    function GetProficiency() {
        api.get(`/grimoire/proficiency/${character.id_character}`, {}).then(({ data }) => { SetProficiency(data) })
    }
    function GetItens() {
        api.get(`/grimoire/itens/${character.id_character}`, {}).then(({ data }) => { SetItens(data) })
    }
    function GetSkills() {
        api.get(`/grimoire/skill/${character.id_character}`, {}).then(({ data }) => { SetSkills(data) })
    }


    function handleAlterPoints(value: number, type: string) {
        let ParamCharacter = {
            ...character,
            life_points: type == 'life_points' ? validPositiveOnlyValues(value, character.life_points) : character.life_points,
            mana_points: type == 'mana_points' ? validPositiveOnlyValues(value, character.mana_points) : character.mana_points,
            especial_points: type == 'especial_points' ? validPositiveOnlyValues(value, character.especial_points) : character.especial_points
        }
        api.patch(`/character/update`,
            ParamCharacter
        ).then(({ data }) => {
            SetCharacter(ParamCharacter)
        }).catch(e => toast.error('falha ao se conectar ao servidor'))
    }

    function validPositiveOnlyValues(a: number, b: number) {
        if (a + b <= 0)
            return 0;
        return a + b;
    }

    return (
        <>
            <Center>
                <Flex
                    w="100%"
                    maxWidth={460}
                    p="8"
                    borderRadius={8}
                    flexDir="column"
                    m={["6", "6"]}
                    mb="10"
                >
                    <Flex align="center">
                        <Image src="/images/mage@2x.png" boxSize="3.5rem" alt="IconSelector" />
                        <Box w="80%" ml="5%" align="center">
                            <Text as="h3" align="start">{character.name}</Text>
                            <Text as="h3" fontWeight={200} fontSize="small" align="start">{character.class_group} - {character.sub_class_group} </Text>
                        </Box>
                    </Flex>
                    <Flex direction="column" justify="center" w="100%" mt="4" mb="4" >
                        <Text fontSize="sm">Pontos de vida</Text>
                        <PlayerStatus w="100%" value={character.life_points} maxValue={character.max_life_points} barsCount={30} colorActivate="green.50" colorDesactive="green.800" />
                        <Flex flex="1" w="100%" justify="space-between" mt="2" >{
                            modelOperation.map((e) => <Button variant='outline' key={e.id} colorScheme='white' size='sm' bgColor="blue.800" onClick={(event) => handleAlterPoints(e.value, 'life_points')}> {e.text}</Button>)
                        }
                        </Flex>
                    </Flex>
                    <Flex direction="column" justify="center" w="100%" mt="4" mb="4" >
                        <Text fontSize="sm">Pontos de mana</Text>
                        <PlayerStatus w="100%" value={character.mana_points} maxValue={character.max_mana_points} barsCount={30} colorActivate="blue.300" colorDesactive="blue.800" />
                        <Flex flex="1" w="100%" justify="space-between" mt="2" >{
                            modelOperation.map((e) => <Button variant='outline' key={e.id} colorScheme='white' size='sm' bgColor="blue.800" onClick={(event) => handleAlterPoints(e.value, 'mana_points')}> {e.text}</Button>)
                        }
                        </Flex>
                    </Flex>

                    <Flex direction="column" justify="center" w="100%" mt="4" mb="4" >
                        <Text fontSize="sm">Pontos de esforço</Text>
                        <PlayerStatus w="100%" value={character.especial_points} maxValue={character.max_especial_points} barsCount={30} colorActivate="yellow.400" colorDesactive="yellow.800" />
                        <Flex flex="1" w="100%" justify="space-between" mt="2" >{
                            modelOperation.map((e) => <Button variant='outline' key={e.id} colorScheme='white' size='sm' bgColor="blue.800" onClick={(event) => handleAlterPoints(e.value, 'especial_points')}> {e.text}</Button>)
                        }
                        </Flex>
                    </Flex>
                    <>
                        <Flex mt="4" mb="1">
                            <Text fontSize="sm">Habilidades</Text>
                        </Flex>
                        <PrgContentSkillMaker direction="row">
                            {
                                skills.map((e, i) => {
                                    return <ContentTextPRG onClick={() => { onOpen(), SetDataSelected({ ...e, id: i }) }} key={i} title={e.skill} rules={e.rules} value={e.points} data={e} />
                                })
                            }
                        </PrgContentSkillMaker>
                    </>
                    <>
                        <Flex mt="4" mb="1">
                            <Text fontSize="sm">Pericias</Text>
                        </Flex>
                        <SimpleGrid columns={2} spacingX='10px' spacingY='10px'>
                            {
                                proficiency.map((e, i) => {
                                    return <ContentNumberPRG key={i} title={(e.skill).toLowerCase().charAt(0).toUpperCase() + ((e.skill).slice(1).toLowerCase())} value={e.points} data={e} />
                                })
                            }
                        </SimpleGrid>
                    </>
                    <>
                        <Flex mt="4" mb="1">
                            <Text fontSize="sm">Itens</Text>
                        </Flex>
                        <PrgContentSkillMaker direction="row">
                            {
                                itens.map((e, i) => {
                                    return <ContentTextPRG onClick={() => { onOpen(), SetDataSelected({ ...e, id: i }) }} key={i} title={e.skill} rules={e.rules} value={e.points} data={e} />
                                })
                            }
                        </PrgContentSkillMaker>
                    </>
                </Flex>
                <ModalTemplate isOpen={isOpen} onOpen={onOpen} onClose={onClose} data={dataSelected} />
            </Center>
            <Footer />
        </>
    );
}