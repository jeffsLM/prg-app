import { Stack, StackProps } from '@chakra-ui/react'
import { ReactNode } from 'react'


interface PrgContentSkillMakerProps extends StackProps {
    children: ReactNode,

}

export function PrgContentSkillMaker({ children, direction,spacing=4, ...rest }: PrgContentSkillMakerProps) {
    return (
        <Stack
            w="100%"
            direction={direction}
            overflow="auto"
            {...rest}
            spacing={spacing}
            // m="4"
            pb="4"
            pt="4"
            css={{
                '&::-webkit-scrollbar': { width: '4px', height: '8px' },
                '&::-webkit-scrollbar-track': { width: '6px' },
                '&::-webkit-scrollbar-thumb': {
                    background: `rgba(1,24,40,0.7)`,
                    borderRadius: '24px',
                },
            }}
        >
            {children}
        </Stack>
    )
}