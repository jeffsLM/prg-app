import { Flex, Icon, Text,Link } from '@chakra-ui/react'
import { ElementType } from "react";

interface PrgItemMeetingProps {
    iconLeft?: ElementType
    iconRight?: ElementType
    children: string
    href?: string
}

export function PrgItemController({ iconLeft, iconRight, href = "#", children }: PrgItemMeetingProps) {
    return (
        <Link href={href}  style={{ textDecoration: 'none' }} colorScheme="blue" >
            <Flex
                align="center"
                bg="blue.700"
                justify="space-between"
                borderRadius="full"
                p="4"
                _hover={{
                    cursor: 'pointer',
                    bgGradient:
                        "linear-gradient(257deg, blue.50 0%,blue.900 100%)"
                }}>
                {iconLeft && <Icon as={iconLeft} />}
                <Text ml="2" mr="2" fontSize="15">
                    {children}
                </Text>
                {iconRight && <Icon as={iconRight} />}
            </Flex>
        </Link>
    );
}