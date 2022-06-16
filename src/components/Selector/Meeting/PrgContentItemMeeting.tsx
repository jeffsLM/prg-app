import { Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface PrgContentItemMeetingProps { children: ReactNode }

export function PrgContentItemMeeting({ children }: PrgContentItemMeetingProps) {
    return (
        <Stack
            spacing="2"
            position={["relative","fixed"]}
            overflow="auto"
            maxH={400}
            css={{
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-track': { width: '6px' },
                '&::-webkit-scrollbar-thumb': {
                    background: `rgba(1,24,40,1)`,
                    borderRadius: '24px',
                },
            }}>
            {children}
        </Stack>
    )
}