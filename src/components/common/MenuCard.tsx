import Link from "next/link";
// import { ListAddIconBlue, PagesIcon } from "../icons";
import { useState } from "react";

interface MenuCardProps {
  title: string;
  description: string;
  path: string;
}

/**
 * Card que representa um item dos menus de navegação.
 * @param {MenuCardProps} props Propriedades do componente. 
 */
const MenuCard = (props: MenuCardProps) => {
  return (
    <Link href={`${props.path}`}>
      <div className={`bg-white border border-black border-opacity-[16%] 
        rounded-lg text-[#284ad0] cursor-pointer group hover:bg-[#284ad0] 
        hover:text-white hover:fill-white duration-150
      `}>
        <div className="p-[24px]" >
          <div className="flex flex-row mb-[16px]">
            {/* {PagesIcon} */}
            <span className={`ml-[14px] text-[15px] font-semibold`}>
              {props.title}
            </span>
          </div>
          <p className={`text-[12px] leading-0 text-black group-hover:text-white`}>{props.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default MenuCard;