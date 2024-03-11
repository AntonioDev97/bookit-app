"use client"
import React from 'react'
import { ClickableTile } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import './_cardList.style.scss';

interface CardItem {
    title: string,
    description: string,
    href: string,
    hrefTarget: string
    image?: string
}
interface Props {
    items: CardItem[],
    className?: string
}

const CardList = ({ items, className }: Props) => {
    const router = useRouter();
    const { theme } = useAppSelector((state) => state.settings);
    // functions to handle component behavior.
    const handleNavigation = (targetLink: string, hrefLink: string) => {
        if (targetLink === '_blank') window.open(hrefLink, "_blank");
        else router.push(hrefLink);
    };
    // return computed component.
    return (
        <div className={`card-list ${className ? className : ''}`}>
            {items.map((item: CardItem) =>
                <ClickableTile
                    key={`ct-${item.title}`}
                    className={`card-item ${theme !== 'white' ? 'shadow-white' : ''}`}
                    onClick={() => handleNavigation(item.hrefTarget, item.href)}
                >
                    <h4>{item.title}</h4>
                    <p style={{ textAlign: 'justify', margin: '1.5rem 0' }}>
                        {item.description}
                    </p>
                    <ArrowRight size={20} />
                </ClickableTile>
            )}
        </div>
    );
};

export default CardList;