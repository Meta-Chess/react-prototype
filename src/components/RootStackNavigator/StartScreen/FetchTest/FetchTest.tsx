import React, { FC } from "react";
import { Text } from "primitives";
import { useGetTestData } from "./useGetTestData";
import { Button } from "ui";

// EXAMPLE COMPONENT - TODO: REMOVE
export const FetchTest: FC = () => {
  const { data, socket } = useGetTestData();

  return (
    <>
      <Text cat={"BodyL"}>
        {data?.count?.toString() || "Have you started the server?"}
      </Text>
      <Button
        onPress={(): void => {
          socket?.emit("IncrementCount", 1);
        }}
        text={"++"}
      />
    </>
  );
};
