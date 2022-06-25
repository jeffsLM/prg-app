import { Flex, Text, Image } from '@chakra-ui/react'

export function Footer() {
    return (
        <Flex as="footer" position="absolute" bottom="0" w="100%" justify="center" direction="row"  mt="30" >
            <Text fontSize="10">
                Powered by
            </Text>
            <Image src="/images/LogoJF.svg" h="8" alt="Jf Labs" />
            <Flex align="end">
                <Text fontSize="10"  >
                    Labs
                </Text>
            </Flex>
        </Flex>
    )
}