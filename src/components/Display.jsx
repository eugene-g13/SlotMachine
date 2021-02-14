import React, { useState, useEffect } from "react";

export const Display = props => {
    const [spinners, setSpinners] = useState(props.spinners);

    useEffect(() => {
        setSpinners(props.spinners);
    }, [props.spinners]);

    return (
        <div className="spins">
            {spinners &&
                spinners.map((el, index) => {
                    return <div key={index} className={`image image-${el.loading ? "loading" : el.itemShown}`}></div>;
                })}
        </div>
    );
};
