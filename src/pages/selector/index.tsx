import { Flex, Center } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from 'react';

import { Header } from '../../components/Header'
import { Card } from '../../components/Card'

import "./styles.module.css";
import { Footer } from '../../components/Footer';

export default function Selector() {
    const sagas = [0, 1, 2, 3]

    // const [Swiper, setSwiper] = useState(null)
    return (
        <>
        <Center>
            <Flex direction="column" flex="1" maxW={1440}>
                <Header nameModule="Seletor" />
                <Flex direction="row">

                    <Swiper slidesPerView={3} spaceBetween={10} centeredSlides={true} pagination={{
                        "clickable": true
                    }}

                    >
                        {
                            sagas.map((v, i) => {
                                return (<SwiperSlide key={i} >
                                    {({ isActive }) => (

                                        <Card hrefEdit="/selector/editor" hrefPlay="/play" itsCompleted={v == 1} isActive={isActive} />
                                    )}
                                </SwiperSlide>)
                            })
                        }
                    </Swiper>
                </Flex>
            </Flex>
        </Center>
        <Footer />
       </>
    );
}