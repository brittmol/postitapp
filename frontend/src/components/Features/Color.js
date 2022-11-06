import React, { useState, useEffect } from "react";


export default function Color() {
    const [inColorMode, setInColorMode] = useState(false)

    return (
        <>
            <button onClick={() => setInColorMode(true)}>Color</button>
            {inColorMode && (
                <div>
                    <button></button>
                </div>
            )}
        </>
    )
}
