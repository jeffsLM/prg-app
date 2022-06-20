import { Center, Flex, Heading, Text, Box, Image } from '@chakra-ui/react'
import { ContentPRG } from '../../components/Design/ContentPRG';
import { PrgIcon } from '../../components/Design/PrgIcon';
import { PrgContentSkillMaker } from '../../components/SkillMaker/PrgContentSkillMaker';
import { PrgItemSkillMaker } from '../../components/SkillMaker/PrgItemSkillMaker';

export default function Playing() {
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
                <Flex>
                    <Image renderImage src="/images/mage@2x.png" boxSize="3.5rem" alt="IconSelector" />
                    <Box w="80%" ml="5%">
                        <Text as="h3">Player</Text>
                        <Text as="h3">Bardo - Necromante</Text>
                    </Box>
                </Flex>
                <PrgContentSkillMaker spacing="4" direction="row" w="100%" minW="150" maxW="700">
                            <ContentPRG />
                       
                </PrgContentSkillMaker>
            </Flex>
        </Center>
    );
}