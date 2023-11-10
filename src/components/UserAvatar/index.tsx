import {Avatar} from "antd";
import {constants} from "../../styles/constants";
import {getInitials} from "../../utils/utils";
import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import {IUser} from "../../models";

interface IProps {
    user: IUser;
}

export const UserAvatar: FC<IProps> = ({user}: IProps) => {
    const navigate = useNavigate()
  return (
      <Avatar
          size={32}
          style={{ cursor: "pointer", fontSize: 16, color: constants.black, background: constants.white }}
          onClick={() => navigate("/profile")}
      >{getInitials(user)}</Avatar>
  )
}