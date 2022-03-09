import React from 'react'
import {
    Banner,
    Card,
    Heading,
    TextContainer,
    TextStyle,
} from "@shopify/polaris";
function Faq_Dashboard() {
    return (
        <div className='faq_dashboard'>

            <div className="conatiner-fluid mt-5">
                <Card>
                    <TextContainer>
                        <div className="Installcode_Banner text-capitalize">
                            <Heading>
                                <div className="mb-2">FAQs</div>
                            </Heading>
                            <Card.Section>
                            <Heading>
                                <div className="mb-2">What will this App do?</div>
                            </Heading>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum repudiandae exercitationem quis facere. At aut officiis, commodi, ex vero aliquam minima laudantium nam ullam explicabo quibusdam porro, a suscipit ipsum! Saepe, voluptatum ratione nisi similique magnam voluptatibus facilis quos tempore nesciunt exercitationem quis! Ex pariatur, corrupti nulla eveniet iure ipsa quidem atque quae alias aperiam eos cumque eum similique rerum iusto. .</p>
                            </Card.Section> 
                            <Card.Section>
                            <Heading>
                                <div className="mb-2">How does this help my shop?</div>
                            </Heading>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum repudiandae exercitationem quis facere. At aut officiis, commodi, ex vero aliquam minima laudantium nam ullam explicabo quibusdam porro, a suscipit ipsum! Saepe, voluptatum ratione nisi similique magnam voluptatibus facilis quos tempore nesciunt exercitationem quis! Ex pariatur, corrupti nulla eveniet iure ipsa quidem atque quae alias aperiam eos cumque eum similique rerum iusto. .</p>
                            </Card.Section> 
                            <Card.Section>
                            <Heading>
                                <div className="mb-2">How do I get support?</div>
                            </Heading>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum repudiandae exercitationem quis facere. At aut officiis, commodi, ex vero aliquam minima laudantium nam ullam explicabo quibusdam porro, a suscipit ipsum! Saepe, voluptatum ratione nisi similique magnam voluptatibus facilis quos tempore nesciunt exercitationem quis! Ex pariatur, corrupti nulla eveniet iure ipsa quidem atque quae alias aperiam eos cumque eum similique rerum iusto. .</p>
                            </Card.Section> 
                        </div>
                    </TextContainer>
                </Card>
            </div>

        </div>
    )
}

export default Faq_Dashboard