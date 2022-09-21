import { StyledResetButton } from "./cloud-button.style";

interface ICloudButton {
  text: string;
  handleChange: () => void;
}

const CloudButton = (props: ICloudButton) => {
  const { text } = props;

  const handleChange = () => {
    props.handleChange();
  };

  return (
    <StyledResetButton
      onClick={handleChange}
      variant="contained"
      data-test-id="cloud-button"
    >
      {text}
    </StyledResetButton>
  );
};

export default CloudButton;
