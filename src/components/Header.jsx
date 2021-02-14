import React from "react";

export const Header = ({ credits, bet, won }) => {
    const classes = won ? "color-green" : "";

    return (
        <div>
            <div>Credits: {credits} </div>
            <div>Bet: {bet} </div>
            <div>
                Last spin won: <span className={classes}>{won}</span>
            </div>
        </div>
    );
};
