import { Step } from "react-joyride";

export const homePageTour: Step[] = [
    {
        content: <h2>Let's begin our journey!</h2>,
        placement: "center",
        "target": "body"
    },
    {
        target: "#menu-sidenav-container",
        content: "This is the main navbar you can find here the info links and button actions"
    },
    {
        target: ".cds--side-nav__items",
        content: "This is the side navbar manu you can find here the options to navigate through app",
        placement: "right-start"
    },
    {
        target: "#header-section",
        content: "This is the hader section"
    },
    {
        target: ".user-info",
        content: "This is your user picture"
    },
    {
        target: ".card-list",
        content: "This is the cards section"
    },
    {
        target: ".cds--tile:nth-child(1)",
        content: "This is the card number 1"
    },
    {
        target: ".cds--tile:nth-child(2)",
        content: "This is the card number 2"
    },
    {
        target: ".cds--tile:nth-child(3)",
        content: "This is the card number 3"
    },
    {
        target: ".cds--tile:nth-child(4)",
        content: "This is the card number 4"
    },
    {
        target: ".cds--tile:nth-child(5)",
        content: "This is the card number 5"
    },
    {
        target: ".cds--tile:nth-child(6)",
        content: "This is the card number 6"
    }
];