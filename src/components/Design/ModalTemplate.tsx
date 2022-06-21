
import {
    UseDisclosureProps,
    Text,
    Heading,
    Badge,
    Center
} from '@chakra-ui/react'

import { Modal } from '../Modal'
import { PrgTextarea } from '../Selector/PrgTextarea/PrgTextarea';

interface ModalProps extends UseDisclosureProps {
    data: {
        id_character: string;
        skill: string;
        class_group: string;
        icon: string;
        type: string;
        points: number;
        rules: string;
        id: number;
    }
}

export function ModalTemplate({ isOpen, onOpen, onClose, data }: ModalProps) {

    return (
        <Modal TextHeader={""} size="xl" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <Heading align="center" size="md" >{data.skill}</Heading>
            <Center>
                <Badge align="center" colorScheme={data.id % 2 == 0 ? 'yellow' : 'cyan'}>{data.class_group}</Badge>
            </Center>
            <Text>Regras</Text>
            <PrgTextarea h="150" placeholder="Regras? pra quê regras?" value={data.rules} mb="4" name="description" />
            <Text>Dados:</Text>
            <PrgTextarea h="50" placeholder="Dados? fraco!" value={data.points} mb="4" name="description" />
        </Modal>
    );
}