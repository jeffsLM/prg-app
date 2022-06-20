import { Center, Flex, Text, Box, Image, SimpleGrid, Button, HStack } from '@chakra-ui/react'
import { ContentPRG } from '../../components/Design/ContentPRG';
import { api } from '../../services/Api';
import { useEffect, useState } from 'react'
import { PlayerStatus } from '../../components/PlayerStatus';

type PrgSkillData = {
    id_character: string;
    skill: string;
    class_group: string;
    icon: string;
    type: string;
    points: string;
    rules: string;
}


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
    const [proficiency, SetProficiency] = useState([])
    const [skills, SetSkills] = useState({
        id_character: null,
        skill: null,
        class_group: null,
        icon: null,
        type: null,
        points: null,
        rules: null,
    })
    const [itens, SetItens] = useState({
        id_character: null,
        skill: null,
        class_group: null,
        icon: null,
        type: null,
        points: null,
        rules: null,
    })
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
        if (character.id_character) {
            controller()
        } else {
            const PR_API_LIST_CHARACTER = api.get('/character', {})
            PR_API_LIST_CHARACTER.then(({ data }) => {
                SetCharacter(data)
            }
            )
        }
    }, [character])

    function controller() {
        GetProficiency()
        GetItens()
        GetSkills()
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


    function handleAlterPoints(value:number,type:string){
        api.path(`/character/update`, {
        name: character.name,
      class_group: character.class_group,
      sub_class_group:character.sub_class_group,
      max_life_points:character.max_life_points,
      life_points:,
      max_mana_points:character.max_mana_points,
      mana_points:,
      max_especial_points:character.max_especial_points,
      especial_points:
        }).then(({ data }) => { SetSkills(data) })
    }

    return (
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
                    <PlayerStatus w="100%" value={character.life_points-20} maxValue={character.max_life_points} barsCount={20} colorActivate="green.50" colorDesactive="green.800" />
                    <Flex flex="1" w="100%" justify="space-between" mt="2" >{
                        modelOperation.map((e) => <Button variant='outline' key={e.id} colorScheme='white' size='sm'  bgColor="blue.800" onClick={(event) => handleAlterPoints(e.value,'life_points')}> {e.text}</Button>)
                    }
                    </Flex>
                </Flex>
                <Flex direction="column" justify="center" w="100%" mt="4" mb="4" >
                    <Text fontSize="sm">Pontos de mana</Text>
                    <PlayerStatus w="100%" value={character.mana_points-10} maxValue={character.max_mana_points} barsCount={20} colorActivate="blue.300" colorDesactive="blue.800" />
                    <Flex flex="1" w="100%" justify="space-between" mt="2" >{
                        modelOperation.map((e) => <Button variant='outline' key={e.id} colorScheme='white' size='sm'  bgColor="blue.800" onClick={(event) => handleAlterPoints(e.value,'mana_points')}> {e.text}</Button>)
                    }
                    </Flex>
                </Flex>

                <Flex direction="column" justify="center" w="100%" mt="4" mb="4" >
                    <Text fontSize="sm">Pontos de esforço</Text>
                    <PlayerStatus w="100%" value={character.especial_points-10} maxValue={character.max_especial_points} barsCount={20} colorActivate="yellow.400" colorDesactive="yellow.800" />
                    <Flex flex="1" w="100%" justify="space-between" mt="2" >{
                        modelOperation.map((e) => <Button variant='outline' key={e.id} colorScheme='white' size='sm'  bgColor="blue.800" onClick={(event) => handleAlterPoints(e.value,'especial_points')}> {e.text}</Button>)
                    }
                    </Flex>
                </Flex>


                <>
                    <Flex mt="4" mb="1">
                        <Text fontSize="sm">Pericias</Text>
                    </Flex>
                    <SimpleGrid columns={2} spacingX='10px' spacingY='10px'>
                        {
                            proficiency.map((e, i) => {
                                return <ContentPRG key={i} title={(e.skill).toLowerCase().charAt(0).toUpperCase() + ((e.skill).slice(1).toLowerCase())} value={e.points} data={e} />
                            })
                        }
                    </SimpleGrid>
                </>
            </Flex>
        </Center>
    );
}