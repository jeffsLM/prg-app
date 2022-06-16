import { Flex, Icon, Text,Link } from '@chakra-ui/react'
import { ElementType } from "react";


interface PrgItemMeetingProps {
    icon?: ElementType
    children: string
    href?: string
}

export function PrgItemMeeting({ icon,href= "#", children }: PrgItemMeetingProps) {
    return (
        <Link href={href} style={{ textDecoration: 'none' }}>
            <Flex align="center" p="4" _hover={{
                bgGradient: "linear-gradient(257deg, blue.50 0%,blue.900 100%)",
                cursor: "pointer"
            }}>
                {icon && <Icon as={icon} />}
                <Text>
                    {children}
                </Text>
            </Flex>
        </Link>
    );
}