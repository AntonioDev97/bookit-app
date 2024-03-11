"use client"

import React from 'react';
import Header from '../Header';
import CardList from '../CardList';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button } from '@carbon/react';
import { Tour } from '@carbon/icons-react';
import { setNotification } from '@/redux/features/notifications.slice';
import { setTour } from '@/redux/features/settings.slice';
import GuideTour from '../GuideTour';
import { homePageTour } from '@/utils/tourSteps.util';
import './_home.style.scss';

const Home = () => {
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.user);
    const { tour } = useAppSelector((state) => state.settings);
    const breadCrumb = [{ text: 'Home', link: '/' }];
    const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet metus augue. Donec in velit mi. Duis bibendum, ligula venenatis lacinia fermentum, ex libero feugiat mi, et mollis purus enim at ipsum.';
    
    const handleBtnTakeTourClick = () => {
        dispatch(setTour(true)); 
        const btn = document.getElementsByClassName('react-joyride__beacon')[0] as HTMLElement;
        if (btn) btn.click();
    };
    const handleCompleteTour = () => {
        dispatch(setTour(false));
        dispatch(setNotification({
            kind: 'success',
            title: 'You have completed the app tour!',
            subtitle: 'Thank you'
        }));
    };

    return (
        <div id='home'>
            { tour && 
            <GuideTour
                steps={homePageTour}
                onCompleteTour={handleCompleteTour}
                onSkipTour={() => dispatch(setTour(false))}
            />
            }
            <div className="home-header">
                <Header title={`Home Page - Welcome ${isAuthenticated ? user?.name : ''}`} breadCrumb={breadCrumb} />
                <div className="user-info">
                    { !isAuthenticated && <p>Please Sign In to view User Options</p> }
                    <Image
                        alt='user profile'
                        className='user-image'
                        src={`/api/w3images?email=${user?.emailAddress}`}
                        width={60}
                        height={60}
                    />
                </div>
            </div>
            <Button
                size='sm'
                renderIcon={Tour}
                onClick={handleBtnTakeTourClick}
            >
                Take Guided Tour
            </Button>
            <CardList
                className='home-cards'
                items={[
                    {title: 'Title Card 1', description: loremText, href: '#', hrefTarget: 'app'},
                    {title: 'Title Card 2', description: loremText, href: '#', hrefTarget: 'app'},
                    {title: 'Title Card 3', description: loremText, href: '#', hrefTarget: 'app'},
                    {title: 'Title Card 4', description: loremText, href: '#', hrefTarget: 'app'},
                    {title: 'Title Card 5', description: loremText, href: '#', hrefTarget: 'app'},
                    {title: 'Title Card 6', description: loremText, href: '#', hrefTarget: 'app'}
                ]}
            />
        </div>
    );
};

export default Home;