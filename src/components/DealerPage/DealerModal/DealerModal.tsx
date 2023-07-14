import React, { FC } from "react";
import { FirstEntry } from "./FirstEntry/styles/FirstEntry";
import { SettingRoom } from "./settingRoom/styles/FirstEntry";

export enum ModalControllerEnum {
  none,
  firstEntry,
  settingRoom,
}

export const DealerModal: FC<{ modalType: ModalControllerEnum; onClose: () => void }> = ({
  modalType = ModalControllerEnum.none,
  onClose,
}) => {
  return (
    <>
      {
        {
          [ModalControllerEnum.firstEntry]: <FirstEntry onClose={onClose} />,
          [ModalControllerEnum.settingRoom]: <SettingRoom onClose={onClose} />,
          [ModalControllerEnum.none]: <></>,
        }[modalType]
      }
    </>
  );
};
