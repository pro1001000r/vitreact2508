import * as icons from "react-bootstrap-icons";

export const IconVit = ({ name, size=12, color = 'black'}) => {
  const Icon = ({ iconName, ...props }) => {
    const BootstrapIcon = icons[iconName];

    return <BootstrapIcon {...props} />;
  };
  return <Icon iconName={name} color={color} size={size} className="center" />;
};
