import { Modal as ChakraModal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, UseDisclosureProps, Text, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ModalProps extends UseDisclosureProps {
    TextHeader: string;
    optionTextHeader?: string;
    children: ReactNode;
}

export function Modal({ isOpen, onClose, TextHeader, children,optionTextHeader='' }: ModalProps) {
    return (
        <ChakraModal isOpen={isOpen} size="6xl" onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="blue.700">
                <ModalHeader >
                    <Flex direction="row" align="center">

                        <Text fontSize="19" fontWeight="300">{TextHeader}</Text>

                        <Text fontSize="16" pl="5" fontWeight="100">{optionTextHeader}</Text>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody css={`box-sizing: border-box;`}>
                    {children}
                </ModalBody>
            </ModalContent>
        </ChakraModal>
    )
}