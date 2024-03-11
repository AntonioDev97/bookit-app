import { render, screen } from '@testing-library/react';
import GuideTour from '.';
import { Step } from 'react-joyride';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('<GuideTour />', () => {
    const steps: Step[] = [
        {
            content: <h2>Let&apos;s begin our journey!</h2>,
            placement: "center",
            "target": "body"
        },
        {
            content: <h4>This is an example of the guide tour</h4>,
            placement: "center",
            "target": "body"
        }
    ];

    it('Render Guide Tour', async () => {
        const handleCompleteTour = jest.fn()
        const { container } = render(<GuideTour steps={steps} onCompleteTour={handleCompleteTour}/>);
        
        const beginning = screen.getByText("Let's begin our journey!");
        expect(beginning).toBeInTheDocument();

        await userEvent.click(screen.getByText('Next (1/2)'));
        const secondStep = screen.getByText("This is an example of the guide tour");
        expect(secondStep).toBeInTheDocument();

        await userEvent.click(screen.getByText('Last (2/2)'));
        expect(handleCompleteTour).toHaveBeenCalled();
        expect(container.querySelector('.react-joyride__tooltip')).not.toBeInTheDocument();
    });
});