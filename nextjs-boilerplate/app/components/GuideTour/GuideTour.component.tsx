import React from 'react';
import Joyride, { ACTIONS, CallBackProps, LIFECYCLE, STATUS, Step } from 'react-joyride';

interface Props {
    className?: string,
    steps: Step[],
    onCloseTour?: () => void,
    onCompleteTour?: () => void,
    onSkipTour?: () => void
};

const GuideTour = ({
    className,
    steps,
    onCloseTour,
    onCompleteTour,
    onSkipTour
}: Props) => {
    const handleJoyrideCallback = (data: CallBackProps) => {
        const { action, index, origin, status, type, lifecycle }: CallBackProps = data;
        
        if (onCloseTour && action === ACTIONS.CLOSE) onCloseTour();
        if (onSkipTour && action === ACTIONS.SKIP) onSkipTour();
        if (onCompleteTour && action === ACTIONS.NEXT && status === STATUS.FINISHED ) {
            onCompleteTour();
        }
    };

    return (
        <div className={className ? className : ''}>
            <Joyride
                run={true}
                steps={steps}
                continuous
                scrollToFirstStep
                showProgress
                showSkipButton
                callback={handleJoyrideCallback}
                styles={{
                    options: {
                        zIndex: 10000,
                    },
                }}
            />
        </div>
    );
};

export default GuideTour;