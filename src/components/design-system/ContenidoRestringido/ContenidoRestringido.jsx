import { Lock } from "@mui/icons-material";
import Text from "../Text/Text";

export const ContenidoRestringido = ({
  hideIcon,
  children
}) => {

  return(
    <div className="bg-warning-light rounded px-4 py-2">
      <div className="flex">
        {!hideIcon && <Lock className="mr-2 text-warning-dark" /> }
        {children}
      </div>
    </div>
  )
};