import React from "react";

export const ControlPanel = ({ credits, bet, setBet, finalPayout, setFinalPayout, runSpin }) => {
    const handleMaximizeBet = () => {
        let maxBet = credits < 3 ? credits : 3;

        setBet(maxBet);

        runSpin(maxBet);
    };

    const handleSpin = () => {
        runSpin(bet);
    };

    return (
        <form action="#" onSubmit={e => { e.preventDefault() }}>
            <fieldset disabled={finalPayout}>
                <div className="d-flex flex-column">
                    <button
                        onClick={() => {
                            bet < 3 ? setBet(bet + 1) : null;
                        }}
                    >
                        Add 1 Credit to your bet
                    </button>
                    <button onClick={handleMaximizeBet}>Maximize bet</button>
                    <button onClick={handleSpin} disabled={bet === 0}>
                        Spin
                    </button>
                    <div style={{ height: "50px" }}></div>
                    <button
                        onClick={() => {
                            setFinalPayout(true);
                        }}
                    >
                        Payout
                    </button>
                </div>
            </fieldset>
        </form>
    );
};
