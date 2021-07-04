import React, { useCallback } from "react";
import { View } from "react-native";
import { SFC, Colors } from "primitives";
import { defaultGameOptions } from "game";
import { ItemContainer } from "components/RootStackNavigator/VariantSelectScreen/Modals/shared";
import { ModalProps, ModalTemplate } from "../shared";
import { LabelWithDetails } from "ui/LabelWithDetails";
import { FormatName, formats } from "game/formats";
import { FormatIcon } from "components/shared";
import { keys } from "utilities";

export const FormatModal: SFC<ModalProps> = ({
  setModalInfo,
  gameOptions,
  setGameOptions,
  style,
}) => {
  const formatNames = keys(formats);
  const setFormat = useCallback(
    (format: FormatName): void => setGameOptions({ ...gameOptions, format }),
    [gameOptions, setGameOptions]
  );

  return (
    <ModalTemplate
      title={"Format - " + formats[gameOptions.format].title}
      titleComponent={<FormatIcon format={gameOptions.format} />}
      reset={(): void => {
        setGameOptions({ ...gameOptions, format: defaultGameOptions.format });
      }}
      done={(): void => {
        setModalInfo({ type: undefined });
      }}
      priority={"primary"}
      style={[style, { height: "100%" }]}
    >
      <View style={{ flex: 1 }}>
        <ItemContainer
          bottomFooter={true}
          style={{ flexDirection: "row", flexWrap: "wrap" }}
        >
          {formatNames.map((formatName) => {
            return (
              <LabelWithDetails
                label={formats[formatName].title}
                details={formats[formatName].description}
                key={formats[formatName].title}
                color={Colors.MCHESS_ORANGE}
                textCat={"BodyXS"}
                selected={formatName === gameOptions.format}
                onPress={(): void => setFormat(formatName)}
                noHover={true}
                style={{
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                  borderRadius: 4,
                  margin: 4,
                }}
              />
            );
          })}
        </ItemContainer>
      </View>
    </ModalTemplate>
  );
};
