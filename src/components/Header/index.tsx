import { Flex, HStack, Text, useBreakpointValue, Link } from '@chakra-ui/react'
import { Logo } from '../Design/Logo'
import { User } from './User'

interface HeaderProps {
    nameModule?: string
}

export function Header({ nameModule }: HeaderProps) {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    return (
        <Flex as="header" justify="space-between" align="center" p="3">
            <HStack spacing="4" >
                <Link href="/selector" style={{ textDecoration: 'none' }}>
                    <Logo
                        flexDir="row"
                        direction="row"
                        p="2"
                        fontSize="sm"
                        boxSize="40px"
                    />
                </Link>
                {nameModule && isWideVersion && <Text>{nameModule}</Text>}
            </HStack>
            <User isWideVersion={isWideVersion} />
        </Flex>
    );
}