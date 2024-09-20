import React from 'react'
import LoadingSpinner from './LoadingSpinner'

interface LoadingContainerProps {
    isLoading: boolean;
    children: React.ReactNode;
}

function LoadingContainer({ isLoading, children }: LoadingContainerProps) {

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <LoadingSpinner />
            </div>
        );
    }


  return (
    <>
        {children}
    </>
  )
}

export default LoadingContainer
