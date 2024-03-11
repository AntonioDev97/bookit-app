import { render, screen } from '@testing-library/react';
import Header from '.';
import '@testing-library/jest-dom';

describe('<Header />', () => {
    const args = {
        title: 'Test title',
        description: 'Test description section',
        breadCrumb: [{ text: 'Home', link: '/' }]
    };

    it('Render Header component', async () => {
        const { container } = render(<Header {...args} />);

        const title = screen.getByText(args.title);
        const description = screen.getByText(args.description);
        const breadCrumb1 = screen.getByText(args.breadCrumb[0].text);
        
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(container.querySelector('nav')).toBeInTheDocument();
        expect(breadCrumb1).toBeInTheDocument();
        expect(container.querySelector('.cds--breadcrumb')).toBeInTheDocument();
    });

    it('Render Header component without description', async () => {
        const { description, ...newArgs } = args;
        const { container } = render(<Header {...newArgs} />);

        const title = screen.getByText(args.title);
        const desc = screen.queryByText(description);
        const breadCrumb1 = screen.getByText(args.breadCrumb[0].text);
        
        expect(title).toBeInTheDocument();
        expect(desc).not.toBeInTheDocument();
        expect(container.querySelector('nav')).toBeInTheDocument();
        expect(breadCrumb1).toBeInTheDocument();
        expect(container.querySelector('.cds--breadcrumb')).toBeInTheDocument();
    });
});