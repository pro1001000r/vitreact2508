import React, { FC, JSXElementConstructor, ReactElement, ReactNode } from "react";
import { OverlayTrigger, OverlayTriggerProps, Popover } from "react-bootstrap";
import ButtonVit from "./ButtonVit";
import Stocktaking from "./Stocktaking";
import { OverlayTriggerRenderProps } from "react-bootstrap/esm/OverlayTrigger";

interface PopoverVitProps {
  children: ReactElement<unknown, string | JSXElementConstructor<any>> | ((props: OverlayTriggerRenderProps) => ReactNode);
  id: number;
  invent?: boolean;
}

const UpdateStocktaking = (id: number, count: number) => {
  Stocktaking({ id: id, count: count });
};

const PopoverVit: FC<PopoverVitProps> = ({ children, id, invent = false }) => {
  return (
    <>
      {invent && (
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          trigger={["click"]}
          overlay={
            <Popover id={String(id)}>
              <Popover.Header>Инв. запись № {id}</Popover.Header>
              <Popover.Body>
                <ButtonVit name="+" onClick={() => UpdateStocktaking(id, 1)} />{" "}
                <ButtonVit name="-" onClick={() => UpdateStocktaking(id, -1)} />
              </Popover.Body>
            </Popover>
          }
        >
          {children}
        </OverlayTrigger>
      )}
      {!invent && <>{children}</>}
    </>
  );
};
export default PopoverVit;
