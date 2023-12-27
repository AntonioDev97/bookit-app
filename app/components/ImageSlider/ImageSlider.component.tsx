import { IRImages } from '@/backend/models/room.model';
import Image from 'next/image';
import React from 'react'
import { Carousel, CarouselItem } from 'react-bootstrap';
import img_default from '@/public/images/default_room_image.jpg';
import './_imageSlider.style.css';

interface IProps {
    images: IRImages[]
}

const ImageSlider = ({ images }: IProps) => {
  return (
    <Carousel>
        {images?.length > 0 ? 
        images.map(img => 
            <CarouselItem key={img.public_id}> 
                <div className="carousel-image">
                    <Image
                        className='d-block m-auto'
                        src={img.url}
                        alt={'carousel-image'}
                        layout='fill'
                    /> 
                </div>
            </CarouselItem>
        )
        : 
        <CarouselItem> 
            <div className="carousel-image">
                <Image
                    className='d-block m-auto'
                    src={img_default}
                    alt={'carousel-image'}
                    layout='fill'
                /> 
            </div>
        </CarouselItem> 
        }
    </Carousel>
  );
}

export default ImageSlider;