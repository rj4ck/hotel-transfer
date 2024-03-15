import React from "react";

interface ILoadingMessageProp {
    message?: string;
    className?: string;
}
const LoadingMessage: React.FC<ILoadingMessageProp> = ({ className, message = "Loading..." }) => {
    return (
        <span className={className}>
            {message}
        </span>
    )
}

export default LoadingMessage
