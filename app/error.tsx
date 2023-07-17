'use client'

import { useEffect } from 'react';
import EmptyState from './components/EmptyState';

interface ErrorStaeProps {
    error: Error
}

const ErrorState: React.FC<ErrorStaeProps> = ({
    error,
}) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <EmptyState
        title="What's up!"
        subtitle='you know something went wrong'/>
    )
};

export default ErrorState;