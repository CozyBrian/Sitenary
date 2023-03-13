import React from "react";
import { Oval } from "react-loader-spinner";

interface ComplicationProps {
  title: string;
  count?: number;
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  isData: boolean;
}

const Complication = ({
  title,
  count,
  children,
  isError,
  isLoading,
  isData,
}: ComplicationProps) => {
  return (
    <div className="complication-container">
      <>
        <div className="complication-header">
          <h2>{title}</h2>
          <h2>{count}</h2>
        </div>
        {isLoading && (
          <div className="loading-container">
            <Oval
              color="#737373"
              secondaryColor="#D7D7D7"
              width={42}
              strokeWidth={4}
            />
          </div>
        )}
        {isError && (
          <div className="loading-container">
            <p>There was an error the data</p>
          </div>
        )}
        {isData && <>{children}</>}
      </>
    </div>
  );
};

export default Complication;
