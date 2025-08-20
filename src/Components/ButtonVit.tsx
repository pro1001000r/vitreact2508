import { Nav } from "react-bootstrap";
import { IconVit } from "./IconVit";

interface IButtonVit {
  onAdd?(title: string): void;
  href?: string;
  name?: string;
  onClick?(): void;
  icon?: string;
  className?: string;
}

const ButtonVit: React.FC<IButtonVit> = ({
  href = "#",
  name = "",
  onClick = undefined,
  icon = "",
  className = "",
}) => {
  if (onClick) {
    return (
      <div
        className={"vShadowButton btn vit-button " + className}
        onClick={onClick}
      >
        {icon && <IconVit name={icon} size={24} />} {name}
      </div>
    );
  } else {
    return (
      <div className={"vShadowButton btn vit-button " + className}>
        <Nav.Link href={href}>
          {icon && <IconVit name={icon} size={24} />} {name}
        </Nav.Link>
      </div>
    );
  }
};

export default ButtonVit;
